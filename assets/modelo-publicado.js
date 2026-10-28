/* CTS Compostela · Modelo publicado
   Fuente única de datos para el planning (cliente) y la herramienta presupuestaria (interna).
   Para publicar una versión nueva: Presupuesto → Escenarios → «Descargar como modelo publicado»
   y sustituir este archivo en el repositorio. */
window.MODELO_PUBLICADO = {
  version: 2,
  meta: {
    nombre: "Escenario base · tarifas altas · perfiles anonimizados",
    actualizado: "2026-10-28",
    fuenteAnexo: "Anexo técnico definitivo del 23-10-2026"
  },

  params: {
    meses: 14,
    fechaFallo: "",          // vacío = línea temporal M1–M14 sin fechas
    tipoCambio: 20.47,       // MXN por EUR (referencia 05-10-2026)
    iva: 16,                 // %
    estructura: 10,          // % sobre costes directos
    contingencia: 1,         // % sobre costes directos (penas convencionales y deductivas)
    margen: 25,              // % sobre PVP neto
    techo: 348000,           // EUR, IVA incluido
    fianzaPct: 10,           // % del contrato sin IVA (numeral 12)
    fianzaPrima: 1.5,        // % anual de la póliza
    fianzaMesesExtra: 6,     // vigencia tras la aceptación total
    emisionDH: 3,            // días hábiles tras cierre de mes para emitir la factura
    aceptacionDH: 5,         // días hábiles de revisión y aceptación por el administrador
    pagoDH: 17,              // plazo máximo de pago (numeral 15)
    viaje: { vuelo: 1200, hotel: 120, dieta: 60, cdmxComp: 200, morCdmx: 80, morComp: 220 }
  },

  roles: {
    DIR: { nombre: "Director de proyecto", tarifa: 350 },
    ASE: { nombre: "Asesor estratégico", tarifa: 400 },
    SEN: { nombre: "Consultor senior", tarifa: 350 },
    ESP: { nombre: "Consultor especialista", tarifa: 120 }
  },

  bases: {
    ES:  "España",
    MOR: "México · Morelia",
    LOC: "Nayarit · local"
  },

  /* Perfiles anonimizados. «Consultor especialista» es una bolsa de días: la distribución entre personas se definirá más adelante. */
  equipo: [
    { id: "DIR",  corto: "DP",  nombre: "Director de proyecto", rol: "DIR", base: "ES" },
    { id: "ASE",  corto: "AE",  nombre: "Asesor estratégico",   rol: "ASE", base: "ES" },
    { id: "SEN1", corto: "CS1", nombre: "Consultor senior 1",   rol: "SEN", base: "MOR" },
    { id: "SEN2", corto: "CS2", nombre: "Consultor senior 2",   rol: "SEN", base: "ES" },
    { id: "SEN3", corto: "CS3", nombre: "Consultor senior 3",   rol: "SEN", base: "ES" },
    { id: "ESP",  corto: "CE",  nombre: "Consultor especialista", rol: "ESP", base: "MOR", bolsa: true }
  ],

  servicios: [
    { id: "PT", corto: "Plan de trabajo", nombre: "Plan de trabajo", color: "#3D3D3A",
      pesos: [1,0,0,0,0,0,0,0,0,0,0,0,0,0] },
    { id: "S1", corto: "Estrategia turística", nombre: "Estrategia Turística del CTS", color: "#534AB7",
      pesos: [3,4,3,2,1,0.5,0.5,0.5,0.5,0.5,0.5,1,2,1.5] },
    { id: "S2", corto: "Portafolio y posicionamiento", nombre: "Portafolio de Producto y Posicionamiento Turístico del CTS Compostela", color: "#0F6E56",
      pesos: [2,4,4,3,3,4,2,0.5,0.5,0.5,1,1,0,0] },
    { id: "S3", corto: "Proyectos estratégicos", nombre: "Plan de Desarrollo de Proyectos Turísticos Estratégicos del CTS Compostela", color: "#854F0B",
      pesos: [0,0,0,1,2,3,4,4,2,1,1,1,1.5,0] },
    { id: "S4", corto: "Inteligencia y gestión", nombre: "Sistema de Inteligencia y Gestión Turística del CTS Compostela", color: "#185FA5",
      pesos: [0,0,0,0,0,1,2,3,4,2,3,3,0,0] },
    { id: "S5", corto: "Modelo integral", nombre: "Diseño de un modelo integral de transformación de destinos turísticos", color: "#7B1D3A",
      pesos: [0,0,0,0,1,1.5,2,2,1.5,1.5,2,2,3,3] }
  ],

  /* Fecha de entrega: dentro de los primeros 10 días hábiles del mes indicado (numeral 5).
     mesFin solo para entregables bajo demanda. */
  entregables: [
    { cod: "PT1",    svc: "PT", mes: 1,  nombre: "Plan de trabajo del proyecto" },
    { cod: "S1-E01", svc: "S1", mes: 3,  nombre: "Plan Director de Estrategia Turística del CTS Compostela" },
    { cod: "S1-E02", svc: "S1", mes: 5,  nombre: "Hoja de ruta para el sistema CTS de FONATUR" },
    { cod: "S1-E03", svc: "S1", mes: 14, nombre: "Sistema de seguimiento y actualización de la estrategia" },
    { cod: "S2-E01", svc: "S2", mes: 3,  nombre: "Marco de posicionamiento estratégico del CTS Compostela" },
    { cod: "S2-E02", svc: "S2", mes: 7,  nombre: "Portafolio ejecutivo de productos turísticos" },
    { cod: "S2-E03", svc: "S2", mes: 3,  nombre: "Propuesta de marca del programa CTS" },
    { cod: "S2-E04", svc: "S2", mes: 4,  nombre: "Manual de identidad turística del programa CTS" },
    { cod: "S3-E01", svc: "S3", mes: 9,  nombre: "Portafolio de proyectos turísticos estratégicos del CTS Compostela" },
    { cod: "S3-E02", svc: "S3", mes: 9,  nombre: "Documento de priorización y hoja de ruta de desarrollo (corto, mediano y largo plazo)" },
    { cod: "S3-E03", svc: "S3", mes: 13, nombre: "Deck de presentación institucional para FONATUR" },
    { cod: "S4-E01", svc: "S4", mes: 10, nombre: "Documento maestro del Sistema de Inteligencia Turística del CTS Compostela" },
    { cod: "S4-E02", svc: "S4", mes: 12, nombre: "Documento de la estructura de gestión turística y secuencia de creación del ente gestor" },
    { cod: "S5-E01", svc: "S5", mes: 8,  nombre: "Marco conceptual y estructura del Modelo Integral" },
    { cod: "S5-E02", svc: "S5", mes: 6, mesFin: 14, nombre: "Instrumentos, análisis o desarrollos complementarios, conforme a cada solicitud" },
    { cod: "S5-E03", svc: "S5", mes: 12, nombre: "Metodología y caja de herramientas del Modelo" },
    { cod: "S5-E04", svc: "S5", mes: 14, nombre: "Modelo Integral final, con validación en el CTS Compostela, guía de adaptación e informe de transferencia de capacidades" }
  ],

  entregablesEjecutivos: {
    mes: 14,
    texto: "Síntesis ejecutiva del resultado final (≥ 50 páginas) y presentación de conclusiones (≥ 30 diapositivas), en los últimos 10 días hábiles del mes 14"
  },

  subcontratas: [
    { id: "FB", nombre: "FutureBrand", svc: "S2", concepto: "Marca del programa CTS y manual de identidad", importe: 15000,
      pagos: { 3: 50, 4: 50 } }   // % del importe por mes
  ],

  /* Días de gabinete por persona y servicio. Los días de campo se calculan desde los desplazamientos. */
  gabinete: {
    DIR:  { PT: 3, S1: 19, S2: 10, S3: 8,  S4: 15, S5: 12 },
    ASE:  { PT: 0, S1: 11, S2: 6,  S3: 5,  S4: 3,  S5: 5 },
    SEN1: { PT: 1, S1: 4,  S2: 2,  S3: 24, S4: 4,  S5: 3 },
    SEN2: { PT: 2, S1: 4,  S2: 39, S3: 6,  S4: 3,  S5: 6 },
    SEN3: { PT: 2, S1: 4,  S2: 2,  S3: 4,  S4: 35, S5: 10 },
    ESP:  { PT: 6, S1: 46, S2: 58, S3: 59, S4: 61, S5: 89 }
  },

  /* Desplazamientos desde la base habitual (presencialidad).
     destino: COMP = territorio del CTS Compostela · CDMX = oficinas de FONATUR */
  viajes: [
    { id: "V01", mes: 1,  svc: "PT", destino: "COMP", dias: 7, personas: ["DIR","ASE","SEN1"],
      concepto: "Arranque: reunión de inicio con FONATUR y reconocimiento del territorio" },
    { id: "V02", mes: 2,  svc: "S1", destino: "COMP", dias: 5, personas: ["DIR","ASE","ESP"],
      concepto: "Talleres de gobernanza y modelo de relación con actores del territorio" },
    { id: "V03", mes: 2,  svc: "S2", destino: "COMP", dias: 6, personas: ["SEN2","SEN1","ESP"],
      concepto: "Trabajo de campo en Boca de Chila y Chacala-Las Cuevas: experiencias y prestadores" },
    { id: "V04", mes: 3,  svc: "S1", destino: "CDMX", dias: 4, personas: ["DIR","ASE","SEN2"],
      concepto: "Presentación del Plan Director, marco de posicionamiento y propuesta de marca" },
    { id: "V05", mes: 5,  svc: "S2", destino: "COMP", dias: 6, personas: ["SEN2","SEN1","ESP"],
      concepto: "Talleres de co-diseño de experiencias con prestadores y comunidades" },
    { id: "V06", mes: 6,  svc: "S3", destino: "COMP", dias: 6, personas: ["DIR","SEN1","ESP"],
      concepto: "Identificación de proyectos críticos: visitas y entrevistas con actores clave" },
    { id: "V07", mes: 7,  svc: "S2", destino: "CDMX", dias: 4, personas: ["DIR","SEN2"],
      concepto: "Entrega del portafolio ejecutivo de productos turísticos" },
    { id: "V08", mes: 8,  svc: "S5", destino: "CDMX", dias: 4, personas: ["DIR","ASE"],
      concepto: "Presentación del marco conceptual del Modelo Integral" },
    { id: "V09", mes: 8,  svc: "S4", destino: "CDMX", dias: 5, personas: ["SEN3","ESP"],
      concepto: "Sistema de inteligencia: fuentes, indicadores y sesiones de trabajo con FONATUR" },
    { id: "V10", mes: 9,  svc: "S3", destino: "COMP", dias: 5, personas: ["DIR","SEN1","ESP"],
      concepto: "Contraste de la cartera de proyectos con actores clave y hoja de ruta" },
    { id: "V11", mes: 11, svc: "S4", destino: "COMP", dias: 5, personas: ["DIR","ASE","SEN3"],
      concepto: "Estructura de gestión turística: talleres con FONATUR y actores del territorio" },
    { id: "V12", mes: 12, svc: "S5", destino: "CDMX", dias: 5, personas: ["DIR","SEN3","ESP"],
      concepto: "Talleres de transferencia: metodología y caja de herramientas" },
    { id: "V13", mes: 13, svc: "S3", destino: "CDMX", dias: 3, personas: ["DIR","ASE","SEN1"],
      concepto: "Presentación institucional de la cartera de proyectos" },
    { id: "V14", mes: 14, svc: "S5", destino: "CDMX", dias: 5, personas: ["DIR","ASE","SEN1","SEN2","SEN3"],
      concepto: "Cierre: Modelo Integral, transferencia de capacidades y presentación de conclusiones" }
  ],

  /* Correcciones manuales de la distribución de gabinete: "persona|servicio|mes" → días */
  ajustes: {},

  appsScriptUrl: ""
};
