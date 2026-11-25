# Backlog priorizado

P0 = bloqueante; P1 = próximo MVP; P2 = posterior. No ejecutar tareas de producto sin validar alcance.

## Estado operativo vigente

## Cierre QA-ONW-015 (vigente, 2026-11-25)

- Cerrados para 0.1.5: apertura inactiva de una ventana, identidad nativa sin duplicar, aparición inesperada del panel (no reproducida en QA), mejoras de ancho/altura/temas/idiomas y conservación de comportamiento. 19/19 OK por reporte del propietario, DTC inicial/final OK.
- Pendiente funcional original: creación nativa New Workspace (rápida y personalizada), diferida y deshabilitada; no confundir aceptación de deshabilitación con funcionalidad entregada.
- Pendiente técnico de entrega: validar ejecución PowerShell Windows D-039 en una futura actualización necesaria, no pedir reinstalación para ello. Mantener riesgos de compatibilidad de UI interna ante cambios de Vivaldi.
- No repetir QA, inspecciones estáticas ni tocar DTC; congelar baseline validada, siguiente alcance a decidir con propietario.

| ID | Estado vigente | Alcance |
|---|---|---|
| ONW-001 a ONW-004 | Cerrados | Scaffold, repo, requisitos y carga inicial. |
| ONW-005 a ONW-008 | Cerrados para Base/Existing 0.1.5 | Viabilidad, integración, defectos y QA real; no implica creación nativa. |
| ONW-009 | Cerrado para UX 0.1.5 | Aceptación por propietario; ancho exacto no medido. |
| ONW-010 | Pendiente/no bloqueante | Licencia, distribución, versión mínima, política de releases. |
| ONW-011 | Diferido | Creación nativa rápida/personalizada; siguiente etapa propuesta. |
| ONW-012 | Cerrado para QA-ONW-015 | DTC inicial/final OK; causalidad histórica desconocida. |
| ONW-013 | Implementado; validación Windows pendiente | Instalador D-039; validar en siguiente instalación necesaria. |

## Historial de backlog (no operativo)

Tabla y registros anteriores preservados como evidencia; no son órdenes vigentes.

| ID | Prioridad | Estado | Tarea y aceptación |
|---|---|---|---|
| ONW-001 | P0 | Hecho | Scaffold y documentación autosuficiente, check/test/build verificables. |
| ONW-002 | P0 | Hecho | Repo creado por propietario, importación verificada en main: 26 archivos, permiso de escritura, commit `480da6f4c1640d58ebd31d1774af43a98aa61af7`. Ver STATUS. |
| ONW-003 | P0 | Hecho | Alcance y preferencias confirmados; RF-01 a RF-12 en REQUIREMENTS, D-009 a D-011 en DECISIONS. |
| ONW-004 | P0 | Hecho por reporte | Cargar scaffold en Vivaldi Windows y documentar versión y resultado del smoke test. |
| ONW-005 | P0 | En curso (runtime pendiente) | Revisión documental DTC y fuentes externas realizada; matriz y plan P0-P4 en FEASIBILITY. Referencias P3 revisadas; herramientas de diagnóstico en research/. Versión recibida; priorizar selección y apertura nativa de existentes y base. Ruta por menú nativo identificada y programada; verificar en Vivaldi 8.3. Creación diferible a ONW-011. |
| ONW-006 | P0 | Candidata implementada | MV3 + worker + puente independiente, pendiente validar arquitectura en única instalación habitual, con D-033. |
| ONW-007 | P0 | Corrección candidata parcial | Identidad: selector nativo exacto integrado, CI 40/40 aprobada, runtime pendiente. Panel lateral requiere evidencia de callbacks; no repetir V1/V2. |
| ONW-008 | P0 | Pendiente | Validar operación real en Windows, preservación de pestañas y casos de error aprobados. |
| ONW-009 | P1 | Implementación y CI OK; runtime pendiente | UX 0.1.5 integrada, 36/36 CI; verificar ancho efectivo 420px y menor altura en Vivaldi cuando exista candidato coherente. |
| ONW-010 | P2 | Parcial (guía local lista) | Definir licencia, distribución, versión mínima y política de releases; no publicar sin permiso. |

| ONW-012 | P0 | Recuperación reportada; coexistencia pendiente | DTC falla con y sin ONW/puente en ambos ámbitos según aislamiento reportado; causa no demostrada. V2 confirma ambos listeners registrados; DTC funciona normalmente sin cambios/reinicio según propietario; causa transitoria desconocida. Verificar coexistencia después de operaciones ONW; no modificar DTC. |
| ONW-013 | P1 | Propuesta | Evaluar utilidad PowerShell manual con diagnóstico read-only, vista previa, aplicar/revertir explícitamente; sin modificar DTC, sin tarea residente ni reinicio. Validar antes de uso habitual. |
| ONW-011 | P2 | Diferible | Creación rápida y personalizada de Workspace nativo (RF-02 a RF-06), nombre/iconos/emoji si posible. No bloquea primera entrega. |

| ONW-014 | P0 | Regla operativa activa | Continuidad de chat temporal: única instalación habitual; instrucciones y prompt antes de cierre/reinicio, QA y formulario solo en nuevo chat posterior, comentarios adicionales. Ver AGENTS/WORKFLOW/RESUME_PROMPT. |

| ONW-015 | P0 | Regla operativa activa | D-033: no Standalone; actualizar en ruta permanente y única instalación con backups, reinicio manual y traspaso obligatorio. No exigir otra instalación ni preguntar QA posreinicio en chat anterior. |

| ONW-016 | P0 | Regla operativa activa | D-034: preparación de cada futura versión y respaldos dentro de raíz de trabajo ONW, rutas activas estables, excepción única 0.1.4. |

