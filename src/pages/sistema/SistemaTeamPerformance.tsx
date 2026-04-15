import { Users, TrendingUp, Award } from 'lucide-react';

const TEAM = [
    { name: 'María García', avatar: 'MG', responseRate: 94, closeRate: 32, objectionHandling: 88, followUp: 91, avgContact: '18min', score: 92, trend: '+4' },
    { name: 'Carlos Rodríguez', avatar: 'CR', responseRate: 87, closeRate: 27, objectionHandling: 75, followUp: 82, avgContact: '24min', score: 87, trend: '+1' },
    { name: 'Ana Pérez', avatar: 'AP', responseRate: 78, closeRate: 22, objectionHandling: 70, followUp: 68, avgContact: '32min', score: 78, trend: '-2' },
    { name: 'Lucas Martínez', avatar: 'LM', responseRate: 65, closeRate: 18, objectionHandling: 55, followUp: 60, avgContact: '45min', score: 65, trend: '0' },
    { name: 'Sofía López', avatar: 'SL', responseRate: 58, closeRate: 14, objectionHandling: 48, followUp: 52, avgContact: '55min', score: 58, trend: '-1' },
];

export const SistemaTeamPerformance = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div className="sis-page-title">Team Performance</div>
                        <div className="sis-page-subtitle">Rendimiento individual y colectivo de tu equipo comercial</div>
                    </div>
                    <div className="sis-tabs">
                        <button className="sis-tab active">Semanal</button>
                        <button className="sis-tab">Mensual</button>
                        <button className="sis-tab">Trimestral</button>
                    </div>
                </div>
            </div>

            {/* Team Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {[
                    { label: 'Team Size', value: '5' },
                    { label: 'Avg Score', value: '76' },
                    { label: 'Avg Close Rate', value: '22.6%' },
                    { label: 'Avg Response Rate', value: '76.4%' },
                ].map((kpi, i) => (
                    <div key={i} className="sis-kpi">
                        <span className="sis-kpi-label">{kpi.label}</span>
                        <div className="sis-kpi-value">{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* Ranking Table */}
            <div className="sis-card-static" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <Award size={18} style={{ color: 'var(--sis-accent)' }} />
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Ranking de Asesores</span>
                </div>
                <table className="sis-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asesor</th>
                            <th>Response Rate</th>
                            <th>Close Rate</th>
                            <th>Objection Handling</th>
                            <th>Follow-up</th>
                            <th>Avg Contact Time</th>
                            <th>Score</th>
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TEAM.map((m, i) => (
                            <tr key={i}>
                                <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontWeight: 600 }}>{i + 1}</span></td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: `linear-gradient(135deg, hsl(${160 + i * 25}, 60%, 40%), hsl(${180 + i * 25}, 50%, 30%))`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '11px', fontWeight: 700, color: 'white'
                                        }}>{m.avatar}</div>
                                        <span style={{ fontWeight: 500, color: 'var(--sis-text-primary)' }}>{m.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '60px', height: '4px', background: 'var(--sis-bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ width: `${m.responseRate}%`, height: '100%', background: m.responseRate > 80 ? 'var(--sis-positive)' : m.responseRate > 60 ? 'var(--sis-warning)' : 'var(--sis-danger)', borderRadius: '2px' }} />
                                        </div>
                                        <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px' }}>{m.responseRate}%</span>
                                    </div>
                                </td>
                                <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px' }}>{m.closeRate}%</span></td>
                                <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px' }}>{m.objectionHandling}%</span></td>
                                <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px' }}>{m.followUp}%</span></td>
                                <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px' }}>{m.avgContact}</span></td>
                                <td>
                                    <div className={`sis-score-ring ${m.score >= 80 ? 'sis-score-high' : m.score >= 60 ? 'sis-score-mid' : 'sis-score-low'}`}>
                                        {m.score}
                                    </div>
                                </td>
                                <td>
                                    <span className={`sis-kpi-change ${parseInt(m.trend) >= 0 ? 'positive' : 'negative'}`}>
                                        {parseInt(m.trend) > 0 ? '↑' : parseInt(m.trend) < 0 ? '↓' : '—'} {m.trend}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Performance Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                {TEAM.map((m, i) => (
                    <div key={i} className="sis-card-static" style={{ padding: '16px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 8px',
                                background: `linear-gradient(135deg, hsl(${160 + i * 25}, 60%, 40%), hsl(${180 + i * 25}, 50%, 30%))`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '12px', fontWeight: 700, color: 'white'
                            }}>{m.avatar}</div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>{m.name.split(' ')[0]}</div>
                        </div>
                        {[
                            { label: 'Response', value: m.responseRate },
                            { label: 'Close', value: m.closeRate },
                            { label: 'Objections', value: m.objectionHandling },
                            { label: 'Follow-up', value: m.followUp },
                        ].map((metric, j) => (
                            <div key={j} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                    <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>{metric.label}</span>
                                    <span style={{ fontSize: '10px', fontFamily: 'var(--sis-font-mono)', color: 'var(--sis-text-tertiary)' }}>{metric.value}%</span>
                                </div>
                                <div className="sis-progress">
                                    <div className="sis-progress-fill" style={{
                                        width: `${metric.value}%`,
                                        background: metric.value > 80 ? 'var(--sis-positive)' : metric.value > 60 ? 'var(--sis-warning)' : 'var(--sis-danger)'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
