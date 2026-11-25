# Estado actual / checkpoint

Fecha: 2026-11-25 | versión instalada reportada: 0.1.4 | desarrollo: 0.1.5 pre-MVP, no instalar.

## Implementado

- Extensión MV3 con menú ES/EN, apertura normal y cliente de puente independiente. Implementación experimental de listado, identificación de activo, foco y selección de existente en nueva ventana. New Workspace deshabilitado. Requiere validación real y puente en todas las ventanas.
- Scripts de comprobación y build sin dependencias externas; pruebas unitarias y estáticas.
- Documentación de requisitos, diseño, decisiones, viabilidad, backlog y trabajo de agentes.
- Workflow de CI para Windows en GitHub Actions.

## Estado de desarrollo y build

| Control | Resultado |
|---|---|
| npm run check | 0.1.2 aprobado en GitHub Actions (Windows) |
| npm test | 0.1.2: suite aprobada en GitHub Actions (Windows) |
| npm run build | 0.1.2 aprobado en GitHub Actions (Windows) |
| Carga descomprimida en Vivaldi/Windows | No ejecutada |
| Creación real de Workspace | No implementada ni validada |
| CI GitHub Actions | 0.1.2: job de Windows exitoso, check/test/build; [run 45632780858](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45632780858). |
| Repo remoto/commit/push | Importación verificada en `main`: 26 archivos, commit `480da6f4c1640d58ebd31d1774af43a98aa61af7`; se conserva el commit inicial. |
| Publicación/distribución | No realizada |

Entorno de verificación: Linux, Node.js v22.16.0, 2026-11-25 (entorno de ejecución del agente). Pruebas repetidas satisfactoriamente antes de la importación. No se ejecutó Vivaldi ni Windows. El paquete fuente no incluye `dist/`; se regenera con `npm run build`.

## Verificación de importación (2026-11-25)

- Repo `MrSimkin/vivaldi-open-new-workspace`, público, rama `main`; permisos de lectura y escritura verificados.
- El commit inicial del propietario permanece como padre del commit de importación.
- Se verificó la lista de 26 archivos del commit y se compararon los hashes Git de los 14 archivos técnicos (código, configuración, CI, scripts y tests) con los originales locales: 14/14 idénticos.
- La documentación de bootstrap, estado, pendientes y decisiones fue actualizada para reflejar el repositorio existente. ONW-001 y ONW-002 cerradas. Sin release ni licencia asignada.

## Confirmación de requisitos (2026-11-25)

- ONW-003 cerrada: requisitos funcionales aprobados por el propietario, RF-01 a RF-12.
- Uso personal; menú con tres opciones: crear nuevo rápido o con nombre/icono, abrir base, abrir existente o enfocar su ventana si ya está abierto.
- Conservar ventana original; iconos nativos y emojis si es posible; español/inglés configurable.
- No se modificó código, manifiesto, build ni permisos en este checkpoint. Los resultados de pruebas y build anteriores corresponden al scaffold sin cambios; no se volvieron a ejecutar.
- No se ha verificado todavía la capacidad de integración nativa. No se realizó investigación nueva en este checkpoint.

## Investigación de viabilidad: revisión documental (2026-11-25)

- Revisadas ramas master y feature/vivaldi-workspace-scope de DTC, a petición del propietario; referencia fijada a a3b20600bdab4a0f58bade05f0175da5822e259a. Código, handoff, checkpoint y resiliencia consultados.
- Evidencia previa: puente de solo lectura funcional en DTC; APIs internas de lectura, no de creación. Vivaldi documenta enfoque de ventana existente y creación con nombre/icono. Riesgo de escritura directa de prefs reportado por tercero.
- Ruta preferente provisional: comprobar extensión normal, después evaluar puente propio con acciones nativas; alternativa comandos/UI. No copiar código GPL ni tocar DTC. Se documentó matriz y secuencia de prueba en FEASIBILITY.
- ONW no ha ejecutado Vivaldi ni cambiado código, versión, permisos o instalación. No se repitieron tests/build del scaffold. No se verificó CI en esta intervención.

## P3: investigación de acciones internas y herramientas (2026-11-25)

