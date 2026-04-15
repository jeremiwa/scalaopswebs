import { FileBarChart, Download, Share2, Calendar, TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';

export const SistemaReports = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div className="sis-page-title">Reports</div>
                        <div className="sis-page-subtitle">Reportes ejecutivos de rendimiento comercial</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div className="sis-tabs">
                            <button className="sis-tab active">Semanal</button>
                            <button className="sis-tab">Mensual</button>
                        </div>
                        <button className="sis-btn sis-btn-ghost sis-btn-sm"><Download size={14} /> Export</button>
                        <button className="sis-btn sis-btn-ghost sis-btn-sm"><Share2 size={14} /> Share</button>
                    </div>
                </div>
            </div>

            {/* Report Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: '10px 14px', background: 'var(--sis-bg-card)', border: '1px solid var(--sis-border)', borderRadius: '8px', width: 'fit-content' }}>
                <Calendar size={14} style={{ color: 'var(--sis-text-muted)' }} />
                <span style={{ fontSize: '13px', color: 'var(--sis-text-secondary)' }}>Semana del 15 al 21 de Marzo, 2026</span>
            </div>

            {/* Executive Summary KPIs */}
            <div className="sis-card-glow" style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '16px' }}>Resumen Ejecutivo</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                    {[
                        { label: 'Revenue Leakage', value: '$18,200', change: '-12%', positive: true, icon: <DollarSign size={16} /> },
                        { label: 'Leads Procesados', value: '342', change: '+8%', positive: true, icon: <TrendingUp size={16} /> },
                        { label: 'Oportunidades Recuperadas', value: '14', change: '+40%', positive: true, icon: <TrendingUp size={16} /> },
                        { label: 'Team Score Promedio', value: '76', change: '+3pts', positive: true, icon: <Users size={16} /> },
                        { label: 'Tasa de Cierre', value: '14.2%', change: '+1.8%', positive: true, icon: <TrendingUp size={16} /> },
                    ].map((kpi, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--sis-text-muted)', marginBottom: '8px' }}>{kpi.icon}</div>
                            <div style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '24px', fontWeight: 700, color: 'var(--sis-text-primary)' }}>{kpi.value}</div>
                            <div style={{ fontSize: '11px', color: 'var(--sis-text-muted)', marginTop: '4px', marginBottom: '4px' }}>{kpi.label}</div>
                            <span className={`sis-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>{kpi.change}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {/* Channel Efficiency */}
                <div className="sis-card-static">
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '16px' }}>Eficiencia por Canal</div>
                    <table className="sis-table">
                        <thead>
                            <tr><th>Canal</th><th>Leads</th><th>Cerrados</th><th>Rate</th><th>Revenue</th></tr>
                        </thead>
                        <tbody>
                            {[
                                { channel: 'WhatsApp', leads: 198, closed: 32, rate: '16.2%', revenue: '$28,400' },
                                { channel: 'Instagram', leads: 98, closed: 10, rate: '10.2%', revenue: '$8,200' },
                                { channel: 'Llamadas', leads: 46, closed: 9, rate: '19.6%', revenue: '$12,600' },
                            ].map((c, i) => (
                                <tr key={i}>
                                    <td><span style={{ fontWeight: 500, color: 'var(--sis-text-primary)' }}>{c.channel}</span></td>
                                    <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px' }}>{c.leads}</span></td>
                                    <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px' }}>{c.closed}</span></td>
                                    <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px', color: 'var(--sis-accent)' }}>{c.rate}</span></td>
                                    <td><span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--sis-accent)' }}>{c.revenue}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Improvements Implemented */}
                <div className="sis-card-static">
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '16px' }}>Mejoras implementadas esta semana</div>
                    {[
                        { improvement: 'Auto-respuesta activado para leads fuera de horario', result: 'Tiempo de respuesta ↓ 40%' },
                        { improvement: 'Script de objeción de precio actualizado', result: 'Resolución ↑ 15%' },
                        { improvement: 'Follow-up automático a las 24h configurado', result: 'Leads abandonados ↓ 28%' },
                        { improvement: 'Sesión de coaching con equipo de bajo score', result: 'Score promedio ↑ 3pts' },
                    ].map((m, i) => (
                        <div key={i} style={{ padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <div style={{ fontSize: '12px', color: 'var(--sis-text-secondary)', marginBottom: '4px' }}>{m.improvement}</div>
                            <span className="sis-tag sis-tag-green" style={{ fontSize: '10px' }}>{m.result}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Export Placeholder */}
            <div className="sis-card-static" style={{ textAlign: 'center', padding: '40px' }}>
                <div className="sis-empty-icon" style={{ margin: '0 auto 14px' }}>
                    <FileBarChart size={24} />
                </div>
                <div className="sis-empty-title">Exportar reporte completo</div>
                <div className="sis-empty-desc" style={{ margin: '0 auto 16px' }}>Descargá el reporte ejecutivo en PDF o compartilo con tu equipo directamente.</div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button className="sis-btn sis-btn-primary sis-btn-sm"><Download size={14} /> Descargar PDF</button>
                    <button className="sis-btn sis-btn-secondary sis-btn-sm"><Share2 size={14} /> Enviar por email</button>
                </div>
            </div>
        </div>
    );
};
