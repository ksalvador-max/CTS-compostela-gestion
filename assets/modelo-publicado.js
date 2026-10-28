/* CTS Compostela · Modelo publicado
   Fuente única de datos para el planning (cliente) y la herramienta presupuestaria (interna).
   Generado desde el libro CTS_Compostela_Despliegue_Operacion.xlsx (28-10-2026).
   Para publicar una versión nueva: Presupuesto → Escenarios → «Descargar como modelo publicado»
   y sustituir este archivo en el repositorio. */
window.MODELO_PUBLICADO = {
  "version": 3,
  "meta": {
    "nombre": "Escenario base · misiones combinadas y despliegue de tareas",
    "actualizado": "2026-10-28",
    "fuenteAnexo": "Anexo técnico del 26-10-2026"
  },
  "params": {
    "meses": 14,
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
    }
  },
  "roles": {
    "DIR": {
      "nombre": "Director de proyecto",
      "tarifa": 350
    },
    "ASE": {
      "nombre": "Asesor estratégico",
      "tarifa": 400
    },
    "SEN": {
      "nombre": "Consultor senior",
      "tarifa": 350
    },
    "ESP": {
      "nombre": "Consultor especialista",
      "tarifa": 120
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
      "nombre": "Director de proyecto",
      "rol": "DIR",
      "base": "ES"
    },
    {
      "id": "ASE",
      "corto": "AE",
      "nombre": "Asesor estratégico",
      "rol": "ASE",
      "base": "ES"
    },
    {
      "id": "SEN1",
      "corto": "CS1",
      "nombre": "Consultor senior 1",
      "rol": "SEN",
      "base": "MOR"
    },
    {
      "id": "SEN2",
      "corto": "CS2",
      "nombre": "Consultor senior 2",
      "rol": "SEN",
      "base": "ES"
    },
    {
      "id": "SEN3",
      "corto": "CS3",
      "nombre": "Consultor senior 3",
      "rol": "SEN",
      "base": "ES"
    },
    {
      "id": "ESP",
      "corto": "CE",
      "nombre": "Consultor especialista",
      "rol": "ESP",
      "base": "MOR",
      "bolsa": true
    }
  ],
  "servicios": [
    {
      "id": "PT",
      "corto": "Plan de trabajo y gestión",
      "nombre": "Plan de trabajo y gestión del proyecto",
      "color": "#3D3D3A",
      "pesos": [
        27.64,
        6.64,
        2.14,
        2.14,
        2.14,
        2.14,
        2.14,
        2.14,
        2.14,
        2.14,
        2.14,
        2.14,
        8.64,
        10.64
      ]
    },
    {
      "id": "S1",
      "corto": "Estrategia turística",
      "nombre": "Estrategia Turística del CTS",
      "color": "#534AB7",
      "pesos": [
        7.67,
        17.17,
        10.67,
        5.5,
        2,
        0,
        0,
        0,
        0,
        1.5,
        1.5,
        2,
        3,
        1
      ]
    },
    {
      "id": "S2",
      "corto": "Portafolio y posicionamiento",
      "nombre": "Portafolio de Producto y Posicionamiento Turístico del CTS Compostela",
      "color": "#0F6E56",
      "pesos": [
        9.5,
        20.5,
        11.67,
        13.83,
        22.33,
        23.67,
        5.5,
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
        5,
        6,
        9,
        19.5,
        26,
        6.5,
        0,
        4,
        4,
        1,
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
        0.64,
        0.64,
        3.14,
        6.14,
        8.64,
        11.14,
        9.64,
        9.64,
        4.14,
        0.64,
        0.64
      ]
    },
    {
      "id": "S5",
      "corto": "Modelo integral",
      "nombre": "Diseño de un modelo integral de transformación de destinos turísticos",
      "color": "#7B1D3A",
      "pesos": [
        0.79,
        0.79,
        0.79,
        0.79,
        2.79,
        4.84,
        2.84,
        4.34,
        5.34,
        5.34,
        8.84,
        8.84,
        9.34,
        6.34
      ]
    }
  ],
  "entregables": [
    {
      "cod": "PT1",
      "svc": "PT",
      "mes": 1,
      "nombre": "Plan de trabajo del proyecto"
    },
    {
      "cod": "S1-E01",
      "svc": "S1",
      "mes": 3,
      "nombre": "Plan Director de Estrategia Turística del CTS Compostela"
    },
    {
      "cod": "S1-E02",
      "svc": "S1",
      "mes": 5,
      "nombre": "Hoja de ruta para el sistema CTS de FONATUR"
    },
    {
      "cod": "S1-E03",
      "svc": "S1",
      "mes": 14,
      "nombre": "Sistema de seguimiento y actualización de la estrategia"
    },
    {
      "cod": "S2-E01",
      "svc": "S2",
      "mes": 3,
      "nombre": "Marco de posicionamiento estratégico del CTS Compostela"
    },
    {
      "cod": "S2-E02",
      "svc": "S2",
      "mes": 7,
      "nombre": "Portafolio ejecutivo de productos turísticos"
    },
    {
      "cod": "S2-E03",
      "svc": "S2",
      "mes": 3,
      "nombre": "Propuesta de marca del programa CTS"
    },
    {
      "cod": "S2-E04",
      "svc": "S2",
      "mes": 4,
      "nombre": "Manual de identidad turística del programa CTS"
    },
    {
      "cod": "S3-E01",
      "svc": "S3",
      "mes": 9,
      "nombre": "Portafolio de proyectos turísticos estratégicos del CTS Compostela"
    },
    {
      "cod": "S3-E02",
      "svc": "S3",
      "mes": 9,
      "nombre": "Documento de priorización y hoja de ruta de desarrollo (corto, mediano y largo plazo)"
    },
    {
      "cod": "S3-E03",
      "svc": "S3",
      "mes": 13,
      "nombre": "Deck de presentación institucional para FONATUR"
    },
    {
      "cod": "S4-E01",
      "svc": "S4",
      "mes": 10,
      "nombre": "Documento maestro del Sistema de Inteligencia Turística del CTS Compostela"
    },
    {
      "cod": "S4-E02",
      "svc": "S4",
      "mes": 12,
      "nombre": "Documento de la estructura de gestión turística y secuencia de creación del ente gestor"
    },
    {
      "cod": "S5-E01",
      "svc": "S5",
      "mes": 8,
      "nombre": "Marco conceptual y estructura del Modelo Integral"
    },
    {
      "cod": "S5-E02",
      "svc": "S5",
      "mes": 6,
      "mesFin": 14,
      "nombre": "Instrumentos, análisis o desarrollos complementarios, conforme a cada solicitud"
    },
    {
      "cod": "S5-E03",
      "svc": "S5",
      "mes": 12,
      "nombre": "Metodología y caja de herramientas del Modelo"
    },
    {
      "cod": "S5-E04",
      "svc": "S5",
      "mes": 14,
      "nombre": "Modelo Integral final, con validación en el CTS Compostela, guía de adaptación a destinos nuevos o existentes e informe de transferencia de capacidades"
    },
    {
      "cod": "S5-E05",
      "svc": "S5",
      "mes": 14,
      "nombre": "Memoria descriptiva de la consultoría"
    }
  ],
  "entregablesEjecutivos": {
    "mes": 14,
    "texto": "Síntesis ejecutiva del resultado final (≥ 50 páginas) y presentación de conclusiones (≥ 30 diapositivas), en los últimos 10 días hábiles del mes 14"
  },
  "subcontratas": [
    {
      "id": "FB",
      "nombre": "FutureBrand",
      "svc": "S2",
      "concepto": "Marca del programa CTS y manual de identidad",
      "importe": 15000,
      "pagos": {
        "3": 50,
        "4": 50
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
      "mes": 14,
      "nombre": "Cierre y transferencia de capacidades",
      "objeto": "Talleres de transferencia de capacidades al equipo técnico de FONATUR y presentación de conclusiones del proyecto. Final del M13 y comienzo del M14.",
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
