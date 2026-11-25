# Diseño técnico y de producto

## Arquitectura inicial

```text
extension/manifest.json  -> action.default_popup
extension/popup.html     -> estructura semántica
extension/popup.css      -> estilo claro/oscuro, compacto
extension/popup.js       -> presenta estado real de integración
extension/workspace-adapter.js -> frontera técnica; no implementa creación
```

Manifest V3, ES modules, sin dependencias ni servicio de fondo por ahora. Se añadirá un service worker solo si el flujo aprobado lo necesita. `extension/` es la fuente única de los archivos de la extensión; `dist/extension/` es salida generada y no se versiona.

## UX inicial

Panel informativo, nombre del producto, estado "En desarrollo" y mensaje de que la creación de Workspaces no está implementada. No hay botones que aparenten ejecutar una función inexistente. La UI inicial está en español salvo nombre propio; la versión funcional ofrecerá español e inglés configurables. Mantener soporte de teclado, contraste y mensajes claros. El icono definitivo y la identidad visual quedan pendientes.

## UX aprobada para el MVP

```text
Open New Workspace
  New Workspace
    Creación rápida (valores predeterminados)
    Nombre e icono opcionales -> Crear y abrir
  Base Workspace -> Abrir nueva ventana base
  Existing Workspace -> Lista nativa -> Seleccionar
    Ya abierto -> Enfocar ventana existente
    No abierto -> Abrir en nueva ventana
  Ajuste de idioma: ES / EN
```

La ventana de origen permanece abierta. Mostrar siempre las tres acciones principales, independientemente de la última utilizada. Para iconos, priorizar catálogo nativo y emojis si Vivaldi permite su uso; no crear un catálogo que no pueda aplicarse. Propuesta reversible: idioma del navegador por defecto y preferencia persistente local. La presentación exacta y el mecanismo de almacenamiento quedan pendientes. No mostrar una operación como exitosa sin comprobar su resultado.

## Contrato conceptual del adaptador (propuesta, no API existente)

- Listar Workspaces nativos mediante identificadores reales; consultar su asociación a ventanas.
- Abrir ventana base; crear Workspace y abrirlo con metadatos opcionales; abrir existente si no está abierto; enfocar ventana si ya está abierto.
- Revalidar estado al seleccionar y evitar duplicados por carreras o clics repetidos.
- Mantener la identidad del Workspace, sus pestañas y la ventana de origen. Reportar capacidad no disponible o error de manera explícita.

Los nombres, firma y arquitectura definitiva del adaptador dependerán de la prueba de viabilidad; este contrato no implica que Vivaldi exponga esas operaciones.

## Integración futura

Separar interfaz, lógica de dominio e integración con el navegador. El adaptador deberá detectar capacidad real y devolver un resultado explícito; no asumir que la API estándar de pestañas de Chromium es una API de Workspaces. Antes de implementar, confirmar contexto, permisos, comportamiento y errores; introducir pruebas con dobles controlados sin confundirlas con evidencia de Vivaldi real.

## Datos y seguridad

Sin permisos declarados, permisos de hosts, content scripts, almacenamiento, red o telemetría en la base. Preferir mínimo privilegio. No gestionar páginas internas mediante trucos no verificados ni sustituir un Workspace con un grupo de pestañas. Si solo existe una vía no documentada, evaluar estabilidad, distribución y consentimiento antes de adoptarla.

## Alternativas para la integración nativa aprobada

1. Extensión normal con API soportada: opción preferida si se demuestra la capacidad.
2. API interna de Vivaldi accesible a extensiones normales: investigar; no asumir accesibilidad ni estabilidad.
3. Mod de interfaz o componente externo en Windows: alternativas separadas, requieren aprobación, más mantenimiento y no necesariamente cumplen el requisito de extensión convencional.
4. Si ninguna vía resulta viable, documentar el bloqueo y proponer alternativas sin presentarlas como equivalentes.
