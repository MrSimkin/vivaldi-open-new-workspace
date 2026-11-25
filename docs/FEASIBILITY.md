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

## Evidencia externa

- [Workspaces, ayuda oficial](https://help.vivaldi.com/desktop/tabs/workspaces/): crear vacío, nombre/icono, Quick Commands y selección; un Workspace activo por ventana a la vez, al elegir uno ya activo en otra se enfoca esa ventana. "This Window" corresponde a la opción base en la UI; validar semántica al abrir otra ventana.
- [Workspaces, Vivaldi](https://vivaldi.com/features/workspaces/): admite icono y emoji personalizado; catálogo y metadatos programáticos no probados.
- [Command Chains](https://help.vivaldi.com/desktop/shortcuts/command-chains/): comandos secuenciales, atajos y botones; alternativa parcial para rutas de UI, no evidencia de API programática ni de parametrización dinámica.
- [Chrome windows](https://developer.chrome.com/docs/extensions/reference/api/windows): crear y enfocar ventanas mediante API estándar; no declara parámetro de Workspace Vivaldi.
- [Vivaldi extensions](https://help.vivaldi.com/desktop/appearance-customization/extensions/): compatibilidad con extensiones Chromium.
- [Arc to Vivaldi Migration](https://github.com/spapaseit/arc-to-vivaldi-migration): reporte independiente de que escribir directamente la lista puede crear registros "Restored Workspace" no inscritos correctamente. No reproducido en ONW, no demuestra inexistencia de toda API privada. Evitar escritura directa de preferencias.
- [Vivaldi source](https://vivaldi.com/source/) y [open source](https://help.vivaldi.com/desktop/privacy/is-vivaldi-open-source/): el código público de Chromium modificado no incluye necesariamente la lógica completa de UI propietaria. Inspección local de capacidades disponibles y flujos nativos será necesaria; respetar licencia aplicable.

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
