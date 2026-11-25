# Pruebas y control de calidad

## Automáticas

- `npm run check`: valida manifiesto, referencias locales del popup, permisos iniciales, versión y sintaxis JavaScript.
- `npm test`: pruebas con Node de la frontera de integración y de los contratos estáticos iniciales. No inicia un navegador.
- `npm run build`: valida y copia los archivos de la extensión a `dist/extension/`.
- GitHub Actions: workflow configurado para ejecutar estas comprobaciones en `windows-latest`; aún sin resultado remoto verificado.

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
