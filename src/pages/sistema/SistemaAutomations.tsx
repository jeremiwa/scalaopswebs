import { Workflow, Plus, Play, Pause, Zap, MessageSquare, Clock, AlertTriangle, Users } from 'lucide-react';

const AUTOMATIONS = [
    { name: 'Follow-up Automático 24h', trigger: 'Lead sin respuesta > 24h', action: 'Enviar mensaje de seguimiento', status: 'active', runs: 156, lastRun: 'Hace 2h' },
    { name: 'Alerta Lead Caliente', trigger: 'Score > 85', action: 'Notificar a closer asignado', status: 'active', runs: 42, lastRun: 'Hace 30min' },
    { name: 'Re-asignación por Timeout', trigger: 'Sin respuesta del asesor > 4h', action: 'Re-asignar al próximo disponible', status: 'active', runs: 28, lastRun: 'Hace 1h' },
    { name: 'Follow-up Post-Demo', trigger: 'Demo completada', action: 'Enviar resumen + próximos pasos', status: 'paused', runs: 18, lastRun: 'Hace 3d' },
    { name: 'Alerta Objeción Crítica', trigger: 'Objeción de precio detectada', action: 'Notificar + sugerir respuesta', status: 'active', runs: 67, lastRun: 'Hace 45min' },
];

export const SistemaAutomations = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div className="sis-page-title">Automations</div>
                        <div className="sis-page-subtitle">Flujos automáticos, triggers y acciones inteligentes</div>
                    </div>
                    <button className="sis-btn sis-btn-primary sis-btn-sm"><Plus size={14} /> Nueva automatización</button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {[
                    { label: 'Active Flows', value: '4' },
                    { label: 'Total Runs', value: '311' },
                    { label: 'This Week', value: '47' },
                    { label: 'Time Saved', value: '~24h' },
                ].map((kpi, i) => (
                    <div key={i} className="sis-kpi">
                        <span className="sis-kpi-label">{kpi.label}</span>
                        <div className="sis-kpi-value">{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* Automations List */}
            <div className="sis-card-static" style={{ marginBottom: '20px' }}>
                <table className="sis-table">
                    <thead>
                        <tr>
                            <th>Automatización</th>
                            <th>Trigger</th>
                            <th>Acción</th>
                            <th>Estado</th>
                            <th>Ejecuciones</th>
                            <th>Última ejecución</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AUTOMATIONS.map((a, i) => (
                            <tr key={i}>
                                <td><span style={{ fontWeight: 500, color: 'var(--sis-text-primary)' }}>{a.name}</span></td>
                                <td><span style={{ fontSize: '12px' }}>{a.trigger}</span></td>
                                <td><span style={{ fontSize: '12px' }}>{a.action}</span></td>
                                <td>
                                    <span className={`sis-tag ${a.status === 'active' ? 'sis-tag-green' : 'sis-tag-yellow'}`} style={{ fontSize: '10px' }}>
                                        {a.status === 'active' ? '● Active' : '⏸ Paused'}
                                    </span>
                                </td>
                                <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px' }}>{a.runs}</span></td>
                                <td><span style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>{a.lastRun}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Visual Flow Builder Preview */}
            <div className="sis-card-static">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <Workflow size={16} style={{ color: 'var(--sis-accent)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Flow Preview: Follow-up Automático 24h</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
                    {/* Trigger */}
                    <div className="sis-flow-node" style={{ borderColor: 'rgba(24, 93, 232, 0.2)', background: 'rgba(24, 93, 232, 0.04)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--sis-blue-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Clock size={16} style={{ color: 'var(--sis-blue)' }} />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sis-blue)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trigger</div>
                            <div style={{ fontSize: '13px', color: 'var(--sis-text-primary)' }}>Lead sin respuesta {'>'} 24 horas</div>
                        </div>
                    </div>
                    <div className="sis-flow-connector" />

                    {/* Condition */}
                    <div className="sis-flow-node" style={{ borderColor: 'rgba(245, 158, 11, 0.2)', background: 'rgba(245, 158, 11, 0.04)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--sis-warning-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AlertTriangle size={16} style={{ color: 'var(--sis-warning)' }} />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sis-warning)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Condición</div>
                            <div style={{ fontSize: '13px', color: 'var(--sis-text-primary)' }}>Si el lead no fue reasignado</div>
                        </div>
                    </div>
                    <div className="sis-flow-connector" />

                    {/* Action 1 */}
                    <div className="sis-flow-node" style={{ borderColor: 'rgba(16, 185, 129, 0.2)', background: 'rgba(16, 185, 129, 0.04)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--sis-positive-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MessageSquare size={16} style={{ color: 'var(--sis-accent)' }} />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sis-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Acción</div>
                            <div style={{ fontSize: '13px', color: 'var(--sis-text-primary)' }}>Enviar mensaje de follow-up automático</div>
                        </div>
                    </div>
                    <div className="sis-flow-connector" />

                    {/* Action 2 */}
                    <div className="sis-flow-node" style={{ borderColor: 'rgba(16, 185, 129, 0.2)', background: 'rgba(16, 185, 129, 0.04)' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--sis-positive-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={16} style={{ color: 'var(--sis-accent)' }} />
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sis-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Acción</div>
                            <div style={{ fontSize: '13px', color: 'var(--sis-text-primary)' }}>Notificar al asesor asignado</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
