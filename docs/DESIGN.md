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

Panel informativo, nombre del producto, estado "En desarrollo" y mensaje de que la creación de Workspaces no está implementada. No hay botones que aparenten ejecutar una función inexistente. La UI inicial está en español salvo nombre propio; idioma final por aprobar. Mantener soporte de teclado, contraste y mensajes claros. El icono definitivo y la identidad visual quedan pendientes.

## Integración futura

Separar interfaz, lógica de dominio e integración con el navegador. El adaptador deberá detectar capacidad real y devolver un resultado explícito; no asumir que la API estándar de pestañas de Chromium es una API de Workspaces. Antes de implementar, confirmar contexto, permisos, comportamiento y errores; introducir pruebas con dobles controlados sin confundirlas con evidencia de Vivaldi real.

## Datos y seguridad

Sin permisos declarados, permisos de hosts, content scripts, almacenamiento, red o telemetría en la base. Preferir mínimo privilegio. No gestionar páginas internas mediante trucos no verificados ni sustituir un Workspace con un grupo de pestañas. Si solo existe una vía no documentada, evaluar estabilidad, distribución y consentimiento antes de adoptarla.

## Alternativas si se confirma H-001

1. Extensión normal con API soportada: opción preferida si se demuestra la capacidad.
2. API interna de Vivaldi accesible a extensiones normales: investigar; no asumir accesibilidad ni estabilidad.
3. Mod de interfaz o componente externo en Windows: alternativas separadas, requieren aprobación, más mantenimiento y no necesariamente cumplen el requisito de extensión convencional.
4. Si ninguna vía resulta viable, documentar el bloqueo y proponer alternativas sin presentarlas como equivalentes.
