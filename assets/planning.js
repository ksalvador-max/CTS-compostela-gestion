/* CTS Compostela · Planning del proyecto (vista cliente, sin datos económicos) */
(function () {
  "use strict";
  const { calcular, fmtDias, sum, num, etiquetaMes } = window.CTS;
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const local = window.CTS.cargarLocal();
  let usarLocal = !!local;
  let M, R;

  function cargar() {
    M = usarLocal && local ? local : window.CTS.modeloPublicado();
    R = calcular(M);
  }
  const ml = (i) => etiquetaMes(M, i);
  const meses = () => Array.from({ length: R.N }, (_, i) => i + 1);
  const svc = (id) => M.servicios.find((s) => s.id === id);
  const persona = (id) => M.equipo.find((p) => p.id === id) || { nombre: id };
  const tag = (id, corto) => { const s = svc(id); return `<span class="svc"><i style="background:${s.color}"></i>${id}${corto ? " · " + esc(s.corto) : ""}</span>`; };
  const destino = (d) => (d === "COMP" ? "CTS Compostela (Nayarit)" : "FONATUR · Ciudad de México");

  function hexA(hex, a) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function renderBanner() {
    if (!local) { $("#banner").innerHTML = ""; return; }
    $("#banner").innerHTML = `<div class="banner">${usarLocal
      ? `Estás viendo el <b>borrador guardado en este navegador</b> (${esc(local.meta.nombre)} · ${esc(local.meta.actualizado)}). Otras personas ven el modelo publicado.`
      : `Estás viendo el <b>modelo publicado</b>. Hay un borrador guardado en este navegador.`}
      <button id="b-toggle">${usarLocal ? "Ver modelo publicado" : "Ver borrador"}</button>
      <a href="presupuesto.html">Herramienta presupuestaria</a></div>`;
    $("#b-toggle").onclick = () => { usarLocal = !usarLocal; render(); };
  }

  function renderCronograma() {
    const ms = meses();
    const filas = M.servicios.map((s) => {
      const pesos = (s.pesos || []).slice(0, R.N).map(num);
      const maxP = Math.max(...pesos, 0.0001);
      const ents = M.entregables.filter((e) => e.svc === s.id);
      const cells = ms.map((i) => {
        const p = pesos[i - 1] || 0;
        const hay = R.directosSvcMes[s.id][i - 1] > 0.5 || p > 0;
        const bar = hay ? `<div class="bar" style="background:${hexA(s.color, 0.18 + 0.62 * (p / maxP))}"></div>` : "";
        const e = ents.filter((x) => x.mes === i && !x.mesFin);
        const dem = ents.some((x) => x.mesFin && i >= x.mes && i <= x.mesFin) ? `<div class="dem" title="Productos bajo demanda"></div>` : "";
        const dia = e.length ? `<div class="dia" style="background:${s.color}" title="${esc(e.map((x) => x.cod + " · " + x.nombre).join("\n"))}"></div>${e.length > 1 ? `<span class="dia-n">${e.length}</span>` : ""}` : "";
        return `<td class="cell">${bar}${dem}${dia}</td>`;
      }).join("");
      return `<tr><td class="lbl">${tag(s.id)}<div class="small" style="margin-top:2px">${esc(s.nombre)}</div></td>${cells}</tr>`;
    }).join("");
    const viajesFila = ms.map((i) => {
      const vs = R.viajes.filter((v) => num(v.mes) === i);
      const n = sum(vs.map((v) => (v.personas || []).length));
      return `<td class="cell">${vs.length ? `<span class="trip" title="${esc(vs.map((v) => v.id + " · " + v.concepto).join("\n"))}">${vs.length} · ${n} p.</span>` : ""}</td>`;
    }).join("");
    const ej = M.entregablesEjecutivos;
    const ejFila = ms.map((i) => `<td class="cell">${ej && ej.mes === i ? `<div class="dia" style="background:#1A1A2E" title="${esc(ej.texto)}"></div>` : ""}</td>`).join("");

    const porMesEnt = ms.map((i) => M.entregables.filter((e) => e.mes === i && !e.mesFin).length);
    $("#p-cronograma").innerHTML = `
      <h2>Cronograma general de ejecución</h2>
      <p class="lead">Catorce meses contados desde el fallo. La intensidad de cada barra refleja la carga de trabajo del servicio en el mes; los rombos marcan los entregables, que se presentan dentro de los primeros 10 días hábiles del mes indicado.</p>
      <div class="kpis">
        <div class="kpi"><div class="l">Duración</div><div class="v">${R.N} meses</div></div>
        <div class="kpi"><div class="l">Servicios</div><div class="v">PT + 5</div></div>
        <div class="kpi"><div class="l">Entregables</div><div class="v">${M.entregables.length}</div><div class="s">+ entregables ejecutivos de cierre</div></div>
        <div class="kpi"><div class="l">Desplazamientos</div><div class="v">${R.viajes.length}</div><div class="s">${fmtDias(R.diasCampo)} días de campo</div></div>
      </div>
      <div class="card"><div class="card-b flush gantt"><table>
        <tr><th>Servicio</th>${ms.map((i) => `<th class="m">${ml(i)}</th>`).join("")}</tr>
        ${filas}
        <tr><td class="lbl"><b>Desplazamientos</b><div class="small muted">Nº de desplazamientos · personas</div></td>${viajesFila}</tr>
        <tr><td class="lbl"><b>Entregables ejecutivos</b><div class="small muted">Síntesis ejecutiva y presentación de conclusiones</div></td>${ejFila}</tr>
        <tr><td class="lbl small muted">Entregables por mes</td>${porMesEnt.map((n) => `<td class="c mono small">${n || ""}</td>`).join("")}</tr>
      </table></div>
      <div class="card-b legend">
        <span><i class="sw" style="background:rgba(83,74,183,.25)"></i>Carga baja</span>
        <span><i class="sw" style="background:rgba(83,74,183,.8)"></i>Carga alta</span>
        <span>◆ Entregable</span>
        <span><i class="sw" style="background:repeating-linear-gradient(90deg,#7B1D3A 0 6px,transparent 6px 10px);opacity:.6"></i>Productos bajo demanda (S5-E02, según ficha técnica)</span>
      </div></div>`;
  }

  function renderEntregables() {
    const ms = meses();
    const tarjetas = ms.map((i) => {
      const es = M.entregables.filter((e) => e.mes === i && !e.mesFin);
      const dem = M.entregables.filter((e) => e.mesFin && i >= e.mes && i <= e.mesFin);
      const ej = M.entregablesEjecutivos && M.entregablesEjecutivos.mes === i ? M.entregablesEjecutivos : null;
      if (!es.length && !ej) return dem.length ? `<div class="mcard"><h4>${ml(i).toUpperCase()}</h4><div class="it"><span class="chip d">${dem[0].cod}</span><span class="small muted">Productos bajo demanda según ficha técnica</span></div></div>` : `<div class="mcard"><h4>${ml(i).toUpperCase()}</h4><div class="small muted">Sin entregables formales · informe de avance</div></div>`;
      return `<div class="mcard"><h4>${ml(i).toUpperCase()}</h4>
        ${es.map((e) => `<div class="it"><span class="chip e" style="background:${hexA(svc(e.svc).color, 0.12)};color:${svc(e.svc).color}">${e.cod}</span><span>${esc(e.nombre)}</span></div>`).join("")}
        ${dem.map((e) => `<div class="it"><span class="chip d">${e.cod}</span><span class="small muted">Productos bajo demanda según ficha técnica</span></div>`).join("")}
        ${ej ? `<div class="it"><span class="chip">EJEC.</span><span>${esc(ej.texto)}</span></div>` : ""}
      </div>`;
    }).join("");
    const tabla = M.servicios.map((s) => {
      const es = M.entregables.filter((e) => e.svc === s.id);
      return es.map((e, k) => `<tr>${k === 0 ? `<td rowspan="${es.length}" style="vertical-align:top">${tag(s.id)}<div class="small">${esc(s.nombre)}</div></td>` : ""}<td class="mono">${e.cod}</td><td>${esc(e.nombre)}</td><td class="mono">${e.mesFin ? `${ml(e.mes)}–${ml(e.mesFin)}` : ml(e.mes)}</td></tr>`).join("");
    }).join("");
    $("#p-entregables").innerHTML = `
      <h2>Entregables</h2>
      <p class="lead">Codificación por servicio conforme al numeral 5 del anexo técnico. Cada entregable se presenta en dos ejemplares impresos y en formato digital.</p>
      <div class="entmes" style="margin-bottom:20px">${tarjetas}</div>
      <div class="card"><div class="card-h">Relación de entregables por servicio</div><div class="card-b flush scroll"><table>
        <tr><th>Servicio</th><th>Código</th><th>Entregable</th><th>Fecha</th></tr>${tabla}
      </table></div></div>`;
  }

  function renderDedicacion() {
    const S = M.servicios;
    const head1 = S.map((s) => `<th class="grp" colspan="3">${tag(s.id)}</th>`).join("");
    const head2 = S.map(() => `<th class="n bl">Campo</th><th class="n">Gab.</th><th class="n">Total</th>`).join("");
    const filas = M.equipo.map((p) => {
      let c = 0, g = 0;
      const cel = S.map((s) => {
        const a = R.campo[p.id][s.id], b = R.gab[p.id][s.id]; c += a; g += b;
        return `<td class="n bl">${a ? fmtDias(a) : "·"}</td><td class="n">${b ? fmtDias(b) : "·"}</td><td class="n">${a + b ? fmtDias(a + b) : "·"}</td>`;
      }).join("");
      return `<tr><td><b>${esc(p.nombre)}</b>${p.nombre.startsWith(M.roles[p.rol].nombre) ? (p.bolsa ? `<div class="small muted">Bolsa de días</div>` : "") : `<div class="small muted">${esc(M.roles[p.rol].nombre)}</div>`}</td>${cel}<td class="n bl">${fmtDias(c)}</td><td class="n">${fmtDias(g)}</td><td class="n"><b>${fmtDias(c + g)}</b></td></tr>`;
    }).join("");
    const tot = S.map((s) => { const a = sum(M.equipo.map((p) => R.campo[p.id][s.id])), b = sum(M.equipo.map((p) => R.gab[p.id][s.id])); return `<td class="n bl">${fmtDias(a)}</td><td class="n">${fmtDias(b)}</td><td class="n">${fmtDias(a + b)}</td>`; }).join("");
    const nivel = (d) => (d <= 0.05 ? 0 : d <= 3 ? 1 : d <= 6 ? 2 : d <= 9 ? 3 : d <= 12 ? 4 : 5);
    const heat = R.porPersona.map((pp) => `<tr><td>${esc(persona(pp.id).nombre)}</td>${pp.mensual.map((d) => `<td class="h h${nivel(d)}">${d > 0.05 ? Math.round(d) : "·"}</td>`).join("")}</tr>`).join("");
    $("#p-dedicacion").innerHTML = `
      <h2>Equipo y dedicación</h2>
      <p class="lead">Días de trabajo de cada integrante del equipo por servicio, distinguiendo días de campo (desplazamiento desde la base habitual) y días de gabinete.</p>
      <div class="card"><div class="card-h">Días por servicio · campo y gabinete</div><div class="card-b flush scroll"><table class="n7">
        <tr><th rowspan="2">Integrante</th>${head1}<th class="grp" colspan="3">Total</th></tr>
        <tr>${head2}<th class="n bl">Campo</th><th class="n">Gab.</th><th class="n">Total</th></tr>
        ${filas}
        <tr class="tot"><td>Total</td>${tot}<td class="n bl">${fmtDias(R.diasCampo)}</td><td class="n">${fmtDias(R.diasTotales - R.diasCampo)}</td><td class="n">${fmtDias(R.diasTotales)}</td></tr>
      </table></div></div>
      <div class="card"><div class="card-h">Dedicación mensual (días)</div><div class="card-b flush scroll"><table class="heat">
        <tr><th>Integrante</th>${meses().map((i) => `<th class="c">${ml(i)}</th>`).join("")}</tr>${heat}
      </table></div></div>`;
  }

  function renderDesplazamientos() {
    const filas = R.viajes.slice().sort((a, b) => num(a.mes) - num(b.mes)).map((v) => `<tr><td class="mono">${ml(num(v.mes))}</td><td>${tag(v.svc)}</td><td>${esc(v.concepto)}</td><td>${destino(v.destino)}</td><td class="n">${v.dias}</td><td>${(v.personas || []).map((p) => esc(persona(p).nombre)).join(", ")}</td></tr>`).join("");
    const porPersona = M.equipo.map((p) => {
      const vs = R.viajes.filter((v) => (v.personas || []).includes(p.id));
      return vs.length ? `<tr><td>${esc(p.nombre)}</td><td>${esc(M.bases[p.base])}</td><td class="n">${vs.length}</td><td class="n">${sum(vs.map((v) => num(v.dias)))}</td></tr>` : "";
    }).join("");
    $("#p-desplazamientos").innerHTML = `
      <h2>Presencialidad</h2>
      <p class="lead">Desplazamientos del equipo de España a México y del equipo de México al territorio del CTS Compostela (Boca de Chila y Chacala-Las Cuevas) y a las oficinas de FONATUR.</p>
      <div class="card"><div class="card-h">Calendario de desplazamientos</div><div class="card-b flush scroll"><table>
        <tr><th>Mes</th><th>Servicio</th><th>Objeto</th><th>Destino</th><th class="n">Días</th><th>Participantes</th></tr>${filas}
      </table></div></div>
      <div class="card"><div class="card-h">Presencialidad por integrante</div><div class="card-b flush scroll"><table>
        <tr><th>Integrante</th><th>Base habitual</th><th class="n">Desplazamientos</th><th class="n">Días de campo</th></tr>${porPersona}
      </table></div></div>`;
  }

  function render() {
    cargar();
    renderBanner();
    $("#hero-sub").textContent = `Plan de trabajo y cinco servicios · ${R.N} meses · ${M.meta.fuenteAnexo}`;
    renderCronograma(); renderEntregables(); renderDedicacion(); renderDesplazamientos();
    $("#pie").textContent = `globaldit México · Planning CTS Compostela · versión ${M.meta.actualizado}`;
  }

  $("#tabs").addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (!t) return;
    document.querySelectorAll(".tab").forEach((x) => x.classList.toggle("on", x === t));
    document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("on", p.id === "p-" + t.dataset.tab));
  });
  render();
})();
