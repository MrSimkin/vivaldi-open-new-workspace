# Pruebas y control de calidad

## Automáticas

- `npm run check`: valida manifiesto, referencias locales del popup, permisos iniciales, versión y sintaxis JavaScript.
- `npm test`: pruebas con Node de la frontera de integración y de los contratos estáticos iniciales. No inicia un navegador.
- `npm run build`: valida y copia los archivos de la extensión a `dist/extension/`.
- GitHub Actions: workflow configurado para ejecutar estas comprobaciones en `windows-latest`; CI de 0.1.2 verificada (véase sección posterior).

## Manuales, todas pendientes al inicializar

| ID | Caso | Resultado esperado |
|---|---|---|
| M-01 | Carga descomprimida en Vivaldi Stable Windows | Extensión aparece sin errores de manifiesto. |
| M-02 | Abrir popup | Nombre y estado de desarrollo visibles; sin errores en consola. |
| M-03 | Teclado, zoom, tema claro/oscuro | Texto legible, sin recortes relevantes. |
| M-04 | Abrir/cerrar popup con pestañas y Workspaces existentes | No cambia, crea, mueve ni cierra nada. |
| M-05 | Recargar extensión y reiniciar navegador de prueba | Sigue disponible; no hay cambios no solicitados. |
| M-06 | Inspección de permisos | Sin permisos extra ni accesos de host solicitados. |

Usar perfil de prueba, nunca el perfil habitual para experimentos con APIs internas. Registrar fecha, versión de Windows, versión exacta de Vivaldi, build/commit, pasos, resultado y evidencia (sin datos personales).

## 0.1.2 experimental: CI aprobada; runtime pendiente

Suite de Node cubre validación de catálogo, IDs estrictos, foco sin creación, apertura en destino, estados desconocidos, nombres duplicados, carrera, error sin reintentos, idioma y manifiesto; pruebas del puente con VM simulada cubren wrapper, remitente, destino, catálogo, estado y rechazo de selección activa. Suite, check y build aprobados por GitHub Actions en Windows (run 45632780858, commit a0f43b31b61269b8f36789e3ccdf0226ad8b3879). No se ejecutó Vivaldi. Los dobles no prueban eventos DOM ni API privada de Vivaldi. Antes de instalación habitual, seguir bridge/README.md. Comprobar que selección automática no cambia pestañas del origen, no duplica espacios y enfoca ventana activa. Ante error conservar ventana adicional y reportar código, no reintentar ciegamente. No requerir QA extensa al propietario.

## Preview 0.1.1: verificación mínima (histórico)

Pruebas automáticas: 7/7 (manifest, ausencia de permisos, menú, apertura normal y errores sin reintento, idioma). Check/build aprobados en Linux Node 22.16.0. Pendiente una prueba real mínima: cargar descomprimida, abrir popup, cambiar idioma, abrir una ventana normal desde Workspace personalizado, verificar si nueva ventana muestra base y la original sigue abierta. Existing solo guía manual; no marcar A-06 a A-08 como aprobadas. No solicitar QA extensa al propietario ahora. Creación y personalización diferibles.

## Pruebas de aceptación del MVP (alcance aprobado; todas pendientes)

