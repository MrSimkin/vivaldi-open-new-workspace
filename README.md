# Open New Workspace

Extensión de escritorio para **Vivaldi en Windows**. Repositorio: `MrSimkin/vivaldi-open-new-workspace`.

**Estado: 0.1.5 en desarrollo, no instalar; 0.1.4 probada parcialmente (QA-ONW-014), pre-MVP.** V2 real confirma estructura del menú, eventos y ambos puentes registrados; DTC recuperado por reporte. Candidato corrige selección y foco con protocolo 3, conserva UX 0.1.3 y CI aprobada; QA real parcial registrada en TESTING; apertura inactiva y panel lateral siguen bloqueados. El alcance funcional está aprobado: un botón siempre ofrece crear un Workspace nativo (rápido o con nombre/icono), abrir el espacio base o abrir uno existente. Si este último ya está abierto, se enfoca su ventana. La ventana original permanece abierta. Español e inglés configurables; uso personal. La versión experimental implementa catálogo nativo, decisión de enfoque/apertura y selección candidata mediante un puente ONW independiente. Requiere el puente cargado en Vivaldi; sin él, Existing falla explícitamente. Validación real parcial de 0.1.2; base aprobada por reporte; New Workspace queda deshabilitado. La primera versión útil debe priorizar base y existentes; la creación puede diferirse por autorización del propietario.

## Inicio rápido

Requisitos para desarrollo: Git, Node.js 22 LTS (o una versión posterior compatible), npm y Vivaldi Desktop para Windows. La extensión en ejecución no requiere Node.js.

```powershell
npm run check
npm test
npm run build
```

No hay dependencias npm externas. `npm run build` copia el contenido de `extension/` a `dist/extension/`; no transpila ni descarga código.

### Instalación personal (0.1.4 candidata)

El propietario no dispone de Standalone: usar la única instalación habitual con respaldos y reinicio manual según D-033. Antes de reiniciar, guardar el prompt completo; retomar en nuevo chat temporal para recibir las pruebas, no responderlas en el anterior.

[Guía paso a paso para Windows, descarga y reversión](docs/INSTALL_WINDOWS.md). La carpeta `extension/` se carga directamente, sin Node.js. Para Workspaces existentes se requiere también el puente local independiente y su prueba en Vivaldi.

### Instalación para desarrollo (prueba manual pendiente)

1. Ejecutar los comandos anteriores.
2. Abrir `vivaldi://extensions` en Vivaldi; si no redirige correctamente, abrir el gestor de extensiones desde el menú Herramientas.
3. Activar el modo desarrollador y usar **Cargar descomprimida / Load unpacked**.
4. Seleccionar `dist/extension` (o `extension` durante desarrollo).
5. Abrir el icono de Open New Workspace. Debe aparecer el menú de tres opciones con idioma ES/EN. Base abre ventana normal (semántica base por verificar); Existing consulta el puente. New deshabilitado. Consultar [bridge/README.md](bridge/README.md) antes de cualquier prueba de integración. Usar guía D-033 para cambios autorizados; no modificar DTC.
6. Después de cambiar el código, reconstruir si se usa `dist/extension` y recargar la extensión.

## Documentación y continuidad

- [AGENTS.md](AGENTS.md): instrucciones obligatorias para agentes.
- [Instrucciones de trabajo](docs/WORKFLOW.md): flujo, controles y protocolo de cierre.
- [Requisitos](docs/REQUIREMENTS.md): alcance confirmado y detalles de diseño pendientes.
- [Diseño](docs/DESIGN.md): arquitectura, UX, privacidad y alternativas.
- [Viabilidad de Workspaces](docs/FEASIBILITY.md): investigación y criterio de parada.
- [Estado](docs/STATUS.md): checkpoint de desarrollo, build y pruebas.
- [Prompt de continuidad](docs/RESUME_PROMPT.md): contexto completo para otro chat temporal; actualizar y entregar antes de pedir cualquier cierre/reinicio de Vivaldi.
- [Pendientes](docs/BACKLOG.md): tareas priorizadas y aceptación.
- [Pruebas](docs/TESTING.md): automatización y matriz de pruebas Windows.
- [Decisiones](docs/DECISIONS.md): registro de decisiones y su autoridad.
- [Historial](CHANGELOG.md): cambios por versión.
- [Publicación inicial](docs/BOOTSTRAP.md): historial de inicialización y clonación.

No hay licencia pública seleccionada. No distribuir ni publicar en tiendas hasta que el propietario lo autorice. El repositorio es público; no confundir visibilidad del código con autorización para redistribuirlo.

## Estado vigente 0.1.5

Requisitos nuevos confirmados: ES por defecto solo si no hay preferencia válida previa; conservar EN explícito. Cuatro temas persistentes: gris oscuro predeterminado, gris claro, claro azulado y Dark Blue (azul oscuro atenuado). Objetivo ancho efectivo 420 px y menor altura, sin perder tres acciones/listado/icono NW; error compacto con código desplegable y advertencia de ventana adicional visible.

0.1.5 en desarrollo, no instalar ni reiniciar; no release ni incremento de versión aún. Integrar UX y pruebas sobre fuente exacta, comprobar check/test/build y CI Windows. Identidad y panel requieren evidencia estática del componente nativo de Vivaldi 8.3.4191.47: no elegir por ordinal, subcadena ni relajar biyección; no cerrar panel ni ventanas automáticamente. D-033/D-034 vigentes; no modificar DTC. Si falta evidencia, solicitar exclusivamente fragmentos estáticos focalizados de resources/vivaldi, sin reinicio ni nueva QA.

CI de desarrollo 0.1.5: [36/36, check/test/build Windows aprobados](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45651890632), sin prueba Vivaldi. main conserva versión declarada 0.1.4 mientras se resuelven bloqueos, NO instalar. Próxima acción: [inspección estática focalizada](research/README.md), no reiniciar.

Actualización: selector exacto de nombre nativo integrado, CI Windows [40/40](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45652805888). Inspección ONW-ROW-STATIC-1 completada; falta ruta de eventos/panel, no instalar ni reiniciar.