- Identificadas referencias comunitarias de windowPrivate y sessionsPrivate, comandos nativos y catálogo de preferencias. Ninguna confirma una firma de creación activa invocable por ONW. No usar sesiones guardadas ni windowKey como sustituto.
- Añadido research/ con escáner PowerShell de JS instalado, sonda de lectura del esquema/API en UI y guía. Son herramientas de investigación no empaquetadas; no se han ejecutado en Windows/Vivaldi ni se afirma validación de sintaxis PowerShell. No se modificaron código de extensión, versión, permisos ni DTC; no se reejecutó build/tests.
- Criterio de parada documental alcanzado por ahora: siguiente evidencia requiere versión local y resultados de inspección. No reiniciar ni alterar el perfil habitual.

## Preview 0.1.1 y repriorización (2026-11-25)

- Entorno confirmado por captura del propietario: Vivaldi 8.3.4191.47 x64, Chromium 156.0.8078.110, Windows 11 26H2 build 26300.9974. Se omiten datos personales.
- El propietario confirma que DTC sigue siendo compatible y no le ha fallado con nuevas versiones; distinguir reporte actual de incidentes históricos. No se verificó su instalación desde ONW.
- El propietario autoriza diferir creación/nombre/icono para acelerar entrega. Primera versión funcional debe priorizar base y existentes, enfoque e idioma. La preview 0.1.1 solo abre ventana normal, muestra guía manual, cambia idioma y deja creación deshabilitada. No cumple aún RF-07 a RF-10 completos.
- Ejecutados check, test (7/7), build e integridad ZIP en Linux/Node 22.16.0; sin prueba Vivaldi, CI remoto no confirmado. Se verificó que los 5 archivos de extensión del ZIP coinciden con fuentes locales. No se cambia DTC ni se modifica Vivaldi, no se publica release.

## 0.1.2: integración experimental (2026-11-25)

- Investigado mod comunitario workspaceButtons.js; identificada ruta de selección por menú nativo. Añadidos bridge/onw-workspace-bridge.js, worker, cliente, tests de lógica y puente con dobles, y guía de validación.
- Listado real candidato; foco por ID verificado; apertura de inactivo en destino mediante selección nativa estricta y postcondición. No se escribe prefs ni mueve/cierra pestañas directamente. Puede quedar ventana adicional ante fallo/carrera, avisada al usuario.
- Se añadió permiso storage (estado de operación en sesión) y clave pública de desarrollo propia; no hay clave privada guardada ni permiso de hosts. No modificar DTC.
- Conector permitió preparar commits, pero el entorno local no resuelve GitHub y no pudo descargar las fuentes exactas del nuevo commit para ejecutar Node. No se atribuyen resultados previos a esta versión. La CI de Windows se verificó posteriormente: check/test/build exitosos en el commit a0f43b31b61269b8f36789e3ccdf0226ad8b3879 (run 45632780858). Ejecución real Vivaldi pendiente; no se entregó ZIP instalable 0.1.2 ni se publicó release.
- La integración depende de instalar/cargar el puente en el UI de todas las ventanas. No hay autorización de modificación del navegador habitual; no realizarla ni reiniciar. Mantener 0.1.1 como preview sin puente hasta validar.

## Entrega de instalación personal experimental (2026-11-25)

- El propietario solicita instalador o instrucciones. Se eligió entrega manual sin dependencias ni scripts de modificación automática: ZIP de fuentes fijado a e08b4da y carga de extension/ directamente; copia del puente independiente y cambio acotado de window.html con backup. Ver docs/INSTALL_WINDOWS.md.
- El código 0.1.2 y resultados de CI no cambian; se comprobó existencia de los archivos en GitHub. No se generó ni verificó un ZIP binario local nuevo; se ofrece el archivo fuente de GitHub, no un CRX ni release.
- No se ha instalado en el PC del propietario, ni se ejecutó Vivaldi, ni se modificó DTC. Prueba en instalación Standalone antes de uso habitual; no reiniciar sesión habitual. Desinstalación y recuperación documentadas. No se repitieron tests por cambio documental.

## Continuación y coexistencia (2026-11-25)

