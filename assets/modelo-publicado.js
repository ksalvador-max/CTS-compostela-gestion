/* CTS Compostela · Modelo publicado
   Escenario oficial publicado por el responsable del proyecto. Para actualizarlo: Presupuesto → Escenarios → «Descargar como modelo publicado». */
window.MODELO_PUBLICADO = {
  "version": 8,
  "meta": {
    "nombre": "Equipo dual España–México · propuesta",
    "actualizado": "2026-11-05",
    "fuenteAnexo": "Anexo técnico del 04-11-2026"
  },
  "params": {
    "meses": 15,
    "fechaFallo": "",
    "tipoCambio": 20.47,
    "iva": 16,
    "estructura": 10,
    "contingencia": 1,
    "margen": 25,
    "techo": 348000,
    "fianzaPct": 10,
    "fianzaPrima": 1.5,
    "fianzaMesesExtra": 6,
    "emisionDH": 3,
    "aceptacionDH": 5,
    "pagoDH": 17,
    "viaje": {
      "vuelo": 1200,
      "hotel": 120,
      "dieta": 60,
      "cdmxComp": 200,
      "morCdmx": 80,
      "morComp": 220
    },
    "diasProductivos": 220,
    "tesoreriaPersonal": true,
    "facturacion": "hitos"
  },
  "roles": {
    "DIR": {
      "nombre": "Director de proyecto",
      "tarifa": 350,
      "cbe": 63200
    },
    "ASE": {
      "nombre": "Asesor estratégico",
      "tarifa": 400,
      "cbe": 63200
    },
    "SEN": {
      "nombre": "Consultor senior",
      "tarifa": 350,
      "cbe": 63200
    },
    "ESP": {
      "nombre": "Consultor especialista",
      "tarifa": 250,
      "cbe": 36600
    },
    "COO": {
      "nombre": "Coordinación operativa adjunta",
      "tarifa": 120,
      "cbe": 36600
    },
    "LOC": {
      "nombre": "Consultor del equipo local",
      "tarifa": 120,
      "cbe": 33500
    },
    "JUN": {
      "nombre": "Consultor junior",
      "tarifa": 120,
      "cbe": 24200
    }
  },
  "bases": {
    "ES": "España",
    "MOR": "México · Morelia",
    "CDX": "México · CDMX",
    "LOC": "Nayarit · local"
  },
  "equipo": [
    {
      "id": "DPE",
      "corto": "DP-E",
      "nombre": "Kevin",
      "rol": "DIR",
      "base": "ES",
      "funcion": "Dirección de proyecto · España"
    },
    {
      "id": "DPM",
      "corto": "DP-M",
      "nombre": "Claudia",
      "rol": "DIR",
      "base": "MOR",
      "funcion": "Dirección de proyecto · México"
    },
    {
      "id": "COE",
      "corto": "CO-E",
      "nombre": "Ángela",
      "rol": "COO",
      "base": "ES",
      "funcion": "Coordinación operativa adjunta · España"
    },
    {
      "id": "COM",
      "corto": "CO-M",
      "nombre": "Ana Contadora",
      "rol": "COO",
      "base": "CDX",
      "cbe": 23500,
      "funcion": "Coordinación operativa adjunta · México"
    },
    {
      "id": "AAR",
      "corto": "AJ",
      "nombre": "Aarón Jiménez",
      "rol": "LOC",
      "base": "LOC",
      "funcion": "Equipo local · S1, S3, S4, S5"
    },
    {
      "id": "LUP",
      "corto": "LU",
      "nombre": "Lupita",
      "rol": "LOC",
      "base": "CDX",
      "funcion": "Equipo local · S2, S3, S4"
    },
    {
      "id": "MAV",
      "corto": "MV",
      "nombre": "Mavi",
      "rol": "SEN",
      "base": "ES",
      "funcion": "Supervisión operativa S2 · producto y posicionamiento"
    },
    {
      "id": "DAN",
      "corto": "DS",
      "nombre": "Daniel Da Silva",
      "rol": "ESP",
      "base": "ES",
      "funcion": "Supervisión operativa S4 · inteligencia turística"
    },
    {
      "id": "TON",
      "corto": "TF",
      "nombre": "Tono Franco",
      "rol": "ASE",
      "base": "ES",
      "funcion": "Supervisión estratégica PT, S1, S3, S5"
    },
    {
      "id": "JUN",
      "corto": "CJ",
      "nombre": "Consultor junior",
      "rol": "JUN",
      "base": "MOR",
      "bolsa": true,
      "funcion": "Apoyo puntual de gabinete"
    }
  ],
  "servicios": [
    {
      "id": "PT",
      "corto": "Plan de trabajo y gestión",
      "nombre": "Plan de trabajo y gestión del proyecto",
      "color": "#3D3D3A",
      "pesos": [
        32.3,
        7.8,
        2.5,
        2.5,
        2.5,
        2.5,
        2.5,
        2.5,
        2.5,
        2.5,
        2.5,
        2.5,
        10.1,
        12.4,
        12.4
      ]
    },
    {
      "id": "S1",
      "corto": "Estrategia turística",
      "nombre": "Estrategia Turística del CTS",
      "color": "#534AB7",
      "pesos": [
        14.5,
        32.3,
        20.1,
        10.4,
        3.8,
        0,
        0,
        0,
        0,
        2.8,
        2.8,
        3.8,
        5.7,
        1.9,
        1.9
      ]
    },
    {
      "id": "S2",
      "corto": "Portafolio y posicionamiento",
      "nombre": "Portafolio de Producto y Posicionamiento Turístico del CTS Compostela",
      "color": "#0F6E56",
      "pesos": [
        8.9,
        19.2,
        10.9,
        12.9,
        20.9,
        22.1,
        5.1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    {
      "id": "S3",
      "corto": "Proyectos estratégicos",
      "nombre": "Plan de Desarrollo de Proyectos Turísticos Estratégicos del CTS Compostela",
      "color": "#854F0B",
      "pesos": [
        0,
        0,
        0,
        6.2,
        7.4,
        11.1,
        24.1,
        32.2,
        8,
        0,
        4.9,
        4.9,
        1.2,
        0,
        0
      ]
    },
    {
      "id": "S4",
      "corto": "Inteligencia y gestión",
      "nombre": "Sistema de Inteligencia y Gestión Turística del CTS Compostela",
      "color": "#185FA5",
      "pesos": [
        0,
        0,
        0,
        1.1,
        1.1,
        5.6,
        11,
        15.5,
        20.4,
        17.3,
        17.3,
        7.4,
        1.1,
        1.1,
        1.1
      ]
    },
    {
      "id": "S5",
      "corto": "Modelo integral",
      "nombre": "Diseño de un modelo integral de transformación de destinos turísticos",
      "color": "#7B1D3A",
      "pesos": [
        1.2,
        1.2,
        1.2,
        1.2,
        4.1,
        7.1,
        4.2,
        6.3,
        7.8,
        7.8,
        12.9,
        12.9,
        13.5,
        9.3,
        9.3
      ]
    }
  ],
  "entregables": [
    {
      "cod": "PT1",
      "svc": "PT",
      "mes": 1,
      "nombre": "Plan de trabajo del proyecto",
      "num": 1,
      "pct": 20
    },
    {
      "cod": "S2-E01",
      "svc": "S2",
      "mes": 3,
      "nombre": "Marco de posicionamiento estratégico del CTS Compostela",
      "num": 2,
      "pct": 15
    },
    {
      "cod": "S2-E03",
      "svc": "S2",
      "mes": 3,
      "nombre": "Propuesta de marca del programa CTS",
      "num": 3,
      "pct": 0
    },
    {
      "cod": "S1-E01",
      "svc": "S1",
      "mes": 3,
      "nombre": "Plan Director de Estrategia Turística del CTS Compostela",
      "num": 4,
      "pct": 0
    },
    {
      "cod": "S2-E04",
      "svc": "S2",
      "mes": 4,
      "nombre": "Manual de identidad turística del programa CTS",
      "num": 5,
      "pct": 5
    },
    {
      "cod": "S1-E02",
      "svc": "S1",
      "mes": 5,
      "nombre": "Hoja de ruta para el sistema CTS de FONATUR",
      "num": 6,
      "pct": 5
    },
    {
      "cod": "S2-E02",
      "svc": "S2",
      "mes": 7,
      "nombre": "Portafolio ejecutivo de productos turísticos",
      "num": 7,
      "pct": 10
    },
    {
      "cod": "S5-E01",
      "svc": "S5",
      "mes": 8,
      "nombre": "Marco conceptual y estructura del Modelo Integral",
      "num": 8,
      "pct": 5
    },
    {
      "cod": "S3-E01",
      "svc": "S3",
      "mes": 9,
      "nombre": "Portafolio de proyectos turísticos estratégicos del CTS Compostela",
      "num": 9,
      "pct": 10
    },
    {
      "cod": "S3-E02",
      "svc": "S3",
      "mes": 9,
      "nombre": "Documento de priorización y hoja de ruta de desarrollo (corto, mediano y largo plazo)",
      "num": 10,
      "pct": 0
    },
    {
      "cod": "S4-E01",
      "svc": "S4",
      "mes": 10,
      "nombre": "Documento maestro del Sistema de Inteligencia Turística del CTS Compostela",
      "num": 11,
      "pct": 5
    },
    {
      "cod": "S4-E02",
      "svc": "S4",
      "mes": 12,
      "nombre": "Documento de la estructura de gestión turística y secuencia de creación del ente gestor",
      "num": 12,
      "pct": 10
    },
    {
      "cod": "S5-E03",
      "svc": "S5",
      "mes": 12,
      "nombre": "Metodología y caja de herramientas del Modelo",
      "num": 13,
      "pct": 0
    },
    {
      "cod": "S3-E03",
      "svc": "S3",
      "mes": 13,
      "nombre": "Deck de presentación institucional para FONATUR",
      "num": 14,
      "pct": 5
    },
    {
      "cod": "S5-E04",
      "svc": "S5",
      "mes": 15,
      "nombre": "Modelo Integral final, con validación en el CTS Compostela, guía de adaptación a destinos nuevos o existentes e informe de transferencia de capacidades",
      "num": 15,
      "pct": 5
    },
    {
      "cod": "S1-E03",
      "svc": "S1",
      "mes": 15,
      "nombre": "Sistema de seguimiento y actualización de la estrategia",
      "num": 16,
      "pct": 0
    },
    {
      "cod": "S5-E02",
      "svc": "S5",
      "mes": 6,
      "mesFin": 15,
      "nombre": "Instrumentos, análisis o desarrollos complementarios, conforme a cada solicitud",
      "num": 17,
      "pct": 0
    },
    {
      "cod": "S5-E05",
      "svc": "S5",
      "mes": 15,
      "nombre": "Entregable final con todo el respaldo informativo y descriptivo de actividades, talleres, insumos y bibliografía generada",
      "num": 18,
      "pct": 5
    }
  ],
  "entregablesEjecutivos": {
    "mes": 15,
    "texto": "Síntesis ejecutiva del resultado final (≥ 50 páginas) y presentación de conclusiones (≥ 30 diapositivas), en los últimos 10 días hábiles del mes 15"
  },
  "subcontratas": [
    {
      "id": "FB",
      "nombre": "FutureBrand",
      "svc": "S2",
      "concepto": "Marca del programa CTS y manual de identidad",
      "importe": 15000,
      "pagos": {
        "3": null,
        "4": null,
        "6": 100
      }
    }
  ],
  "gabinete": {
    "DPE": {
      "PT": 8,
      "S1": 8,
      "S2": 5,
      "S3": 6,
      "S4": 5,
      "S5": 8
    },
    "DPM": {
      "PT": 8,
      "S1": 8,
      "S2": 8,
      "S3": 10,
      "S4": 6,
      "S5": 6
    },
    "COE": {
      "PT": 20,
      "S1": 2,
      "S2": 2,
      "S3": 2,
      "S4": 2,
      "S5": 2
    },
    "COM": {
      "PT": 20,
      "S1": 2,
      "S2": 2,
      "S3": 2,
      "S4": 2,
      "S5": 2
    },
    "AAR": {
      "PT": 0,
      "S1": 15,
      "S2": 0,
      "S3": 15,
      "S4": 8,
      "S5": 8
    },
    "LUP": {
      "PT": 0,
      "S1": 0,
      "S2": 25,
      "S3": 12,
      "S4": 8,
      "S5": 0
    },
    "MAV": {
      "PT": 0,
      "S1": 0,
      "S2": 18,
      "S3": 0,
      "S4": 0,
      "S5": 0
    },
    "DAN": {
      "PT": 0,
      "S1": 0,
      "S2": 0,
      "S3": 0,
      "S4": 16,
      "S5": 0
    },
    "TON": {
      "PT": 2,
      "S1": 4,
      "S2": 0,
      "S3": 2,
      "S4": 0,
      "S5": 3
    },
    "JUN": {
      "PT": 0,
      "S1": 0,
      "S2": 4,
      "S3": 4,
      "S4": 0,
      "S5": 4
    }
  },
  "ajustes": {
    "DPE|PT|1": 1.5,
    "DPE|S1|1": 0.5,
    "DPE|S2|1": 0,
    "DPE|S5|1": 0,
    "DPM|PT|1": 1.5,
    "DPM|S1|1": 0.5,
    "DPM|S2|1": 0.5,
    "DPM|S5|1": 0,
    "COE|PT|1": 3.5,
    "COE|S1|1": 0,
    "COE|S2|1": 0,
    "COE|S5|1": 0,
    "COM|PT|1": 3.5,
    "COM|S1|1": 0,
    "COM|S2|1": 0,
    "COM|S5|1": 0,
    "AAR|S1|1": 1,
    "AAR|S5|1": 0,
    "LUP|S2|1": 1,
    "MAV|S2|1": 1,
    "TON|PT|1": 0.5,
    "TON|S1|1": 0.5,
    "TON|S5|1": 0,
    "JUN|S2|1": 0,
    "JUN|S5|1": 1.5,
    "DPE|PT|2": 0.5,
    "DPE|S1|2": 1.5,
    "DPE|S2|2": 0.5,
    "DPE|S5|2": 0,
    "DPM|PT|2": 0.5,
    "DPM|S1|2": 1.5,
    "DPM|S2|2": 1,
    "DPM|S5|2": 0,
    "COE|PT|2": 1,
    "COE|S1|2": 0.5,
    "COE|S2|2": 0.5,
    "COE|S5|2": 0,
    "COM|PT|2": 1,
    "COM|S1|2": 0.5,
    "COM|S2|2": 0.5,
    "COM|S5|2": 0,
    "AAR|S1|2": 3,
    "AAR|S5|2": 0,
    "LUP|S2|2": 3,
    "MAV|S2|2": 2,
    "TON|PT|2": 0,
    "TON|S1|2": 1,
    "TON|S5|2": 0,
    "JUN|S2|2": 0.5,
    "JUN|S5|2": 1
  },
  "appsScriptUrl": "",
  "misiones": [
    {
      "id": "MI-1",
      "mes": 1,
      "nombre": "Arranque del proyecto",
      "objeto": "Reunión de inicio con FONATUR y sesión de gobernanza; reconocimiento del territorio con el equipo local y primeros contactos con actores.",
      "tareasCdmx": [
        "PT-1.1",
        "S1-1.3"
      ],
      "tareasComp": [
        "PT-1.4",
        "S1-1.5"
      ],
      "servicios": [
        "PT",
        "S1"
      ],
      "participantes": {
        "DPE": {
          "cdmx": 2,
          "comp": 3,
          "reparto": {
            "PT": 3,
            "S1": 2
          }
        },
        "DPM": {
          "cdmx": 2,
          "comp": 3,
          "reparto": {
            "PT": 3,
            "S1": 2
          }
        },
        "AAR": {
          "cdmx": 0,
          "comp": 3,
          "reparto": {
            "PT": 2,
            "S1": 1
          }
        }
      }
    },
    {
      "id": "MI-2",
      "mes": 2,
      "nombre": "Trabajo de campo de S1 y S2",
      "objeto": "Trabajo de campo en Boca de Chila y Chacala-Las Cuevas: recursos, experiencias y prestadores (S2) y entrevistas para el modelo de relación (S1).",
      "tareasCdmx": [],
      "tareasComp": [
        "S2-1.1",
        "S2-3.1",
        "S1-1.5"
      ],
      "servicios": [
        "S1",
        "S2"
      ],
      "participantes": {
        "DPM": {
          "cdmx": 0,
          "comp": 5,
          "reparto": {
            "S1": 2,
            "S2": 3
          }
        },
        "MAV": {
          "cdmx": 0,
          "comp": 5,
          "reparto": {
            "S2": 5
          }
        },
        "LUP": {
          "cdmx": 0,
          "comp": 5,
          "reparto": {
            "S2": 5
          }
        },
        "AAR": {
          "cdmx": 0,
          "comp": 5,
          "reparto": {
            "S1": 3,
            "S2": 2
          }
        }
      }
    },
    {
      "id": "MI-3",
      "mes": 3,
      "nombre": "Validación en territorio y presentación de los primeros entregables",
      "objeto": "Talleres de validación del modelo de relación (S1) e identificación de prestadores (S2); presentación en FONATUR del Plan Director, el marco de posicionamiento y la propuesta de marca.",
      "tareasCdmx": [
        "S1-1.7",
        "S2-1.5",
        "S2-2.2"
      ],
      "tareasComp": [
        "S1-1.5",
        "S2-3.2",
        "S2-3.3"
      ],
      "servicios": [
        "S1",
        "S2"
      ],
      "participantes": {
        "DPE": {
          "cdmx": 2,
          "comp": 3,
          "reparto": {
            "S1": 3,
            "S2": 2
          }
        },
        "DPM": {
          "cdmx": 2,
          "comp": 3,
          "reparto": {
            "S1": 3,
            "S2": 2
          }
        },
        "TON": {
          "cdmx": 2,
          "comp": 0,
          "reparto": {
            "S1": 2
          }
        },
        "MAV": {
          "cdmx": 2,
          "comp": 0,
          "reparto": {
            "S2": 2
          }
        },
        "AAR": {
          "cdmx": 0,
          "comp": 3,
          "reparto": {
            "S1": 2,
            "S2": 1
          }
        },
        "LUP": {
          "cdmx": 0,
          "comp": 3,
          "reparto": {
            "S2": 3
          }
        }
      }
    },
    {
      "id": "MI-4",
      "mes": 5,
      "nombre": "Co-diseño de experiencias y proyectos críticos",
      "objeto": "Talleres de co-diseño de experiencias con prestadores y comunidades (S2) e identificación de proyectos críticos (S3); sesión de priorización con FONATUR.",
      "tareasCdmx": [
        "S2-3.8"
      ],
      "tareasComp": [
        "S2-3.5",
        "S3-1.2"
      ],
      "servicios": [
        "S2",
        "S3"
      ],
      "participantes": {
        "DPE": {
          "cdmx": 1,
          "comp": 4,
          "reparto": {
            "S2": 2,
            "S3": 3
          }
        },
        "DPM": {
          "cdmx": 1,
          "comp": 5,
          "reparto": {
            "S2": 3,
            "S3": 3
          }
        },
        "MAV": {
          "cdmx": 1,
          "comp": 5,
          "reparto": {
            "S2": 6
          }
        },
        "LUP": {
          "cdmx": 0,
          "comp": 5,
          "reparto": {
            "S2": 4,
            "S3": 1
          }
        },
        "AAR": {
          "cdmx": 0,
          "comp": 5,
          "reparto": {
            "S3": 5
          }
        }
      }
    },
    {
      "id": "MI-5",
      "mes": 9,
      "nombre": "Contraste y presentación de la cartera de proyectos",
      "objeto": "Contraste de la cartera con actores clave en el territorio y presentación en FONATUR del portafolio de proyectos y la hoja de ruta; sesiones de trabajo sobre el sistema de inteligencia (S4).",
      "tareasCdmx": [
        "S3-3.2",
        "S4-2.4"
      ],
      "tareasComp": [
        "S3-2.4"
      ],
      "servicios": [
        "S3",
        "S4"
      ],
      "participantes": {
        "DPE": {
          "cdmx": 2,
          "comp": 3,
          "reparto": {
            "S3": 4,
            "S4": 1
          }
        },
        "DPM": {
          "cdmx": 2,
          "comp": 3,
          "reparto": {
            "S3": 4,
            "S4": 1
          }
        },
        "TON": {
          "cdmx": 2,
          "comp": 0,
          "reparto": {
            "S3": 2
          }
        },
        "DAN": {
          "cdmx": 2,
          "comp": 0,
          "reparto": {
            "S4": 2
          }
        },
        "AAR": {
          "cdmx": 0,
          "comp": 3,
          "reparto": {
            "S3": 3
          }
        },
        "LUP": {
          "cdmx": 0,
          "comp": 3,
          "reparto": {
            "S3": 2,
            "S4": 1
          }
        }
      }
    },
    {
      "id": "MI-6",
      "mes": 11,
      "nombre": "Estructura de gestión turística",
      "objeto": "Talleres de contraste de la estructura de gestión turística y la secuencia de creación del ente gestor con FONATUR y actores del territorio.",
      "tareasCdmx": [
        "S4-3.4"
      ],
      "tareasComp": [
        "S4-3.4"
      ],
      "servicios": [
        "S4"
      ],
      "participantes": {
        "DPE": {
          "cdmx": 2,
          "comp": 2,
          "reparto": {
            "S4": 4
          }
        },
        "DPM": {
          "cdmx": 2,
          "comp": 2,
          "reparto": {
            "S4": 4
          }
        },
        "AAR": {
          "cdmx": 0,
          "comp": 2,
          "reparto": {
            "S4": 2
          }
        }
      }
    },
    {
      "id": "MI-7",
      "mes": 15,
      "nombre": "Cierre y transferencia de capacidades",
      "objeto": "Talleres de transferencia de capacidades al equipo técnico de FONATUR y presentación de conclusiones del proyecto.",
      "tareasCdmx": [
        "S5-4.4",
        "PT-3.2"
      ],
      "tareasComp": [],
      "servicios": [
        "PT",
        "S5"
      ],
      "participantes": {
        "DPE": {
          "cdmx": 3,
          "comp": 0,
          "reparto": {
            "S5": 2,
            "PT": 1
          }
        },
        "DPM": {
          "cdmx": 3,
          "comp": 0,
          "reparto": {
            "S5": 2,
            "PT": 1
          }
        },
        "TON": {
          "cdmx": 3,
          "comp": 0,
          "reparto": {
            "S5": 2,
            "PT": 1
          }
        }
      }
    }
  ]
};
