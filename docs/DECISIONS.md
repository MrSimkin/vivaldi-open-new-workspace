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

| D-031 | 2026-11-25 | V2 concluye inspección dinámica; corregir con selector acotado y prueba de identidad de todas las filas, no ordinal. Eventos centrados y foco verificado por lectura. Protocolo 3 para exigir actualización conjunta. | Agente: candidato técnico basado en reporte; hipótesis de etiquetas y eventos aún por verificar. |
| D-032 | 2026-11-25 | DTC recuperado sin cambios/reinicio reportado; ambos listeners registrados, no intervenir. | Propietario: reporte; coexistencia tras operaciones sigue pendiente. |

| D-033 | 2026-11-25 | Única instalación habitual de Vivaldi; no Standalone. Instalación manual controlada en habitual, con respaldos y reinicio cuando proceda. Entrega previa solo instrucciones y prompt autocontenido; formulario/QA únicamente tras retomar en otro chat temporal. | Propietario: restricción explícita, sustituye recomendaciones previas de aislamiento y formularios anticipados; agente: medidas compensatorias de seguridad. |

| D-034 | 2026-11-25 | Cada entrega futura se prepara y conserva en subcarpetas de E:\Vivaldi_OpenNewWorkspace\, con rutas activas estables; excepción única 0.1.4 en E:\ONW_0.1.4_STAGE\. | Propietario: orden y excepción explícitos; agente: convención versions y backups. |

| D-035 | 2026-11-25 | ES inicial sin borrar preferencia válida; cuarto tema azul oscuro atenuado; objetivo ancho efectivo 420px, menor altura y errores compactos con advertencia visible. | Propietario: requisitos nuevos; agente: implementación y tonos sujetos a QA. |
| D-036 | 2026-11-25 | QA-ONW-014 registrada; preservar foco/listado/Base y tratar identidad/panel como bloqueos; no repetir ruta fallida ni diagnóstico dinámico. | Reporte propietario y agente: criterio de seguridad, evidencia estática requerida. |

| D-037 | 2026-11-25 | Identidad por nombre literal del párrafo nativo, estructura y biyección completas, revalidación; retirar heurística de sufijos y distinguir códigos de fallo. | Agente: evidencia estática de la versión instalada ONW-ROW-STATIC-1; candidato pendiente QA. |

| D-038 | 2026-11-25 | Sustituir secuencia de puntero del botón de Workspaces por un único Enter dirigido y validado, mantener selección de fila y controles; terminar investigación estática y preparar candidato 0.1.5 condicionado a CI. | Agente: evidencia de ruta nativa de teclado; mitigación, causalidad del panel no demostrada. |

Añadir nuevas decisiones con contexto, alternativas, motivo, impacto y autoridad. No convertir propuestas en decisiones del propietario sin confirmación.

## Evidencia estática ONW-ROW-STATIC-1 (2026-11-25)

Informe real del propietario, Vivaldi 8.3.4191.47: 20 JS inspeccionados, cero omitidos, siete muestras de bundle.js. No se almacena ni publica el bundle ni el JSON. La fila nativa usa div.title con dos p directos: nombre literal y p.tab-count; icono/avatar separado y title puede añadir texto de hibernación. El padre pasa ID nativo, nombre y onSelect a componente de fila; el botón DOM observado no aporta ID nativo demostrado. No confundir data-handler de drag con ID. El onClick de fila llama a selección con ID; se conserva un solo click y verificaciones. Toolbar registra togglePopup para onClick/onPointerDown, pero falta implementación de togglePopup/toolbar genérico y de selección; no se demuestra causa del panel. No invocar detachWorkspace ni APIs privadas nuevas por la mera aparición de un símbolo.

Corrección candidata: leer exclusivamente p de nombre dentro de div.title directo, exigir exactamente un nombre y un contador, comparar nombre literal exacto, exigir biyección completa y revalidación de la misma fila. No usar tooltip, concatenación, emoji añadido, sufijos numéricos u ordinal. Se integran códigos diagnósticos NO_MATCH/AMBIGUOUS/DUPLICATE/TARGET_MISSING/REVALIDATION/ROW_CHANGED. No cambia creación/foco de ventana, eventos, protocolo 3, permisos, manifest, worker ni DTC. QA runtime pendiente y causa concreta del fallo anterior no demostrada. El panel continúa abierto como problema, se requiere traza estática específica de callbacks; no repetir V1/V2 ni QA 0.1.4. No instalar main ni reiniciar.

## ONW-EVENT-STATIC-2 (2026-11-25) y candidato de eventos

Informe recibido y analizado, bundle SHA256 E3DA95063D8EA97E85DD955D8C87F38DBCF339E2C3BB7768FD17BC49CBB9E0D2, 12 fragmentos, wrapper 41830. No publicar bundle ni informe. Selector nativo llama setActiveWorkspace con ventana e ID y oculta su propio menú. Toggle del botón solo alterna visibilidad; wrapper de toolbar tiene camino de teclado Enter/Space que llama onClick y camino puntero que puede instalar captura global de pointerup y temporizador de menú. No aparece una llamada demostrada al panel de lectura; causa concreta sigue desconocida. Mitigación candidata: un único keydown Enter dirigido al botón verificado (keyCode 13 validado, sin puntero, sin fallback ni reintento); conserva foco, hit-test, estructura, biyección y click de fila con postcondición. No ejecutar comandos privados ni cerrar panel. El evento de teclado se propaga para React; efectos globales no descartados sin Vivaldi. No repetir diagnósticos estáticos/dinámicos. Se decide preparar candidato 0.1.5 de QA controlada si CI aprueba, no versión estable, sin prometer resolver panel. Mantener protocolo 3 compatible (sin cambios de mensajes), exigir instalación conjunta del puente y extensión del mismo SHA mediante D-033/D-034. No modificar DTC, permisos, clave ni worker.