Actualizar estados sin eliminar tareas históricas. Añadir evidencia, commit o referencia de prueba al cerrar tareas relevantes.

0.1.5 en desarrollo, no instalar ni reiniciar; no release ni incremento de versión aún. Integrar UX y pruebas sobre fuente exacta, comprobar check/test/build y CI Windows. Identidad y panel requieren evidencia estática del componente nativo de Vivaldi 8.3.4191.47: no elegir por ordinal, subcadena ni relajar biyección; no cerrar panel ni ventanas automáticamente. D-033/D-034 vigentes; no modificar DTC. Si falta evidencia, solicitar exclusivamente fragmentos estáticos focalizados de resources/vivaldi, sin reinicio ni nueva QA.

Próxima acción única ONW-007: informe estático ONW-ROW-STATIC-1; no repetir dinámica ni instalar. Clasificación diagnóstica preservada inerte en research.

## Evidencia estática ONW-ROW-STATIC-1 (2026-11-25)

Informe real del propietario, Vivaldi 8.3.4191.47: 20 JS inspeccionados, cero omitidos, siete muestras de bundle.js. No se almacena ni publica el bundle ni el JSON. La fila nativa usa div.title con dos p directos: nombre literal y p.tab-count; icono/avatar separado y title puede añadir texto de hibernación. El padre pasa ID nativo, nombre y onSelect a componente de fila; el botón DOM observado no aporta ID nativo demostrado. No confundir data-handler de drag con ID. El onClick de fila llama a selección con ID; se conserva un solo click y verificaciones. Toolbar registra togglePopup para onClick/onPointerDown, pero falta implementación de togglePopup/toolbar genérico y de selección; no se demuestra causa del panel. No invocar detachWorkspace ni APIs privadas nuevas por la mera aparición de un símbolo.

Corrección candidata: leer exclusivamente p de nombre dentro de div.title directo, exigir exactamente un nombre y un contador, comparar nombre literal exacto, exigir biyección completa y revalidación de la misma fila. No usar tooltip, concatenación, emoji añadido, sufijos numéricos u ordinal. Se integran códigos diagnósticos NO_MATCH/AMBIGUOUS/DUPLICATE/TARGET_MISSING/REVALIDATION/ROW_CHANGED. No cambia creación/foco de ventana, eventos, protocolo 3, permisos, manifest, worker ni DTC. QA runtime pendiente y causa concreta del fallo anterior no demostrada. El panel continúa abierto como problema, se requiere traza estática específica de callbacks; no repetir V1/V2 ni QA 0.1.4. No instalar main ni reiniciar.

ONW-ROW-STATIC-1 completado: no repetir. Único siguiente paso dirigido: ONW-EVENT-STATIC-2 mediante research/Find-ONW-EventRoute.ps1, lectura acotada de bundle.js con anclas únicas alrededor de callbacks de menú y togglePopup; intenta localizar wrapper genérico de toolbar como candidato, no presupone coincidencia. Sin cambios en Vivaldi, sin eventos, sin reinicio, no publicar informe/bundle. Ejecutar con mismo UiRoot real; revisar salida y compartir JSON en chat, no repo. PowerShell no probado por agente. Si esta evidencia no permite demostrar ruta segura del panel, detener rondas estáticas y declarar bloqueo/decidir candidato con riesgo explícito, no repetir QA antigua. No cambiar política de seguridad, no tocar DTC. D-033/D-034 vigentes. No instalar main.

## ONW-EVENT-STATIC-2 (2026-11-25) y candidato de eventos

Informe recibido y analizado, bundle SHA256 E3DA95063D8EA97E85DD955D8C87F38DBCF339E2C3BB7768FD17BC49CBB9E0D2, 12 fragmentos, wrapper 41830. No publicar bundle ni informe. Selector nativo llama setActiveWorkspace con ventana e ID y oculta su propio menú. Toggle del botón solo alterna visibilidad; wrapper de toolbar tiene camino de teclado Enter/Space que llama onClick y camino puntero que puede instalar captura global de pointerup y temporizador de menú. No aparece una llamada demostrada al panel de lectura; causa concreta sigue desconocida. Mitigación candidata: un único keydown Enter dirigido al botón verificado (keyCode 13 validado, sin puntero, sin fallback ni reintento); conserva foco, hit-test, estructura, biyección y click de fila con postcondición. No ejecutar comandos privados ni cerrar panel. El evento de teclado se propaga para React; efectos globales no descartados sin Vivaldi. No repetir diagnósticos estáticos/dinámicos. Se decide preparar candidato 0.1.5 de QA controlada si CI aprueba, no versión estable, sin prometer resolver panel. Mantener protocolo 3 compatible (sin cambios de mensajes), exigir instalación conjunta del puente y extensión del mismo SHA mediante D-033/D-034. No modificar DTC, permisos, clave ni worker.

Checkpoint 0.1.5: identidad y ruta de eventos candidatas implementadas, CI 42/42; UX integrada. Panel y apertura pendientes de aceptación runtime. Siguiente acción: actualización controlada D-033/D-034 y QA en nuevo chat. No más rondas estáticas.

## Actualización de entrega (2026-11-25)
- D-039: código de empaquetado, instalador y tests estáticos implementados; validación de PowerShell Windows pendiente. No reinstalar solo para validar el instalador.
- QA-ONW-015: propietario reporta descarga y muestra extension, bridge y onw-mods poblados; falta confirmar carga efectiva 0.1.5 y reinicio posterior a la copia. No modificar lógica candidata ni solicitar otro reinicio mientras no haya evidencia de necesidad. Una ronda QA agrupada tras confirmar.