| ID | Caso | Resultado esperado |
|---|---|---|
| A-01 | Pulsar botón desde cualquier Workspace | Siempre aparecen las tres opciones. |
| A-02 | Creación rápida | Nuevo Workspace nativo en otra ventana, sin pestañas heredadas, con valores nativos predeterminados. |
| A-03 | Creación personalizada con nombre e icono nativo | Se aplica nombre e icono si soportado; comprobar en UI nativa. |
| A-04 | Creación con emoji | Se aplica el emoji si soportado; si no, limitación explícita y alternativa nativa, sin éxito falso. |
| A-05 | Abrir base desde un Workspace nombrado | Nueva ventana base, sin crear Workspace adicional; origen intacto. |
| A-06 | Listar existentes | Lista coincide con Workspaces reales del perfil; no se duplica ni se inventa ninguno. |
| A-07 | Abrir existente no abierto | Nueva ventana con mismo Workspace y pestañas existentes; sin duplicado. |
| A-08 | Elegir existente ya abierto en otra ventana | Se enfoca esa ventana; no se abre otra ni se trasladan pestañas. |
| A-09 | Repetir las operaciones y verificar origen | Ventana original permanece abierta; no hay pérdida de pestañas ni datos. |
| A-10 | Cambiar español/inglés y reabrir popup | Textos cambian y preferencia se conserva (persistencia propuesta). |
| A-11 | Fallo de API, lista desactualizada o clic repetido | Error explícito; sin éxito simulado ni duplicado accidental. |
| A-12 | Seleccionar Workspace activo en la propia ventana | Comportamiento provisional: mantener/enfocar esa ventana; confirmar si se requiere otra semántica. |

Validar en Windows/Vivaldi real. No usar pruebas unitarias como sustituto de estas verificaciones.

## Coexistencia ONW/DTC (pendiente, 2026-11-25)

| ID | Caso | Aceptación |
|---|---|---|
| C-01 | Línea base DTC y archivos antes de editar | Consulta/revisión DTC funciona; referencias y hashes registrados sin datos personales. |
| C-02 | Instalación ONW | Único cambio HTML es referencia ONW; DTC intacto; una referencia ONW y bridge coincidente con fuente. |
| C-03 | Ambas extensiones cargadas | ONW lista, enfoca y abre con casos A-05 a A-10; DTC reconoce Workspace activo antes/después, sin cierre de pestañas reales. |
| C-04 | Reparación natural de DTC, si ocurre | Referencias ONW y DTC siguen presentes; ambas consultan correctamente. No forzar reparador ni simular resultado si no ocurre. |
| C-05 | Reversión selectiva ONW | Solo se retira referencia/archivo ONW; DTC y otros mods permanecen intactos. Ejecutar en prueba aislada si ambos están presentes; no revertir habitual solo para QA. |

No asumir aprobación por pruebas unitarias o por Standalone sin DTC. Priorizar C-01 a C-03 en la primera coexistencia autorizada; C-04 y C-05 quedan pendientes si no hay ocasión segura. Registrar OK/fallo/no ejecutado, versión y código de error sin URLs ni títulos.

## Resultados manuales 0.1.2 (reporte propietario, 2026-11-25)

| Caso | Resultado |
|---|---|
| Interfaz | Parcial: estrecha, oscura, clic adicional |
| A-06 catálogo | OK |
| A-08 foco activo | Fallo |
| A-07 apertura inactivo | Fallo: nueva ventana con selector nativo abierto |
| A-05 base | OK |
| A-10 idioma/persistencia | OK |
| C-01/C-03 DTC | OK retirados; incidencia de no detección reportada, causa pendiente |
| A-09 preservación | No confirmada explícitamente |

DTC: usar Do nothing, dos pestañas de prueba con URL idéntica no excluida en mismo Workspace/ventana; comparar Active window y Active Vivaldi Workspace. Capturar Copy diagnostics si hay aviso. Aislar desactivando ONW y retirando únicamente su referencia UI con Vivaldi cerrado; comprobar DTC tras reiniciar voluntariamente. No cerrar duplicados ni volver a activar ONW en habitual hasta resolver incidencia. La diferencia entre scopes permite distinguir motor de duplicados y bridge sin alterar código DTC.

0.1.3 UX: pruebas estáticas de lista visible y consulta inicial, tema claro, cabeceras/dimensiones PNG. Runtime pendiente; no confundir con corrección de foco/selección.

### Incidencia adicional: panel lateral Lista de vistas de lectura

