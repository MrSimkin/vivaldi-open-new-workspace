# Viabilidad técnica: Workspaces nativos

Fecha: 2026-11-25. Investigación documental iniciada, pruebas de ONW en Windows/Vivaldi pendientes. RF-01 a RF-12 aprobados. No modificar instalación ni perfil habitual durante esta fase.

## Fuentes de primera mano del proyecto de referencia

Por indicación del propietario, se inspeccionaron ambas ramas de MrGMunoz/duplicate-tabs-closer_plus_vivaldi_workspaces. Master en 214a60a3a6d587ae7a78a13a7911d08366e7c963 no contiene la integración Workspace en los archivos principales revisados. La rama feature/vivaldi-workspace-scope en a3b20600bdab4a0f58bade05f0175da5822e259a está 66 commits por delante de master.

Fuentes fijadas a esa revisión:

- [Bridge, código](https://github.com/MrGMunoz/duplicate-tabs-closer_plus_vivaldi_workspaces/blob/a3b20600bdab4a0f58bade05f0175da5822e259a/vivaldi-bridge/dtc-vivaldi-workspace-bridge.js)
- [Cliente de extensión](https://github.com/MrGMunoz/duplicate-tabs-closer_plus_vivaldi_workspaces/blob/a3b20600bdab4a0f58bade05f0175da5822e259a/vivaldiWorkspace.js)
- [Documentación del bridge](https://github.com/MrGMunoz/duplicate-tabs-closer_plus_vivaldi_workspaces/blob/a3b20600bdab4a0f58bade05f0175da5822e259a/docs/VIVALDI_WORKSPACE_BRIDGE.md)
- [Handoff y evidencias](https://github.com/MrGMunoz/duplicate-tabs-closer_plus_vivaldi_workspaces/blob/a3b20600bdab4a0f58bade05f0175da5822e259a/docs/PROJECT_HANDOFF.md)
- [Checkpoint de septiembre](https://github.com/MrGMunoz/duplicate-tabs-closer_plus_vivaldi_workspaces/blob/a3b20600bdab4a0f58bade05f0175da5822e259a/docs/CURRENT_CHECKPOINT_2026-09-09.md)
- [Resiliencia y actualización](https://github.com/MrGMunoz/duplicate-tabs-closer_plus_vivaldi_workspaces/blob/a3b20600bdab4a0f58bade05f0175da5822e259a/docs/UPDATE_RESILIENCE_AND_DEPLOYMENT.md)

### Resultados registrados por DTC, no reproducidos por ONW

En Vivaldi 8.1.4087.70 / Chromium 150.0.7871.253, el contexto de extensión ordinaria no exponía globalThis.vivaldi ni vivExtData/workspaceId en la pestaña estándar. En el contexto UI de Vivaldi sí funcionaban las lecturas vivaldi.prefs.get("vivaldi.workspaces.list") y vivaldi.tabsPrivate.get(tabId). La preferencia se observó envuelta en un objeto con .value array (el bridge acepta también array directo). Los identificadores pueden ser numéricos o cadenas; no convertirlos sin evidencia. La pertenencia se obtiene de vivExtData.workspaceId; ausencia de ese campo en metadatos válidos puede indicar espacio base, pero ausencia/metadatos inválidos no equivale a base. windowId no equivale a Workspace: un windowId puede contener pestañas de varios espacios.

DTC validó comunicación externa entre extensión y UI de Vivaldi con un mod local, protocolo versionado, identificador estable, remitente permitido, correlación y validación estricta. El puente DTC es de solo lectura; no ofrece creación, apertura, cambio de Workspace, modificación de preferencias ni movimiento de pestañas. No cambiarlo ni aprovechar su identidad para ONW. El mecanismo permite investigar un puente propio, no prueba viabilidad de escrituras.

El handoff reporta validación sustancial de aislamiento y revisión/cierre manual protegido en espacios personalizados; el automático y determinados casos base siguen pendientes. La última evidencia fechada de funcionamiento del puente en la sesión actual es 2026-09-09 (reactivación en caliente). La reparación silenciosa periódica se validó, pero la persistencia de arranque posterior a la reparación seguía pendiente. Una actualización del navegador el 2026-09-01 interrumpió la integración. No repetir diagnóstico DTC ya realizado; confirmar versión actual y no reiniciar navegador habitual. La distribución local persistente DTC tampoco quedó cerrada.

Licencia de referencia GPL-3.0 (LICENSE). No se copió código, clave ni identidad de DTC; si se propone reutilizar código literal, resolver licencia y atribuciones antes de integrarlo al repositorio público ONW.

## Entorno objetivo confirmado y actualización del propietario (2026-11-25)

Captura de vivaldi://about: Vivaldi 8.3.4191.47 (64 bits, oficial), Chromium 156.0.8078.110, Windows 11 26H2 build 26300.9974. No registrar rutas personales. El propietario informa que Duplicate Tabs Closer ha mantenido plena compatibilidad y no ha fallado con nuevas versiones. Este testimonio actual complementa los incidentes históricos documentados, no demuestra por sí solo que ONW tenga acceso a acciones de escritura ni sustituye prueba de integración ONW.

Priorizar apertura base y existentes; diferir investigación de creación cuando demore la primera entrega. La preview usa únicamente chrome.windows.create; se debe verificar la pertenencia base. Para existentes, acotar P3 a selección/activación nativa, inspección de catálogo y asociación a ventanas. El puente de lectura de DTC es precedente favorable; no modificarlo.

## Evidencia externa

- [Workspaces, ayuda oficial](https://help.vivaldi.com/desktop/tabs/workspaces/): crear vacío, nombre/icono, Quick Commands y selección; un Workspace activo por ventana a la vez, al elegir uno ya activo en otra se enfoca esa ventana. "This Window" corresponde a la opción base en la UI; validar semántica al abrir otra ventana.
- [Workspaces, Vivaldi](https://vivaldi.com/features/workspaces/): admite icono y emoji personalizado; catálogo y metadatos programáticos no probados.
- [Command Chains](https://help.vivaldi.com/desktop/shortcuts/command-chains/): comandos secuenciales, atajos y botones; alternativa parcial para rutas de UI, no evidencia de API programática ni de parametrización dinámica.
- [Chrome windows](https://developer.chrome.com/docs/extensions/reference/api/windows): crear y enfocar ventanas mediante API estándar; no declara parámetro de Workspace Vivaldi.
- [Vivaldi extensions](https://help.vivaldi.com/desktop/appearance-customization/extensions/): compatibilidad con extensiones Chromium.
- [Arc to Vivaldi Migration](https://github.com/spapaseit/arc-to-vivaldi-migration): reporte independiente de que escribir directamente la lista puede crear registros "Restored Workspace" no inscritos correctamente. No reproducido en ONW, no demuestra inexistencia de toda API privada. Evitar escritura directa de preferencias.
- [Vivaldi source](https://vivaldi.com/source/) y [open source](https://help.vivaldi.com/desktop/privacy/is-vivaldi-open-source/): el código público de Chromium modificado no incluye necesariamente la lógica completa de UI propietaria. Inspección local de capacidades disponibles y flujos nativos será necesaria; respetar licencia aplicable.

## Investigación P3: referencias adicionales (2026-11-25)

- [Modders API: windowPrivate](https://lonmcgregor.github.io/VivaldiModdersAPI/OfficialApi/windowPrivate.html): documenta create y getCurrentId, opciones vivExtData y windowKey. No documenta parámetro explícito de Workspace. No inferir semántica de vivExtData ni usar windowKey como Workspace ID.
- [Modders API: sessionsPrivate](https://lonmcgregor.github.io/VivaldiModdersAPI/OfficialApi/sessionsPrivate.html): WorkspaceItem contiene id/name/icon/emoji, pero modifyContent/open operan sobre sesiones guardadas. No confundir restauración con gestión de Workspaces activos; descartar como ruta directa inicial.
- [Preferencias de Modders API](https://lonmcgregor.github.io/VivaldiModdersAPI/OfficialApi/preferenceDefinitions.html): enumera COMMAND_WORKSPACE_SWITCH_1...10 y comandos relacionados. No demuestra método programático público ni acceso por extensión convencional.
- [Vivaldi, comandos y botones](https://vivaldi.com/blog/how-to/pawel-shows-you-how-to-play-with-workspaces-and-custom-icons-in-vivaldi/): confirma cambio nativo mediante cadenas; [Quick Commands](https://help.vivaldi.com/desktop/shortcuts/quick-commands/) permite búsqueda de Workspace. [Vivaldi 6.8 changelog](https://vivaldi.com/changelog-vivaldi-browser-6-8/) registra comando de creación con pestañas seleccionadas; no demuestra creación vacía ni firma.
- [VivaldiMods](https://github.com/jms830/VivaldiMods) documenta botones de cambio por mod; no se consiguió recuperar el archivo fuente específico y no se atribuye ninguna técnica concreta. No copiar código de terceros.

No se encontró una firma invocable demostrada para crear un Workspace activo. La siguiente evidencia debe proceder de la versión instalada, no de nuevas búsquedas repetitivas. Se preparó research/Find-WorkspaceActions.ps1 (escaneo local de JS, solo lectura) y research/inspect-workspace-ui.js (inventario y esquema, solo lectura) con instrucciones en research/README.md. Ambos sin prueba real Windows/Vivaldi; no se ejecutan automáticamente ni se empaquetan. Primero preferir inspección estática, luego diagnóstico UI si es necesario. El informe estático solo contiene muestras de archivos instalados, no perfiles; revisar antes de compartir.

## Avance 0.1.2: selección por interfaz nativa (2026-11-25)

Se recuperó [Javascripts/workspaceButtons.js](https://github.com/jms830/VivaldiMods/blob/master/Javascripts/workspaceButtons.js), blob dcb48acfbb6165445348a2167e904379b787f726. El mod comunitario usa el botón .button-toolbar.workspace-popup > button y filas .workspace-item-wrapper, eventos de puntero y selección por nombre. Esto aporta una ruta concreta, no evidencia de compatibilidad ONW en Vivaldi 8.3. Implementación independiente, sin copiar código de terceros: coincidencia exacta y única, revalidación previa y posterior; no búsqueda por subcadena ni acción genérica. [windowPrivate.getCurrentId](https://lonmcgregor.github.io/VivaldiModdersAPI/OfficialApi/windowPrivate.html) proporciona identidad de contexto UI; su uso callback tiene precedente comunitario, no probado aquí. La documentación oficial de Workspaces confirma que seleccionar un espacio ya abierto enfoca la otra ventana.

Candidato desarrollado: catálogo y estado mediante precedente DTC; enfoque con windows.update; apertura de inactivo mediante nueva ventana y selección en su contexto. Si el catálogo/estado/menú no se puede verificar, no se intenta la mutación. Si falla tras abrir ventana, queda abierta y se informa. La instalación del puente en todas las ventanas, forma actual de metadatos, selectores exactos, comportamiento de eventos y postcondición siguen sin validar. No se altera DTC ni se usa escritura de preferencias. Cerrar ONW-005 solo tras runtime o bloqueo documentado.

## Matriz de capacidades

| Capacidad | Evidencia | Estado ONW |
|---|---|---|
| Menú 3 opciones, idiomas | Desarrollo WebExtension estándar | Diseño aprobado; no implementado |
| Crear/enfocar ventana | Chrome windows API documentada | Pendiente runtime Vivaldi |
| Listar Workspaces | DTC prefs.get con .value | Precedente real; verificar esquema nombre/icono y lista vacía |
| Leer pertenencia de pestaña | DTC tabsPrivate.get + vivExtData | Precedente real; verificar versión actual |
| Saber ventana con Workspace activo | DTC identifica activo de una ventana con pestaña activa; Vivaldi documenta foco | Extender razonamiento a todas las ventanas; no inferir por presencia de pestañas inactivas; casos vacío/base pendientes |
| Abrir base | UI documentada y API de ventanas | Validar nueva ventana y pertenencia base |
| Crear Workspace rápido | UI documentada | Invocación desde extensión no confirmada |
| Crear con nombre/icono/emoji | UI documentada | Invocación y esquema pendientes |
| Abrir existente no activo en ventana nueva | Selección nativa documentada | Probar selección desde ventana destino; preservar pestañas |
| Enfocar existente activo en otra | Comportamiento nativo documentado; windows.update | Confirmar identificación y foco sin crear ventana |

## Rutas y decisión preliminar

A. Extensión MV3 sin mod: primera comprobación rápida de capacidad, bajo mantenimiento; evidencia DTC desfavorable para metadatos. No prolongar si reproduce ausencia.
B. Extensión MV3 + puente ONW independiente en UI: candidato principal por precedente de transporte y lectura DTC; mutaciones exclusivamente a través de acciones nativas verificadas, no escritura ciega de prefs. Aislar identidad y protocolo ONW; no modificar puente DTC. Requiere autorización de instalación/mod y prueba aislada; no confirmado para creación.
C. Comandos nativos / automatización de UI: alternativa para abrir ventana y activar el flujo real de crear o cambiar Workspace si no hay API semántica usable. Probar primero los comandos integrados sin mod; evaluar si exige interacción adicional, dependencia de foco/idioma y fragilidad. Un mod de UI o componente Windows requerirá autorización; no introducir servicio residente, automatización global, política de seguridad o dependencias sin necesidad y aprobación.
D. Escribir prefs directamente / simular Workspaces: descartado como ruta inicial; riesgo de metadatos incoherentes y no satisface requisitos. No usar tab groups como sustituto.

## Próximo experimento, secuencia acotada

P0: confirmar versión exacta Windows/Vivaldi y si hay perfil/instalación de prueba independiente disponible. No tocar la sesión habitual ni reiniciar Vivaldi. Cargar scaffold si es seguro.
P1: comprobar solo existencia de APIs en extensión y contexto UI; en UI consultar forma de la lista (array o .value, claves de los registros, tipos y conteo, sin nombres personales) y comprobar pertenencia con dos Workspaces de prueba y base. No compartir URL, historial, títulos ni contenido. No cargar mod ni modificar DTC para este diagnóstico.
P2: en perfil de prueba, observar manualmente los flujos nativos: nueva ventana, crear vacío con nombre/icono predeterminado, personalizado, seleccionar existente inactivo desde nueva ventana y enfocar activo. Registrar diferencia entre pertenencia de pestañas y Workspace activo, preservación de ventanas y comportamiento de vacío.
P3: inspeccionar el mecanismo invocado por acciones nativas desde UI del entorno de prueba, distinguir lectura y operación de escritura. Identificar ruta real para creación y selección antes de codificar. Validar cada operación una vez con datos ficticios y pre/postcondiciones, evitar reintentos ciegos. Si solo se puede abrir diálogo nativo, declarar UX parcial y decidir si aceptable.
P4: si se demuestra ruta, elegir arquitectura, implementar prueba de concepto mínima y validar; si no, detener y documentar bloqueo, rutas alternativas y coste. No cerrar ONW-005 sin prueba suficiente o decisión explícita de bloqueo.

Para cada experimento: fecha, versión, contexto, capacidad, evidencia reproducible, resultado (soportado/no soportado/no verificado), efectos laterales y siguiente decisión. Sin experimentos ejecutados por ONW en este checkpoint.

## Evidencia V2 y candidato 0.1.4

ONW-MENU-V2 real: 57 muestras, una pulsación humana en ventana correcta, catálogo 8, 8 filas BUTTON.workspace-item-wrapper en .WorkspacePopup > .WorkspacePopup-Items > .WorkspacePopup-DragArea, handlers de fila onPointerUp/onClick/onKeyDown, botón anclado workspace-popup.workspace-anchor.tabbar-workspace-button con onPointerDown/onClick/onKeyDown. Solo ordinales 3 y 7 coincidieron exactamente (eran activos en V1). No se observó contenido/forma de etiquetas restantes; no inferir orden como identidad. Ambos puentes presentes una vez y listeners definidos/registrados en ventana inspeccionada. DTC volvió a funcionar normalmente sin cambios/reinicio según propietario; causa transitoria desconocida; estado ONW local previo incierto porque v2 sí muestra bridge cargado. Coexistencia después de operaciones ONW aún pendiente.

Candidato 0.1.4: protocolo 3 obligatorio en extensión/puente (incompatible con 2, evita mutaciones con puente antiguo); selector acotado al menú real y botón de barra confirmado, activación de botón con coordenadas de centro verificadas y fila mediante un único click dirigido con onClick comprobado. Identificación de todas las filas mediante catálogo, texto/título/aria y descendientes, nombres con emoji y sufijo numérico acotado como hipótesis, exige biyección y revalidación; nunca ordinal/subcadena arbitraria. Si no resuelve, error explícito sin elegir otra fila. Verifica ventana destino enfocada antes de mutar; deadline previo; lectura posterior. Foco estándar con consulta posterior acotada y snapshot desde destino, no se crea ventana ante fallo de foco. No modificar preferencias, DTC, cierre de panel o pestañas. UX 0.1.3 conservada. Pruebas con dobles añadidas, runtime pendiente.

## Restricción vigente D-033

Propietario confirma única instalación habitual. Los experimentos que aún procedan se adaptan a ella con datos de prueba, backups, cambios ONW estrictos y continuidad antes de reinicio; no exigir Standalone ni perfiles adicionales. V1/V2 ya ejecutados; próximo experimento es aceptación candidata 0.1.4, no repetir P0-P3 por rutina.

## Evidencia posterior QA-ONW-014

QA-ONW-014 (25-11-2026, reporte propietario): instalación/reinicio completados sin incidencia reportada; versión/ID no comprobables. 13 OK: DTC inicial, catálogo automático, foco activo sin ventana adicional, pestañas destino, origen/pestañas, Base, icono NW, gris oscuro, gris claro, claro azulado, idioma ES/EN, persistencia tema, DTC final. 2 parciales: identidad sin duplicar, ancho/tres opciones. 2 fallos: abrir inactivo exactamente una ventana y ausencia panel Lista de vistas de lectura. Idioma persistente OK dentro del caso ES/EN. Error literal: Operation not confirmed. (NATIVE_ROW_IDENTITY_UNVERIFIED) An additional window opened; it will not be closed automatically. Check windows before retrying. No inferir causa, estado exacto de ventana extra ni coexistencia global. Captura: popup estrecho, textos partidos, error alto, EN. No repetir la operación fallida, V1/V2 ni aislamiento DTC.

0.1.5 en desarrollo, no instalar ni reiniciar; no release ni incremento de versión aún. Integrar UX y pruebas sobre fuente exacta, comprobar check/test/build y CI Windows. Identidad y panel requieren evidencia estática del componente nativo de Vivaldi 8.3.4191.47: no elegir por ordinal, subcadena ni relajar biyección; no cerrar panel ni ventanas automáticamente. D-033/D-034 vigentes; no modificar DTC. Si falta evidencia, solicitar exclusivamente fragmentos estáticos focalizados de resources/vivaldi, sin reinicio ni nueva QA.

## Evidencia estática ONW-ROW-STATIC-1 (2026-11-25)

Informe real del propietario, Vivaldi 8.3.4191.47: 20 JS inspeccionados, cero omitidos, siete muestras de bundle.js. No se almacena ni publica el bundle ni el JSON. La fila nativa usa div.title con dos p directos: nombre literal y p.tab-count; icono/avatar separado y title puede añadir texto de hibernación. El padre pasa ID nativo, nombre y onSelect a componente de fila; el botón DOM observado no aporta ID nativo demostrado. No confundir data-handler de drag con ID. El onClick de fila llama a selección con ID; se conserva un solo click y verificaciones. Toolbar registra togglePopup para onClick/onPointerDown, pero falta implementación de togglePopup/toolbar genérico y de selección; no se demuestra causa del panel. No invocar detachWorkspace ni APIs privadas nuevas por la mera aparición de un símbolo.

Corrección candidata: leer exclusivamente p de nombre dentro de div.title directo, exigir exactamente un nombre y un contador, comparar nombre literal exacto, exigir biyección completa y revalidación de la misma fila. No usar tooltip, concatenación, emoji añadido, sufijos numéricos u ordinal. Se integran códigos diagnósticos NO_MATCH/AMBIGUOUS/DUPLICATE/TARGET_MISSING/REVALIDATION/ROW_CHANGED. No cambia creación/foco de ventana, eventos, protocolo 3, permisos, manifest, worker ni DTC. QA runtime pendiente y causa concreta del fallo anterior no demostrada. El panel continúa abierto como problema, se requiere traza estática específica de callbacks; no repetir V1/V2 ni QA 0.1.4. No instalar main ni reiniciar.

## ONW-EVENT-STATIC-2 (2026-11-25) y candidato de eventos

Informe recibido y analizado, bundle SHA256 E3DA95063D8EA97E85DD955D8C87F38DBCF339E2C3BB7768FD17BC49CBB9E0D2, 12 fragmentos, wrapper 41830. No publicar bundle ni informe. Selector nativo llama setActiveWorkspace con ventana e ID y oculta su propio menú. Toggle del botón solo alterna visibilidad; wrapper de toolbar tiene camino de teclado Enter/Space que llama onClick y camino puntero que puede instalar captura global de pointerup y temporizador de menú. No aparece una llamada demostrada al panel de lectura; causa concreta sigue desconocida. Mitigación candidata: un único keydown Enter dirigido al botón verificado (keyCode 13 validado, sin puntero, sin fallback ni reintento); conserva foco, hit-test, estructura, biyección y click de fila con postcondición. No ejecutar comandos privados ni cerrar panel. El evento de teclado se propaga para React; efectos globales no descartados sin Vivaldi. No repetir diagnósticos estáticos/dinámicos. Se decide preparar candidato 0.1.5 de QA controlada si CI aprueba, no versión estable, sin prometer resolver panel. Mantener protocolo 3 compatible (sin cambios de mensajes), exigir instalación conjunta del puente y extensión del mismo SHA mediante D-033/D-034. No modificar DTC, permisos, clave ni worker.
