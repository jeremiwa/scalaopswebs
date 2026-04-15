import { Search, Filter, MessageSquare, Clock, AlertTriangle, Star, Zap } from 'lucide-react';

const CONVERSATIONS = [
    { name: 'Alejandra M.', channel: 'WhatsApp', preview: 'Hola, me interesa el plan enterprise...', time: 'hace 12 min', tags: ['hot lead'], score: 92, unread: true },
    { name: 'Roberto C.', channel: 'Instagram', preview: 'El precio me parece elevado para lo que...', time: 'hace 1h', tags: ['objection: price'], score: 45, unread: false },
    { name: 'Camila S.', channel: 'WhatsApp', preview: 'Perfecto, ¿cuándo podríamos agendar?', time: 'hace 2h', tags: ['follow-up needed'], score: 78, unread: true },
    { name: 'Martín L.', channel: 'Instagram', preview: 'No estoy seguro de si es para mí...', time: 'hace 4h', tags: ['no response'], score: 31, unread: false },
    { name: 'Valentina R.', channel: 'WhatsApp', preview: 'Genial, lo consulto con mi socio y...', time: 'hace 6h', tags: ['follow-up needed'], score: 65, unread: false },
    { name: 'Federico P.', channel: 'WhatsApp', preview: 'Sí, me gustaría avanzar. ¿Próximos pasos?', time: 'hace 8h', tags: ['hot lead', 'recovered'], score: 88, unread: false },
    { name: 'Luciana G.', channel: 'Instagram', preview: 'Leí lo de su propuesta pero no me...', time: 'hace 1d', tags: ['objection: timing'], score: 52, unread: false },
];

const TAG_COLORS: Record<string, string> = {
    'hot lead': 'sis-tag-green',
    'no response': 'sis-tag-red',
    'objection: price': 'sis-tag-yellow',
    'objection: timing': 'sis-tag-yellow',
    'follow-up needed': 'sis-tag-blue',
    'recovered': 'sis-tag-purple',
};

