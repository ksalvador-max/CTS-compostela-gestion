/* CTS Compostela · Modelo publicado
   Escenario oficial publicado por el responsable del proyecto. Para actualizarlo: Presupuesto → Escenarios → «Descargar como modelo publicado». */
window.MODELO_PUBLICADO = {
  "version": 7,
  "meta": {
    "nombre": "Esc. Base con perfiles",
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
      "cbe": 66000
    },
    "ASE": {
      "nombre": "Asesor estratégico",
      "tarifa": 400,
      "cbe": 66000
    },
    "SEN": {
      "nombre": "Consultor senior",
      "tarifa": 350,
      "cbe": 66000
    },
    "ESP": {
      "nombre": "Consultor especialista",
      "tarifa": 120,
      "cbe": 50000
    },
    "JUN": {
      "nombre": "Consultor junior",
      "tarifa": 120,
      "cbe": 50000
    }
  },
  "bases": {
    "ES": "España",
    "MOR": "México · Morelia",
    "LOC": "Nayarit · local"
  },
  "equipo": [
    {
      "id": "DIR",
      "corto": "DP",
      "nombre": "Kevin",
      "rol": "DIR",
      "base": "ES"
    },
    {
      "id": "ASE",
      "corto": "AE",
      "nombre": "Tono",
      "rol": "ASE",
      "base": "ES"
    },
    {
      "id": "SEN1",
      "corto": "CS1",
      "nombre": "Claudia",
      "rol": "SEN",
      "base": "MOR"
    },
    {
      "id": "SEN2",
      "corto": "CS2",
      "nombre": "Mavi",
      "rol": "SEN",
      "base": "ES"
    },
    {
      "id": "SEN3",
      "corto": "CS3",
      "nombre": "Dani / Ángela",
      "rol": "SEN",
      "base": "ES"
    },
    {
      "id": "ESP",
      "corto": "CE",
      "nombre": "Junior",
      "rol": "ESP",
      "base": "MOR",
      "bolsa": true
    },
    {
      "id": "JUN",
      "corto": "CJ",
      "nombre": "Consultor junior",
      "rol": "JUN",
      "base": "MOR"
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
    "DIR": {
      "PT": 23,
      "S1": 6,
      "S2": 3,
      "S3": 2,
      "S4": 12,
      "S5": 9
    },
    "ASE": {
      "PT": 4,
      "S1": 16,
      "S2": 2,
      "S3": 2,
      "S4": 3,
      "S5": 8
    },
    "SEN1": {
      "PT": 6,
      "S1": 0,
      "S2": 0,
      "S3": 23,
      "S4": 1,
      "S5": 2
    },
    "SEN2": {
      "PT": 5,
      "S1": 0,
      "S2": 37,
      "S3": 0,
      "S4": 0,
      "S5": 2
    },
    "SEN3": {
      "PT": 4,
      "S1": 2,
      "S2": 0,
      "S3": 0,
      "S4": 13,
      "S5": 2
    },
    "ESP": {
      "PT": 33,
      "S1": 28,
      "S2": 65,
      "S3": 54,
      "S4": 26,
      "S5": 39
    },
    "JUN": {
      "PT": 0,
      "S1": 0,
      "S2": 0,
      "S3": 0,
      "S4": 0,
      "S5": 0
    }
  },
  "ajustes": {},
  "appsScriptUrl": "",
  "misiones": [
    {
      "id": "MI-1",
      "mes": 1,
      "nombre": "Arranque del proyecto",
      "objeto": "Reunión de inicio y sesión de gobernanza con FONATUR; reconocimiento del territorio, trabajo de campo de S2 y primeras entrevistas con actores para el modelo de relación de S1.",
      "tareasCdmx": [
        "PT-1.1",
        "S1-1.3"
      ],
      "tareasComp": [
        "PT-1.4",
        "S2-1.1",
        "S2-3.1",
        "S1-1.5"
      ],
      "servicios": [
        "PT",
        "S1",
        "S2"
      ],
      "participantes": {
        "DIR": {
          "cdmx": 2,
          "comp": 6,
          "reparto": {
            "PT": 4,
            "S1": 4
          }
        },
        "ASE": {
          "cdmx": 2,
          "comp": 5,
          "reparto": {
            "PT": 4,
            "S1": 3
          }
        },
        "SEN2": {
          "cdmx": 2,
          "comp": 6,
          "reparto": {
            "PT": 3,
            "S1": 1,
            "S2": 4
          }
        },
        "SEN1": {
          "cdmx": 2,
          "comp": 6,
          "reparto": {
            "PT": 4,
            "S2": 2,
            "S1": 2
          }
        },
        "ESP": {
          "cdmx": 0,
          "comp": 6,
          "reparto": {
            "S2": 4,
            "S1": 2
          }
        }
      }
    },
    {
      "id": "MI-2",
      "mes": 3,
      "nombre": "Validación en territorio y presentación de los primeros entregables",
      "objeto": "Talleres de validación del modelo de relación (S1) e identificación de prestadores (S2) en el territorio; presentación en FONATUR del Plan Director, el marco de posicionamiento y la propuesta de marca. Final del M2 y comienzo del M3.",
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
        "DIR": {
          "cdmx": 2,
          "comp": 4,
          "reparto": {
            "S1": 5,
            "S2": 1
          }
        },
        "ASE": {
          "cdmx": 2,
          "comp": 4,
          "reparto": {
            "S1": 5,
            "S2": 1
          }
        },
        "SEN2": {
          "cdmx": 2,
          "comp": 4,
          "reparto": {
            "S2": 6
          }
        },
        "SEN1": {
          "cdmx": 2,
          "comp": 4,
          "reparto": {
            "S1": 3,
            "S2": 3
          }
        },
        "ESP": {
          "cdmx": 0,
          "comp": 4,
          "reparto": {
            "S1": 2,
            "S2": 2
          }
        }
      }
    },
    {
      "id": "MX-1",
      "mes": 4,
      "nombre": "Trabajo de campo del equipo de México",
      "objeto": "Identificación y diagnóstico de prestadores, valoración de experiencias en funcionamiento y preparación de los talleres de co-diseño.",
      "tareasCdmx": [],
      "tareasComp": [
        "S2-3.2",
        "S2-3.3",
        "S2-3.5"
      ],
      "servicios": [
        "S2"
      ],
      "participantes": {
        "SEN1": {
          "cdmx": 0,
          "comp": 4,
          "reparto": {
            "S2": 4
          }
        },
        "ESP": {
          "cdmx": 0,
          "comp": 5,
          "reparto": {
            "S2": 5
          }
        }
      }
    },
    {
      "id": "MI-3",
      "mes": 5,
      "nombre": "Co-diseño de experiencias y proyectos críticos",
      "objeto": "Talleres de co-diseño de experiencias con prestadores y comunidades (S2) e identificación de proyectos críticos (S3) en el territorio; sesión de priorización de experiencias con FONATUR.",
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
        "DIR": {
          "cdmx": 1,
          "comp": 5,
          "reparto": {
            "S2": 1,
            "S3": 5
          }
        },
        "SEN2": {
          "cdmx": 1,
          "comp": 5,
          "reparto": {
            "S2": 6
          }
        },
        "SEN1": {
          "cdmx": 1,
          "comp": 5,
          "reparto": {
            "S2": 4,
            "S3": 2
          }
        },
        "ESP": {
          "cdmx": 0,
          "comp": 5,
          "reparto": {
            "S2": 3,
            "S3": 2
          }
        }
      }
    },
    {
      "id": "MI-4",
      "mes": 9,
      "nombre": "Contraste y presentación de la cartera de proyectos",
      "objeto": "Contraste de la cartera con actores clave en el territorio y presentación en FONATUR del portafolio de proyectos y la hoja de ruta; sesiones de trabajo sobre el sistema de inteligencia (S4). Final del M8 y comienzo del M9.",
      "tareasCdmx": [
        "S3-3.2",
        "S4-2.4",
        "S3-2.4"
      ],
      "tareasComp": [
        "S3-2.4"
      ],
      "servicios": [
        "S3",
        "S4"
      ],
      "participantes": {
        "DIR": {
          "cdmx": 2,
          "comp": 3,
          "reparto": {
            "S3": 4,
            "S4": 1
          }
        },
        "ASE": {
          "cdmx": 2,
          "comp": 0,
          "reparto": {
            "S3": 2
          }
        },
        "SEN3": {
          "cdmx": 2,
          "comp": 0,
          "reparto": {
            "S4": 2
          }
        },
        "SEN1": {
          "cdmx": 2,
          "comp": 3,
          "reparto": {
            "S3": 5
          }
        },
        "ESP": {
          "cdmx": 0,
          "comp": 3,
          "reparto": {
            "S3": 3
          }
        }
      }
    },
    {
      "id": "MI-5",
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
        "DIR": {
          "cdmx": 2,
          "comp": 2,
          "reparto": {
            "S4": 4
          }
        },
        "SEN3": {
          "cdmx": 2,
          "comp": 2,
          "reparto": {
            "S4": 4
          }
        },
        "SEN1": {
          "cdmx": 0,
          "comp": 2,
          "reparto": {
            "S4": 2
          }
        }
      }
    },
    {
      "id": "MI-6",
      "mes": 15,
      "nombre": "Cierre y transferencia de capacidades",
      "objeto": "Talleres de transferencia de capacidades al equipo técnico de FONATUR y presentación de conclusiones del proyecto. Final del M14 y comienzo del M15.",
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
        "DIR": {
          "cdmx": 3,
          "comp": 0,
          "reparto": {
            "S5": 2,
            "PT": 1
          }
        },
        "ASE": {
          "cdmx": 3,
          "comp": 0,
          "reparto": {
            "S5": 2,
            "PT": 1
          }
        },
        "SEN1": {
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