- HEAD inicial df7fda8c5419e002f630cc41db84c00dd51aba7b recuperado por conexión GitHub; DTC sigue en a3b20600bdab4a0f58bade05f0175da5822e259a. Revisados ambos listeners y Repair-VivaldiBridge.ps1: IDs, protocolo y registro global independientes; DTC inserta en HTML existente, sin coordinación de escrituras. Coexistencia plausible, no demostrada.
- Verificado de nuevo el job check del run 45632780858: check/test/build success; comparación a0f43b3...e08b4da y e08b4da...df7fda8 muestra únicamente cambios Markdown. ZIP fuente fijado a e08b4da corresponde al código probado, no contiene la guía posterior.
- Guía y matriz C-01 a C-05 ampliadas; propuesta de utilidad asistida manual sin ejecución automática. No se ha generado instalador, ni ejecutado Vivaldi/Windows ni tocado DTC, PC, perfiles, permisos o código de producto. No se repiten pruebas de código por cambio exclusivamente documental.
- Próxima acción: descargar fuente, cargar extensión en Standalone, identificar recursos y seguir guía; validar ONW y después coexistencia real autorizada. No confundir primera prueba aislada sin DTC con coexistencia.

## Instalación reportada por el propietario (2026-11-25)

- El propietario confirma extracción del ZIP, copia del bridge, respaldo de window.html, inserción de referencia ONW, carga descomprimida y reinicio de Vivaldi. No se ha inspeccionado localmente la instalación ni se conoce si es Standalone o habitual; no se afirma que el bridge responda ni que DTC coexista correctamente.
- Siguiente acción: prueba manual agrupada de DTC inicial, interfaz, catálogo, foco de activo, apertura de inactivo, base, idioma y DTC final. Usar pestañas de prueba; detener ante pérdida de datos o fallo DTC, registrar errores sin reintentos ciegos. Aceptación y pruebas C siguen pendientes. ONW-013 queda como propuesta no bloqueante para esta instalación ya realizada.

## QA 0.1.2 reportada y candidato UX 0.1.3 (2026-11-25)

- Propietario reporta listado real OK, base OK, idioma/persistencia OK; interfaz parcial (estrecha, oscura, clic adicional); foco activo y apertura inactivo fallan. Apertura deja nueva ventana con selector nativo abierto. No se recibieron códigos exactos; pérdida de pestañas/origen no confirmados.
- DTC inicial/final OK anulados por el propietario: no comprendió abreviatura; informa que Duplicate Tabs Closer dejó de detectar duplicados en todos los escenarios. Incidencia P0, causalidad no establecida. No declarar coexistencia ni usar ONW en habitual hasta diagnóstico. Probar DTC en Do nothing con dos pestañas de prueba idénticas, Active window y Active Vivaldi Workspace; recoger Copy diagnostics si aparece. Desactivar ONW y retirar solo su referencia en window.html con Vivaldi cerrado, conservar DTC y reiniciar voluntariamente. Repetir prueba DTC; no cerrar duplicados.
- Inspección: SELECT abre botón nativo y puede fallar por coincidencia de fila, revalidación o evento/postcondición; sin código de error no se distingue. Foco puede fallar por clasificación del estado o verificación de windows.update; no se atribuye una causa sin evidencia. Reabrir popup para leer último resultado persistido por worker cuando sea seguro.
- 0.1.3 candidato UX exclusivamente: popup 420px, claro, catálogo visible y consulta automática al abrir, botón actualizar, icono NW PNG local y versión coherente. No se cambia bridge, worker, permisos ni lógica de apertura/enfoque. No instalar candidato habitual hasta recuperar DTC. Tests estáticos añadidos; CI de esta revisión aún no verificada, no se afirma runtime.
- Próximo: recuperar DTC mediante aislamiento, confirmar diagnóstico; después corregir lógica de foco/selección con evidencia y retestar. No se publica release ni se modifica repositorio DTC.

## Observación adicional y ajuste visual (2026-11-25)

