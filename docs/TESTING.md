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
