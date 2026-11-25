# Open New Workspace

Extensión de escritorio para **Vivaldi en Windows**. Repositorio: `MrSimkin/vivaldi-open-new-workspace`.

**Estado: 0.1.2 experimental, integración candidata (pre-MVP).** El alcance funcional está aprobado: un botón siempre ofrece crear un Workspace nativo (rápido o con nombre/icono), abrir el espacio base o abrir uno existente. Si este último ya está abierto, se enfoca su ventana. La ventana original permanece abierta. Español e inglés configurables; uso personal. La versión experimental implementa catálogo nativo, decisión de enfoque/apertura y selección candidata mediante un puente ONW independiente. Requiere el puente cargado en Vivaldi; sin él, Existing falla explícitamente. No se ha validado en Vivaldi real. Base abre una ventana normal (semántica pendiente); New Workspace queda deshabilitado. La primera versión útil debe priorizar base y existentes; la creación puede diferirse por autorización del propietario.

## Inicio rápido

Requisitos para desarrollo: Git, Node.js 22 LTS (o una versión posterior compatible), npm y Vivaldi Desktop para Windows. La extensión en ejecución no requiere Node.js.

```powershell
npm run check
npm test
npm run build
```

No hay dependencias npm externas. `npm run build` copia el contenido de `extension/` a `dist/extension/`; no transpila ni descarga código.

### Instalación local (prueba manual pendiente)

1. Ejecutar los comandos anteriores.
2. Abrir `vivaldi://extensions` en Vivaldi; si no redirige correctamente, abrir el gestor de extensiones desde el menú Herramientas.
3. Activar el modo desarrollador y usar **Cargar descomprimida / Load unpacked**.
4. Seleccionar `dist/extension` (o `extension` durante desarrollo).
5. Abrir el icono de Open New Workspace. Debe aparecer el menú de tres opciones con idioma ES/EN. Base abre ventana normal (semántica base por verificar); Existing consulta el puente. New deshabilitado. Consultar [bridge/README.md](bridge/README.md) antes de cualquier prueba de integración. No modificar el navegador habitual.
6. Después de cambiar el código, reconstruir si se usa `dist/extension` y recargar la extensión.

## Documentación y continuidad

- [AGENTS.md](AGENTS.md): instrucciones obligatorias para agentes.
- [Instrucciones de trabajo](docs/WORKFLOW.md): flujo, controles y protocolo de cierre.
- [Requisitos](docs/REQUIREMENTS.md): alcance confirmado y detalles de diseño pendientes.
- [Diseño](docs/DESIGN.md): arquitectura, UX, privacidad y alternativas.
- [Viabilidad de Workspaces](docs/FEASIBILITY.md): investigación y criterio de parada.
- [Estado](docs/STATUS.md): checkpoint de desarrollo, build y pruebas.
- [Pendientes](docs/BACKLOG.md): tareas priorizadas y aceptación.
- [Pruebas](docs/TESTING.md): automatización y matriz de pruebas Windows.
- [Decisiones](docs/DECISIONS.md): registro de decisiones y su autoridad.
- [Historial](CHANGELOG.md): cambios por versión.
- [Publicación inicial](docs/BOOTSTRAP.md): historial de inicialización y clonación.

No hay licencia pública seleccionada. No distribuir ni publicar en tiendas hasta que el propietario lo autorice. El repositorio es público; no confundir visibilidad del código con autorización para redistribuirlo.