- Propietario solicita paleta gris; candidato 0.1.3 mantiene 420px, modo claro, lista automática y NW, ahora en escala de grises. CI de candidato anterior 3d429ec aprobada (run 45640892074, check/test/build); la revisión gris requiere CI propia.
- El propietario observa apertura del panel lateral nativo «Lista de vistas de lectura» al abrir una nueva ventana mediante ONW. No consta si sucede con Base, Existing o ambos, ni si una ventana nativa también restaura el panel. No atribuir todavía a ONW ni a DTC. ONW no invoca explícitamente lista de lectura.
- Comparación de bridge con mod comunitario workspaceButtons.js: ONW despacha eventos pointerdown/up sobre elemento DOM o click; referencia invoca directamente el handler React onPointerDown con pointerup posterior. Diferencia plausible en interacción, no causa demostrada. No ampliar selectores ni ocultar panel como compensación. Obtener evidencia mínima de apertura nativa vs base vs existente cuando sea seguro; priorizar recuperar DTC y no repetir mutaciones fallidas. Sin cambios de bridge, worker, permisos ni lógica en este ajuste.

## Aislamiento reportado y temas seleccionables (2026-11-25)

- DTC falla en Active window y Active Vivaldi Workspace tanto con ONW como sin ONW ni su puente, según las cuatro pruebas reportadas. No hay diagnóstico disponible. ONW no es condición necesaria del fallo; no se descarta causa persistente ni se afirma coexistencia. Investigación DTC separada y sin cambios a su repositorio; recuperar línea base antes de aceptar coexistencia.
- Panel lateral Lista de vistas de lectura: Ctrl+N NO, ONW Base NO, ONW Existing SÍ. Se acota a ruta de selección existente; no cambiar creación normal ni cerrar panel automáticamente. No hay código de error. No repetir pruebas mutantes de 0.1.2; siguiente evidencia mínima será inspección de solo lectura del DOM de selector nativo y estado activo en instalación aislada.
- Usuario solicita temas elegibles y menor luminosidad, dado su tema de navegador gris oscuro. 0.1.3 candidata incluye Configuración con gris oscuro inicial, gris claro y claro azulado atenuados, persistencia local separada del idioma y accesibilidad de foco/contraste; icono NW gris conservado en cuatro tamaños. No nuevos permisos. No se alteró bridge, worker ni lógica de apertura. Tests de validación y persistencia añadidos.
- CI revisión gris 921cdc9 aprobada (run 45641339207); nueva revisión de temas pendiente CI. No se ejecutó Vivaldi ni se instaló. No release. No utilizar selección existente en navegador habitual hasta corregir y verificar.

- Preparado research/inspect-native-workspace-menu.js y guía: captura de estructura/handlers/coincidencia exacta por ordinal y estado activo, sin nombres/IDs ni eventos; puede ejecutarse sin ONW instalado. No ejecutado en runtime. Si selector se cierra al inspeccionar, registrar bloqueo. No se requieren nuevos intentos de apertura automática.

## Continuidad y siguiente diagnóstico (2026-11-25)

- CI de temas 799a17e aprobada en Windows (run 45642456686; check/test/build). Revisión visual en Vivaldi pendiente. HEAD anterior a esta documentación: 2cf9243ae0b184222c2f7abe9d26a7c48bc8bdaa.
- Propietario trabaja en chat temporal: antes de pedir cerrar/reiniciar Vivaldi, obligatorio actualizar checkpoint y docs/RESUME_PROMPT.md y entregar prompt completo copiable/descargable en chat. Formularios con comentarios adicionales. Regla incorporada a AGENTS y WORKFLOW.
- Diagnóstico inmediato ONW-MENU de solo lectura, sin reinicio ni reinstalación. Último estado local según aislamiento: ONW desactivado y sin referencia de puente; no consta reinstalación. No repetir prueba DTC ni usar Existing automático. Solicitar JSON o bloqueo y comentarios; analizar después. No se ha ejecutado Vivaldi desde agente ni se cambió código, DTC o instalación.

## Resultado real ONW-MENU-v1 y siguiente diagnóstico (2026-11-25)

