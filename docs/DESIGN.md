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

## 0.1.2: integración experimental

Popup ES/EN + service worker MV3 + adaptador + puente ONW por ventana. El worker evita perder el flujo al cerrarse el popup al cambiar el foco, serializa operaciones y guarda último resultado en storage.session. Único permiso nuevo: storage. No se piden permisos tabs ni hosts en la extensión. El puente solo expone ID/nombre/emoji y estado activo; no envía URL/títulos/historial. ID estable propio; PING/SNAPSHOT/SELECT, correlación por petición y ventana. La decisión de foco usa ID nativo exacto y estado actualizado. La apertura de inactivo requiere que todos los estados sean conocidos, nombre único y menú disponible; crea ventana normal, espera su puente, revalida y selecciona usando elementos nativos estrictos. Verifica pertenencia y origen. Si hay fallo o carrera, puede quedar una ventana adicional y se informa; nunca se cierra automáticamente. Selectores y API privada requieren validación en la versión objetivo. Ver bridge/README.md.

## 0.1.3 candidato UX

Popup claro de 420px, listado existente visible desde el inicio y consulta automática sin clic extra. Mantiene botón de actualizar, etiquetas de acción, idioma, creación deshabilitada y mensaje de resultado antes de la lista. Icono NW PNG local en cuatro tamaños. Sin cambios a bridge, protocolo, worker ni lógica de dominio; la incidencia DTC y los fallos de foco/selección siguen abiertos.

## Preview 0.1.1 (histórico)

Menú bilingüe con preferencias en localStorage de la extensión, tres opciones, New deshabilitado, Base llama chrome.windows.create({type:"normal",focused:true}) y Existing explica selección nativa con apertura opcional de ventana normal. No se listan Workspaces ni se comprueba el estado activo. No hay puente, API privada, permisos declarados ni cambios al perfil. El texto informa explícitamente que la asignación base y selección automática están pendientes. La confirmación de ventana se limita al ID devuelto por la API; no confirma Workspace.

## UX inicial (histórico 0.1.0)

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

## Arquitectura candidata tras revisión DTC (no definitiva)

MV3 + adaptador ONW + puente independiente en UI de Vivaldi, si se demuestra que se necesita y es viable. Lectura del catálogo y estado activo a través de APIs internas verificadas; usar acciones nativas para mutaciones y API estándar de ventanas cuando corresponda. Verificar estado antes/después; no abrir ventana innecesaria si ya está activo, no confundir pertenencia de una pestaña con espacio activo. Crear solo en ventana destino. Si la acción no existe, fallar sin simular éxito y sin eliminar pestañas como compensación. Protocolo cerrado con remitente propio, versión, correlación, timeout y acciones permitidas; ningún ejecutor genérico de código ni puente compartido con DTC. Detectar falta de puente tras actualizaciones. No instalar ni modificar Vivaldi habitual sin autorización; no reiniciar para esta investigación. Véase FEASIBILITY.

## Datos y seguridad

Sin permisos declarados, permisos de hosts, content scripts, almacenamiento, red o telemetría en la base. Preferir mínimo privilegio. No gestionar páginas internas mediante trucos no verificados ni sustituir un Workspace con un grupo de pestañas. Si solo existe una vía no documentada, evaluar estabilidad, distribución y consentimiento antes de adoptarla.

## Alternativas para la integración nativa aprobada

1. Extensión normal con API soportada: opción preferida si se demuestra la capacidad.
2. API interna de Vivaldi accesible a extensiones normales: investigar; no asumir accesibilidad ni estabilidad.
3. Mod de interfaz o componente externo en Windows: alternativas separadas, requieren aprobación, más mantenimiento y no necesariamente cumplen el requisito de extensión convencional.
4. Si ninguna vía resulta viable, documentar el bloqueo y proponer alternativas sin presentarlas como equivalentes.