Reporte de propietario: al abrir una nueva ventana con ONW aparece dicho panel. No se ha aislado la operación específica. Comparar, cuando sea seguro, Ctrl+N nativo y Workspace base con panel previamente cerrado; aprovechar observación existente de Workspace existente y código persistido, sin repetir mutaciones fallidas solo para QA. Registrar qué operación abre el panel, estado previo y si selector nativo también aparece. No modificar ni cerrar panel automáticamente. Priorizar recuperación DTC. La diferencia entre evento DOM de ONW y handler React de referencia es hipótesis, no resultado confirmado.

## Aislamiento adicional reportado (2026-11-25)

| Caso | Resultado |
|---|---|
| DTC Active window con ONW | Falla |
| DTC Active Vivaldi Workspace con ONW | Falla |
| DTC Active window sin ONW ni puente | Falla |
| DTC Active Vivaldi Workspace sin ONW ni puente | Falla |
| Panel de lectura con Ctrl+N | No abre |
| Panel de lectura con ONW Base | No abre |
| Panel de lectura con ONW Existing | Abre |

Sin código ONW ni diagnóstico DTC. No repetir pruebas de aislamiento; no afirmar causalidad o coexistencia. Siguiente: lectura DOM de menú nativo/estado activo en instalación de prueba; no modificar panel como compensación.

### A-13 Temas

Configuración -> elegir gris oscuro, gris claro o claro azulado, comprobar cambio inmediato, cerrar/reabrir popup y verificar persistencia; cambiar idioma sin perder tema. Icono NW visible en barra con tema oscuro. Pruebas unitarias de preferencia válida/inválida, almacenamiento no disponible y persistencia; estáticas de opciones y CSS. Runtime pendiente.

Diagnóstico dirigido: research/inspect-native-workspace-menu.js, instrucciones en research/README.md; inspección manual de menú sin selección, sin ONW instalado. El JSON permite contrastar selectores, handlers y clasificación de ventanas. No equivale a prueba de apertura ni se ha ejecutado en Vivaldi.

## ONW-MENU-v1 real (2026-11-25)

ONW-MENU-v1 ejecutado correctamente por propietario: catálogo 8, dos ventanas con activeCount=1 y Workspace nombrado (ordinales 7 y 3), único BUTTON de menú visible y habilitado con handlers onPointerDown/onClick/onKeyDown, centro correcto, rowsBefore=0 y rowsAfter=[] pese a reportar selector abierto. No demuestra ausencia de selector: posible otra ventana, cierre/temporización o estructura distinta. No prueba foco ni selección. DTC ahora funciona en Active Window, sigue fallando en Active Vivaldi Workspace; propietario no ve puente DTC en inspect. El puente se ejecuta dentro de window.html, no es necesariamente una entrada separada; comprobar referencia script y listener sin invocar. No se modifica DTC.

V2 preparada para una ronda adicional de diagnóstico, no ejecutada. No es prueba de aceptación de foco/apertura ni coexistencia.

## ONW-MENU-V2 real y 0.1.4 (2026-11-25)

ONW-MENU-V2 real: 57 muestras, una pulsación humana en ventana correcta, catálogo 8, 8 filas BUTTON.workspace-item-wrapper en .WorkspacePopup > .WorkspacePopup-Items > .WorkspacePopup-DragArea, handlers de fila onPointerUp/onClick/onKeyDown, botón anclado workspace-popup.workspace-anchor.tabbar-workspace-button con onPointerDown/onClick/onKeyDown. Solo ordinales 3 y 7 coincidieron exactamente (eran activos en V1). No se observó contenido/forma de etiquetas restantes; no inferir orden como identidad. Ambos puentes presentes una vez y listeners definidos/registrados en ventana inspeccionada. DTC volvió a funcionar normalmente sin cambios/reinicio según propietario; causa transitoria desconocida; estado ONW local previo incierto porque v2 sí muestra bridge cargado. Coexistencia después de operaciones ONW aún pendiente.

