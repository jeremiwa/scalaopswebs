import { motion } from 'framer-motion';
import { Bot, Zap, CalendarDays, UserCheck, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CapaIA = () => {
    return (
        <section className="relative" style={{ background: '#08080D', padding: '130px 0' }}>
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', right: '-100px', bottom: '-100px', zIndex: 0, pointerEvents: 'none', borderRadius: '80px', background: 'radial-gradient(ellipse at 35% 40%, rgba(24, 93, 232,0.06) 0%, rgba(24, 93, 232,0.02) 40%, transparent 65%)', filter: 'blur(120px)', transform: 'translateZ(0)' }}></div>
            {/* The Wrapper */}
            <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-8">

                {/* --- MODULE CARD --- */}
                <div className="w-full" style={{
                    maxWidth: '1100px', margin: '0 auto', padding: '1px', borderRadius: '24px',
                    background: 'linear-gradient(145deg, rgba(24, 93, 232,0.18) 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.03) 60%, rgba(24, 93, 232,0.12) 100%)',
                    position: 'relative', zIndex: 1
                }}>
                    <div className="w-full flex flex-col items-center" style={{
                        background: '#08080D', borderRadius: '23px', padding: '64px 48px',
                        backgroundImage: 'radial-gradient(ellipse at 30% 0%, rgba(24, 93, 232,0.04) 0%, transparent 45%)'
                    }}>
                        {/* A) HEADER CENTRADO */}
                        <div className="flex flex-col items-center text-center w-full mb-12 md:mb-16">
                            {/* Pill */}
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(24, 93, 232,0.06)', border: '1px solid rgba(24, 93, 232,0.15)', borderRadius: '100px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#93B4F5', marginBottom: '20px' }}>
                                <Bot size={14} color="#93B4F5" />
                                EMPLEADO IA
                            </div>

                            {/* Title H2 */}
                            <h2 className="text-center w-full mx-auto max-w-[860px]" style={{ fontSize: '48px', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '16px' }}>
                                Un bot IA hecho para tu negocio.<br />No uno genérico.
                            </h2>

                            {/* Subtitle */}
                            <p className="text-center mx-auto max-w-[720px]" style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.5, marginBottom: '56px' }}>
                                Entrenamos un agente con tu información, tu oferta y tu proceso comercial para que responda como parte real de tu equipo. Atiende consultas, califica leads, resuelve objeciones frecuentes, agenda reuniones y, cuando hace falta, deriva a una persona con todo el contexto.
                            </p>

                            {/* Link CTA */}
                            <Link to="/formulario" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 group font-medium text-[15px] transition-colors" style={{ color: 'rgba(167,243,208,0.9)', textDecoration: 'none' }}>
                                <span className="group-hover:text-white transition-colors">Conocer más detalles</span>
                                <span className="group-hover:translate-x-1 group-hover:text-white transition-all transform">→</span>
                            </Link>
                        </div>

                        {/* B) BODY 2-COLUMNS */}
                        <div className="flex flex-col lg:flex-row items-stretch w-full gap-[18px] lg:gap-[28px]">

                            {/* B1) MEDIA FRAME (Izquierda 7/12) */}
                            <div className="w-full lg:w-7/12 flex flex-col items-center justify-center p-8 relative overflow-hidden"
                                style={{
                                    background: 'rgba(2,6,23,0.55)',
                                    border: '1px solid rgba(148,163,184,0.18)',
                                    borderRadius: '20px',
                                }}
                            >
                                {/* Overlay Sutil Top Highlight */}
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(16,185,129,0.10), transparent 45%)' }}></div>

                                {/* Vignette */}
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.55) 80%)' }}></div>

                                {/* Contenido (El Diagrama anterior, reestilizado) */}
                                <div className="relative z-10 flex flex-col items-center w-full max-w-[340px]">
                                    <div className="flex items-center gap-4 mb-10 w-full justify-between">
                                        <div className="w-14 h-14 bg-[#0A0D10]/80 border border-white/[0.08] rounded-2xl flex items-center justify-center text-[#25D366]">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                                        </div>
                                        <span className="text-[#5A5A6E] font-medium">+</span>
                                        <div className="w-14 h-14 bg-[#0A0D10]/80 border border-white/[0.08] rounded-2xl flex items-center justify-center text-[#F5F5F7]">
                                            <Bot size={24} />
                                        </div>
                                        <span className="text-[#5A5A6E] font-medium">=</span>
                                        <div className="flex-1 bg-[#0A0D10]/80 border border-white/[0.08] rounded-2xl h-14 flex items-center justify-center gap-2 px-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                            <span className="text-[#F5F5F7] font-bold tracking-widest text-[14px]">SCALA</span>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-3 mb-8">
                                        <div className="bg-[#0A0D10]/80 backdrop-blur-sm border border-white/[0.05] rounded-xl p-3 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-[#8B8B9E]"><UserCheck size={14} /></div>
                                                <div className="flex flex-col"><span className="text-[#F5F5F7] text-[13px] font-medium">Jenny</span><span className="text-[#8B8B9E] text-[11px]">Hola, quiero info...</span></div>
                                            </div>
                                            <div className="w-2 h-2 rounded-full bg-[#6bdda1] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                                        </div>
                                        <div className="bg-[#0A0D10]/60 backdrop-blur-sm border border-white/[0.05] rounded-xl p-3 flex items-center justify-between opacity-80">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-[#8B8B9E]"><UserCheck size={14} /></div>
                                                <div className="flex flex-col"><span className="text-[#F5F5F7] text-[13px] font-medium">Robert</span><span className="text-[#8B8B9E] text-[11px]">Precio y tiempos...</span></div>
                                            </div>
                                            <div className="w-2 h-2 rounded-full bg-[#6bdda1] shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                                        </div>
                                        <div className="bg-[#0A0D10]/40 backdrop-blur-sm border border-white/[0.05] rounded-xl p-3 flex items-center justify-between opacity-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-[#8B8B9E]"><UserCheck size={14} /></div>
                                                <div className="flex flex-col"><span className="text-[#F5F5F7] text-[13px] font-medium">Emily</span><span className="text-[#8B8B9E] text-[11px]">Quiero agendar...</span></div>
                                            </div>
                                            <div className="w-2 h-2 rounded-full bg-[#6bdda1]"></div>
                                        </div>
                                    </div>
                                    <div className="w-[1px] h-10 bg-gradient-to-b from-white/10 to-[#6bdda1]/60 mb-4"></div>
                                    <div className="w-full bg-[#030712]/80 backdrop-blur-sm border border-[#6bdda1]/30 rounded-xl p-5 relative shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                        <div className="absolute inset-0 rounded-xl border border-[#6bdda1]/40 animate-pulse pointer-events-none"></div>
                                        <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-[#6bdda1] rounded-full animate-pulse shadow-[0_0_8px_#6bdda1]"></span>
                                                <span className="text-[#F5F5F7] text-[13px] font-medium">Agente SCALA procesando</span>
                                            </div>
                                            <Bot size={16} className="text-[#8B8B9E]" />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-2 text-[12px] text-[#2DD4BF]"><Zap size={14} /> Responde en 2s</div>
                                            <div className="flex items-center gap-2 text-[12px] text-[#2DD4BF]"><Filter size={14} /> Califica leads</div>
                                            <div className="flex items-center gap-2 text-[12px] text-[#2DD4BF]"><CalendarDays size={14} /> Agenda automático</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* B2) BENEFICIOS (Derecha 5/12) */}
                            <div className="w-full lg:w-5/12 flex flex-col justify-center gap-[18px] lg:gap-[22px]">
                                {/* Card 1 */}
                                <div className="flex items-start gap-4" style={{ background: 'rgba(15,23,42,0.35)', border: '1px solid rgba(148,163,184,0.12)', borderRadius: '16px', padding: '16px' }}>
                                    <div className="mt-0.5 shrink-0">
                                        <Zap size={22} color="rgba(16,185,129,0.95)" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-semibold text-white mb-1.5 leading-snug">Personalizado de verdad</h4>
                                        <p className="text-[14px] leading-[1.5]" style={{ color: 'rgba(203,213,225,0.72)' }}>Aprende sobre tu negocio, tus servicios, tus preguntas frecuentes y la forma en la que vendés.</p>
                                    </div>
                                </div>
                                {/* Card 2 */}
                                <div className="flex items-start gap-4" style={{ background: 'rgba(15,23,42,0.35)', border: '1px solid rgba(148,163,184,0.12)', borderRadius: '16px', padding: '16px' }}>
                                    <div className="mt-0.5 shrink-0">
                                        <Filter size={22} color="rgba(16,185,129,0.95)" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-semibold text-white mb-1.5 leading-snug">Responde, califica y agenda</h4>
                                        <p className="text-[14px] leading-[1.5]" style={{ color: 'rgba(203,213,225,0.72)' }}>No solo contesta mensajes: filtra leads, detecta intención y lleva la conversación al siguiente paso.</p>
                                    </div>
                                </div>
                                {/* Card 3 */}
                                <div className="flex items-start gap-4" style={{ background: 'rgba(15,23,42,0.35)', border: '1px solid rgba(148,163,184,0.12)', borderRadius: '16px', padding: '16px' }}>
                                    <div className="mt-0.5 shrink-0">
                                        <UserCheck size={22} color="rgba(16,185,129,0.95)" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-semibold text-white mb-1.5 leading-snug">Deriva al humano con contexto</h4>
                                        <p className="text-[14px] leading-[1.5]" style={{ color: 'rgba(203,213,225,0.72)' }}>Si la conversación requiere intervención humana, pasa el caso con historial, datos y resumen.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
