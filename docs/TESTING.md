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

## Futuras pruebas de MVP (condicionadas al alcance aprobado)

Creación nativa real, activación, nombre/icono, varias ventanas, perfil separado, operación repetida, errores, persistencia y ausencia de efectos laterales. No marcar estos escenarios aprobados hasta definir su comportamiento.