Candidato 0.1.4: protocolo 3 obligatorio en extensión/puente (incompatible con 2, evita mutaciones con puente antiguo); selector acotado al menú real y botón de barra confirmado, activación de botón con coordenadas de centro verificadas y fila mediante un único click dirigido con onClick comprobado. Identificación de todas las filas mediante catálogo, texto/título/aria y descendientes, nombres con emoji y sufijo numérico acotado como hipótesis, exige biyección y revalidación; nunca ordinal/subcadena arbitraria. Si no resuelve, error explícito sin elegir otra fila. Verifica ventana destino enfocada antes de mutar; deadline previo; lectura posterior. Foco estándar con consulta posterior acotada y snapshot desde destino, no se crea ventana ante fallo de foco. No modificar preferencias, DTC, cierre de panel o pestañas. UX 0.1.3 conservada. Pruebas con dobles añadidas, runtime pendiente.

Regresiones: protocolo anterior rechazado; mapeo de etiquetas decoradas, ambigüedad y falta de identidad bloquean selección, destino no enfocado, fila cubierta/reemplazada; foco tardío y fallo sin reintento. Dobles no confirman firma/evento real ni etiquetas reales. QA mínima controlada (D-033, única instalación habitual): listado y tema/icono; enfocar activo, abrir inactivo, preservar origen/pestañas, panel lectura no aparece, base, persistencia idioma/tema, DTC antes/después si está presente. Registrar código al reabrir popup; no repetir fallo. No considerar estable hasta validar en habitual.

## Flujo obligatorio D-033 (vigente, sustituye recomendaciones históricas)

El propietario confirma una única instalación habitual de Vivaldi en Windows, sin Standalone ni segunda instalación. La validación se hará allí, mediante actualización manual explícita, respaldo y reversión selectiva, agrupando cambios para un solo cierre/reinicio cuando se requiera cargar el puente. No exigir ni sugerir Standalone como condición de avance, ni asumir que un perfil adicional aísla los archivos de aplicación. El riesgo residual de probar en el navegador habitual existe; preservar sesión, pestañas y DTC; no automatizar cierre ni modificar DTC. En la respuesta previa al reinicio entregar instrucciones de descarga/instalación y prompt completo descargable/copiable; NO pedir responder formularios ni realizar QA posreinicio en ese chat. El usuario instala, reinicia y pega el prompt en un chat temporal nuevo. Solo allí confirmar instalación y presentar formulario de pruebas con comentarios adicionales. Si surge bloqueo antes de reiniciar, detenerse y reportarlo; si se requiere otro reinicio, nuevo prompt actualizado.

Pruebas posteriores a instalación 0.1.4: confirmar versión y listado, línea base DTC con pestañas de prueba, foco activo, apertura inactiva, panel de lectura, origen y pestañas, Base, idioma/tema/icono y DTC final. Si falla DTC inicial, detener mutaciones; si falla ONW, copiar código al reabrir popup y no reintentar. Usar Workspaces ficticios y pestañas sin datos. C-04 solo si reparación natural; no solicitar reversión C-05 únicamente para QA en habitual. La presencia de ambos listeners no equivale a coexistencia aprobada.

## QA-ONW-014 — resultado real registrado (no repetir)

QA-ONW-014 (25-11-2026, reporte propietario): instalación/reinicio completados sin incidencia reportada; versión/ID no comprobables. 13 OK: DTC inicial, catálogo automático, foco activo sin ventana adicional, pestañas destino, origen/pestañas, Base, icono NW, gris oscuro, gris claro, claro azulado, idioma ES/EN, persistencia tema, DTC final. 2 parciales: identidad sin duplicar, ancho/tres opciones. 2 fallos: abrir inactivo exactamente una ventana y ausencia panel Lista de vistas de lectura. Idioma persistente OK dentro del caso ES/EN. Error literal: Operation not confirmed. (NATIVE_ROW_IDENTITY_UNVERIFIED) An additional window opened; it will not be closed automatically. Check windows before retrying. No inferir causa, estado exacto de ventana extra ni coexistencia global. Captura: popup estrecho, textos partidos, error alto, EN. No repetir la operación fallida, V1/V2 ni aislamiento DTC.

