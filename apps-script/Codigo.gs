/**
 * CTS Compostela · Registro de escenarios presupuestarios
 * Despliegue: Extensiones → Apps Script en una hoja de Google nueva → pegar este código →
 * Implementar → Nueva implementación → Aplicación web (Ejecutar como: yo; Acceso: cualquier usuario).
 * Copiar la URL /exec en la pestaña Escenarios de la herramienta presupuestaria.
 */
const HOJA = 'Escenarios';
const CABECERA = ['id', 'fecha', 'autor', 'etiqueta', 'nota', 'pvpNeto', 'pvpIva', 'techo', 'margen', 'dias', 'tipoCambio', 'modelo'];

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(HOJA);
  if (!sh) { sh = ss.insertSheet(HOJA); sh.appendRow(CABECERA); sh.setFrozenRows(1); }
  return sh;
}
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.action !== 'save') return json_({ ok: false, error: 'acción no reconocida' });
    const r = d.resumen || {};
    const id = Utilities.getUuid().slice(0, 8);
    const fecha = Utilities.formatDate(new Date(), 'Europe/Madrid', 'yyyy-MM-dd HH:mm');
    hoja_().appendRow([id, fecha, d.autor || '', d.etiqueta || '', d.nota || '', r.pvpNeto || 0, r.pvpIva || 0, r.techo || 0, r.margen || 0, r.dias || 0, r.tipoCambio || 0, d.modelo || '']);
    return json_({ ok: true, id: id, fecha: fecha });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const accion = (e.parameter.action || 'list');
  const valores = hoja_().getDataRange().getValues();
  const cab = valores.shift();
  const filas = valores.map(function (v) { const o = {}; cab.forEach(function (k, i) { o[k] = v[i]; }); return o; });
  if (accion === 'get') {
    const f = filas.filter(function (x) { return String(x.id) === String(e.parameter.id); })[0];
    return json_(f ? { modelo: f.modelo } : { error: 'escenario no encontrado' });
  }
  const lista = filas.reverse().map(function (x) { delete x.modelo; return x; });
  return json_({ escenarios: lista });
}
