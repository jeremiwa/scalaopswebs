import { Clock, AlertTriangle, Zap, ArrowRight } from 'lucide-react';

const GAPS = [
    { name: 'Roberto C.', channel: 'WhatsApp', lastContact: 'hace 5 días', value: '$3,200', priority: 'critical', status: 'Abandonado', reason: 'Objeción de precio sin rebatir' },
    { name: 'Camila S.', channel: 'Instagram', lastContact: 'hace 3 días', value: '$1,800', priority: 'high', status: 'Sin follow-up', reason: 'Pidió info, nunca se respondió' },
    { name: 'Diego T.', channel: 'WhatsApp', lastContact: 'hace 4 días', value: '$4,500', priority: 'critical', status: 'Abandonado', reason: 'Cerró chat después de cotización' },
    { name: 'Valentina R.', channel: 'WhatsApp', lastContact: 'hace 2 días', value: '$2,100', priority: 'medium', status: 'Demora', reason: 'Consulta técnica pendiente' },
    { name: 'Luciana G.', channel: 'Instagram', lastContact: 'hace 6 días', value: '$5,000', priority: 'critical', status: 'Abandonado', reason: 'Interesado, pero sin seguimiento post-demo' },
    { name: 'Martín P.', channel: 'WhatsApp', lastContact: 'hace 1 día', value: '$1,500', priority: 'medium', status: 'Demora', reason: 'Preguntó por timing y no recibió respuesta' },
];

export const SistemaFollowUpGaps = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div className="sis-page-title">Follow-up Gaps</div>
                <div className="sis-page-subtitle">Leads sin seguimiento adecuado y oportunidades reactivables</div>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {[
                    { label: 'Without Follow-up', value: '18', color: 'var(--sis-danger)' },
                    { label: 'Critical Delay', value: '7', color: 'var(--sis-warning)' },
                    { label: 'Reactivatable', value: '12', color: 'var(--sis-accent)' },
                    { label: 'Revenue at Risk', value: '$24,600', color: 'var(--sis-danger)' },
                ].map((kpi, i) => (
                    <div key={i} className="sis-kpi">
                        <span className="sis-kpi-label">{kpi.label}</span>
                        <div className="sis-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* Timeline + Table */}
            <div className="sis-card-static" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={16} style={{ color: 'var(--sis-warning)' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Leads sin seguimiento</span>
                    </div>
                    <div className="sis-tabs">
                        <button className="sis-tab active">Todos</button>
                        <button className="sis-tab">Críticos</button>
                        <button className="sis-tab">Reactivables</button>
                    </div>
                </div>
                <table className="sis-table">
                    <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Canal</th>
                            <th>Último contacto</th>
                            <th>Valor potencial</th>
                            <th>Estado</th>
                            <th>Razón</th>
                            <th>Prioridad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {GAPS.map((g, i) => (
                            <tr key={i}>
                                <td><span style={{ fontWeight: 500, color: 'var(--sis-text-primary)' }}>{g.name}</span></td>
                                <td><span className="sis-tag sis-tag-neutral" style={{ fontSize: '10px' }}>{g.channel}</span></td>
                                <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px', color: g.priority === 'critical' ? 'var(--sis-danger)' : 'var(--sis-text-secondary)' }}>{g.lastContact}</span></td>
                                <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--sis-accent)' }}>{g.value}</span></td>
                                <td><span className={`sis-tag ${g.status === 'Abandonado' ? 'sis-tag-red' : 'sis-tag-yellow'}`} style={{ fontSize: '10px' }}>{g.status}</span></td>
                                <td><span style={{ fontSize: '12px', color: 'var(--sis-text-tertiary)' }}>{g.reason}</span></td>
                                <td><span className={`sis-tag ${g.priority === 'critical' ? 'sis-tag-red' : g.priority === 'high' ? 'sis-tag-yellow' : 'sis-tag-neutral'}`} style={{ fontSize: '10px', textTransform: 'capitalize' }}>{g.priority}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* AI Priority Suggestions */}
            <div className="sis-card-static">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Zap size={16} style={{ color: 'var(--sis-accent)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>AI Priority Actions</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                        { action: 'Recontactar a Luciana G. con nueva propuesta de valor — $5,000 en juego', urgency: 'Urgente', icon: '🔴' },
                        { action: 'Enviar follow-up a Diego T. con caso de éxito similar al suyo', urgency: 'Urgente', icon: '🔴' },
                        { action: 'Responder consulta técnica de Valentina R. antes de perder interés', urgency: 'Hoy', icon: '🟡' },
                    ].map((a, i) => (
                        <div key={i} className="sis-insight" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontSize: '16px' }}>{a.icon}</span>
                            <div className="sis-insight-body" style={{ fontSize: '12px' }}>{a.action}</div>
                            <span className={`sis-tag ${a.urgency === 'Urgente' ? 'sis-tag-red' : 'sis-tag-yellow'}`} style={{ fontSize: '10px', alignSelf: 'flex-start' }}>{a.urgency}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