Nueva aceptación UX: ancho efectivo 420 px en Vivaldi, menor altura, cuatro temas, ES inicial sin borrar EN guardado, código desplegable y advertencia visible. No confundir pruebas estáticas con QA real. 0.1.5 en desarrollo, no instalar ni reiniciar; no release ni incremento de versión aún. Integrar UX y pruebas sobre fuente exacta, comprobar check/test/build y CI Windows. Identidad y panel requieren evidencia estática del componente nativo de Vivaldi 8.3.4191.47: no elegir por ordinal, subcadena ni relajar biyección; no cerrar panel ni ventanas automáticamente. D-033/D-034 vigentes; no modificar DTC. Si falta evidencia, solicitar exclusivamente fragmentos estáticos focalizados de resources/vivaldi, sin reinicio ni nueva QA.

## CI integrada 0.1.5 (desarrollo)

CI Windows, Node 22, verificada: commit UX 7a5917bfafdf1aab5cd73b8cbeeef4f5df7a4af0, run [45651775828](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45651775828), check/test (34/34)/build aprobados. Commit de pruebas e investigación 11919c0135f3825d2f9fbab1e0e6b212de85aaf9, run [45651890632](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45651890632), check/test (36/36, cero fallos/omitidos)/build aprobados; dos pruebas del módulo real del popup con dobles de DOM y API verifican ES inicial, EN explícito, persistencia Dark Blue, listado automático, separación del código, aviso visible y detalles ocultos en éxito. No Vivaldi runtime; no se verificó ancho efectivo ni se solucionó identidad/panel. Diff desde HEAD inicial confirma manifest, clave/ID derivada, permisos storage, worker y puente intactos.

## Regresión de identidad 0.1.5

CI Windows Node 22 [45652805888](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45652805888) del commit técnico 0e264097e31318f0f22d349656b2839e10c6331a: check, test (40/40, 0 fallos, 0 omitidos) y build aprobados. Dobles del puente verifican estructura real (nombre separado de avatar, tooltip y contador localizado), reordenación, nombres numéricos y emoji literales, no match/ambigüedad/duplicados, ausencia o duplicación del nombre/ausencia contador, mutación del texto y reemplazo de fila, además de controles previos. No prueba runtime ni confirmación de causa exacta del fallo 0.1.4.

## ONW-EVENT-STATIC-2 (2026-11-25) y candidato de eventos

Informe recibido y analizado, bundle SHA256 E3DA95063D8EA97E85DD955D8C87F38DBCF339E2C3BB7768FD17BC49CBB9E0D2, 12 fragmentos, wrapper 41830. No publicar bundle ni informe. Selector nativo llama setActiveWorkspace con ventana e ID y oculta su propio menú. Toggle del botón solo alterna visibilidad; wrapper de toolbar tiene camino de teclado Enter/Space que llama onClick y camino puntero que puede instalar captura global de pointerup y temporizador de menú. No aparece una llamada demostrada al panel de lectura; causa concreta sigue desconocida. Mitigación candidata: un único keydown Enter dirigido al botón verificado (keyCode 13 validado, sin puntero, sin fallback ni reintento); conserva foco, hit-test, estructura, biyección y click de fila con postcondición. No ejecutar comandos privados ni cerrar panel. El evento de teclado se propaga para React; efectos globales no descartados sin Vivaldi. No repetir diagnósticos estáticos/dinámicos. Se decide preparar candidato 0.1.5 de QA controlada si CI aprueba, no versión estable, sin prometer resolver panel. Mantener protocolo 3 compatible (sin cambios de mensajes), exigir instalación conjunta del puente y extensión del mismo SHA mediante D-033/D-034. No modificar DTC, permisos, clave ni worker.
