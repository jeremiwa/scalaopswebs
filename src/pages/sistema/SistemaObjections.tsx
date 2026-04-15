import { MessageSquareWarning, AlertTriangle, Zap, MessageSquare, TrendingUp } from 'lucide-react';

const OBJECTIONS = [
    { type: 'Precio alto', frequency: 34, resolved: 12, unresolved: 22, pct: 38, trend: '+5%' },
    { type: 'No es el momento', frequency: 28, resolved: 18, unresolved: 10, pct: 31, trend: '-2%' },
    { type: 'Ya tengo una solución', frequency: 15, resolved: 5, unresolved: 10, pct: 17, trend: '+1%' },
    { type: 'Tengo que consultarlo', frequency: 12, resolved: 8, unresolved: 4, pct: 13, trend: '0%' },
    { type: 'No entiendo el producto', frequency: 8, resolved: 6, unresolved: 2, pct: 9, trend: '-3%' },
];

export const SistemaObjections = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div className="sis-page-title">Objections</div>
                <div className="sis-page-subtitle">Análisis de objeciones detectadas y patrones de resolución</div>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {[
                    { label: 'Total Objections', value: '97' },
                    { label: 'Resolution Rate', value: '50.5%' },
                    { label: 'Most Frequent', value: 'Precio' },
                    { label: 'Worst Handled', value: 'Ya tengo solución' },
                ].map((kpi, i) => (
                    <div key={i} className="sis-kpi">
                        <span className="sis-kpi-label">{kpi.label}</span>
                        <div className="sis-kpi-value" style={{ fontSize: '22px' }}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {/* Frequency Chart */}
                <div className="sis-card-static">
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '4px' }}>Objection Frequency</div>
                    <div style={{ fontSize: '12px', color: 'var(--sis-text-muted)', marginBottom: '20px' }}>Distribución de objeciones detectadas este mes</div>
                    {OBJECTIONS.map((o, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 0', borderBottom: i < OBJECTIONS.length - 1 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <span style={{ fontSize: '12px', color: 'var(--sis-text-secondary)', minWidth: '140px' }}>{o.type}</span>
                            <div style={{ flex: 1, display: 'flex', gap: '2px', height: '20px' }}>
                                <div style={{ width: `${(o.resolved / o.frequency) * 100}%`, height: '100%', background: 'var(--sis-positive)', borderRadius: '3px 0 0 3px', opacity: 0.6 }} title={`Resueltas: ${o.resolved}`} />
                                <div style={{ width: `${(o.unresolved / o.frequency) * 100}%`, height: '100%', background: 'var(--sis-danger)', borderRadius: '0 3px 3px 0', opacity: 0.6 }} title={`Sin resolver: ${o.unresolved}`} />
                            </div>
                            <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--sis-text-primary)', minWidth: '30px', textAlign: 'right' }}>{o.frequency}</span>
                            <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '11px', color: parseInt(o.trend) > 0 ? 'var(--sis-danger)' : 'var(--sis-positive)', minWidth: '36px' }}>{o.trend}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', gap: '16px', marginTop: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--sis-positive)', opacity: 0.6 }} />
                            <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>Resueltas</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--sis-danger)', opacity: 0.6 }} />
                            <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>Sin resolver</span>
                        </div>
                    </div>
                </div>

                {/* Poorly Handled */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <AlertTriangle size={16} style={{ color: 'var(--sis-danger)' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Mal Trabajadas</span>
                        <span className="sis-tag sis-tag-red" style={{ fontSize: '10px' }}>Requiere atención</span>
                    </div>
                    {[
                        { text: '"Es muy caro" — Asesor respondió con descuento inmediato sin explorar valor', score: 22 },
                        { text: '"Ya tengo algo similar" — Sin diferenciación, se cerró la conversación', score: 18 },
                        { text: '"No es el momento" — Sin re-agendamiento ni follow-up programado', score: 35 },
                    ].map((o, i) => (
                        <div key={i} style={{ padding: '14px', background: 'var(--sis-bg-secondary)', borderRadius: 'var(--sis-radius-md)', border: '1px solid var(--sis-border-subtle)', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                                <p style={{ fontSize: '12px', color: 'var(--sis-text-secondary)', lineHeight: 1.5, flex: 1 }}>{o.text}</p>
                                <div className="sis-score-ring sis-score-low" style={{ width: '34px', height: '34px', fontSize: '11px' }}>{o.score}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggested Responses */}
            <div className="sis-card-static">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Zap size={16} style={{ color: 'var(--sis-accent)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>AI Suggested Responses</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                        { objection: '"Es muy caro"', response: 'Entiendo. Antes de hablar de precio, ¿te puedo mostrar cuánto revenue estás perdiendo hoy por no tener esta visibilidad? Muchos clientes recuperan la inversión en menos de 30 días.', effectiveness: '78%' },
                        { objection: '"Ya tengo una solución"', response: '¿Qué herramienta estás usando? Scala complementa herramientas existentes. La diferencia es que analizamos la capa de conversaciones que ningún CRM cubre.', effectiveness: '65%' },
                        { objection: '"No es el momento"', response: 'Lo entiendo. ¿Te parece si agendamos un follow-up para [fecha]? Mientras tanto, te envío un reporte gratuito de lo que detectamos en tus primeras conversaciones.', effectiveness: '72%' },
                    ].map((s, i) => (
                        <div key={i} className="sis-insight" style={{ borderLeftColor: 'var(--sis-accent)' }}>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sis-warning)', marginBottom: '6px' }}>Objeción: {s.objection}</div>
                            <div className="sis-insight-body" style={{ fontSize: '12px', fontStyle: 'italic' }}>{s.response}</div>
                            <div style={{ marginTop: '8px' }}>
                                <span className="sis-tag sis-tag-green" style={{ fontSize: '10px' }}>Efectividad: {s.effectiveness}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
