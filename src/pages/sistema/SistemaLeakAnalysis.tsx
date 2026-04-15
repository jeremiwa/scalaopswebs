import { TrendingDown, AlertTriangle, Zap, BarChart3, Users as UsersIcon, MessageSquare, Clock } from 'lucide-react';

export const SistemaLeakAnalysis = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div className="sis-page-title">Leak Analysis</div>
                        <div className="sis-page-subtitle">Detectá exactamente dónde y por qué se pierden oportunidades</div>
                    </div>
                    <div className="sis-tabs">
                        <button className="sis-tab active">Por etapa</button>
                        <button className="sis-tab">Por asesor</button>
                        <button className="sis-tab">Por canal</button>
                    </div>
                </div>
            </div>

            {/* Summary KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {[
                    { label: 'Total Leaks', value: '47', icon: <TrendingDown size={16} />, color: 'var(--sis-danger)' },
                    { label: 'Revenue at Risk', value: '$82,400', icon: <AlertTriangle size={16} />, color: 'var(--sis-warning)' },
                    { label: 'Biggest Drop-off', value: 'Contacto → Nego.', icon: <BarChart3 size={16} />, color: 'var(--sis-blue)' },
                    { label: 'Recovery Potential', value: '61%', icon: <Zap size={16} />, color: 'var(--sis-accent)' },
                ].map((kpi, i) => (
                    <div key={i} className="sis-kpi">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="sis-kpi-label">{kpi.label}</span>
                            <span style={{ color: kpi.color }}>{kpi.icon}</span>
                        </div>
                        <div className="sis-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {/* Funnel Drop-off */}
                <div className="sis-card-static">
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '4px' }}>Funnel Drop-off Analysis</div>
                    <div style={{ fontSize: '12px', color: 'var(--sis-text-muted)', marginBottom: '24px' }}>Caída porcentual entre etapas</div>
                    {[
                        { from: 'Lead Ingresado', to: 'Primer Contacto', dropPct: 28, leads: 360, reason: 'Sin respuesta inicial' },
                        { from: 'Primer Contacto', to: 'En Negociación', dropPct: 37, leads: 346, reason: 'Objeciones no resueltas' },
                        { from: 'En Negociación', to: 'Propuesta', dropPct: 38, leads: 219, reason: 'Follow-up abandonado' },
                        { from: 'Propuesta', to: 'Cierre', dropPct: 50, leads: 179, reason: 'Precio / timing' },
                    ].map((d, i) => (
                        <div key={i} style={{ padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--sis-text-secondary)' }}>{d.from} → {d.to}</div>
                                <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '14px', fontWeight: 700, color: 'var(--sis-danger)' }}>-{d.dropPct}%</span>
                            </div>
                            <div style={{ height: '6px', background: 'var(--sis-bg-secondary)', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                                <div style={{ width: `${d.dropPct}%`, height: '100%', background: 'var(--sis-danger)', opacity: 0.5, borderRadius: '3px' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '11px', color: 'var(--sis-text-muted)' }}>{d.leads} leads perdidos</span>
                                <span style={{ fontSize: '11px', color: 'var(--sis-warning)' }}>Causa: {d.reason}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Heatmap */}
                <div className="sis-card-static">
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '4px' }}>Response Time Heatmap</div>
                    <div style={{ fontSize: '12px', color: 'var(--sis-text-muted)', marginBottom: '20px' }}>Demora en respuesta por hora del día × día de la semana</div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '24px' }}>
                            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d, i) => (
                                <div key={i} style={{ fontSize: '10px', color: 'var(--sis-text-muted)', height: '22px', display: 'flex', alignItems: 'center' }}>{d}</div>
                            ))}
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '3px', marginBottom: '6px' }}>
                                {['9am', '10', '11', '12', '1pm', '2', '3', '4', '5', '6', '7', '8'].map((h, i) => (
                                    <div key={i} style={{ width: '22px', fontSize: '9px', color: 'var(--sis-text-muted)', textAlign: 'center' }}>{h}</div>
                                ))}
                            </div>
                            <div className="sis-heatmap" style={{ gridTemplateColumns: 'repeat(12, 22px)', gridTemplateRows: 'repeat(7, 22px)' }}>
                                {Array.from({ length: 84 }).map((_, i) => {
                                    const intensity = Math.random();
                                    const color = intensity > 0.7 ? 'rgba(239, 68, 68, 0.6)' : intensity > 0.4 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.3)';
                                    return <div key={i} className="sis-heatmap-cell" style={{ background: color }} />;
                                })}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.3)' }} />
                            <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>{'< 1h'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(245, 158, 11, 0.4)' }} />
                            <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>1-4h</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(239, 68, 68, 0.6)' }} />
                            <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>{'> 4h'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Causes & Recommendations */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <AlertTriangle size={16} style={{ color: 'var(--sis-danger)' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Main Causes</span>
                    </div>
                    {[
                        { cause: 'Tiempo de primera respuesta > 2h', impact: 'Alto', pct: '34%', leaks: 16 },
                        { cause: 'Objeción de precio sin contraoferta', impact: 'Alto', pct: '22%', leaks: 10 },
                        { cause: 'Follow-up abandonado después de día 3', impact: 'Medio', pct: '19%', leaks: 9 },
                        { cause: 'Sin respuesta a consulta técnica', impact: 'Medio', pct: '15%', leaks: 7 },
                        { cause: 'Reasignación sin contexto', impact: 'Bajo', pct: '10%', leaks: 5 },
                    ].map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <span style={{ fontSize: '12px', color: 'var(--sis-text-secondary)', flex: 1 }}>{c.cause}</span>
                            <span className={`sis-tag ${c.impact === 'Alto' ? 'sis-tag-red' : c.impact === 'Medio' ? 'sis-tag-yellow' : 'sis-tag-neutral'}`} style={{ fontSize: '10px' }}>{c.impact}</span>
                            <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px', color: 'var(--sis-text-primary)', marginLeft: '12px', minWidth: '36px', textAlign: 'right' }}>{c.pct}</span>
                        </div>
                    ))}
                </div>

                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Zap size={16} style={{ color: 'var(--sis-accent)' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Actionable Recommendations</span>
                    </div>
                    {[
                        'Implementar auto-respuesta para leads fuera de horario laboral',
                        'Crear script de manejo de objeción de precio con contraoferta escalonada',
                        'Automatizar follow-up a las 24h y 72h tras primer contacto',
                        'Asignar leads técnicos directamente al equipo de pre-venta',
                        'Revisar proceso de reasignación para incluir traspaso de contexto',
                    ].map((r, i) => (
                        <div key={i} className="sis-insight" style={{ marginBottom: '8px' }}>
                            <div className="sis-insight-body" style={{ fontSize: '12px' }}>{r}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
