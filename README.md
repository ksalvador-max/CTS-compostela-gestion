# CTS Compostela · Herramientas de gestión del proyecto

Planning y herramienta presupuestaria del contrato «Diseño e Implementación del Modelo de Gestión del CTS Compostela» (FONATUR), conforme al anexo técnico definitivo del 23-10-2026.

| Página | Uso | Contenido |
|---|---|---|
| `index.html` | Cliente | Cronograma, entregables, dedicación campo/gabinete (numeral 7) y presencialidad. Sin datos económicos. |
| `presupuesto.html` | Interno | Costes, precio en EUR y MXN, facturación mensual de lo devengado, tesorería y escenarios. |

Ambas páginas leen el mismo modelo (`assets/modelo-publicado.js`) y el mismo motor de cálculo (`assets/modelo.js`).

## Flujo de trabajo
1. Los cambios en `presupuesto.html` se guardan en el navegador de quien los hace.
2. Para compartir un escenario: pestaña **Escenarios → Guardar escenario** (hoja de Google vía Apps Script) o **Descargar modelo (JSON)**.
3. Para publicar una versión en el planning: **Descargar como modelo publicado** y sustituir `assets/modelo-publicado.js` en el repositorio.

## Apps Script
`apps-script/Codigo.gs`: crear una hoja de Google, pegar el código en Extensiones → Apps Script e implementar como aplicación web (acceso: cualquier usuario). Pegar la URL `/exec` en la pestaña Escenarios.

## Reglas de cálculo
- Línea temporal M1–M14, sin años naturales. Importes en EUR, con salida en MXN según el tipo de cambio parametrizado.
- Días de campo = días de desplazamiento (calculados); días de gabinete = editables, repartidos por meses según los pesos del servicio, con corrección manual.
- Precio neto = (costes directos + estructura + contingencia) / (1 − margen − coste de fianza).
- Devengado mensual proporcional al coste directo del mes. Cobro en M + desfase (emisión + conformidad + 17 días hábiles de pago).