- ONW-MENU-v1 ejecutado correctamente por propietario: catálogo 8, dos ventanas con activeCount=1 y Workspace nombrado (ordinales 7 y 3), único BUTTON de menú visible y habilitado con handlers onPointerDown/onClick/onKeyDown, centro correcto, rowsBefore=0 y rowsAfter=[] pese a reportar selector abierto. No demuestra ausencia de selector: posible otra ventana, cierre/temporización o estructura distinta. No prueba foco ni selección. DTC ahora funciona en Active Window, sigue fallando en Active Vivaldi Workspace; propietario no ve puente DTC en inspect. El puente se ejecuta dentro de window.html, no es necesariamente una entrada separada; comprobar referencia script y listener sin invocar. No se modifica DTC.
- Se añade research/inspect-native-workspace-menu-v2.js: ventana inspeccionada identificada por ordinal, muestreo acotado 15 s de controles visibles nuevos, estructura y coincidencias por ordinal, contador de pulsación humana sobre botón inspeccionado, presencia de referencias y listeners DTC/ONW. Sin clics sintéticos, cambios de DOM/archivos/preferencias, red ni reinicio. Listener diagnóstico pasivo temporal retirado al finalizar. No se ejecutó v2 en Vivaldi.
- Una sola ronda adicional de inspección dirigida. Si no muestra elementos pese a pulsación correcta, pasar a inspección estática local de recursos de Vivaldi o identificar otro contexto; no ampliar selectores de producción a ciegas ni repetir indefinidamente. No se modifica código de producto ni se solicita reinicio.

## Resultado V2 y candidato funcional 0.1.4 (2026-11-25)

- ONW-MENU-V2 real: 57 muestras, una pulsación humana en ventana correcta, catálogo 8, 8 filas BUTTON.workspace-item-wrapper en .WorkspacePopup > .WorkspacePopup-Items > .WorkspacePopup-DragArea, handlers de fila onPointerUp/onClick/onKeyDown, botón anclado workspace-popup.workspace-anchor.tabbar-workspace-button con onPointerDown/onClick/onKeyDown. Solo ordinales 3 y 7 coincidieron exactamente (eran activos en V1). No se observó contenido/forma de etiquetas restantes; no inferir orden como identidad. Ambos puentes presentes una vez y listeners definidos/registrados en ventana inspeccionada. DTC volvió a funcionar normalmente sin cambios/reinicio según propietario; causa transitoria desconocida; estado ONW local previo incierto porque v2 sí muestra bridge cargado. Coexistencia después de operaciones ONW aún pendiente.
- Candidato 0.1.4: protocolo 3 obligatorio en extensión/puente (incompatible con 2, evita mutaciones con puente antiguo); selector acotado al menú real y botón de barra confirmado, activación de botón con coordenadas de centro verificadas y fila mediante un único click dirigido con onClick comprobado. Identificación de todas las filas mediante catálogo, texto/título/aria y descendientes, nombres con emoji y sufijo numérico acotado como hipótesis, exige biyección y revalidación; nunca ordinal/subcadena arbitraria. Si no resuelve, error explícito sin elegir otra fila. Verifica ventana destino enfocada antes de mutar; deadline previo; lectura posterior. Foco estándar con consulta posterior acotada y snapshot desde destino, no se crea ventana ante fallo de foco. No modificar preferencias, DTC, cierre de panel o pestañas. UX 0.1.3 conservada. Pruebas con dobles añadidas, runtime pendiente.
- Código eb4c60f2f911b88292fb1f61791006076988c404. CI Windows de este candidato aprobada: run 45645828628, npm run check, npm test y npm run build success; no se ejecutó Vivaldi desde agente. No publicar release. No repetir ONW-MENU. Probar candidato según D-033 (sustituye recomendación histórica de instalación separada); si identidad no resuelve, inspección estática local enfocada, no adivinar ni repetir clics.

## Corrección obligatoria del entorno y flujo (2026-11-25, D-033)

