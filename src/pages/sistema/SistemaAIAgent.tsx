import { Bot, Power, MessageSquare, BookOpen, Mic, Target, BarChart3, ArrowUpRight } from 'lucide-react';

export const SistemaAIAgent = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div className="sis-page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            AI Agent
                            <span className="sis-coming-soon">✨ Beta</span>
                        </div>
                        <div className="sis-page-subtitle">Agente de IA entrenado con tu negocio para atender y calificar leads</div>
                    </div>
                    {/* Status Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>Estado del agente</span>
                        <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: 'var(--sis-accent)', padding: '2px', cursor: 'pointer' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', marginLeft: '20px', transition: 'margin 0.2s' }} />
                        </div>
                        <span className="sis-tag sis-tag-green">Activo</span>
                    </div>
                </div>
            </div>

            {/* Agent KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {[
                    { label: 'Conversations Handled', value: '234', change: '+18%' },
                    { label: 'Resolved by AI', value: '189', change: '80.7%' },
                    { label: 'Escalated to Human', value: '45', change: '19.3%' },
                    { label: 'Avg Response Time', value: '12s', change: '-95%' },
                ].map((kpi, i) => (
                    <div key={i} className="sis-kpi">
                        <span className="sis-kpi-label">{kpi.label}</span>
                        <div className="sis-kpi-value">{kpi.value}</div>
                        <span className="sis-kpi-change positive"><ArrowUpRight size={12} />{kpi.change}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {/* Connected Channels */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <MessageSquare size={16} style={{ color: 'var(--sis-accent)' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Canales conectados</span>
                    </div>
                    {[
                        { channel: 'WhatsApp Business', status: 'connected', messages: '1,284' },
                        { channel: 'Instagram DM', status: 'connected', messages: '456' },
                        { channel: 'Website Chat', status: 'pending', messages: '—' },
                    ].map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sis-text-primary)' }}>{c.channel}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '11px', color: 'var(--sis-text-muted)' }}>{c.messages} msgs</span>
                                <span className={`sis-tag ${c.status === 'connected' ? 'sis-tag-green' : 'sis-tag-yellow'}`} style={{ fontSize: '10px', textTransform: 'capitalize' }}>{c.status === 'connected' ? '● Conectado' : '○ Pendiente'}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Knowledge Base */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <BookOpen size={16} style={{ color: 'var(--sis-purple)' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Knowledge Base</span>
                    </div>
                    {[
                        { item: 'Catálogo de productos y precios', docs: 3, updated: 'Hace 2d' },
                        { item: 'Scripts de ventas y objeciones', docs: 5, updated: 'Hace 1d' },
                        { item: 'FAQ del negocio', docs: 1, updated: 'Hace 5d' },
                        { item: 'Casos de éxito y testimonios', docs: 2, updated: 'Hace 3d' },
                        { item: 'Política de devoluciones', docs: 1, updated: 'Hace 7d' },
                    ].map((k, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <span style={{ fontSize: '12px', color: 'var(--sis-text-secondary)' }}>{k.item}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="sis-tag sis-tag-neutral" style={{ fontSize: '9px' }}>{k.docs} docs</span>
                                <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>{k.updated}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                {/* Tone & Objectives */}
                <div className="sis-card-static">
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Mic size={14} style={{ color: 'var(--sis-teal)' }} />
                        Tono y estilo
                    </div>
                    {[
                        { label: 'Tono', value: 'Profesional y cercano' },
                        { label: 'Idioma', value: 'Español (Argentina)' },
                        { label: 'Velocidad', value: 'Respuesta inmediata' },
                        { label: 'Escalado', value: 'Si detecta objeción compleja' },
                    ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 3 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <span style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>{s.label}</span>
                            <span style={{ fontSize: '12px', color: 'var(--sis-text-secondary)', fontWeight: 500 }}>{s.value}</span>
                        </div>
                    ))}
                </div>

                {/* Objectives */}
                <div className="sis-card-static">
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target size={14} style={{ color: 'var(--sis-accent)' }} />
                        Objetivos del agente
                    </div>
                    {[
                        'Responder consultas iniciales',
                        'Calificar leads según criterios',
                        'Recolectar información clave',
                        'Agendar llamadas con asesores',
                        'Manejar objeciones simples',
                    ].map((obj, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sis-accent)', flexShrink: 0 }} />
                            <span style={{ fontSize: '12px', color: 'var(--sis-text-secondary)' }}>{obj}</span>
                        </div>
                    ))}
                </div>

                {/* Agent Performance */}
                <div className="sis-card-static">
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BarChart3 size={14} style={{ color: 'var(--sis-blue)' }} />
                        Performance del agente
                    </div>
                    {[
                        { metric: 'Satisfaction Score', value: '4.6/5', color: 'var(--sis-accent)' },
                        { metric: 'Qualification Accuracy', value: '87%', color: 'var(--sis-accent)' },
                        { metric: 'Avg Conversation Length', value: '3.2 msgs', color: 'var(--sis-text-primary)' },
                        { metric: 'Escalation Rate', value: '19%', color: 'var(--sis-warning)' },
                        { metric: 'Leads Qualified', value: '142', color: 'var(--sis-text-primary)' },
                    ].map((m, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 4 ? '1px solid var(--sis-border-subtle)' : 'none' }}>
                            <span style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>{m.metric}</span>
                            <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '12px', fontWeight: 600, color: m.color }}>{m.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
