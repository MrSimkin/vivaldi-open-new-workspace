# Backlog priorizado

P0 = bloqueante; P1 = próximo MVP; P2 = posterior. No ejecutar tareas de producto sin validar alcance.

| ID | Prioridad | Estado | Tarea y aceptación |
|---|---|---|---|
| ONW-001 | P0 | Hecho | Scaffold y documentación autosuficiente, check/test/build verificables. |
| ONW-002 | P0 | Hecho | Repo creado por propietario, importación verificada en main: 26 archivos, permiso de escritura, commit `480da6f4c1640d58ebd31d1774af43a98aa61af7`. Ver STATUS. |
| ONW-003 | P0 | Hecho | Alcance y preferencias confirmados; RF-01 a RF-12 en REQUIREMENTS, D-009 a D-011 en DECISIONS. |
| ONW-004 | P0 | Hecho por reporte | Cargar scaffold en Vivaldi Windows y documentar versión y resultado del smoke test. |
| ONW-005 | P0 | En curso (runtime pendiente) | Revisión documental DTC y fuentes externas realizada; matriz y plan P0-P4 en FEASIBILITY. Referencias P3 revisadas; herramientas de diagnóstico en research/. Versión recibida; priorizar selección y apertura nativa de existentes y base. Ruta por menú nativo identificada y programada; verificar en Vivaldi 8.3. Creación diferible a ONW-011. |
| ONW-006 | P0 | Candidata implementada | MV3 + worker + puente independiente, pendiente validar arquitectura en única instalación habitual, con D-033. |
| ONW-007 | P0 | Bloqueada parcialmente | QA-ONW-014: foco activo y catálogo OK; apertura inactiva falla, identidad parcial, panel lectura aparece. Evidencia estática pendiente; no repetir V1/V2. |
| ONW-008 | P0 | Pendiente | Validar operación real en Windows, preservación de pestañas y casos de error aprobados. |
| ONW-009 | P1 | Implementación y CI OK; runtime pendiente | UX 0.1.5 integrada, 36/36 CI; verificar ancho efectivo 420px y menor altura en Vivaldi cuando exista candidato coherente. |
| ONW-010 | P2 | Parcial (guía local lista) | Definir licencia, distribución, versión mínima y política de releases; no publicar sin permiso. |

| ONW-012 | P0 | Recuperación reportada; coexistencia pendiente | DTC falla con y sin ONW/puente en ambos ámbitos según aislamiento reportado; causa no demostrada. V2 confirma ambos listeners registrados; DTC funciona normalmente sin cambios/reinicio según propietario; causa transitoria desconocida. Verificar coexistencia después de operaciones ONW; no modificar DTC. |
| ONW-013 | P1 | Propuesta | Evaluar utilidad PowerShell manual con diagnóstico read-only, vista previa, aplicar/revertir explícitamente; sin modificar DTC, sin tarea residente ni reinicio. Validar antes de uso habitual. |
| ONW-011 | P2 | Diferible | Creación rápida y personalizada de Workspace nativo (RF-02 a RF-06), nombre/iconos/emoji si posible. No bloquea primera entrega. |

| ONW-014 | P0 | Regla operativa activa | Continuidad de chat temporal: única instalación habitual; instrucciones y prompt antes de cierre/reinicio, QA y formulario solo en nuevo chat posterior, comentarios adicionales. Ver AGENTS/WORKFLOW/RESUME_PROMPT. |

| ONW-015 | P0 | Regla operativa activa | D-033: no Standalone; actualizar en ruta permanente y única instalación con backups, reinicio manual y traspaso obligatorio. No exigir otra instalación ni preguntar QA posreinicio en chat anterior. |

| ONW-016 | P0 | Regla operativa activa | D-034: preparación de cada futura versión y respaldos dentro de raíz de trabajo ONW, rutas activas estables, excepción única 0.1.4. |

Actualizar estados sin eliminar tareas históricas. Añadir evidencia, commit o referencia de prueba al cerrar tareas relevantes.

0.1.5 en desarrollo, no instalar ni reiniciar; no release ni incremento de versión aún. Integrar UX y pruebas sobre fuente exacta, comprobar check/test/build y CI Windows. Identidad y panel requieren evidencia estática del componente nativo de Vivaldi 8.3.4191.47: no elegir por ordinal, subcadena ni relajar biyección; no cerrar panel ni ventanas automáticamente. D-033/D-034 vigentes; no modificar DTC. Si falta evidencia, solicitar exclusivamente fragmentos estáticos focalizados de resources/vivaldi, sin reinicio ni nueva QA.

Próxima acción única ONW-007: informe estático ONW-ROW-STATIC-1; no repetir dinámica ni instalar. Clasificación diagnóstica preservada inerte en research.
