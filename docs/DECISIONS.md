# Registro de decisiones

| ID | Fecha | Decisión | Autoridad / estado |
|---|---|---|---|
| D-001 | 2026-11-25 | Nombre Open New Workspace; Vivaldi Desktop Windows; compatibilidad Chromium transversal no obligatoria. | Propietario, confirmado. |
| D-002 | 2026-11-25 | Nombre repo `vivaldi-open-new-workspace`, propietario `MrSimkin`, rama `main`. | Agente: nombre delegado; cuenta y rama verificadas en GitHub. |
| D-003 | 2026-11-25 | Privado por defecto, sin licencia pública ni distribución todavía. | Agente: recomendación inicial; visibilidad sustituida por la observada en D-008. |
| D-004 | 2026-11-25 | MV3, JS nativo, sin dependencias, sin permisos, sin service worker inicial. | Agente: elección técnica reversible. |
| D-005 | 2026-11-25 | Popup informativo en español, sin ejecutar acciones; hipótesis Workspace nativo sin aprobar. | Agente: provisional, UX e idioma final pendientes. |
| D-006 | 2026-11-25 | Repo remoto no creado desde chat; paquete local y procedimiento de bootstrap. | Limitación técnica comprobada del conector; propietario creó el remoto después. |
| D-007 | 2026-11-25 | Node.js 22 para herramientas, CI Windows, salida `dist/extension`. | Agente: elección de desarrollo reversible. |
| D-008 | 2026-11-25 | Repo creado por propietario con visibilidad pública, rama main y README inicial. Conservar visibilidad y commit; importar scaffold a solicitud del propietario. | GitHub: observado; agente conserva configuración existente. Licencia y distribución siguen pendientes. |

| D-009 | 2026-11-25 | Uso exclusivamente personal; tres acciones principales siempre visibles: nuevo, base, existente. Creación rápida o con nombre e icono. | Propietario, confirmado; sustituye la hipótesis de D-005. |
| D-010 | 2026-11-25 | Si el existente ya está abierto, enfocar su ventana; mantener abierta la ventana original en todas las operaciones. | Propietario, confirmado. |
| D-011 | 2026-11-25 | Iconos nativos y emojis si es posible; interfaz configurable español/inglés. | Propietario, confirmado; capacidad real de iconos pendiente. |
| D-012 | 2026-11-25 | Investigar viabilidad antes de implementar; propuesta de idioma inicial según navegador y selección persistente local. | Agente: orden de trabajo y propuesta reversible, no decisión del propietario. |

| D-013 | 2026-11-25 | Estudiar DTC como referencia de integración Workspace. | Propietario, confirmado; rama feature/vivaldi-workspace-scope inspeccionada sin modificarla. |
| D-014 | 2026-11-25 | Priorizar verificación de APIs normales y luego puente ONW independiente con acciones nativas; alternativa comandos/UI; descartar escritura directa de prefs como primera ruta. | Agente: decisión preliminar de investigación, no arquitectura final ni autorización de mod. |
| D-015 | 2026-11-25 | No copiar código GPL, reutilizar identidad DTC ni alterar su puente; evitar interrupción de sesión habitual; prueba aislada. | Agente: precauciones derivadas de fuente y reglas existentes. |

| D-016 | 2026-11-25 | No tratar sessionsPrivate ni windowKey como APIs de Workspaces activos. Priorizar inspección estática local sin tocar sesión y después diagnóstico UI de lectura si hace falta. | Agente: investigación acotada; no autoriza cambios al navegador. |

| D-017 | 2026-11-25 | Primera versión prioriza base, existentes, enfoque e idioma; creación y personalización pueden quedar en construcción para evitar demora/QA. | Propietario, autorizado. |
| D-018 | 2026-11-25 | Entorno Vivaldi 8.3.4191.47, Chromium 156.0.8078.110, Windows 11 26H2 build 26300.9974; DTC mantiene plena compatibilidad según propietario. | Captura y reporte del propietario; no prueba ONW. |
| D-019 | 2026-11-25 | Preview 0.1.1 con apertura normal y selección asistida, sin simular selección automática ni base confirmada. | Agente: entrega intermedia reversible, no aceptación de alcance reducido para MVP. |

| D-020 | 2026-11-25 | Implementar candidato de selección por menú nativo a partir de evidencia comunitaria, puente independiente con ID/protocolo propio y worker para continuidad al enfocar ventana. | Agente: arquitectura experimental, requiere prueba real; no autoriza instalar mod. |
| D-021 | 2026-11-25 | Añadir únicamente permiso storage para estado de operación; no almacenar URLs, títulos ni historial. No cerrar ventanas adicionales ante fallo o carrera. | Agente: seguridad y preservación de datos. |

| D-022 | 2026-11-25 | Entregar 0.1.2 como instalación manual desde ZIP fuente fijo, sin Node para usuario y con puente separado, copia de seguridad y reversión. | Agente: elección de entrega solicitada; no automatizar modificación ni afirmar validación real. |

| D-023 | 2026-11-25 | Coexistencia mediante puentes separados: verificar referencias y hashes, no sobrescribir modificaciones concurrentes, revertir únicamente ONW. Mantener DTC y su reparador intocados. | Propietario: restricciones explícitas; agente: controles técnicos y pruebas C-01 a C-05. |
| D-024 | 2026-11-25 | Recomendar utilidad asistida manual PowerShell con modo diagnóstico por defecto y escritura/reversión explícitas, frente a edición manual repetitiva o tarea residente. | Agente: propuesta, no implementada ni autorización de ejecución. |

| D-025 | 2026-11-25 | UX: lista automática visible, popup más ancho, fondo claro, icono NW; creación sigue diferida. | Propietario: solicitado; agente: ancho 420px, estilo azul/blanco inicial e iconos PNG. |
| D-026 | 2026-11-25 | Incidencia DTC bloquea uso habitual; separar cambios UX de corrección del bridge; recuperar DTC y obtener diagnóstico antes de alterar lógica. | Agente: precaución técnica; no atribuir causalidad sin evidencia. |

| D-027 | 2026-11-25 | Sustituir paleta azul por escala de grises clara, incluido icono NW; conservar ancho y lista automática. | Propietario: preferencia gris; agente: tonos concretos. |

| D-028 | 2026-11-25 | Tres temas elegibles y persistentes, conservando icono NW; gris oscuro inicial y dos claros atenuados. | Propietario: selección de temas y sensibilidad a luminosidad; agente: valores concretos y valor inicial reversible. |
| D-029 | 2026-11-25 | Separar diagnóstico DTC (falla con y sin ONW) y corrección Existing (panel lateral solo en esta ruta); no repetir aislamiento ni corregir ocultando panel. | Reporte propietario; agente: inferencia acotada, causalidad no probada. |

| D-030 | 2026-11-25 | Antes de cada solicitud de cierre/reinicio de Vivaldi, entregar prompt de continuidad completo y actualizado en chat y repo; formularios con comentarios adicionales. | Propietario: obligatorio por uso de chat temporal; agente: archivo docs/RESUME_PROMPT.md y puerta en AGENTS/WORKFLOW. |

Añadir nuevas decisiones con contexto, alternativas, motivo, impacto y autoridad. No convertir propuestas en decisiones del propietario sin confirmación.
