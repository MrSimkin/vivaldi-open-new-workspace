# Open New Workspace

Extensión de escritorio para **Vivaldi en Windows**, de uso personal.

**Estado vigente (2026-11-25): 0.1.5 funcional validada, QA-ONW-015 19/19 OK por reporte del propietario.** Base/Existing y UX aceptados; DTC inicial/final OK; panel de lectura no reproducido. New Workspace sigue diferido; MVP completo pendiente. Código validado: `ab3a01a9d758ca0efd28d4db927f77bbba824566`. No release ni reinstalación. D-033/D-034/D-039 vigentes. Instalador PowerShell todavía no validado en Windows.

## Funciones y alcance

- Base: abre una ventana normal sin Workspace nombrado.
- Existing: lista Workspaces nativos, enfoca una ventana existente o abre un Workspace inactivo en exactamente una nueva ventana; conserva origen y pestañas.
- New Workspace: visible pero deshabilitado; creación rápida y personalizada pendiente.
- ES por defecto si no existe preferencia válida; conservar EN explícito. Cuatro temas persistentes, icono NW gris, ancho objetivo 420 px, menor altura y error compacto con detalle desplegable.

## Instalación y desarrollo

No reinstalar la versión actual ni repetir QA por este cierre documental. Para una futura actualización necesaria, usar [entrega nominal D-039](docs/DELIVERY_WINDOWS.md) y [guía manual de respaldo](docs/INSTALL_WINDOWS.md), con D-033/D-034. La extensión no requiere Node.js en ejecución. El puente ONW independiente es obligatorio para Existing; no modificar DTC.

Código de producto fijado: [ZIP fuente 0.1.5](https://github.com/MrSimkin/vivaldi-open-new-workspace/archive/ab3a01a9d758ca0efd28d4db927f77bbba824566.zip). El ZIP nominal entregado al propietario contiene además el instalador; no confundir ambos ni usar main flotante como paquete histórico.

Para desarrollo: Git, Node.js 22 LTS, npm; sin dependencias npm externas.

```powershell
npm run check
npm test
npm run build
```

Build copia extension/ a dist/extension/. CI Windows histórica [42/42](https://github.com/MrSimkin/vivaldi-open-new-workspace/actions/runs/45653569598), pruebas de entrega Linux 45/45. QA real [19/19](docs/TESTING.md#qa-onw-015--aceptación-funcional-real-2026-11-25). PowerShell Windows y CI posterior de entrega no verificados.

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

## Continuidad

Leer primero [STATUS](docs/STATUS.md), [BACKLOG](docs/BACKLOG.md) y [RESUME_PROMPT](docs/RESUME_PROMPT.md). La siguiente etapa propuesta es creación nativa New Workspace; decidir alcance antes de cambios. No repetir diagnósticos ni QA cerradas sin nueva evidencia.

[README histórico previo a consolidación](https://github.com/MrSimkin/vivaldi-open-new-workspace/blob/c0c541ee66241030d5fe27e71e9f3d2a5bb87e1e/README.md).
