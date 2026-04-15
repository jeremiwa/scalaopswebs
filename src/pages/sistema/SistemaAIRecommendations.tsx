import { BrainCircuit, Zap, Target, Users, MessageSquare, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SistemaAIRecommendations = () => {
    return (
        <div>
            <div className="sis-page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div className="sis-page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            AI Recommendations
                            <span className="sis-tag sis-tag-green">Revenue Copilot</span>
                        </div>
                        <div className="sis-page-subtitle">Recomendaciones accionables generadas por inteligencia artificial</div>
                    </div>
                    <span style={{ fontFamily: 'var(--sis-font-mono)', fontSize: '11px', color: 'var(--sis-text-muted)' }}>Última actualización: hace 12 min</span>
                </div>
            </div>

            {/* Priority Actions */}
            <div className="sis-card-glow" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Zap size={18} style={{ color: 'var(--sis-accent)' }} />
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--sis-text-primary)' }}>Priority Actions</span>
                    <span className="sis-tag sis-tag-red" style={{ fontSize: '10px' }}>5 acciones pendientes</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                        { action: 'Recontactar 12 leads sin respuesta de las últimas 48h', impact: '$14,400 en riesgo', category: 'Follow-up', done: false },
                        { action: 'Revisar script de manejo de objeción "precio alto" con Carlos R.', impact: 'Mejorar tasa de cierre 8%', category: 'Coaching', done: false },
                        { action: 'Enviar propuesta actualizada a 4 leads que pidieron cotización', impact: '$9,200 recuperables', category: 'Pipeline', done: true },
                        { action: 'Configurar auto-respuesta para leads Instagram fuera de horario', impact: 'Reducir tiempo de respuesta 40%', category: 'Automación', done: false },
                        { action: 'Agendar sesión de coaching con Sofía L. — score bajo persistente', impact: 'Mejorar performance 15%', category: 'Equipo', done: false },
                    ].map((a, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px',
                            background: a.done ? 'rgba(16, 185, 129, 0.04)' : 'var(--sis-bg-secondary)',
                            border: `1px solid ${a.done ? 'rgba(16, 185, 129, 0.12)' : 'var(--sis-border)'}`,
                            borderRadius: 'var(--sis-radius-md)', opacity: a.done ? 0.6 : 1
                        }}>
                            <div style={{
                                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                border: a.done ? 'none' : '2px solid var(--sis-border-strong)',
                                background: a.done ? 'var(--sis-accent)' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {a.done && <CheckCircle2 size={14} style={{ color: 'white' }} />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', fontWeight: 500, color: a.done ? 'var(--sis-text-tertiary)' : 'var(--sis-text-primary)', textDecoration: a.done ? 'line-through' : 'none' }}>{a.action}</div>
                                <div style={{ fontSize: '11px', color: 'var(--sis-text-muted)', marginTop: '2px' }}>{a.impact}</div>
                            </div>
                            <span className="sis-tag sis-tag-neutral" style={{ fontSize: '10px' }}>{a.category}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Per Category Recommendations */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                {/* Per Advisor */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <Users size={16} style={{ color: 'var(--sis-blue)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Por asesor</span>
                    </div>
                    {[
                        { advisor: 'Carlos R.', rec: 'Practicar manejo de objeción de precio. Tasa actual: 33% resolución.' },
                        { advisor: 'Sofía L.', rec: 'Reducir talk ratio en llamadas. Actual: 72%. Ideal: <50%.' },
                        { advisor: 'Lucas M.', rec: 'Mejorar velocidad de primer contacto. Promedio actual: 6.2h.' },
                    ].map((r, i) => (
                        <div key={i} className="sis-insight" style={{ marginBottom: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sis-blue)', marginBottom: '4px' }}>{r.advisor}</div>
                            <div className="sis-insight-body" style={{ fontSize: '12px' }}>{r.rec}</div>
                        </div>
                    ))}
                </div>

                {/* Per Channel */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <MessageSquare size={16} style={{ color: 'var(--sis-teal)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Por canal</span>
                    </div>
                    {[
                        { channel: 'WhatsApp', rec: 'Implementar quick-replies para consultas frecuentes. Reducir tiempo de respuesta 35%.' },
                        { channel: 'Instagram', rec: 'Leads de IG tienen 2x más objeciones de precio. Ajustar copy de entrada.' },
                        { channel: 'Llamadas', rec: 'Mayor tasa de cierre cuando la llamada dura > 10 min. Evitar calls cortas de prospección.' },
                    ].map((r, i) => (
                        <div key={i} className="sis-insight" style={{ marginBottom: '8px', borderLeftColor: 'var(--sis-teal)' }}>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sis-teal)', marginBottom: '4px' }}>{r.channel}</div>
                            <div className="sis-insight-body" style={{ fontSize: '12px' }}>{r.rec}</div>
                        </div>
                    ))}
                </div>

                {/* Quick Wins */}
                <div className="sis-card-static">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <Target size={16} style={{ color: 'var(--sis-accent)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Quick wins</span>
                    </div>
                    {[
                        { win: 'Activar notificación de lead sin respuesta > 2h', impact: 'Reducir leaks 22%' },
                        { win: 'Agregar paso de "próximo contacto" obligatorio en CRM', impact: 'Mejorar follow-up 40%' },
                        { win: 'Compartir mejores respuestas a objeciones con el equipo', impact: 'Aumentar resolución 15%' },
                    ].map((r, i) => (
                        <div key={i} className="sis-insight" style={{ marginBottom: '8px' }}>
                            <div className="sis-insight-body" style={{ fontSize: '12px' }}>{r.win}</div>
                            <div style={{ marginTop: '6px' }}>
                                <span className="sis-tag sis-tag-green" style={{ fontSize: '10px' }}>{r.impact}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggested Responses */}
            <div className="sis-card-static">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <BrainCircuit size={16} style={{ color: 'var(--sis-accent)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sis-text-primary)' }}>Respuestas sugeridas por IA</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {[
                        { context: 'Lead pregunta por precio', response: '"Antes de hablar de inversión, me gustaría entender mejor tu operación actual. ¿Cuántos leads estás generando por mes y cuántos estás cerrando?"' },
                        { context: 'Lead dice "lo pienso"', response: '"Perfecto, es importante tomarse el tiempo. ¿Te parece si agendamos un follow-up para el [día]? Así puedo resolver cualquier duda que te surja."' },
                        { context: 'Lead no responde hace 48h', response: '"Hola [nombre], ¿pudiste revisar lo que habíamos conversado? Quería compartirte un caso similar al tuyo donde lograron [resultado específico]."' },
                        { context: 'Lead pide comparación con competencia', response: '"La verdad es que hay buenas herramientas en el mercado. La diferencia de Scala es que analizamos la capa de conversaciones, que es donde se pierde el revenue real."' },
                    ].map((s, i) => (
                        <div key={i} style={{ padding: '14px', background: 'var(--sis-bg-secondary)', borderRadius: 'var(--sis-radius-md)', border: '1px solid var(--sis-border-subtle)' }}>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sis-warning)', marginBottom: '6px' }}>{s.context}</div>
                            <div style={{ fontSize: '12px', color: 'var(--sis-text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>{s.response}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