- El propietario confirma una única instalación habitual de Vivaldi en Windows, sin Standalone ni segunda instalación. La validación se hará allí, mediante actualización manual explícita, respaldo y reversión selectiva, agrupando cambios para un solo cierre/reinicio cuando se requiera cargar el puente. No exigir ni sugerir Standalone como condición de avance, ni asumir que un perfil adicional aísla los archivos de aplicación. El riesgo residual de probar en el navegador habitual existe; preservar sesión, pestañas y DTC; no automatizar cierre ni modificar DTC. En la respuesta previa al reinicio entregar instrucciones de descarga/instalación y prompt completo descargable/copiable; NO pedir responder formularios ni realizar QA posreinicio en ese chat. El usuario instala, reinicia y pega el prompt en un chat temporal nuevo. Solo allí confirmar instalación y presentar formulario de pruebas con comentarios adicionales. Si surge bloqueo antes de reiniciar, detenerse y reportarlo; si se requiere otro reinicio, nuevo prompt actualizado.
- Candidato 0.1.4 eb4c60f2f911b88292fb1f61791006076988c404, CI 45645828628 aprobada. No instalado por reporte. El último informe V2 muestra ambos scripts y listeners cargados, DTC recuperado; estado del disco y de la extensión actual no verificado. No exigir repetir diagnósticos. Mantener ruta E:\Vivaldi_OpenNewWorkspace\extension y bridge fuente E:\Vivaldi_OpenNewWorkspace\bridge; preparar ZIP en carpeta temporal independiente, respaldar y sustituir solo ONW. La guía vigente reemplaza indicaciones previas de Standalone y de QA en el mismo chat.
- Siguiente entrega: instrucciones de instalación en habitual, prompt descargable completo, reinicio manual único; no formulario en este chat. Próximo chat: confirmar versión/carga, validar DTC, foco/apertura/base/UX y preservar datos. No se ha intervenido PC ni cambiado código.

## Organización local D-034 (2026-11-25)

- D-034: todas las futuras entregas de ONW deben mantener ZIP, extracción y respaldos de cada versión dentro de una subcarpeta de E:\Vivaldi_OpenNewWorkspace\. Convención propuesta: versions\<versión>\ (ZIP y extracción) y backups\<versión>_<fecha-hora>\ (respaldo). No pedir carpetas de preparación fuera de la raíz. Mantener extension\ y bridge\ de la raíz como rutas activas estables; copiar desde la subcarpeta de versión, sin mezclar versiones ni borrar archivos históricos. El puente ejecutable sigue en los recursos de Vivaldi. Excepción expresamente autorizada: para la prueba 0.1.4 ya instruida, conservar E:\ONW_0.1.4_STAGE\; no mover ni repetir preparación. La regla se aplica a entregas posteriores. No implica cambiar de instalación Vivaldi.
- Cambio únicamente documental; 0.1.4 sigue pendiente de instalación y QA, mismo ZIP/CI, mismo flujo D-033. No repetir instrucciones ni solicitar traslado de preparación actual.

## Bloqueos y siguiente acción

1. P0: CI 0.1.4 aprobada; prueba funcional controlada en única instalación habitual pendiente de foco/apertura. DTC recuperado por reporte; comprobar coexistencia después de operaciones, no intervenir DTC.
2. No repetir diagnóstico dinámico v1/v2. Ante error de identidad, registrar código y pasar a inspección estática si hace falta. Instalación candidata habitual autorizada por el propietario, con medidas D-033; no declarar estable hasta aceptación.
3. Preservar Base/listado/idioma y validar UX/temas/icono acumulados; creación diferida.

No se han tocado otros repositorios. La versión 0.1.2 declara solo storage; sin permisos de hosts. No se ha asignado una licencia. Se conserva la visibilidad pública observada.

## Plantilla de actualización de checkpoint

- Fecha, versión, rama y commit (si existe):
- Cambios realizados / archivos afectados:
- Comandos ejecutados y resultados:
- Entorno, pruebas manuales y evidencias:
- Estado remoto / CI / release:
- Bloqueos y decisiones pendientes:
- Próxima acción concreta:

## Checkpoint vigente: QA-ONW-014 y desarrollo 0.1.5

QA-ONW-014 (25-11-2026, reporte propietario): instalación/reinicio completados sin incidencia reportada; versión/ID no comprobables. 13 OK: DTC inicial, catálogo automático, foco activo sin ventana adicional, pestañas destino, origen/pestañas, Base, icono NW, gris oscuro, gris claro, claro azulado, idioma ES/EN, persistencia tema, DTC final. 2 parciales: identidad sin duplicar, ancho/tres opciones. 2 fallos: abrir inactivo exactamente una ventana y ausencia panel Lista de vistas de lectura. Idioma persistente OK dentro del caso ES/EN. Error literal: Operation not confirmed. (NATIVE_ROW_IDENTITY_UNVERIFIED) An additional window opened; it will not be closed automatically. Check windows before retrying. No inferir causa, estado exacto de ventana extra ni coexistencia global. Captura: popup estrecho, textos partidos, error alto, EN. No repetir la operación fallida, V1/V2 ni aislamiento DTC.

