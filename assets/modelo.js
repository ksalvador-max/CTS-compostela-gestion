/* CTS Compostela · Motor de cálculo compartido (planning + presupuesto) */
(function (global) {
  "use strict";

  const STORAGE_KEY = "cts-gestion-modelo-v1";
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const num = (v) => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
  const sum = (a) => a.reduce((s, x) => s + x, 0);
  const zeros = (n) => Array.from({ length: n }, () => 0);

  /* ── Persistencia ─────────────────────────────────────────────── */
  function cargarLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const m = raw ? JSON.parse(raw) : null;
      // Un borrador de una versión anterior del modelo no se reutiliza
      return m && global.MODELO_PUBLICADO && m.version === global.MODELO_PUBLICADO.version ? m : null;
    } catch (e) { return null; }
  }
  function guardarLocal(modelo) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(modelo)); return true; }
    catch (e) { return false; }
  }
  function borrarLocal() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* sin almacenamiento */ }
  }
  function modeloPublicado() { return clone(global.MODELO_PUBLICADO); }

  /* ── Utilidades del modelo ────────────────────────────────────── */
  function tarifa(m, p) {
    return p.tarifa != null && p.tarifa !== "" ? num(p.tarifa) : num(m.roles[p.rol].tarifa);
  }

  /* Coste de un participante en una misión con tramo en CDMX (FONATUR) y tramo en el territorio */
  function costeMisionPersona(m, p, cdmx, comp) {
    const vp = m.params.viaje;
    cdmx = num(cdmx); comp = num(comp);
    const dias = cdmx + comp;
    if (dias <= 0) return { transporte: 0, aloj: 0, dietas: 0, total: 0, vuelo: false, dias: 0 };
    let transporte = 0, aloj = 0, dietas = 0;
    if (p.base === "ES") {
      transporte = num(vp.vuelo) + (comp > 0 ? num(vp.cdmxComp) : 0);
    } else if (p.base === "MOR") {
      transporte = cdmx > 0 && comp > 0 ? num(vp.morCdmx) + num(vp.cdmxComp) : comp > 0 ? num(vp.morComp) : num(vp.morCdmx);
    } else if (p.base === "LOC") {
      transporte = cdmx > 0 ? num(vp.cdmxComp) : 0;
    }
    if (p.base === "LOC") {
      aloj = cdmx > 0 ? Math.max(cdmx, 1) * num(vp.hotel) : 0;
      dietas = cdmx * num(vp.dieta);
    } else {
      aloj = Math.max(dias - 1, 1) * num(vp.hotel);
      dietas = dias * num(vp.dieta);
    }
    return { transporte, aloj, dietas, total: transporte + aloj + dietas, vuelo: p.base === "ES", dias };
  }

  /* Reparto de los días de campo de un participante entre servicios */
  function repartoParticipante(mi, part, S) {
    const r = {};
    let tot = 0;
    Object.entries((part && part.reparto) || {}).forEach(([s, w]) => { if (S.includes(s) && num(w) > 0) { r[s] = num(w); tot += num(w); } });
    if (tot > 0) return Object.fromEntries(Object.entries(r).map(([s, w]) => [s, w / tot]));
    // Sin reparto propio: mismo peso para los servicios de la misión
    const svcs = (mi.servicios || []).filter((s) => S.includes(s));
    const lista = svcs.length ? svcs : [S[0]];
    return Object.fromEntries(lista.map((s) => [s, 1 / lista.length]));
  }

  function mesesCobro(params) {
    const habiles = num(params.emisionDH) + num(params.aceptacionDH) + num(params.pagoDH);
    const naturales = habiles * 7 / 5;
    return { habiles, naturales, desfase: Math.max(1, Math.ceil(naturales / 30.4)) };
  }

  function etiquetaMes(m, i) {
    // i: 1..N
    const f = m.params.fechaFallo;
    if (!f) return "M" + i;
    const d = new Date(f + "T12:00:00");
    if (isNaN(d)) return "M" + i;
    d.setDate(d.getDate() + 1);
    d.setMonth(d.getMonth() + (i - 1));
    return d.toLocaleDateString("es-ES", { month: "short", year: "2-digit" }).replace(".", "");
  }

  /* ── Cálculo principal ────────────────────────────────────────── */
  function calcular(m) {
    const N = num(m.params.meses) || 14;
    const S = m.servicios.map((s) => s.id);
    const avisos = [];
    const porId = {};
    m.equipo.forEach((p) => { porId[p.id] = p; });

    // Campo desde las misiones (cada participante reparte sus días entre servicios)
    const campo = {}, campoMes = {};
    m.equipo.forEach((p) => {
      campo[p.id] = {}; campoMes[p.id] = {};
      S.forEach((s) => { campo[p.id][s] = 0; campoMes[p.id][s] = zeros(N); });
    });
    const viajes = (m.misiones || []).map((mi) => {
      const det = [];
      let total = 0, vuelos = 0, dias = 0, personas = 0;
      const mIdx = Math.min(Math.max(num(mi.mes), 1), N) - 1;
      const campoSvc = {};
      Object.entries(mi.participantes || {}).forEach(([pid, part]) => {
        const p = porId[pid];
        if (!p) return;
        const c = costeMisionPersona(m, p, part.cdmx, part.comp);
        if (c.dias <= 0) return;
        const rep = repartoParticipante(mi, part, S);
        det.push({ pid, cdmx: num(part.cdmx), comp: num(part.comp), rep, ...c });
        total += c.total; dias += c.dias; personas++;
        if (c.vuelo) vuelos++;
        Object.entries(rep).forEach(([s, w]) => {
          campo[pid][s] += c.dias * w;
          campoMes[pid][s][mIdx] += c.dias * w;
          campoSvc[s] = (campoSvc[s] || 0) + c.dias * w;
        });
      });
      if (!personas) avisos.push({ tipo: "info", txt: `La misión ${mi.id} no tiene participantes con días asignados.` });
      if (num(mi.mes) < 1 || num(mi.mes) > N) avisos.push({ tipo: "error", txt: `La misión ${mi.id} está fuera de M1–M${N}.` });
      return { ...mi, det, total, vuelos, dias, personas, campoSvc };
    });

    // Gabinete y distribución mensual
    const gab = {}, dist = {}; // dist[pid][svc] = array N (gabinete + campo)
    const ajustesUsados = {};
    m.equipo.forEach((p) => {
      gab[p.id] = {}; dist[p.id] = {};
      S.forEach((s) => {
        const g = num((m.gabinete[p.id] || {})[s]);
        gab[p.id][s] = g;
        const svc = m.servicios.find((x) => x.id === s);
        const pesos = (svc.pesos || []).slice(0, N).map(num);
        while (pesos.length < N) pesos.push(0);
        const arr = zeros(N);
        const fijos = {};
        let sumaFijos = 0;
        for (let i = 0; i < N; i++) {
          const k = `${p.id}|${s}|${i + 1}`;
          if (m.ajustes && m.ajustes[k] != null && m.ajustes[k] !== "") {
            fijos[i] = num(m.ajustes[k]); sumaFijos += fijos[i]; ajustesUsados[k] = true;
          }
        }
        const resto = g - sumaFijos;
        if (resto < -0.01) {
          avisos.push({ tipo: "error", txt: `${p.nombre} · ${s}: los ajustes manuales (${fmtDias(sumaFijos)} d) superan los días de gabinete (${fmtDias(g)} d).` });
        }
        let sumPesos = 0;
        for (let i = 0; i < N; i++) if (fijos[i] == null) sumPesos += pesos[i];
        for (let i = 0; i < N; i++) {
          if (fijos[i] != null) arr[i] = fijos[i];
          else if (sumPesos > 0 && resto > 0) arr[i] = resto * pesos[i] / sumPesos;
        }
        if (g > 0 && sumPesos === 0 && resto > 0.01) {
          avisos.push({ tipo: "error", txt: `${p.nombre} · ${s}: hay ${fmtDias(resto)} días de gabinete sin meses con peso para repartirlos.` });
        }
        dist[p.id][s] = arr.map((x, i) => x + campoMes[p.id][s][i]);
      });
    });

    // Días por persona/servicio
    const dias = {};
    m.equipo.forEach((p) => {
      dias[p.id] = {};
      S.forEach((s) => { dias[p.id][s] = gab[p.id][s] + campo[p.id][s]; });
    });

    // Costes mensuales
    const honMes = zeros(N), viaMes = zeros(N), subMes = zeros(N);
    const honSvc = {}, viaSvc = {}, subSvc = {}, directosSvcMes = {};
    S.forEach((s) => { honSvc[s] = 0; viaSvc[s] = 0; subSvc[s] = 0; directosSvcMes[s] = zeros(N); });
    const honPersona = {};
    m.equipo.forEach((p) => {
      const t = tarifa(m, p);
      honPersona[p.id] = 0;
      S.forEach((s) => {
        dist[p.id][s].forEach((d, i) => {
          const c = d * t;
          honMes[i] += c; honSvc[s] += c; honPersona[p.id] += c; directosSvcMes[s][i] += c;
        });
      });
    });
    viajes.forEach((v) => {
      const i = Math.min(Math.max(num(v.mes), 1), N) - 1;
      viaMes[i] += v.total;
      // El coste de cada participante se imputa a los servicios según su reparto
      v.det.forEach((d) => {
        Object.entries(d.rep).forEach(([s, w]) => { viaSvc[s] += d.total * w; directosSvcMes[s][i] += d.total * w; });
      });
    });
    const subs = m.subcontratas.map((sc) => {
      let pctTotal = 0;
      Object.entries(sc.pagos || {}).forEach(([mes, pct]) => {
        const i = Math.min(Math.max(num(mes), 1), N) - 1;
        const c = num(sc.importe) * num(pct) / 100;
        subMes[i] += c; pctTotal += num(pct);
        if (subSvc[sc.svc] != null) { subSvc[sc.svc] += c; directosSvcMes[sc.svc][i] += c; }
      });
      if (Math.abs(pctTotal - 100) > 0.01) avisos.push({ tipo: "error", txt: `${sc.nombre}: el calendario de pagos suma ${pctTotal} % en lugar de 100 %.` });
      return { ...sc, pctTotal };
    });

    const directosMes = honMes.map((h, i) => h + viaMes[i] + subMes[i]);
    const honorarios = sum(honMes), viajesTot = sum(viaMes), subTot = sum(subMes);
    const directos = honorarios + viajesTot + subTot;
    const P = m.params;
    const pEst = num(P.estructura) / 100, pCont = num(P.contingencia) / 100, pMg = num(P.margen) / 100;
    const estructura = directos * pEst;
    const contingencia = directos * pCont;
    const anosFianza = (N + num(P.fianzaMesesExtra)) / 12;
    const kFianza = (num(P.fianzaPct) / 100) * (num(P.fianzaPrima) / 100) * anosFianza;
    const denom = 1 - pMg - kFianza;
    const pvpNeto = denom > 0 ? (directos + estructura + contingencia) / denom : 0;
    const fianza = pvpNeto * kFianza;
    const costeTotal = directos + estructura + contingencia + fianza;
    const margen = pvpNeto - costeTotal;
    const iva = pvpNeto * num(P.iva) / 100;
    const pvpIva = pvpNeto + iva;
    const techo = num(P.techo);
    const holgura = techo - pvpIva;

    // Coste total mensual (estructura y contingencia proporcionales; fianza en M1)
    const costeMes = directosMes.map((d, i) => d * (1 + pEst + pCont) + (i === 0 ? fianza : 0));

    // Devengado y facturación
    const cobro = mesesCobro(P);
    const factor = directos > 0 ? pvpNeto / directos : 0;
    const devengado = directosMes.map((d) => d * factor);
    const horizonte = N + cobro.desfase;
    const cobrosMes = zeros(horizonte), salidasMes = zeros(horizonte);
    costeMes.forEach((c, i) => { salidasMes[i] = c; });
    devengado.forEach((d, i) => { cobrosMes[i + cobro.desfase] += d; });
    const saldoMes = cobrosMes.map((c, i) => c - salidasMes[i]);
    const acumulado = [];
    saldoMes.reduce((a, x, i) => { acumulado[i] = a + x; return acumulado[i]; }, 0);
    let minAcum = 0, mesMin = 0;
    acumulado.forEach((a, i) => { if (a < minAcum) { minAcum = a; mesMin = i + 1; } });

    // Soporte documental de cada factura
    const soporte = zeros(N).map((_, i) => {
      const mes = i + 1;
      const ent = m.entregables.filter((e) => e.mes === mes && !e.mesFin).map((e) => e.cod);
      const dem = m.entregables.filter((e) => e.mesFin && mes >= e.mes && mes <= e.mesFin).map((e) => e.cod);
      const activos = S.filter((s) => directosSvcMes[s][i] > 0.5);
      const viajesMes = viajes.filter((v) => num(v.mes) === mes).map((v) => v.id);
      return { mes, entregables: ent, bajoDemanda: dem, activos, viajes: viajesMes };
    });
    // Entregables que se presentan en el mes m suelen resultar del trabajo del mes anterior
    soporte.forEach((s, i) => {
      s.entregablesSiguiente = i + 1 < N ? soporte[i + 1].entregables : [];
    });

    // Por servicio
    const porServicio = S.map((s) => {
      const d = honSvc[s] + viaSvc[s] + subSvc[s];
      const share = directos > 0 ? d / directos : 0;
      const diasCampo = sum(m.equipo.map((p) => campo[p.id][s]));
      const diasGab = sum(m.equipo.map((p) => gab[p.id][s]));
      return {
        id: s, honorarios: honSvc[s], viajes: viaSvc[s], subcontratas: subSvc[s], directos: d,
        coste: costeTotal * share, pvpNeto: pvpNeto * share, share, diasCampo, diasGab, dias: diasCampo + diasGab
      };
    });

    // Por persona
    const porPersona = m.equipo.map((p) => {
      const dc = sum(S.map((s) => campo[p.id][s]));
      const dg = sum(S.map((s) => gab[p.id][s]));
      const mensual = zeros(N);
      S.forEach((s) => dist[p.id][s].forEach((d, i) => { mensual[i] += d; }));
      return { id: p.id, tarifa: tarifa(m, p), diasCampo: dc, diasGab: dg, dias: dc + dg, honorarios: honPersona[p.id], mensual };
    });

    const diasTotales = sum(porPersona.map((p) => p.dias));
    const diasCampo = sum(porPersona.map((p) => p.diasCampo));
    const vuelos = sum(viajes.map((v) => v.vuelos));
    const personasViaje = sum(viajes.map((v) => v.personas));

    if (holgura < 0) avisos.unshift({ tipo: "error", txt: `El precio con IVA supera el techo en ${fmtEur(-holgura)} (${fmtPct(-holgura / techo)}).` });
    if (denom <= 0) avisos.unshift({ tipo: "error", txt: "El margen y la fianza suman 100 % o más: el precio no puede calcularse." });
    const mesesSinEntregable = soporte.filter((s) => !s.entregables.length && !s.bajoDemanda.length && devengado[s.mes - 1] > 0).map((s) => "M" + s.mes);
    if (mesesSinEntregable.length) avisos.push({ tipo: "info", txt: `Meses facturables sin entregable formal ni producto bajo demanda: ${mesesSinEntregable.join(", ")}. La conformidad del administrador se apoyará en el informe de avance.` });

    return {
      N, S, campo, gab, dias, dist, viajes, subs, ajustesUsados,
      honMes, viaMes, subMes, directosMes, costeMes, directosSvcMes,
      honorarios, viajesTot, subTot, directos, estructura, contingencia, fianza, kFianza, anosFianza,
      costeTotal, margen, pvpNeto, iva, pvpIva, techo, holgura,
      devengado, cobro, horizonte, cobrosMes, salidasMes, saldoMes, acumulado, minAcum, mesMin,
      soporte, porServicio, porPersona, diasTotales, diasCampo, vuelos, personasViaje, avisos
    };
  }

  /* ── Formato ──────────────────────────────────────────────────── */
  function fmtEur(v, dec) {
    return (0 + Math.round(v * (dec ? 100 : 1)) / (dec ? 100 : 1)).toLocaleString("es-ES", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0, useGrouping: "always" }) + " €";
  }
  function fmtMxn(v) {
    return "$" + (0 + Math.round(v)).toLocaleString("es-MX") + " MXN";
  }
  function fmtNum(v, dec) {
    return Number(v).toLocaleString("es-ES", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0, useGrouping: "always" });
  }
  function fmtDias(v) {
    const r = Math.round(v * 10) / 10;
    return Number.isInteger(r) ? fmtNum(r) : fmtNum(r, 1);
  }
  function fmtPct(v, dec) { return fmtNum(v * 100, dec == null ? 1 : dec) + " %"; }

  /* Importe en letra (pesos mexicanos), para el formato de propuesta económica */
  function enLetra(n) {
    const U = ["", "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE", "VEINTE", "VEINTIÚN", "VEINTIDÓS", "VEINTITRÉS", "VEINTICUATRO", "VEINTICINCO", "VEINTISÉIS", "VEINTISIETE", "VEINTIOCHO", "VEINTINUEVE"];
    const D = ["", "", "", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
    const C = ["", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"];
    function menorMil(x) {
      if (x === 0) return "";
      if (x === 100) return "CIEN";
      const c = Math.floor(x / 100), r = x % 100;
      let s = C[c];
      if (r) {
        let t;
        if (r < 30) t = U[r];
        else { t = D[Math.floor(r / 10)]; if (r % 10) t += " Y " + U[r % 10]; }
        s = (s ? s + " " : "") + t;
      }
      return s;
    }
    const entero = Math.floor(n), cent = Math.round((n - entero) * 100);
    const millones = Math.floor(entero / 1e6), miles = Math.floor((entero % 1e6) / 1000), resto = entero % 1000;
    const partes = [];
    if (millones) partes.push(millones === 1 ? "UN MILLÓN" : menorMil(millones) + " MILLONES");
    if (miles) partes.push(miles === 1 ? "MIL" : menorMil(miles) + " MIL");
    if (resto) partes.push(menorMil(resto));
    const txt = partes.length ? partes.join(" ") : "CERO";
    return `${txt} PESOS ${String(cent).padStart(2, "0")}/100 M.N.`;
  }

  global.CTS = {
    STORAGE_KEY, clone, num, sum, zeros,
    cargarLocal, guardarLocal, borrarLocal, modeloPublicado,
    tarifa, costeMisionPersona, repartoParticipante, mesesCobro, etiquetaMes, calcular,
    fmtEur, fmtMxn, fmtNum, fmtDias, fmtPct, enLetra
  };
})(window);
