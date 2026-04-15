import {
    TrendingUp, TrendingDown, AlertTriangle, DollarSign, Gauge,
    ArrowUpRight, ArrowDownRight, Clock, Users, MessageSquare,
    Zap, Target, Eye
} from 'lucide-react';

export const SistemaDashboard = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div className="sis-page-title">Dashboard</div>
                        <div className="sis-page-subtitle">Vista general de tu operación comercial · Última actualización: hace 5 min</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div className="sis-tabs">
                            <button className="sis-tab active">7 días</button>
                            <button className="sis-tab">30 días</button>
                            <button className="sis-tab">90 días</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {[
                    { label: 'Total Leads', value: '1,284', change: '+12.3%', positive: true, icon: <Users size={16} /> },
                    { label: 'Avg Response Time', value: '4.2h', change: '-18%', positive: true, icon: <Clock size={16} /> },
                    { label: 'Lost Opportunities', value: '23', change: '+3', positive: false, icon: <AlertTriangle size={16} /> },
                    { label: 'Recoverable Revenue', value: '$47,800', change: '+$8.2k', positive: true, icon: <DollarSign size={16} /> },
                    { label: 'Leakage Score', value: '72/100', change: '-5pts', positive: true, icon: <Gauge size={16} /> },
                ].map((kpi, i) => (
                    <div key={i} className="sis-kpi">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="sis-kpi-label">{kpi.label}</span>
                            <span style={{ color: 'var(--sis-text-muted)' }}>{kpi.icon}</span>
                        </div>
                        <div className="sis-kpi-value">{kpi.value}</div>
                        <span className={`sis-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
                            {kpi.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {kpi.change}
                        </span>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {/* Funnel Leakage */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Funnel Leakage</div>
                            <div style={{ fontSize: '12px', color: 'var(--sis-text-muted)', marginTop: '2px' }}>Caída por etapa del embudo</div>
                        </div>
                        <span className="sis-tag sis-tag-red">28% drop-off total</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            { stage: 'Lead Ingresado', value: 1284, pct: 100, drop: '' },
                            { stage: 'Primer Contacto', value: 924, pct: 72, drop: '-28%' },
                            { stage: 'En Negociación', value: 578, pct: 45, drop: '-37%' },
                            { stage: 'Propuesta Enviada', value: 359, pct: 28, drop: '-38%' },
                            { stage: 'Cierre', value: 180, pct: 14, drop: '-50%' },
                        ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <span style={{ fontSize: '12px', color: 'var(--sis-text-secondary)', minWidth: '120px' }}>{s.stage}</span>
                                <div style={{ flex: 1, height: '24px', background: 'var(--sis-bg-secondary)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                                    <div style={{
                                        width: `${s.pct}%`, height: '100%', borderRadius: '4px',
                                        background: s.pct > 60 ? 'var(--sis-accent)' : s.pct > 30 ? 'var(--sis-warning)' : 'var(--sis-danger)',
                                        opacity: 0.6, transition: 'width 1s ease'
                                    }} />
                                </div>
                                <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--sis-text-primary)', minWidth: '50px', textAlign: 'right' }}>{s.value.toLocaleString()}</span>
                                {s.drop && <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '11px', color: 'var(--sis-danger)', minWidth: '40px' }}>{s.drop}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weekly Evolution */}
                <div className="sis-card-static">
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '4px' }}>Evolución semanal</div>
                    <div style={{ fontSize: '12px', color: 'var(--sis-text-muted)', marginBottom: '24px' }}>Leads vs Cierres — últimas 8 semanas</div>
                    <div className="sis-bar-chart" style={{ height: '180px' }}>
                        {[
                            { leads: 75, closes: 20, week: 'S1' },
                            { leads: 82, closes: 25, week: 'S2' },
                            { leads: 68, closes: 18, week: 'S3' },
                            { leads: 90, closes: 28, week: 'S4' },
                            { leads: 85, closes: 30, week: 'S5' },
                            { leads: 95, closes: 22, week: 'S6' },
                            { leads: 88, closes: 35, week: 'S7' },
                            { leads: 100, closes: 32, week: 'S8' },
                        ].map((w, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                                <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '100%' }}>
                                    <div style={{ width: '12px', height: `${w.leads}%`, background: 'var(--sis-accent)', borderRadius: '3px 3px 0 0', opacity: 0.3 }} />
                                    <div style={{ width: '12px', height: `${w.closes}%`, background: 'var(--sis-accent)', borderRadius: '3px 3px 0 0', opacity: 0.8 }} />
                                </div>
                                <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)', fontFamily: 'var(--sis-font-mono)' }}>{w.week}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--sis-accent)', opacity: 0.3 }} />
                            <span style={{ fontSize: '11px', color: 'var(--sis-text-muted)' }}>Leads</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--sis-accent)', opacity: 0.8 }} />
                            <span style={{ fontSize: '11px', color: 'var(--sis-text-muted)' }}>Cierres</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {/* Top Leaks */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <TrendingDown size={16} style={{ color: 'var(--sis-danger)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Top Leaks Detected</span>
                    </div>
                    {[
                        { text: 'Leads sin respuesta > 24h', count: 12, severity: 'critical' },
                        { text: 'Objeción precio sin resolver', count: 8, severity: 'warning' },
                        { text: 'Follow-up abandonado', count: 6, severity: 'warning' },
                        { text: 'Conversación sin cierre', count: 5, severity: 'critical' },
                        { text: 'Lead re-asignado sin contacto', count: 3, severity: 'info' },
                    ].map((l, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <span style={{ fontSize: '12px', color: 'var(--sis-text-secondary)' }}>{l.text}</span>
                            <span className={`sis-tag ${l.severity === 'critical' ? 'sis-tag-red' : l.severity === 'warning' ? 'sis-tag-yellow' : 'sis-tag-neutral'}`}>{l.count}</span>
                        </div>
                    ))}
                </div>

                {/* Sales Ranking */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Users size={16} style={{ color: 'var(--sis-blue)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Team Ranking</span>
                    </div>
                    {[
                        { name: 'María G.', score: 92, deals: 24, change: '+3' },
                        { name: 'Carlos R.', score: 87, deals: 19, change: '+1' },
                        { name: 'Ana P.', score: 78, deals: 15, change: '-2' },
                        { name: 'Lucas M.', score: 65, deals: 11, change: '0' },
                        { name: 'Sofía L.', score: 58, deals: 8, change: '-1' },
                    ].map((m, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '11px', color: 'var(--sis-text-muted)', minWidth: '16px' }}>#{i + 1}</span>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `hsl(${160 + i * 30}, 50%, ${30 + i * 5}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: 'white', flexShrink: 0 }}>{m.name.split(' ').map(n => n[0]).join('')}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--sis-text-primary)' }}>{m.name}</div>
                                <div style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>{m.deals} deals</div>
                            </div>
                            <div className={`sis-score-ring ${m.score >= 80 ? 'sis-score-high' : m.score >= 60 ? 'sis-score-mid' : 'sis-score-low'}`} style={{ width: '36px', height: '36px', fontSize: '12px' }}>
                                {m.score}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Suggested Actions */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Zap size={16} style={{ color: 'var(--sis-accent)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Acciones sugeridas</span>
                    </div>
                    {[
                        { action: 'Recontactar 12 leads sin respuesta en las últimas 48h', priority: 'Alta', color: 'sis-tag-red' },
                        { action: 'Revisar objeciones de precio con Carlos R.', priority: 'Media', color: 'sis-tag-yellow' },
                        { action: 'Enviar propuesta pendiente a 4 leads calificados', priority: 'Alta', color: 'sis-tag-red' },
                        { action: 'Reactivar 3 oportunidades dormidas del canal IG', priority: 'Media', color: 'sis-tag-yellow' },
                    ].map((a, i) => (
                        <div key={i} className="sis-insight" style={{ marginBottom: '8px' }}>
                            <div className="sis-insight-body" style={{ fontSize: '12px' }}>{a.action}</div>
                            <div style={{ marginTop: '6px' }}>
                                <span className={`sis-tag ${a.color}`} style={{ fontSize: '10px' }}>{a.priority}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
