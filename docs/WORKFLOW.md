# Flujo de trabajo

## Entorno y convenciones

Windows como plataforma de validación; Node.js 22 LTS para comprobaciones locales. Git y npm. No instalar dependencias globales innecesarias. Usar UTF-8, finales LF y nombres de archivo estables. Mantener JS modular, HTML semántico, CSS local. No añadir servicios de terceros por defecto.

## Ciclo de desarrollo

1. Leer AGENTS y checkpoint; comprobar `git status --short`, rama, remoto y últimos commits.
2. Elegir una tarea del backlog según la petición actual y confirmar requisitos que alteren el producto.
3. Implementar un cambio pequeño, con prueba y documentación. Mantener permisos mínimos.
4. Ejecutar `npm run check`, `npm test`, `npm run build` y las pruebas manuales que sean aplicables. Revisar diff.
5. Actualizar estado, pendientes y decisiones. Si se entrega una rama, registrar commit y resultado de push/CI por separado.

Para cambios relevantes se recomienda rama `feat/<tema>`, `fix/<tema>` o `docs/<tema>` y revisión antes de integrar a main. Commits breves, descriptivos (`feat:`, `fix:`, `docs:`, `test:`, `chore:`). Política de ramas definitiva pendiente del propietario. No borrar trabajo previo ni aplicar force push.

## Definición de terminado

Requisitos aceptados; código y documentación coherentes; tests apropiados pasan; resultados reproducibles y permisos revisados; estado distingue pruebas automatizadas de ejecución real en Vivaldi. Para una funcionalidad de Workspace, aceptación manual en Windows obligatoria. Una tarea bloqueada debe registrar causa, evidencia y próxima acción, no marcarse como completa.

## Versionado y releases

Manifest y package.json comparten versión SemVer. 0.x indica desarrollo. No etiquetar release ni publicar en tienda sin autorización. El build local no equivale a release. Mantener CHANGELOG y artefactos reproducibles desde fuente.

## Entorno y entrega en dos chats (obligatorio)

El propietario confirma una única instalación habitual de Vivaldi en Windows, sin Standalone ni segunda instalación. La validación se hará allí, mediante actualización manual explícita, respaldo y reversión selectiva, agrupando cambios para un solo cierre/reinicio cuando se requiera cargar el puente. No exigir ni sugerir Standalone como condición de avance, ni asumir que un perfil adicional aísla los archivos de aplicación. El riesgo residual de probar en el navegador habitual existe; preservar sesión, pestañas y DTC; no automatizar cierre ni modificar DTC. En la respuesta previa al reinicio entregar instrucciones de descarga/instalación y prompt completo descargable/copiable; NO pedir responder formularios ni realizar QA posreinicio en ese chat. El usuario instala, reinicia y pega el prompt en un chat temporal nuevo. Solo allí confirmar instalación y presentar formulario de pruebas con comentarios adicionales. Si surge bloqueo antes de reiniciar, detenerse y reportarlo; si se requiere otro reinicio, nuevo prompt actualizado.

**Chat A (previo al reinicio):** CI verificada, paquete fijo, instrucciones completas con rutas verificables, backups, reversión, checkpoint y prompt. Terminar sin formulario de resultados posteriores. **Chat B (posterior al reinicio):** leer prompt y HEAD, verificar versión/puente y estado DTC; proporcionar pruebas agrupadas, resultados con comentarios. No pedir otro reinicio salvo necesidad demostrada y nuevo traspaso.

## Organización local de versiones (D-034)

D-034: todas las futuras entregas de ONW deben mantener ZIP, extracción y respaldos de cada versión dentro de una subcarpeta de E:\Vivaldi_OpenNewWorkspace\. Convención propuesta: versions\<versión>\ (ZIP y extracción) y backups\<versión>_<fecha-hora>\ (respaldo). No pedir carpetas de preparación fuera de la raíz. Mantener extension\ y bridge\ de la raíz como rutas activas estables; copiar desde la subcarpeta de versión, sin mezclar versiones ni borrar archivos históricos. El puente ejecutable sigue en los recursos de Vivaldi. Excepción expresamente autorizada: para la prueba 0.1.4 ya instruida, conservar E:\ONW_0.1.4_STAGE\; no mover ni repetir preparación. La regla se aplica a entregas posteriores. No implica cambiar de instalación Vivaldi.

## Puerta de continuidad antes de cierre/reinicio

1. Confirmar necesidad de reinicio y reducirlos al mínimo; distinguir reinicio de recarga de extensión.
2. Antes de solicitarlo, actualizar STATUS, decisiones/backlog si aplica y docs/RESUME_PROMPT.md con contexto completo y checkpoint actual. Indicar HEAD verificado, código y CI, estado local reportado, QA, pendientes, pasos antes/después y reversión.
3. Entregar el prompt completo en el chat, copiable o descargable, no solo un enlace. Permitir guardarlo fuera de Vivaldi antes del cierre. No asumir memoria o acceso al chat temporal tras reinicio.
4. No cerrar/reiniciar por cuenta propia. Al retomar, leer prompt y HEAD, revisar delta y seguir desde evidencia pendiente; no repetir pruebas.
5. Todo formulario de preguntas/QA incluye campo de comentarios adicionales y acepta respuestas parciales.