Requisitos nuevos confirmados: ES por defecto solo si no hay preferencia válida previa; conservar EN explícito. Cuatro temas persistentes: gris oscuro predeterminado, gris claro, claro azulado y Dark Blue (azul oscuro atenuado). Objetivo ancho efectivo 420 px y menor altura, sin perder tres acciones/listado/icono NW; error compacto con código desplegable y advertencia de ventana adicional visible.

HEAD inicial verificado 3af8a299f521b24c55100c3c3a4f1c379f0f52de; delta respecto a eb4c60f2f911b88292fb1f61791006076988c404: cinco commits, solo Markdown. Git local no resuelve github.com; conector autenticado sí lee. Parches UX y clasificación de errores recibidos; resultados anteriores únicamente fixtures, no suite integrada. 0.1.5 en desarrollo, no instalar ni reiniciar; no release ni incremento de versión aún. Integrar UX y pruebas sobre fuente exacta, comprobar check/test/build y CI Windows. Identidad y panel requieren evidencia estática del componente nativo de Vivaldi 8.3.4191.47: no elegir por ordinal, subcadena ni relajar biyección; no cerrar panel ni ventanas automáticamente. D-033/D-034 vigentes; no modificar DTC. Si falta evidencia, solicitar exclusivamente fragmentos estáticos focalizados de resources/vivaldi, sin reinicio ni nueva QA.

## Integración UX 0.1.5 (desarrollo, no instalar)

Commit de código 7a5917bfafdf1aab5cd73b8cbeeef4f5df7a4af0: transformación del traspaso aplicada con anclas únicas a fuentes fijadas por SHA mediante API GitHub, con pruebas de contrato adaptadas y cuatro nuevas. ES por defecto conserva preferencia válida; cuatro temas; ancho intrínseco 420 px sin max-width 100vw; filas compactas, error de operación desplegable, advertencia visible. No cambiar versión/manifest, worker, bridge, protocolo o permisos; no entregar build instalable hasta resolver bloqueos. Riesgo: Vivaldi puede limitar el ancho del contenedor y provocar overflow; validar en QA futura. Código de identidad y panel sin corrección aún; clasificación propuesta guardada en research sin activarla. Herramienta estática guardada en research; no ejecutada en Windows. Nuevo test del módulo popup con DOM/API dobles, pendiente CI. El sandbox no resuelve github.com y no permite clonación local; CI Windows es verificación del árbol remoto. No nueva prueba manual ni DTC modificado.

## Verificación final de esta intervención (2026-11-25)

CI Windows, Node 22, verificada: commit UX 7a5917bfafdf1aab5cd73b8cbeeef4f5df7a4af0, run [45651775828](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45651775828), check/test (34/34)/build aprobados. Commit de pruebas e investigación 11919c0135f3825d2f9fbab1e0e6b212de85aaf9, run [45651890632](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45651890632), check/test (36/36, cero fallos/omitidos)/build aprobados; dos pruebas del módulo real del popup con dobles de DOM y API verifican ES inicial, EN explícito, persistencia Dark Blue, listado automático, separación del código, aviso visible y detalles ocultos en éxito. No Vivaldi runtime; no se verificó ancho efectivo ni se solucionó identidad/panel. Diff desde HEAD inicial confirma manifest, clave/ID derivada, permisos storage, worker y puente intactos.

HEAD técnico 11919c0135f3825d2f9fbab1e0e6b212de85aaf9. Siguiente acción única: inspección estática ONW-ROW-STATIC-1 del componente instalado. No instalar main, no reiniciar, no repetir QA. D-033/D-034 vigentes. El checkpoint documental posterior no cambia código.

## Evidencia estática ONW-ROW-STATIC-1 (2026-11-25)

