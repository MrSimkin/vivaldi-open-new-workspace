# AGENTS.md | Open New Workspace

Estas instrucciones aplican a todo el árbol. El propietario previsto es `MrSimkin`; la plataforma objetivo es Vivaldi Desktop para Windows. No ampliar el alcance a otros navegadores por defecto.

## Arranque de una sesión

1. Verificar repositorio, rama y estado de Git. No trabajar sobre otro repositorio de nombre parecido.
2. Leer este archivo, `README.md`, `docs/STATUS.md`, `docs/REQUIREMENTS.md`, `docs/DESIGN.md`, `docs/BACKLOG.md` y `docs/DECISIONS.md`. Consultar `docs/FEASIBILITY.md`, `docs/TESTING.md` y `docs/WORKFLOW.md` según la tarea.
3. Distinguir hechos confirmados, propuestas y pruebas pendientes. Resolver la tarea solicitada, no todo el backlog automáticamente.
4. El alcance funcional y las preferencias ya fueron aprobados; leer RF-01 a RF-12 en REQUIREMENTS. Validar su viabilidad con Vivaldi real; no reabrir requisitos confirmados salvo bloqueo o nueva instrucción. El propietario autorizó diferir la creación y personalización a una versión posterior; priorizar base, listado, selección/enfoque de existentes e idioma. No confundir preview asistida con entrega funcional. Minimizar QA solicitada al propietario por falta de tiempo.

## Reglas técnicas

- JavaScript ES modules y Manifest V3 como punto de partida; sin frameworks ni dependencias salvo necesidad demostrada.
- Mantener la integración Vivaldi aislada en `extension/workspace-adapter.js` (o módulo sucesor documentado). No confundir una pestaña, ventana, tab group o stack con un Workspace nativo.
- No inventar APIs ni permisos. Registrar fuente, versión de Vivaldi, contexto de ejecución y resultado reproducible de cualquier prueba de capacidad.
- No solicitar permisos amplios, inyectar código en páginas, leer historial, almacenar URL o transmitir datos sin una necesidad funcional aprobada.
- No alterar perfiles del usuario, archivos internos, flags de seguridad, binarios o interfaz interna sin aprobación explícita. Probar primero en un perfil de prueba separado.
- Fallar de forma explícita y sin efectos laterales si la capacidad no existe. No simular éxito ni sustituir silenciosamente la operación.
- No usar secretos ni datos personales en commits. No publicar releases, cambiar visibilidad o añadir licencias sin autorización.
- No sobrescribir cambios ajenos; mantener diffs acotados. No hacer force push ni operaciones destructivas. Respetar las instrucciones de rama y PR del propietario.

## Verificación y cierre

Ejecutar `npm run check`, `npm test`, `npm run build` si el entorno lo permite. Anotar resultados reales y el entorno; no declarar pruebas de Windows/Vivaldi ejecutadas si solo se hicieron pruebas estáticas. Revisar los archivos generados y permisos del manifiesto.

Antes de cerrar, actualizar `docs/STATUS.md` (fecha, cambios, build, tests, limitaciones, próxima acción), `docs/BACKLOG.md` y `CHANGELOG.md` cuando corresponda; documentar nuevas decisiones en `docs/DECISIONS.md` y requisitos aprobados en `docs/REQUIREMENTS.md`. Distinguir estado local, commit, push, CI y release. Dejar instrucciones suficientes para que otro agente continúe sin leer chats previos.
