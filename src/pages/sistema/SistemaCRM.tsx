import { Kanban, Plus, Filter, MoreHorizontal, DollarSign } from 'lucide-react';

const PIPELINES = [
    {
        stage: 'Nuevo Lead', count: 8, color: 'var(--sis-blue)',
        leads: [
            { name: 'María Torres', value: '$2,400', channel: 'Instagram', lastContact: 'Hoy', owner: 'Carlos R.' },
            { name: 'Juan Méndez', value: '$3,800', channel: 'WhatsApp', lastContact: 'Hoy', owner: 'María G.' },
            { name: 'Sandra K.', value: '$1,500', channel: 'WhatsApp', lastContact: 'Ayer', owner: 'Ana P.' },
        ]
    },
    {
        stage: 'Contactado', count: 12, color: 'var(--sis-teal)',
        leads: [
            { name: 'Roberto Villa', value: '$5,200', channel: 'WhatsApp', lastContact: 'hace 2h', owner: 'María G.' },
            { name: 'Laura Peña', value: '$2,100', channel: 'Instagram', lastContact: 'hace 1d', owner: 'Sofía L.' },
        ]
    },
    {
        stage: 'En negociación', count: 6, color: 'var(--sis-warning)',
        leads: [
            { name: 'Alejandra M.', value: '$4,500', channel: 'WhatsApp', lastContact: 'hace 1h', owner: 'María G.', hot: true },
            { name: 'Pedro N.', value: '$3,200', channel: 'Llamada', lastContact: 'hace 3h', owner: 'Carlos R.' },
        ]
    },
    {
        stage: 'Propuesta', count: 4, color: 'var(--sis-accent)',
        leads: [
            { name: 'Gabriel R.', value: '$6,800', channel: 'WhatsApp', lastContact: 'hace 4h', owner: 'Carlos R.', hot: true },
        ]
    },
    {
        stage: 'Cerrado', count: 3, color: 'var(--sis-positive)',
        leads: [
            { name: 'Natalia S.', value: '$4,200', channel: 'WhatsApp', lastContact: 'hace 1d', owner: 'María G.' },
        ]
    },
];

export const SistemaCRM = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div className="sis-page-title">CRM</div>
                        <div className="sis-page-subtitle">Pipeline comercial y gestión de leads</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div className="sis-tabs">
                            <button className="sis-tab active">Kanban</button>
                            <button className="sis-tab">Tabla</button>
                        </div>
                        <button className="sis-btn sis-btn-ghost sis-btn-sm"><Filter size={14} /> Filtros</button>
                        <button className="sis-btn sis-btn-primary sis-btn-sm"><Plus size={14} /> Nuevo lead</button>
                    </div>
                </div>
            </div>

            {/* Pipeline KPIs */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
                {[
                    { label: 'Pipeline Total', value: '$48,200' },
                    { label: 'Weighted', value: '$18,400' },
                    { label: 'Avg Deal Size', value: '$3,520' },
                    { label: 'Win Rate', value: '14%' },
                ].map((kpi, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: 'var(--sis-bg-card)', border: '1px solid var(--sis-border)', borderRadius: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--sis-text-muted)' }}>{kpi.label}</span>
                        <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>{kpi.value}</span>
                    </div>
                ))}
            </div>

            {/* Kanban */}
            <div className="sis-kanban">
                {PIPELINES.map((col, ci) => (
                    <div key={ci} className="sis-kanban-col">
                        <div className="sis-kanban-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                                <span className="sis-kanban-title">{col.stage}</span>
                            </div>
                            <span className="sis-kanban-count">{col.count}</span>
                        </div>
                        {col.leads.map((lead, li) => (
                            <div key={li} className="sis-kanban-card">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>{lead.name}</span>
                                    {(lead as any).hot && <span className="sis-tag sis-tag-green" style={{ fontSize: '9px' }}>🔥 Hot</span>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <DollarSign size={12} style={{ color: 'var(--sis-accent)' }} />
                                    <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--sis-accent)' }}>{lead.value}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <span className="sis-tag sis-tag-neutral" style={{ fontSize: '9px' }}>{lead.channel}</span>
                                        <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>{lead.lastContact}</span>
                                    </div>
                                    <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>{lead.owner}</span>
                                </div>
                            </div>
                        ))}
                        {/* Add card placeholder */}
                        <div style={{ padding: '10px', borderRadius: '8px', border: '1px dashed var(--sis-border)', textAlign: 'center', cursor: 'pointer', fontSize: '12px', color: 'var(--sis-text-muted)' }}>
                            <Plus size={14} style={{ display: 'inline' }} /> Agregar
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