Informe real del propietario, Vivaldi 8.3.4191.47: 20 JS inspeccionados, cero omitidos, siete muestras de bundle.js. No se almacena ni publica el bundle ni el JSON. La fila nativa usa div.title con dos p directos: nombre literal y p.tab-count; icono/avatar separado y title puede añadir texto de hibernación. El padre pasa ID nativo, nombre y onSelect a componente de fila; el botón DOM observado no aporta ID nativo demostrado. No confundir data-handler de drag con ID. El onClick de fila llama a selección con ID; se conserva un solo click y verificaciones. Toolbar registra togglePopup para onClick/onPointerDown, pero falta implementación de togglePopup/toolbar genérico y de selección; no se demuestra causa del panel. No invocar detachWorkspace ni APIs privadas nuevas por la mera aparición de un símbolo.

Corrección candidata: leer exclusivamente p de nombre dentro de div.title directo, exigir exactamente un nombre y un contador, comparar nombre literal exacto, exigir biyección completa y revalidación de la misma fila. No usar tooltip, concatenación, emoji añadido, sufijos numéricos u ordinal. Se integran códigos diagnósticos NO_MATCH/AMBIGUOUS/DUPLICATE/TARGET_MISSING/REVALIDATION/ROW_CHANGED. No cambia creación/foco de ventana, eventos, protocolo 3, permisos, manifest, worker ni DTC. QA runtime pendiente y causa concreta del fallo anterior no demostrada. El panel continúa abierto como problema, se requiere traza estática específica de callbacks; no repetir V1/V2 ni QA 0.1.4. No instalar main ni reiniciar.

## Checkpoint vigente tras evidencia de filas

CI Windows Node 22 [45652805888](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45652805888) del commit técnico 0e264097e31318f0f22d349656b2839e10c6331a: check, test (40/40, 0 fallos, 0 omitidos) y build aprobados. Dobles del puente verifican estructura real (nombre separado de avatar, tooltip y contador localizado), reordenación, nombres numéricos y emoji literales, no match/ambigüedad/duplicados, ausencia o duplicación del nombre/ausencia contador, mutación del texto y reemplazo de fila, además de controles previos. No prueba runtime ni confirmación de causa exacta del fallo 0.1.4.

ONW-ROW-STATIC-1 completado: no repetir. Único siguiente paso dirigido: ONW-EVENT-STATIC-2 mediante research/Find-ONW-EventRoute.ps1, lectura acotada de bundle.js con anclas únicas alrededor de callbacks de menú y togglePopup; intenta localizar wrapper genérico de toolbar como candidato, no presupone coincidencia. Sin cambios en Vivaldi, sin eventos, sin reinicio, no publicar informe/bundle. Ejecutar con mismo UiRoot real; revisar salida y compartir JSON en chat, no repo. PowerShell no probado por agente. Si esta evidencia no permite demostrar ruta segura del panel, detener rondas estáticas y declarar bloqueo/decidir candidato con riesgo explícito, no repetir QA antigua. No cambiar política de seguridad, no tocar DTC. D-033/D-034 vigentes. No instalar main.

## ONW-EVENT-STATIC-2 (2026-11-25) y candidato de eventos

Informe recibido y analizado, bundle SHA256 E3DA95063D8EA97E85DD955D8C87F38DBCF339E2C3BB7768FD17BC49CBB9E0D2, 12 fragmentos, wrapper 41830. No publicar bundle ni informe. Selector nativo llama setActiveWorkspace con ventana e ID y oculta su propio menú. Toggle del botón solo alterna visibilidad; wrapper de toolbar tiene camino de teclado Enter/Space que llama onClick y camino puntero que puede instalar captura global de pointerup y temporizador de menú. No aparece una llamada demostrada al panel de lectura; causa concreta sigue desconocida. Mitigación candidata: un único keydown Enter dirigido al botón verificado (keyCode 13 validado, sin puntero, sin fallback ni reintento); conserva foco, hit-test, estructura, biyección y click de fila con postcondición. No ejecutar comandos privados ni cerrar panel. El evento de teclado se propaga para React; efectos globales no descartados sin Vivaldi. No repetir diagnósticos estáticos/dinámicos. Se decide preparar candidato 0.1.5 de QA controlada si CI aprueba, no versión estable, sin prometer resolver panel. Mantener protocolo 3 compatible (sin cambios de mensajes), exigir instalación conjunta del puente y extensión del mismo SHA mediante D-033/D-034. No modificar DTC, permisos, clave ni worker.
