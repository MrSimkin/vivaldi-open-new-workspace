# Registro de decisiones

| ID | Fecha | Decisión | Autoridad / estado |
|---|---|---|---|
| D-001 | 2026-11-25 | Nombre Open New Workspace; Vivaldi Desktop Windows; compatibilidad Chromium transversal no obligatoria. | Propietario, confirmado. |
| D-002 | 2026-11-25 | Nombre repo `vivaldi-open-new-workspace`, propietario `MrSimkin`, rama `main`. | Agente: nombre delegado; cuenta y rama verificadas en GitHub. |
| D-003 | 2026-11-25 | Privado por defecto, sin licencia pública ni distribución todavía. | Agente: recomendación inicial; visibilidad sustituida por la observada en D-008. |
| D-004 | 2026-11-25 | MV3, JS nativo, sin dependencias, sin permisos, sin service worker inicial. | Agente: elección técnica reversible. |
| D-005 | 2026-11-25 | Popup informativo en español, sin ejecutar acciones; hipótesis Workspace nativo sin aprobar. | Agente: provisional, UX e idioma final pendientes. |
| D-006 | 2026-11-25 | Repo remoto no creado desde chat; paquete local y procedimiento de bootstrap. | Limitación técnica comprobada del conector; propietario creó el remoto después. |
| D-007 | 2026-11-25 | Node.js 22 para herramientas, CI Windows, salida `dist/extension`. | Agente: elección de desarrollo reversible. |
| D-008 | 2026-11-25 | Repo creado por propietario con visibilidad pública, rama main y README inicial. Conservar visibilidad y commit; importar scaffold a solicitud del propietario. | GitHub: observado; agente conserva configuración existente. Licencia y distribución siguen pendientes. |

| D-009 | 2026-11-25 | Uso exclusivamente personal; tres acciones principales siempre visibles: nuevo, base, existente. Creación rápida o con nombre e icono. | Propietario, confirmado; sustituye la hipótesis de D-005. |
| D-010 | 2026-11-25 | Si el existente ya está abierto, enfocar su ventana; mantener abierta la ventana original en todas las operaciones. | Propietario, confirmado. |
| D-011 | 2026-11-25 | Iconos nativos y emojis si es posible; interfaz configurable español/inglés. | Propietario, confirmado; capacidad real de iconos pendiente. |
| D-012 | 2026-11-25 | Investigar viabilidad antes de implementar; propuesta de idioma inicial según navegador y selección persistente local. | Agente: orden de trabajo y propuesta reversible, no decisión del propietario. |

| D-013 | 2026-11-25 | Estudiar DTC como referencia de integración Workspace. | Propietario, confirmado; rama feature/vivaldi-workspace-scope inspeccionada sin modificarla. |
| D-014 | 2026-11-25 | Priorizar verificación de APIs normales y luego puente ONW independiente con acciones nativas; alternativa comandos/UI; descartar escritura directa de prefs como primera ruta. | Agente: decisión preliminar de investigación, no arquitectura final ni autorización de mod. |
| D-015 | 2026-11-25 | No copiar código GPL, reutilizar identidad DTC ni alterar su puente; evitar interrupción de sesión habitual; prueba aislada. | Agente: precauciones derivadas de fuente y reglas existentes. |

Añadir nuevas decisiones con contexto, alternativas, motivo, impacto y autoridad. No convertir propuestas en decisiones del propietario sin confirmación.