export const SistemaConversations = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div className="sis-page-title">Conversations</div>
                <div className="sis-page-subtitle">Análisis inteligente de todas tus conversaciones comerciales</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr 300px', gap: '16px', height: 'calc(100vh - 160px)' }}>
                {/* Conversation List */}
                <div className="sis-card-static" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                    {/* Search + Filter */}
                    <div style={{ padding: '14px', borderBottom: '1px solid var(--sis-border)', display: 'flex', gap: '8px' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--sis-bg-input)', border: '1px solid var(--sis-border)', borderRadius: '8px' }}>
                            <Search size={14} style={{ color: 'var(--sis-text-muted)' }} />
                            <span style={{ fontSize: '12px', color: 'var(--sis-text-muted)' }}>Buscar...</span>
                        </div>
                        <button className="sis-btn sis-btn-ghost" style={{ padding: '8px' }}><Filter size={14} /></button>
                    </div>
                    {/* Tabs */}
                    <div style={{ display: 'flex', padding: '8px 14px', gap: '4px', borderBottom: '1px solid var(--sis-border)' }}>
                        {['Todas', 'Hot', 'Sin respuesta', 'Objeciones'].map((t, i) => (
                            <button key={i} style={{
                                padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                                border: 'none', cursor: 'pointer', fontFamily: 'var(--sis-font-sans)',
                                background: i === 0 ? 'var(--sis-accent-subtle)' : 'transparent',
                                color: i === 0 ? 'var(--sis-accent)' : 'var(--sis-text-muted)'
                            }}>{t}</button>
                        ))}
                    </div>
                    {/* List */}
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {CONVERSATIONS.map((c, i) => (
                            <div key={i} style={{
                                padding: '14px', borderBottom: '1px solid var(--sis-border-subtle)', cursor: 'pointer',
                                background: i === 0 ? 'var(--sis-accent-subtle)' : 'transparent',
                                transition: 'background 0.15s'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {c.unread && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sis-accent)' }} />}
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>{c.name}</span>
                                    </div>
                                    <span style={{ fontSize: '10px', color: 'var(--sis-text-muted)' }}>{c.time}</span>
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--sis-text-tertiary)', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>{c.preview}</div>
                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                    <span className="sis-tag sis-tag-neutral" style={{ fontSize: '9px' }}>{c.channel}</span>
                                    {c.tags.map((tag, j) => (
                                        <span key={j} className={`sis-tag ${TAG_COLORS[tag] || 'sis-tag-neutral'}`} style={{ fontSize: '9px' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat View */}
                <div className="sis-card-static" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                    {/* Header */}
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--sis-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Alejandra M.</div>
                            <div style={{ fontSize: '11px', color: 'var(--sis-text-muted)' }}>WhatsApp · Grupo Riviera · Lead desde hace 3 días</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span className="sis-tag sis-tag-green">Hot Lead</span>
                            <div className="sis-score-ring sis-score-high" style={{ width: '32px', height: '32px', fontSize: '11px' }}>92</div>
                        </div>
                    </div>
                    {/* Messages */}
                    <div style={{ flex: 1, padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                        <div className="sis-chat-bubble sis-chat-incoming">
                            <div>Hola, me interesa el plan enterprise para mi empresa. Somos un equipo de 15 vendedores.</div>
                            <div className="sis-chat-time">10:34 AM</div>
                        </div>
                        <div className="sis-chat-bubble sis-chat-outgoing">
                            <div>¡Hola Alejandra! Qué bueno tu interés. El plan Enterprise es ideal para equipos de ese tamaño. ¿Te gustaría que agendemos una demo personalizada?</div>
                            <div className="sis-chat-time">10:38 AM</div>
                        </div>
                        <div className="sis-chat-bubble sis-chat-incoming">
                            <div>Sí, me encantaría. ¿Tienen disponibilidad esta semana? También me gustaría saber el pricing para 15 usuarios.</div>
                            <div className="sis-chat-time">10:45 AM</div>
                        </div>
                        <div className="sis-chat-bubble sis-chat-outgoing">
                            <div>¡Perfecto! Tenemos disponibilidad jueves o viernes a las 11am. Respecto al pricing, el plan Enterprise para 15 usuarios está en $299/mes con todas las integraciones incluidas.</div>
                            <div className="sis-chat-time">10:52 AM</div>
                        </div>
                        <div className="sis-chat-bubble sis-chat-incoming">
                            <div>El jueves a las 11 me viene bien. ¿Me enviás un link para confirmar?</div>
                            <div className="sis-chat-time">11:01 AM</div>
                        </div>
                    </div>
                    {/* Input (disabled) */}
                    <div style={{ padding: '12px 16px', borderTop: '1px solid var(--sis-border)', display: 'flex', gap: '8px' }}>
                        <input className="sis-input" placeholder="Escribir mensaje..." style={{ fontSize: '13px' }} disabled />
                        <button className="sis-btn sis-btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }} disabled>Enviar</button>
                    </div>
                </div>

                {/* AI Insights Panel */}
                <div className="sis-card-static" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--sis-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={14} style={{ color: 'var(--sis-accent)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>AI Insights</span>
                    </div>
                    <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
                        <div className="sis-insight">
                            <div className="sis-insight-title"><Star size={12} /> Calificación del lead</div>
                            <div className="sis-insight-body">Lead con alta intención de compra. Equipo de 15 personas indica enterprise sale. Probabilidad de cierre: <strong>alta</strong>.</div>
                        </div>
                        <div className="sis-insight" style={{ borderLeftColor: 'var(--sis-warning)' }}>
                            <div className="sis-insight-title" style={{ color: 'var(--sis-warning)' }}><AlertTriangle size={12} /> Acción recomendada</div>
                            <div className="sis-insight-body">Enviar link de Calendly inmediatamente. El lead mencionó disponibilidad para jueves — confirmar antes de que pase más tiempo.</div>
                        </div>
                        <div className="sis-insight" style={{ borderLeftColor: 'var(--sis-blue)' }}>
                            <div className="sis-insight-title" style={{ color: 'var(--sis-blue)' }}><MessageSquare size={12} /> Análisis de tono</div>
                            <div className="sis-insight-body">Tono positivo y proactivo. El lead hizo preguntas concretas sobre pricing y sizing, lo que indica decisión avanzada.</div>
                        </div>
                        <div className="sis-insight" style={{ borderLeftColor: 'var(--sis-purple)' }}>
                            <div className="sis-insight-title" style={{ color: 'var(--sis-purple)' }}><Clock size={12} /> Response Time</div>
                            <div className="sis-insight-body">Tiempo de respuesta promedio: 6 min. Excelente. Mantener este ritmo para leads enterprise.</div>
                        </div>
                        <div className="sis-insight">
                            <div className="sis-insight-title"><Zap size={12} /> Respuesta sugerida</div>
                            <div className="sis-insight-body" style={{ fontStyle: 'italic' }}>"¡Listo Alejandra! Te envío el link para confirmar el jueves a las 11am: [link]. ¿Necesitás algo más antes de la demo?"</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
