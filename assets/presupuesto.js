/* CTS Compostela · Herramienta presupuestaria (vista interna) */
(function () {
  "use strict";
  const { calcular, fmtEur, fmtMxn, fmtNum, fmtDias, fmtPct, enLetra, num, sum, etiquetaMes, clone } = window.CTS;

  let M = window.CTS.cargarLocal() || window.CTS.modeloPublicado();
  let R = calcular(M);
  let svcDetalle = "S1";
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const tc = () => num(M.params.tipoCambio);
  const svcById = (id) => M.servicios.find((s) => s.id === id) || { id, corto: id, color: "#999" };
  const persona = (id) => M.equipo.find((p) => p.id === id) || { nombre: id };
  const meses = () => Array.from({ length: R.N }, (_, i) => i + 1);
  const ml = (i) => etiquetaMes(M, i);
  const svcTag = (id, corto) => { const s = svcById(id); return `<span class="svc"><i style="background:${s.color}"></i>${id}${corto ? " · " + esc(s.corto) : ""}</span>`; };

  /* ── Enlace de datos ─────────────────────────────────────────── */
  function setPath(obj, path, val) {
    const ks = path.split(".");
    let o = obj;
    for (let i = 0; i < ks.length - 1; i++) {
      if (o[ks[i]] == null) o[ks[i]] = {};
      o = o[ks[i]];
    }
    o[ks[ks.length - 1]] = val;
  }
  function getPath(obj, path) { return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj); }

  function inp(path, opts) {
    opts = opts || {};
    const v = getPath(M, path);
    const cls = opts.cls ? ` class="${opts.cls}"` : "";
    const ph = opts.ph != null ? ` placeholder="${esc(opts.ph)}"` : "";
    if (opts.type === "text") return `<input type="text" data-bind="${path}" data-t="text" value="${esc(v)}"${cls}${ph}>`;
    if (opts.type === "date") return `<input type="date" data-bind="${path}" data-t="text" value="${esc(v)}"${cls}>`;
    const val = v == null || v === "" ? "" : v;
    return `<input type="number" step="${opts.step || "any"}" min="${opts.min != null ? opts.min : 0}" data-bind="${path}" data-t="${opts.nullable ? "numnull" : "num"}" value="${esc(val)}"${cls}${ph}>`;
  }
  function sel(path, options) {
    const v = getPath(M, path);
    return `<select data-bind="${path}" data-t="${typeof v === "number" ? "num" : "text"}">${options.map(([k, l]) => `<option value="${esc(k)}"${String(k) === String(v) ? " selected" : ""}>${esc(l)}</option>`).join("")}</select>`;
  }

  function persistir() {
    M.meta.actualizado = new Date().toISOString().slice(0, 10);
    window.CTS.guardarLocal(M);
  }
  function recalc() { R = calcular(M); renderKbar(); }
  function renderTodo() {
    R = calcular(M);
    const y = window.scrollY;
    renderKbar(); renderResumen(); renderParametros(); renderEquipo(); renderMisiones(); renderDistribucion(); renderFacturacion(); renderEscenarios();
    $("#sub-meta").textContent = `${M.meta.nombre} · ${M.meta.fuenteAnexo} · actualizado ${M.meta.actualizado}`;
    window.scrollTo(0, y);
  }

  document.addEventListener("input", (e) => {
    const el = e.target;
    if (el.dataset.bind) {
      const t = el.dataset.t;
      let v = el.value;
      if (t === "num") v = num(v);
      else if (t === "numnull") v = v === "" ? null : num(v);
      setPath(M, el.dataset.bind, v);
      persistir(); recalc();
    } else if (el.dataset.adj) {
      if (el.value === "") delete M.ajustes[el.dataset.adj];
      else M.ajustes[el.dataset.adj] = num(el.value);
      el.classList.toggle("adj", el.value !== "");
      persistir(); recalc();
    }
  });
  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.dataset.bind || el.dataset.adj) { renderTodo(); return; }
    if (el.dataset.msvc != null) {
      const mi = M.misiones[+el.dataset.msvc];
      mi.servicios = mi.servicios || [];
      if (el.checked && !mi.servicios.includes(el.dataset.svc)) mi.servicios.push(el.dataset.svc);
      if (!el.checked) mi.servicios = mi.servicios.filter((x) => x !== el.dataset.svc);
      const orden = M.servicios.map((x) => x.id);
      mi.servicios.sort((x, y) => orden.indexOf(x) - orden.indexOf(y));
      persistir(); renderTodo();
    }
    if (el.id === "sel-svc-det") { svcDetalle = el.value; renderDistribucion(); }
    if (el.id === "imp-json") importarJson(el.files[0]);
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const a = b.dataset.act, i = b.dataset.i != null ? +b.dataset.i : null;
    if (["delPersona", "delMision", "reset", "cargarEscenario"].includes(a) && !b.dataset.armed) {
      b.dataset.armed = "1"; b.dataset.txt = b.textContent;
      b.textContent = a.startsWith("del") ? "¿Eliminar?" : "Pulsa de nuevo para confirmar";
      setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.textContent = b.dataset.txt; } }, 3000);
      return;
    }
    acciones[a] && acciones[a](i, b);
  });
  $("#tabs").addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (!t) return;
    document.querySelectorAll(".tab").forEach((x) => x.classList.toggle("on", x === t));
    document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("on", p.id === "p-" + t.dataset.tab));
    try { sessionStorage.setItem("cts-tab", t.dataset.tab); } catch (err) { /* nada */ }
  });

  const acciones = {
    addEsp() {
      const n = M.equipo.filter((p) => p.rol === "ESP").length + 1;
      let id = "ESP" + n, k = n;
      while (M.equipo.some((p) => p.id === id)) { k++; id = "ESP" + k; }
      M.equipo.push({ id, nombre: "Especialista " + k, rol: "ESP", base: "MOR" });
      M.gabinete[id] = {}; M.servicios.forEach((s) => { M.gabinete[id][s.id] = 0; });
      persistir(); renderTodo();
    },
    delPersona(i) {
      const p = M.equipo[i];
      M.equipo.splice(i, 1);
      delete M.gabinete[p.id];
      (M.misiones || []).forEach((mi) => { delete (mi.participantes || {})[p.id]; });
      Object.keys(M.ajustes).forEach((k) => { if (k.startsWith(p.id + "|")) delete M.ajustes[k]; });
      persistir(); renderTodo();
    },
    addMision() {
      M.misiones = M.misiones || [];
      let k = M.misiones.length + 1, id = "MI-" + k;
      while (M.misiones.some((v) => v.id === id)) { k++; id = "MI-" + k; }
      M.misiones.push({ id, mes: 1, nombre: "Nueva misión", objeto: "", tareasCdmx: [], tareasComp: [], servicios: ["S1"], participantes: {} });
      persistir(); renderTodo();
    },
    delMision(i) {
      M.misiones.splice(i, 1); persistir(); renderTodo();
    },
    ordenarMisiones() {
      M.misiones.sort((a, b) => num(a.mes) - num(b.mes));
      persistir(); renderTodo();
    },
    limpiarAjustes() {
      Object.keys(M.ajustes).forEach((k) => { if (k.split("|")[1] === svcDetalle) delete M.ajustes[k]; });
      persistir(); renderTodo();
    },
    exportJson() { descargar(`cts-modelo-${M.meta.actualizado}.json`, JSON.stringify(M, null, 2), "application/json"); },
    exportPublicado() {
      const txt = "/* CTS Compostela · Modelo publicado (generado desde la herramienta presupuestaria) */\nwindow.MODELO_PUBLICADO = " + JSON.stringify(M, null, 2) + ";\n";
      descargar("modelo-publicado.js", txt, "text/javascript");
    },
    reset() {
      window.CTS.borrarLocal(); M = window.CTS.modeloPublicado(); renderTodo();
    },
    guardarEscenario() { guardarEscenario(); },
    cargarHistorial() { cargarHistorial(); },
    cargarEscenario(i, b) { cargarEscenario(b.dataset.id); },
    imprimir() { window.print(); }
  };

  function descargar(nombre, contenido, tipo) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([contenido], { type: tipo }));
    a.download = nombre; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function importarJson(file) {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const m = JSON.parse(r.result);
        if (!m.params || !m.equipo || !m.servicios) throw new Error("estructura no reconocida");
        M = m; persistir(); renderTodo(); msg("Modelo importado.", "ok");
      } catch (err) { msg("No se pudo importar: " + err.message, "error"); }
    };
    r.readAsText(file);
  }

  /* ── Barra de cifras ─────────────────────────────────────────── */
  function renderKbar() {
    const h = R.holgura;
    $("#kbar").innerHTML = `
      <div class="k"><span>PVP IVA incl.</span><b>${fmtEur(R.pvpIva)}</b></div>
      <div class="k"><span>En MXN</span><b>${fmtMxn(R.pvpIva * tc())}</b></div>
      <div class="k"><span>Techo ${fmtEur(R.techo)}</span><b class="${h < 0 ? "neg" : "pos"}">${h < 0 ? "Excede " + fmtEur(-h) : "Holgura " + fmtEur(h)}</b></div>
      <div class="k"><span>Margen</span><b>${fmtEur(R.margen)} · ${fmtPct(R.pvpNeto ? R.margen / R.pvpNeto : 0)}</b></div>
      <div class="k"><span>Días-persona</span><b>${fmtDias(R.diasTotales)}</b></div>
      <div class="k"><span>Financiación máx.</span><b class="${R.minAcum < 0 ? "neg" : ""}">${fmtEur(-R.minAcum)}</b></div>
      <div class="estado">${window.CTS.cargarLocal() ? "Cambios guardados en este navegador" : "Modelo publicado"}</div>`;
  }

  function avisosHtml() {
    if (!R.avisos.length) return `<div class="avisos"><div class="aviso ok">Sin incidencias: el presupuesto cumple el techo y los repartos cuadran.</div></div>`;
    return `<div class="avisos">${R.avisos.map((a) => `<div class="aviso ${a.tipo}">${esc(a.txt)}</div>`).join("")}</div>`;
  }

  /* ── Resumen ─────────────────────────────────────────────────── */
  function renderResumen() {
    const P = M.params, pv = R.pvpNeto || 1;
    const fila = (l, v, cls) => `<tr class="${cls || ""}"><td>${l}</td><td class="n">${fmtEur(v)}</td><td class="n">${fmtMxn(v * tc())}</td><td class="n">${fmtPct(v / pv)}</td></tr>`;
    const netoMxn = R.pvpNeto * tc(), ivaMxn = R.iva * tc(), totMxn = R.pvpIva * tc();
    $("#p-resumen").innerHTML = `
      <h2>Resumen del presupuesto</h2>
      <p class="lead">Contrato cerrado de 14 meses, facturación mensual de servicios devengados. Importes calculados en EUR y convertidos a MXN a ${fmtNum(tc(), 2)} MXN/EUR.</p>
      ${avisosHtml()}
      <div class="kpis">
        <div class="kpi ${R.holgura < 0 ? "alert" : "good"}"><div class="l">Precio IVA incluido</div><div class="v">${fmtEur(R.pvpIva)}</div><div class="s">${fmtMxn(totMxn)}</div></div>
        <div class="kpi"><div class="l">Techo vigente (IVA incl.)</div><div class="v">${fmtEur(R.techo)}</div><div class="s">${R.holgura < 0 ? "Excede en " + fmtEur(-R.holgura) : "Holgura " + fmtEur(R.holgura)}</div></div>
        <div class="kpi"><div class="l">Precio neto sin IVA</div><div class="v">${fmtEur(R.pvpNeto)}</div><div class="s">${fmtMxn(netoMxn)}</div></div>
        <div class="kpi"><div class="l">Margen</div><div class="v">${fmtEur(R.margen)}</div><div class="s">${fmtPct(R.margen / pv)} sobre PVP neto</div></div>
        <div class="kpi"><div class="l">Días-persona</div><div class="v">${fmtDias(R.diasTotales)}</div><div class="s">${fmtDias(R.diasCampo)} campo · ${fmtDias(R.diasTotales - R.diasCampo)} gabinete</div></div>
        <div class="kpi ${R.minAcum < 0 ? "alert" : ""}"><div class="l">Financiación máxima</div><div class="v">${fmtEur(-R.minAcum)}</div><div class="s">Pico en ${R.mesMin ? ml(R.mesMin) : "—"} · cobro a M+${R.cobro.desfase}</div></div>
      </div>
      <div class="grid g2">
        <div class="card"><div class="card-h">Composición del precio</div><div class="card-b flush"><table>
          <tr><th>Concepto</th><th class="n">EUR</th><th class="n">MXN</th><th class="n">% PVP neto</th></tr>
          ${fila("Honorarios del equipo", R.honorarios, "sub")}
          ${fila("Misiones a México (desplazamientos)", R.viajesTot, "sub")}
          ${fila("Subcontratas (FutureBrand)", R.subTot, "sub")}
          ${fila("Costes directos", R.directos, "tot")}
          ${fila(`Estructura (${fmtNum(P.estructura, 1)} %)`, R.estructura, "sub")}
          ${fila(`Contingencia por penas y deductivas (${fmtNum(P.contingencia, 1)} %)`, R.contingencia, "sub")}
          ${fila("Coste de la fianza de cumplimiento", R.fianza, "sub")}
          ${fila("Coste total", R.costeTotal, "tot")}
          ${fila(`Margen (${fmtNum(P.margen, 1)} % s/ PVP)`, R.margen, "sub")}
          ${fila("Precio neto sin IVA", R.pvpNeto, "tot")}
          ${fila(`IVA (${fmtNum(P.iva, 0)} %)`, R.iva, "sub")}
          ${fila("Precio IVA incluido", R.pvpIva, "hl")}
        </table></div></div>
        <div class="card"><div class="card-h">Formato de propuesta económica <span class="hint">Partida única · M.N.</span></div><div class="card-b">
          <table>
            <tr><td>Monto total de la consultoría (sin IVA)</td><td class="n">${fmtMxn(netoMxn)}</td></tr>
            <tr><td>I.V.A. (${fmtNum(P.iva, 0)} %)</td><td class="n">${fmtMxn(ivaMxn)}</td></tr>
            <tr class="hl"><td>Monto total de la consultoría (con IVA)</td><td class="n">${fmtMxn(totMxn)}</td></tr>
          </table>
          <p class="small" style="margin:12px 0 4px"><b>Sin IVA:</b> ${esc(enLetra(Math.round(netoMxn * 100) / 100))}</p>
          <p class="small" style="margin:4px 0"><b>IVA:</b> ${esc(enLetra(Math.round(ivaMxn * 100) / 100))}</p>
          <p class="small" style="margin:4px 0"><b>Con IVA:</b> ${esc(enLetra(Math.round(totMxn * 100) / 100))}</p>
          <p class="small muted" style="margin-top:10px">Importes orientativos: el tipo de cambio aplicado es un parámetro. Fianza de cumplimiento: ${fmtMxn(R.pvpNeto * tc() * num(P.fianzaPct) / 100)} (${fmtNum(P.fianzaPct, 0)} % sin IVA).</p>
        </div></div>
      </div>
      <div class="card"><div class="card-h">Coste y precio por servicio <span class="hint">Estructura, contingencia, fianza y margen se reparten en proporción a los costes directos</span></div><div class="card-b flush scroll"><table>
        <tr><th>Servicio</th><th class="n">Días campo</th><th class="n">Días gabinete</th><th class="n">Honorarios</th><th class="n">Desplaz.</th><th class="n">Subcontr.</th><th class="n">Coste total</th><th class="n">PVP neto</th><th class="n">PVP neto MXN</th><th class="n">% del total</th></tr>
        ${R.porServicio.map((s) => `<tr><td>${svcTag(s.id, true)}</td><td class="n">${fmtDias(s.diasCampo)}</td><td class="n">${fmtDias(s.diasGab)}</td><td class="n">${fmtEur(s.honorarios)}</td><td class="n">${fmtEur(s.viajes)}</td><td class="n">${fmtEur(s.subcontratas)}</td><td class="n">${fmtEur(s.coste)}</td><td class="n">${fmtEur(s.pvpNeto)}</td><td class="n">${fmtMxn(s.pvpNeto * tc())}</td><td class="n">${fmtPct(s.share)}</td></tr>`).join("")}
        <tr class="tot"><td>Total</td><td class="n">${fmtDias(R.diasCampo)}</td><td class="n">${fmtDias(R.diasTotales - R.diasCampo)}</td><td class="n">${fmtEur(R.honorarios)}</td><td class="n">${fmtEur(R.viajesTot)}</td><td class="n">${fmtEur(R.subTot)}</td><td class="n">${fmtEur(R.costeTotal)}</td><td class="n">${fmtEur(R.pvpNeto)}</td><td class="n">${fmtMxn(R.pvpNeto * tc())}</td><td class="n">100 %</td></tr>
      </table></div></div>`;
  }

  /* ── Parámetros ──────────────────────────────────────────────── */
  function prow(label, control, unit, desc) {
    return `<div class="prow"><div>${label}${desc ? `<div class="d">${desc}</div>` : ""}</div><div>${control}</div><div class="u">${unit || ""}</div></div>`;
  }
  function renderParametros() {
    const P = M.params, c = R.cobro;
    const sc = M.subcontratas[0];
    $("#p-parametros").innerHTML = `
      <h2>Parámetros</h2>
      <p class="lead">Todos los cálculos se hacen en EUR. Los cambios se guardan automáticamente en este navegador; para compartirlos, usa la pestaña Escenarios.</p>
      <div class="grid g3">
        <div class="card"><div class="card-h">Tarifas de honorarios (€/día)</div><div class="card-b">
          ${Object.entries(M.roles).map(([k, r]) => prow(r.nombre, inp(`roles.${k}.tarifa`), "€/d", M.equipo.filter((p) => p.rol === k).map((p) => p.nombre).join(" · "))).join("")}
        </div></div>
        <div class="card"><div class="card-h">Desplazamientos (€)</div><div class="card-b">
          ${prow("Vuelo España ↔ México", inp("params.viaje.vuelo"), "€/pers.", "Ida y vuelta")}
          ${prow("Alojamiento", inp("params.viaje.hotel"), "€/noche")}
          ${prow("Manutención", inp("params.viaje.dieta"), "€/día")}
          ${prow("Traslado CDMX ↔ Compostela", inp("params.viaje.cdmxComp"), "€/pers.", "Equipo España con destino al territorio")}
          ${prow("Traslado Morelia ↔ CDMX", inp("params.viaje.morCdmx"), "€/pers.")}
          ${prow("Traslado Morelia ↔ Compostela", inp("params.viaje.morComp"), "€/pers.")}
        </div></div>
        <div class="card"><div class="card-h">Financieros</div><div class="card-b">
          ${prow("Tipo de cambio", inp("params.tipoCambio", { step: 0.01 }), "MXN/€", "Referencia: 20,47 (05-10-2026)")}
          ${prow("IVA México", inp("params.iva", { step: 0.5 }), "%")}
          ${prow("Estructura", inp("params.estructura", { step: 0.5 }), "%", "Sobre costes directos")}
          ${prow("Contingencia", inp("params.contingencia", { step: 0.5 }), "%", "Penas convencionales (1 %/día, máx. 10 %) y deductivas (1 %)")}
          ${prow("Margen", inp("params.margen", { step: 0.5 }), "%", "Sobre precio neto sin IVA")}
          ${prow("Techo presupuestario", inp("params.techo", { step: 1000 }), "€", "IVA incluido")}
        </div></div>
        <div class="card"><div class="card-h">Fianza de cumplimiento</div><div class="card-b">
          ${prow("Importe garantizado", inp("params.fianzaPct", { step: 0.5 }), "%", "Del monto del contrato sin IVA (numeral 12)")}
          ${prow("Prima de la póliza", inp("params.fianzaPrima", { step: 0.1 }), "% anual", "Supuesto pendiente de cotizar con afianzadora")}
          ${prow("Vigencia tras la aceptación", inp("params.fianzaMesesExtra", { step: 1 }), "meses")}
          <p class="small muted" style="margin:10px 0 0">Vigencia total ${fmtNum(R.anosFianza, 2)} años · coste ${fmtEur(R.fianza)}, imputado en M1.</p>
        </div></div>
        <div class="card"><div class="card-h">Plazos de facturación y cobro</div><div class="card-b">
          ${prow("Emisión de la factura", inp("params.emisionDH", { step: 1 }), "días háb.", "Tras el cierre del mes devengado")}
          ${prow("Conformidad del administrador", inp("params.aceptacionDH", { step: 1 }), "días háb.", "Reporte de conformidad y revisión del CFDI (3 días para observaciones)")}
          ${prow("Plazo de pago", inp("params.pagoDH", { step: 1 }), "días háb.", "Máximo 17 tras la aceptación de la factura (numeral 15)")}
          <p class="small muted" style="margin:10px 0 0">${c.habiles} días hábiles ≈ ${fmtNum(c.naturales)} días naturales desde el cierre del mes → el devengado del mes M se cobra en <b>M+${c.desfase}</b>.</p>
        </div></div>
        <div class="card"><div class="card-h">Línea temporal</div><div class="card-b">
          ${prow("Duración", `<input type="number" value="${R.N}" disabled>`, "meses", "Contrato de 14 meses desde el fallo")}
          ${prow("Fecha del fallo", inp("params.fechaFallo", { type: "date" }), "", "Opcional: si se indica, los meses se muestran con fecha")}
        </div></div>
      </div>
      ${sc ? `<div class="card"><div class="card-h">Subcontrata · ${esc(sc.nombre)} <span class="hint">${esc(sc.concepto)}</span></div><div class="card-b">
        <div class="grid g3" style="margin-bottom:10px">
          ${prow("Precio cerrado", inp("subcontratas.0.importe", { step: 500 }), "€")}
          ${prow("Servicio", sel("subcontratas.0.svc", M.servicios.map((s) => [s.id, s.id + " · " + s.corto])), "")}
        </div>
        <div class="scroll"><table class="mtab"><tr><th>Calendario de pago (% del importe)</th>${meses().map((i) => `<th class="n">${ml(i)}</th>`).join("")}<th class="n">Total</th></tr>
        <tr><td></td>${meses().map((i) => `<td>${inp(`subcontratas.0.pagos.${i}`, { nullable: true, step: 5 })}</td>`).join("")}<td class="n ${Math.abs(R.subs[0].pctTotal - 100) > 0.01 ? "neg" : ""}">${fmtNum(R.subs[0].pctTotal)} %</td></tr></table></div>
      </div></div>` : ""}`;
  }

  /* ── Equipo y numeral 7 ──────────────────────────────────────── */
  function renderEquipo() {
    const S = M.servicios;
    const rolOpts = Object.entries(M.roles).map(([k, r]) => [k, r.nombre]);
    const baseOpts = Object.entries(M.bases);
    const filasEquipo = M.equipo.map((p, i) => {
      const pp = R.porPersona[i];
      return `<tr>
        <td>${inp(`equipo.${i}.nombre`, { type: "text" })}${p.bolsa ? `<div class="small muted">Bolsa de días · distribución entre personas por definir</div>` : ""}</td>
        <td>${sel(`equipo.${i}.rol`, rolOpts)}</td>
        <td>${sel(`equipo.${i}.base`, baseOpts)}</td>
        <td class="n">${inp(`equipo.${i}.tarifa`, { nullable: true, cls: "w90", ph: M.roles[p.rol].tarifa })}</td>
        <td class="n">${fmtDias(pp.diasCampo)}</td><td class="n">${fmtDias(pp.diasGab)}</td><td class="n"><b>${fmtDias(pp.dias)}</b></td>
        <td class="n">${fmtEur(pp.honorarios)}</td>
        </tr>`;
    }).join("");

    const head1 = S.map((s) => `<th class="grp" colspan="3">${svcTag(s.id)}</th>`).join("");
    const head2 = S.map(() => `<th class="n bl">Campo</th><th class="n">Gabinete</th><th class="n">Total</th>`).join("");
    const filas7 = M.equipo.map((p) => {
      let tc_ = 0, tg = 0;
      const celdas = S.map((s) => {
        const c = R.campo[p.id][s.id], g = R.gab[p.id][s.id];
        tc_ += c; tg += g;
        return `<td class="calc bl">${c ? fmtDias(c) : "·"}</td><td>${inp(`gabinete.${p.id}.${s.id}`, { step: 0.5 })}</td><td class="n">${fmtDias(c + g)}</td>`;
      }).join("");
      return `<tr><td><b>${esc(p.nombre)}</b>${p.nombre.startsWith(M.roles[p.rol].nombre) ? (p.bolsa ? `<div class="small muted">Bolsa de días</div>` : "") : `<div class="small muted">${esc(M.roles[p.rol].nombre)}</div>`}</td>${celdas}<td class="n bl">${fmtDias(tc_)}</td><td class="n">${fmtDias(tg)}</td><td class="n"><b>${fmtDias(tc_ + tg)}</b></td></tr>`;
    }).join("");
    const tot7 = S.map((s) => {
      const c = sum(M.equipo.map((p) => R.campo[p.id][s.id])), g = sum(M.equipo.map((p) => R.gab[p.id][s.id]));
      return `<td class="n bl">${fmtDias(c)}</td><td class="n">${fmtDias(g)}</td><td class="n">${fmtDias(c + g)}</td>`;
    }).join("");

    $("#p-equipo").innerHTML = `
      <h2>Equipo y dedicación</h2>
      <p class="lead">Perfiles según el numeral 4.1 del anexo: director de proyecto, asesor estratégico, tres consultores senior y especialistas. Los especialistas se tratan como una bolsa única de días («consultor especialista»), cuya distribución entre personas se definirá más adelante. La tarifa individual es opcional; si se deja vacía se aplica la del rol.</p>
      <div class="card"><div class="card-h">Equipo <span class="hint">Base habitual: determina el coste de cada misión</span></div><div class="card-b flush scroll"><table>
        <tr><th>Nombre</th><th>Rol</th><th>Base</th><th class="n">Tarifa €/d</th><th class="n">Campo</th><th class="n">Gabinete</th><th class="n">Total días</th><th class="n">Honorarios</th></tr>
        ${filasEquipo}
        <tr class="tot"><td colspan="4">Total</td><td class="n">${fmtDias(R.diasCampo)}</td><td class="n">${fmtDias(R.diasTotales - R.diasCampo)}</td><td class="n">${fmtDias(R.diasTotales)}</td><td class="n">${fmtEur(R.honorarios)}</td></tr>
      </table></div></div>

      <div class="card"><div class="card-h">Días por servicio · campo y gabinete (numeral 7) <span class="hint">Campo = días en misiones, repartidos por servicio · Gabinete editable</span></div>
        <div class="card-b flush scroll"><table class="n7">
          <tr><th rowspan="2">Persona</th>${head1}<th class="grp" colspan="3">Total</th></tr>
          <tr>${head2}<th class="n bl">Campo</th><th class="n">Gabinete</th><th class="n">Total</th></tr>
          ${filas7}
          <tr class="tot"><td>Total</td>${tot7}<td class="n bl">${fmtDias(R.diasCampo)}</td><td class="n">${fmtDias(R.diasTotales - R.diasCampo)}</td><td class="n">${fmtDias(R.diasTotales)}</td></tr>
        </table></div></div>`;
  }

  /* ── Misiones a México ───────────────────────────────────────── */
  function renderMisiones() {
    const mesOpts = meses().map((i) => [i, ml(i)]);
    const repTxt = (rep) => Object.entries(rep).map(([s, w]) => `${s} ${Math.round(w * 100)} %`).join(" · ");
    const tarjetas = R.viajes.map((v, i) => {
      const filas = M.equipo.map((p) => {
        const d = v.det.find((x) => x.pid === p.id);
        const base = `misiones.${i}.participantes.${p.id}`;
        return `<tr${d ? "" : ' class="sub"'}>
          <td><b>${esc(p.corto || p.id)}</b> <span class="small muted">${esc(p.nombre)}</span></td>
          <td class="small muted">${esc(M.bases[p.base] || "")}</td>
          <td style="width:80px">${inp(`${base}.cdmx`, { step: 1, cls: "w70" })}</td>
          <td style="width:80px">${inp(`${base}.comp`, { step: 1, cls: "w70" })}</td>
          <td class="n">${d ? fmtDias(d.dias) : ""}</td>
          <td class="small">${d ? repTxt(d.rep) : ""}</td>
          <td class="n">${d ? fmtEur(d.total) : ""}</td></tr>`;
      }).join("");
      const tareas = (lst) => (lst || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("") || '<span class="small muted">—</span>';
      return `<div class="card"><div class="card-h"><span>${esc(v.id)} · ${esc(v.nombre)}</span><span class="hint">${ml(num(v.mes))} · ${v.personas} personas · ${v.vuelos} vuelos · ${fmtEur(v.total)}</span></div>
        <div class="card-b">
          <div class="grid" style="grid-template-columns:110px 1fr auto;gap:12px;align-items:end">
            <div><div class="small muted">Mes</div>${sel(`misiones.${i}.mes`, mesOpts)}</div>
            <div><div class="small muted">Nombre</div>${inp(`misiones.${i}.nombre`, { type: "text" })}</div>
            <div><button class="btn danger" data-act="delMision" data-i="${i}">Eliminar misión</button></div>
          </div>
          <div style="margin-top:10px"><div class="small muted">Objeto</div>${inp(`misiones.${i}.objeto`, { type: "text" })}</div>
          <div class="grid g3" style="margin-top:10px;gap:10px">
            <div><div class="small muted">Servicios que atiende</div>${M.servicios.map((s) => `<label class="pchk"><input type="checkbox" data-msvc="${i}" data-svc="${s.id}"${(v.servicios || []).includes(s.id) ? " checked" : ""}>${s.id}</label>`).join("")}</div>
            <div><div class="small muted">Tareas en FONATUR (CDMX)</div>${tareas(v.tareasCdmx)}</div>
            <div><div class="small muted">Tareas en el territorio</div>${tareas(v.tareasComp)}</div>
          </div>
        </div>
        <div class="card-b flush scroll"><table>
          <tr><th>Perfil</th><th>Base</th><th>Días CDMX</th><th>Días territorio</th><th class="n">Total</th><th>Reparto del campo por servicio</th><th class="n">Coste</th></tr>
          ${filas}
          <tr class="tot"><td colspan="4">Total misión</td><td class="n">${fmtDias(v.dias)}</td><td>${Object.entries(v.campoSvc).map(([s, d]) => `${s} ${fmtDias(d)} d`).join(" · ")}</td><td class="n">${fmtEur(v.total)}</td></tr>
        </table></div></div>`;
    }).join("");
    const resumen = R.viajes.map((v) => `<tr><td class="mono">${esc(v.id)}</td><td class="mono">${ml(num(v.mes))}</td><td>${esc(v.nombre)}</td><td>${(v.servicios || []).map((s) => svcTag(s)).join(" ")}</td><td class="n">${v.personas}</td><td class="n">${v.vuelos}</td><td class="n">${fmtDias(v.dias)}</td><td class="n">${fmtEur(v.total)}</td></tr>`).join("");
    $("#p-viajes").innerHTML = `
      <h2>Misiones a México</h2>
      <p class="lead">Viajes combinados que atienden varios servicios y entregables en una misma visita: un tramo en FONATUR (CDMX) y otro en el territorio del CTS. Los días de cada participante cuentan como días de campo y se reparten entre servicios según las tareas que atiende. Si añades a un participante nuevo, sus días se reparten a partes iguales entre los servicios marcados en la misión.</p>
      <div class="kpis">
        <div class="kpi"><div class="l">Misiones</div><div class="v">${R.viajes.length}</div><div class="s">${R.personasViaje} personas-viaje</div></div>
        <div class="kpi"><div class="l">Vuelos España ↔ México</div><div class="v">${R.vuelos}</div></div>
        <div class="kpi"><div class="l">Días de campo</div><div class="v">${fmtDias(R.diasCampo)}</div></div>
        <div class="kpi"><div class="l">Coste total</div><div class="v">${fmtEur(R.viajesTot)}</div><div class="s">${fmtMxn(R.viajesTot * tc())}</div></div>
      </div>
      <div class="card"><div class="card-h">Calendario de misiones <span class="hint">Transporte según la base · alojamiento: días − 1 noches · manutención: días completos</span></div><div class="card-b flush scroll"><table>
        <tr><th>Misión</th><th>Mes</th><th>Nombre</th><th>Servicios</th><th class="n">Personas</th><th class="n">Vuelos</th><th class="n">Días</th><th class="n">Coste</th></tr>
        ${resumen}
        <tr class="tot"><td colspan="4">Total</td><td class="n">${R.personasViaje}</td><td class="n">${R.vuelos}</td><td class="n">${fmtDias(R.diasCampo)}</td><td class="n">${fmtEur(R.viajesTot)}</td></tr>
      </table></div><div class="card-b btns"><button class="btn sec" data-act="addMision">+ Añadir misión</button><button class="btn sec" data-act="ordenarMisiones">Ordenar por mes</button></div></div>
      ${tarjetas}`;
  }

  /* ── Distribución mensual ────────────────────────────────────── */
  function nivel(d) { return d <= 0.05 ? 0 : d <= 3 ? 1 : d <= 6 ? 2 : d <= 9 ? 3 : d <= 12 ? 4 : 5; }
  function renderDistribucion() {
    const ms = meses();
    const pesosFilas = M.servicios.map((s, si) => {
      const tot = sum((s.pesos || []).slice(0, R.N).map(num));
      return `<tr><td>${svcTag(s.id, true)}</td>${ms.map((i) => `<td>${inp(`servicios.${si}.pesos.${i - 1}`, { step: 0.5 })}</td>`).join("")}<td class="n">${fmtNum(tot, 1)}</td></tr>`;
    }).join("");
    const entPorSvcMes = (sid, i) => M.entregables.filter((e) => e.svc === sid && e.mes === i && !e.mesFin).map((e) => e.cod);
    const hitos = M.servicios.map((s) => `<tr><td>${svcTag(s.id)}</td>${ms.map((i) => { const e = entPorSvcMes(s.id, i); return `<td class="c">${e.map((c) => `<span class="chip e">${c.replace(s.id + "-", "")}</span>`).join("")}</td>`; }).join("")}<td></td></tr>`).join("");

    const heat = R.porPersona.map((pp) => {
      const p = persona(pp.id);
      return `<tr><td>${esc(p.nombre)}</td>${pp.mensual.map((d) => `<td class="h h${nivel(d)}">${d > 0.05 ? fmtDias(d) : "·"}</td>`).join("")}<td class="n"><b>${fmtDias(pp.dias)}</b></td></tr>`;
    }).join("");
    const totMes = ms.map((i) => sum(R.porPersona.map((pp) => pp.mensual[i - 1])));

    const sd = svcDetalle;
    const det = M.equipo.filter((p) => R.dias[p.id][sd] > 0 || Object.keys(M.ajustes).some((k) => k.startsWith(p.id + "|" + sd + "|"))).map((p) => {

      const celdas = ms.map((i) => {
        const k = `${p.id}|${sd}|${i}`;
        const tot = R.dist[p.id][sd][i - 1];
        const c = sum(R.viajes.filter((v) => num(v.mes) === i).map((v) => { const d = v.det.find((x) => x.pid === p.id); return d ? d.dias * (d.rep[sd] || 0) : 0; }));
        const g = tot - c;
        const fijo = M.ajustes[k] != null;
        return `<td><input type="number" step="0.5" min="0" data-adj="${k}" class="${fijo ? "adj" : "ghost"}" value="${fijo ? M.ajustes[k] : ""}" placeholder="${g > 0.05 ? fmtDias(g) : "·"}">${c ? `<div class="small" style="text-align:right;color:var(--granate)">+${fmtDias(c)} c</div>` : ""}</td>`;
      }).join("");
      return `<tr><td>${esc(p.nombre)}<div class="small muted">${fmtDias(R.gab[p.id][sd])} d gabinete</div></td>${celdas}</tr>`;
    }).join("");

    $("#p-distribucion").innerHTML = `
      <h2>Distribución mensual</h2>
      <p class="lead">Cada servicio tiene una ventana de actividad y un peso por mes. Los días de gabinete de cada persona se reparten según esos pesos; los días de campo se sitúan en el mes del desplazamiento. Los entregables se presentan en los primeros 10 días hábiles del mes indicado, así que el trabajo se concentra en el mes anterior.</p>
      <div class="card"><div class="card-h">Pesos por servicio y mes <span class="hint">0 = fuera de la ventana de actividad</span></div><div class="card-b flush scroll"><table class="mtab">
        <tr><th>Servicio</th>${ms.map((i) => `<th class="n">${ml(i)}</th>`).join("")}<th class="n">Σ</th></tr>
        ${pesosFilas}
        <tr><th colspan="${R.N + 2}">Entregables</th></tr>
        ${hitos}
      </table></div></div>

      <div class="card"><div class="card-h">Días por persona y mes <span class="hint">Campo + gabinete</span></div><div class="card-b flush scroll"><table class="heat">
        <tr><th>Persona</th>${ms.map((i) => `<th class="c">${ml(i)}</th>`).join("")}<th class="n">Total</th></tr>
        ${heat}
        <tr class="tot"><td>Total</td>${totMes.map((d) => `<td class="c mono">${fmtDias(d)}</td>`).join("")}<td class="n">${fmtDias(R.diasTotales)}</td></tr>
      </table></div><div class="card-b legend">
        <span><i class="sw h1"></i>≤ 3</span><span><i class="sw h2"></i>4–6</span><span><i class="sw h3"></i>7–9</span><span><i class="sw h4"></i>10–12</span><span><i class="sw h5"></i>≥ 13 días</span>
      </div></div>

      <div class="card"><div class="card-h">Corrección manual del gabinete
        <span class="hint"><select id="sel-svc-det" style="width:auto;display:inline-block">${M.servicios.map((s) => `<option value="${s.id}"${s.id === sd ? " selected" : ""}>${s.id} · ${esc(s.corto)}</option>`).join("")}</select></span></div>
        <div class="card-b small muted">Escribe un valor para fijar los días de gabinete de ese mes; el resto se reparte automáticamente entre los meses no fijados. Borra el valor para volver al reparto automático. «c» indica días de campo.</div>
        <div class="card-b flush scroll"><table class="mtab">
          <tr><th>Persona</th>${ms.map((i) => `<th class="n">${ml(i)}</th>`).join("")}</tr>
          ${det || `<tr><td colspan="${R.N + 1}" class="muted">Nadie tiene días asignados a este servicio.</td></tr>`}
        </table></div>
        <div class="card-b"><button class="btn sec" data-act="limpiarAjustes">Quitar ajustes de ${sd}</button></div></div>`;
  }

  /* ── Facturación y tesorería ─────────────────────────────────── */
  function renderFacturacion() {
    const ms = meses(), d = R.cobro.desfase, ivaP = num(M.params.iva) / 100;
    const filas = ms.map((i) => {
      const dev = R.devengado[i - 1], s = R.soporte[i - 1];
      return `<tr>
        <td class="mono"><b>${ml(i)}</b></td>
        <td class="n">${fmtEur(R.costeMes[i - 1])}</td>
        <td class="n">${fmtEur(dev)}</td>
        <td class="n">${fmtPct(R.pvpNeto ? dev / R.pvpNeto : 0)}</td>
        <td class="n">${fmtEur(dev * (1 + ivaP))}</td>
        <td class="n">${fmtMxn(dev * (1 + ivaP) * tc())}</td>
        <td class="c mono">${i + 1 <= R.N ? ml(i + 1) : "M" + (i + 1)}</td>
        <td class="c mono">${i + d <= R.N ? ml(i + d) : "M" + (i + d)}</td>
        <td>${s.entregables.map((c) => `<span class="chip e">${c}</span>`).join("")}${s.bajoDemanda.map((c) => `<span class="chip d">${c}</span>`).join("")}
          <div class="small muted">${s.activos.join(" · ")}${s.viajes.length ? " · misión " + s.viajes.join(", ") : ""}</div></td></tr>`;
    }).join("");
    const H = R.horizonte;
    const tes = Array.from({ length: H }, (_, k) => `<tr><td class="mono">${k + 1 <= R.N ? ml(k + 1) : "M" + (k + 1)}</td><td class="n">${fmtEur(-R.salidasMes[k])}</td><td class="n">${fmtEur(R.cobrosMes[k])}</td><td class="n">${fmtEur(R.saldoMes[k])}</td><td class="n" style="color:${R.acumulado[k] < 0 ? "var(--err)" : "var(--ok)"}">${fmtEur(R.acumulado[k])}</td></tr>`).join("");

    // Gráfico de saldo acumulado
    const W = 900, Hh = 220, pad = 34;
    const maxA = Math.max(...R.acumulado, 0), minA = Math.min(...R.acumulado, 0);
    const rng = (maxA - minA) || 1;
    const bw = (W - pad * 2) / H;
    const y = (v) => pad / 2 + (maxA - v) / rng * (Hh - pad);
    const bars = R.acumulado.map((a, k) => `<rect x="${pad + k * bw + 3}" y="${Math.min(y(a), y(0))}" width="${bw - 6}" height="${Math.max(Math.abs(y(a) - y(0)), 1)}" fill="${a < 0 ? "#A3262A" : "#0F6E56"}" opacity=".8"><title>${k + 1 <= R.N ? ml(k + 1) : "M" + (k + 1)}: ${fmtEur(a)}</title></rect><text x="${pad + k * bw + bw / 2}" y="${Hh - 2}" font-size="11" text-anchor="middle" fill="#8A8794" font-family="DM Mono, monospace">${k + 1 <= R.N ? ml(k + 1) : "M" + (k + 1)}</text>`).join("");
    const svg = `<svg viewBox="0 0 ${W} ${Hh + 6}" role="img" aria-label="Saldo de tesorería acumulado"><line x1="${pad}" x2="${W - pad}" y1="${y(0)}" y2="${y(0)}" stroke="#1A1A2E" stroke-width="1"/>${bars}<text x="${W - pad}" y="${y(minA) - 4}" font-size="12" text-anchor="end" fill="#A3262A" font-family="DM Mono, monospace">Mínimo ${fmtEur(minA)}</text></svg>`;

    $("#p-facturacion").innerHTML = `
      <h2>Facturación y tesorería</h2>
      <p class="lead">Pagos mensuales de los servicios devengados, a mes vencido (numeral 15). El devengado de cada mes es proporcional a su coste directo (honorarios, desplazamientos y subcontratas). Cobro estimado en M+${d}: ${R.cobro.habiles} días hábiles entre emisión, conformidad del administrador y pago.</p>
      ${R.avisos.filter((a) => a.txt.startsWith("Meses facturables")).map((a) => `<div class="avisos"><div class="aviso info">${esc(a.txt)}</div></div>`).join("")}
      <div class="card"><div class="card-h">Calendario de facturación <span class="hint">Entregable en granate · producto bajo demanda en ocre</span></div><div class="card-b flush scroll"><table>
        <tr><th>Mes devengado</th><th class="n">Coste del mes</th><th class="n">Devengado sin IVA</th><th class="n">% contrato</th><th class="n">Factura IVA incl.</th><th class="n">Factura MXN</th><th class="c">Emisión</th><th class="c">Cobro</th><th>Soporte de la conformidad</th></tr>
        ${filas}
        <tr class="tot"><td>Total</td><td class="n">${fmtEur(R.costeTotal)}</td><td class="n">${fmtEur(R.pvpNeto)}</td><td class="n">100 %</td><td class="n">${fmtEur(R.pvpIva)}</td><td class="n">${fmtMxn(R.pvpIva * tc())}</td><td colspan="3"></td></tr>
      </table></div></div>
      <div class="grid g2">
        <div class="card"><div class="card-h">Saldo de tesorería acumulado <span class="hint">Sin IVA · financiación máxima ${fmtEur(-R.minAcum)}</span></div><div class="card-b chart">${svg}</div></div>
        <div class="card"><div class="card-h">Tesorería mensual (sin IVA)</div><div class="card-b flush scroll"><table>
          <tr><th>Mes</th><th class="n">Pagos</th><th class="n">Cobros</th><th class="n">Saldo mes</th><th class="n">Acumulado</th></tr>${tes}
        </table></div></div>
      </div>`;
  }

  /* ── Escenarios ──────────────────────────────────────────────── */
  function msg(t, tipo) {
    const el = $("#esc-msg");
    if (el) el.innerHTML = `<div class="aviso ${tipo || "info"}">${esc(t)}</div>`;
  }
  function renderEscenarios() {
    $("#p-escenarios").innerHTML = `
      <h2>Escenarios</h2>
      <p class="lead">Los cambios se guardan solo en este navegador. Para compartirlos con el equipo, guarda el escenario en la hoja de Google (Apps Script) o descarga el modelo. Para actualizar el planning publicado, descarga «modelo-publicado.js» y sustitúyelo en el repositorio.</p>
      <div id="esc-msg"></div>
      <div class="grid g2">
        <div class="card"><div class="card-h">Guardar escenario en la hoja compartida</div><div class="card-b">
          ${prow("Nombre del escenario actual", inp("meta.nombre", { type: "text" }), "")}
          ${prow("URL del Apps Script", inp("appsScriptUrl", { type: "text", ph: "https://script.google.com/macros/s/…/exec" }), "", "Web App desplegada con apps-script/Codigo.gs")}
          ${prow("Autor", `<input type="text" id="snap-autor" placeholder="Nombre">`, "")}
          ${prow("Nota", `<input type="text" id="snap-nota" placeholder="Qué cambia respecto al anterior">`, "")}
          <div class="btns" style="margin-top:12px"><button class="btn" data-act="guardarEscenario">Guardar escenario</button><button class="btn sec" data-act="cargarHistorial">Actualizar historial</button></div>
        </div><div class="card-b flush" id="hist"><div class="card-b small muted">${M.appsScriptUrl ? "Pulsa «Actualizar historial»." : "Indica la URL del Apps Script para ver el historial."}</div></div></div>
        <div class="card"><div class="card-h">Archivo del modelo</div><div class="card-b">
          <div class="btns" style="flex-direction:column;align-items:flex-start">
            <button class="btn sec" data-act="exportJson">Descargar modelo (JSON)</button>
            <label class="btn sec" style="display:inline-block">Importar modelo (JSON)<input type="file" id="imp-json" accept="application/json" style="display:none"></label>
            <button class="btn sec" data-act="exportPublicado">Descargar como modelo publicado (modelo-publicado.js)</button>
            <button class="btn sec" data-act="imprimir">Imprimir / PDF</button>
            <button class="btn danger" data-act="reset">Descartar cambios y volver al modelo publicado</button>
          </div>
          <p class="small muted" style="margin-top:12px">Modelo publicado: «${esc(window.MODELO_PUBLICADO.meta.nombre)}» · ${esc(window.MODELO_PUBLICADO.meta.actualizado)}</p>
        </div></div>
      </div>`;
  }

  async function guardarEscenario() {
    if (!M.appsScriptUrl) { msg("Indica primero la URL del Apps Script.", "error"); return; }
    const payload = {
      action: "save",
      autor: ($("#snap-autor").value || "Sin identificar").trim(),
      etiqueta: M.meta.nombre,
      nota: ($("#snap-nota").value || "").trim(),
      resumen: { pvpNeto: Math.round(R.pvpNeto), pvpIva: Math.round(R.pvpIva), techo: R.techo, margen: Math.round(R.margen), dias: Math.round(R.diasTotales), tipoCambio: tc() },
      modelo: JSON.stringify(M)
    };
    msg("Guardando…");
    try {
      const res = await fetch(M.appsScriptUrl, { method: "POST", body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.ok) { msg(`Escenario guardado · ${data.fecha || ""}`, "ok"); cargarHistorial(); }
      else msg("Error: " + (data.error || "respuesta inesperada"), "error");
    } catch (err) { msg("Error de conexión: " + err.message, "error"); }
  }
  async function cargarHistorial() {
    if (!M.appsScriptUrl) return;
    try {
      const res = await fetch(M.appsScriptUrl + "?action=list");
      const data = await res.json();
      const lista = data.escenarios || [];
      $("#hist").innerHTML = lista.length ? `<table><tr><th>Escenario</th><th class="n">IVA incl.</th><th></th></tr>${lista.slice(0, 30).map((s) => `<tr><td><b>${esc(s.etiqueta)}</b><div class="small muted">${esc(s.fecha)} · ${esc(s.autor)}${s.nota ? " · " + esc(s.nota) : ""}</div></td><td class="n" style="color:${num(s.pvpIva) <= num(s.techo) ? "var(--ok)" : "var(--err)"}">${fmtEur(num(s.pvpIva))}</td><td><button class="btn sec" data-act="cargarEscenario" data-id="${esc(s.id)}">Cargar</button></td></tr>`).join("")}</table>` : `<div class="card-b small muted">No hay escenarios guardados.</div>`;
    } catch (err) { msg("No se pudo cargar el historial: " + err.message, "error"); }
  }
  async function cargarEscenario(id) {
    try {
      const res = await fetch(`${M.appsScriptUrl}?action=get&id=${encodeURIComponent(id)}`);
      const data = await res.json();
      if (!data.modelo) throw new Error(data.error || "escenario vacío");
      const url = M.appsScriptUrl;
      M = JSON.parse(data.modelo); M.appsScriptUrl = M.appsScriptUrl || url;
      persistir(); renderTodo(); msg("Escenario cargado.", "ok");
    } catch (err) { msg("No se pudo cargar: " + err.message, "error"); }
  }

  /* ── Arranque ────────────────────────────────────────────────── */
  M.ajustes = M.ajustes || {};
  renderTodo();
  try {
    const t = sessionStorage.getItem("cts-tab");
    if (t) { const b = document.querySelector(`.tab[data-tab="${t}"]`); if (b) b.click(); }
  } catch (err) { /* nada */ }
})();
