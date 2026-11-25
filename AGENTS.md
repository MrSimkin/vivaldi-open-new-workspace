# AGENTS.md | Open New Workspace

Estas instrucciones aplican a todo el árbol. El propietario previsto es `MrSimkin`; la plataforma objetivo es Vivaldi Desktop para Windows. No ampliar el alcance a otros navegadores por defecto.

## Arranque de una sesión

1. Verificar repositorio, rama y estado de Git. No trabajar sobre otro repositorio de nombre parecido.
2. Leer este archivo, `README.md`, `docs/STATUS.md`, `docs/REQUIREMENTS.md`, `docs/DESIGN.md`, `docs/BACKLOG.md` y `docs/DECISIONS.md`. Consultar `docs/FEASIBILITY.md`, `docs/TESTING.md` y `docs/WORKFLOW.md` según la tarea.
3. Distinguir hechos confirmados, propuestas y pruebas pendientes. Resolver la tarea solicitada, no todo el backlog automáticamente.
4. El alcance funcional y las preferencias ya fueron aprobados; leer RF-01 a RF-13 en REQUIREMENTS. Validar su viabilidad con Vivaldi real; no reabrir requisitos confirmados salvo bloqueo o nueva instrucción. El propietario autorizó diferir la creación y personalización a una versión posterior; priorizar base, listado, selección/enfoque de existentes e idioma. No confundir preview asistida o integración experimental con entrega funcional. Minimizar QA solicitada al propietario por falta de tiempo.

## Entorno operativo obligatorio (D-033)

El propietario confirma una única instalación habitual de Vivaldi en Windows, sin Standalone ni segunda instalación. La validación se hará allí, mediante actualización manual explícita, respaldo y reversión selectiva, agrupando cambios para un solo cierre/reinicio cuando se requiera cargar el puente. No exigir ni sugerir Standalone como condición de avance, ni asumir que un perfil adicional aísla los archivos de aplicación. El riesgo residual de probar en el navegador habitual existe; preservar sesión, pestañas y DTC; no automatizar cierre ni modificar DTC. En la respuesta previa al reinicio entregar instrucciones de descarga/instalación y prompt completo descargable/copiable; NO pedir responder formularios ni realizar QA posreinicio en ese chat. El usuario instala, reinicia y pega el prompt en un chat temporal nuevo. Solo allí confirmar instalación y presentar formulario de pruebas con comentarios adicionales. Si surge bloqueo antes de reiniciar, detenerse y reportarlo; si se requiere otro reinicio, nuevo prompt actualizado.

## Continuidad obligatoria en chat temporal

El propietario trabaja en chat temporal y puede perderlo al cerrar Vivaldi. ANTES de pedir cualquier cierre o reinicio, incluso para retirar un puente, actualizar checkpoint y docs/RESUME_PROMPT.md y entregar un prompt completo, autocontenido y copiable (preferentemente también descargable) en el chat. Debe incluir contexto general y actual, repositorios/rama/HEAD, alcance, preferencias, entorno/rutas, estado local reportado, cambios/CI, QA y bloqueos, instrucciones exactas antes/después del reinicio y próxima acción. No basta un enlace ni referencia a memoria. Nunca cerrar/reiniciar automáticamente. Si no se necesita reiniciar, evitarlo. Formularios de preguntas/QA: campo libre de comentarios adicionales, respuestas parciales admitidas y abreviaturas explicadas.

## Reglas técnicas

- JavaScript ES modules y Manifest V3 como punto de partida; sin frameworks ni dependencias salvo necesidad demostrada.
- Mantener la integración Vivaldi aislada en `extension/workspace-adapter.js` (o módulo sucesor documentado). No confundir una pestaña, ventana, tab group o stack con un Workspace nativo.
- No inventar APIs ni permisos. Registrar fuente, versión de Vivaldi, contexto de ejecución y resultado reproducible de cualquier prueba de capacidad.
- No solicitar permisos amplios, inyectar código en páginas, leer historial, almacenar URL o transmitir datos sin una necesidad funcional aprobada.
- No alterar perfiles del usuario, archivos internos, flags de seguridad, binarios o interfaz interna sin aprobación explícita. Validar en la única instalación autorizada siguiendo D-033 y la guía vigente; usar Workspaces/pestañas de prueba, no una instalación separada inexistente.
- Fallar de forma explícita y sin efectos laterales si la capacidad no existe. No simular éxito ni sustituir silenciosamente la operación.
- No usar secretos ni datos personales en commits. No publicar releases, cambiar visibilidad o añadir licencias sin autorización.
- No sobrescribir cambios ajenos; mantener diffs acotados. No hacer force push ni operaciones destructivas. Respetar las instrucciones de rama y PR del propietario.

## Verificación y cierre

Ejecutar `npm run check`, `npm test`, `npm run build` si el entorno lo permite. Anotar resultados reales y el entorno; no declarar pruebas de Windows/Vivaldi ejecutadas si solo se hicieron pruebas estáticas. Revisar los archivos generados y permisos del manifiesto.

Antes de cerrar, actualizar `docs/STATUS.md` (fecha, cambios, build, tests, limitaciones, próxima acción), `docs/BACKLOG.md` y `CHANGELOG.md` cuando corresponda; documentar nuevas decisiones en `docs/DECISIONS.md` y requisitos aprobados en `docs/REQUIREMENTS.md`. Distinguir estado local, commit, push, CI y release. Dejar instrucciones suficientes para que otro agente continúe sin leer chats previos.
