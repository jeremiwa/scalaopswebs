import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ── Unified badge component ── */
const Badge = ({ dot = 'teal', children }: { dot?: 'teal' | 'orange' | 'red'; children: React.ReactNode }) => {
    const dotColor = dot === 'orange' ? '#F59E0B' : dot === 'red' ? '#EF4444' : '#10B981';
    return (
        <div
            className="inline-flex items-center gap-2 h-[32px] px-3 rounded-full text-[12px] font-medium"
            style={{
                background: 'rgba(15,23,42,0.55)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(148,163,184,0.14)',
                color: 'rgba(255,255,255,0.85)',
                boxShadow: '0 0 12px rgba(16,185,129,0.04)',
            }}
        >
            <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ background: dotColor }} />
            {children}
        </div>
    );
};

/* ── Animated counter hook ── */
const useCountLoop = (target: number, duration = 1800, pause = 1200) => {
    const [value, setValue] = useState(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        let cancelled = false;
        const run = () => {
            const start = performance.now();
            const tick = (now: number) => {
                if (cancelled) return;
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                setValue(Math.round(target * eased));
                if (p < 1) {
                    rafRef.current = requestAnimationFrame(tick);
                } else {
                    setTimeout(() => { if (!cancelled) { setValue(0); run(); } }, pause);
                }
            };
            rafRef.current = requestAnimationFrame(tick);
        };
        run();
        return () => { cancelled = true; cancelAnimationFrame(rafRef.current); };
    }, [target, duration, pause]);

    return value;
};

export const StoryboardDolor = () => {
    const count = useCountLoop(10000, 2000, 1500);
    const formatted = count.toLocaleString('es-AR');

    return (
        <section className="relative" style={{ background: '#0B0B12', padding: '130px 0' }}>
            <div style={{ position: 'absolute', top: '-150px', left: '-150px', right: '-150px', bottom: '-150px', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 40%, rgba(239,68,68,0.020) 0%, rgba(239,68,68,0.008) 40%, transparent 65%)', filter: 'blur(150px)', transform: 'translateZ(0)' }}></div>
            <div className="container-custom relative z-10 flex flex-col items-center">
                <div className="relative w-full max-w-[1200px] mx-auto">

                    {/* Glow TOP */}
                    <div className="absolute pointer-events-none z-0" style={{ top: '-90px', left: '-80px', right: '-80px', height: '220px', background: 'radial-gradient(600px 200px at 50% 100%, rgba(16,185,129,0.18), transparent 60%)', filter: 'blur(50px)', opacity: 0.76, transform: 'translateZ(0)' }} />
                    {/* Glow BOTTOM */}
                    <div className="absolute pointer-events-none z-0" style={{ bottom: '-90px', left: '-80px', right: '-80px', height: '220px', background: 'radial-gradient(600px 200px at 50% 0%, rgba(16,185,129,0.15), transparent 60%)', filter: 'blur(60px)', opacity: 0.72, transform: 'translateZ(0)' }} />

                    {/* MODULE CARD */}
                    <div className="relative rounded-[24px] flex flex-col items-center" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.55) 100%)', border: '1px solid rgba(148,163,184,0.16)', padding: '44px', boxShadow: '0 20px 60px rgba(0,0,0,0.55)', zIndex: 1 }}>
                        <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-[24px] overflow-hidden">
                            <div style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.08) 50%, transparent 100%)', height: '1px' }} />
                        </div>

                        {/* HEADER */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center w-full">
                            <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '16px' }}>
                                Te escriben. Pero no compran.
                            </h2>
                            <p style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 56px auto' }}>
                                Esto es lo que pasa entre el primer mensaje y el cierre en la mayoría de los negocios.
                            </p>
                        </motion.div>

                        {/* 3 CARDS */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 w-full" style={{ alignItems: 'stretch', gap: '24px' }}>

                            {/* ═══ CARD 1 — WhatsApp ═══ */}
                            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                                className="flex flex-col"
                                style={{ background: '#0C0C14', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', minHeight: '480px', padding: 0 }}>

                                {/* WA header */}
                                <div className="flex items-center gap-[10px] px-4 py-[10px]" style={{ background: '#1F2C34', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <span className="text-[14px]" style={{ color: '#8696A0' }}>←</span>
                                    <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0" style={{ background: '#6B7C85', color: '#FFF' }}>JP</div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-[14px] font-medium text-[#E9EDEF] truncate">Juan Pérez</span>
                                        <span className="text-[11px]" style={{ color: '#8696A0' }}>en línea</span>
                                    </div>
                                    <div className="flex gap-3 text-[13px]" style={{ color: '#8696A0' }}><span>📹</span><span>📞</span><span>⋮</span></div>
                                </div>

                                {/* Chat */}
                                <div className="flex flex-col p-4 h-[220px]" style={{ backgroundColor: '#0B141A', backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
                                    <div className="self-center text-[10px] px-3 py-1 rounded-md mb-3" style={{ color: '#8696A0', background: '#182229' }}>HOY</div>
                                    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.3 }}
                                        className="self-start rounded-tr-xl rounded-br-xl rounded-bl-xl rounded-tl-sm max-w-[88%] px-3 py-2 text-[13px] leading-[1.45]" style={{ background: '#202C33', color: '#E9EDEF' }}>
                                        Hola, quiero info del departamento de 3 ambientes que vi en Instagram
                                        <span className="block text-right text-[10px] mt-0.5" style={{ color: '#8696A0' }}>16:02</span>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.0 }}
                                        className="self-start flex items-center gap-1.5 px-2 py-1 rounded mt-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                        <span className="text-[13px]" style={{ color: '#53BDEB' }}>✓✓</span>
                                        <span className="text-[10px]" style={{ color: '#8696A0' }}>Visto a las 16:02</span>
                                    </motion.div>
                                    {/* Typing dots */}
                                    <div style={{ display: 'flex', gap: '4px', padding: '12px 0', justifyContent: 'center', opacity: 0.15 }}>
                                        <span className="wa-typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8696A0', animation: 'typing-fade 2s ease-in-out infinite' }}></span>
                                        <span className="wa-typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8696A0', animation: 'typing-fade 2s ease-in-out infinite 0.3s' }}></span>
                                        <span className="wa-typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8696A0', animation: 'typing-fade 2s ease-in-out infinite 0.6s' }}></span>
                                    </div>
                                    <div className="flex-1" />
                                </div>

                                {/* Alert Badge */}
                                <div style={{ margin: '14px 20px' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#EF4444' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', flexShrink: 0 }}></span>
                                        4 horas sin respuesta
                                    </div>
                                </div>

                                {/* Title + Desc */}
                                <div className="px-5 pb-5 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                                    <h3 className="text-[#F5F5F7] text-[18px] font-[650] mb-1.5">Se pierde el cliente</h3>
                                    <p className="text-[15px] leading-[1.5]" style={{ color: '#8B8B9E' }}>Tardaste 4 horas. Otro contestó en 2 minutos y se llevó la venta.</p>
                                </div>
                            </motion.div>

                            {/* ═══ CARD 2 — Instagram DM ═══ */}
                            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}
                                className="flex flex-col"
                                style={{ background: '#0C0C14', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', minHeight: '480px', padding: 0 }}>

                                {/* IG header */}
                                <div className="flex items-center gap-[10px] px-4 py-[10px] relative" style={{ background: '#000000', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 10%, #833AB4 30%, #FD1D1D 50%, #F77737 70%, transparent 90%)', opacity: 0.30 }} />
                                    <span className="text-[14px]" style={{ color: '#F5F5F5' }}>←</span>
                                    <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center p-[2px]" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                                        <div className="w-full h-full rounded-full bg-[#000] flex items-center justify-center text-[11px] font-semibold" style={{ color: '#FFF' }}>ML</div>
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-[14px] font-medium text-[#F5F5F5] truncate">maría.lopez</span>
                                        <span className="text-[11px]" style={{ color: '#A8A8A8' }}>Activo/a hace 3h</span>
                                    </div>
                                    <div className="flex gap-3 text-[13px]" style={{ color: '#F5F5F5' }}><span>📞</span><span>ⓘ</span></div>
                                </div>

                                {/* Chat */}
                                <div className="flex flex-col p-4 h-[220px]" style={{ background: '#000000' }}>
                                    {/* "Más común" badge centered */}
                                    <div className="flex justify-center mb-3">
                                        <Badge dot="teal">Más común</Badge>
                                    </div>

                                    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.4 }}
                                        className="self-start rounded-[18px] px-[14px] py-2 max-w-[85%] text-[13px] leading-[1.45] mb-2" style={{ background: '#262626', color: '#F5F5F5' }}>
                                        Sí, me interesa. Pasame presupuesto
                                        <span className="block text-[10px] mt-0.5" style={{ color: '#A8A8A8' }}>10:34</span>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.9 }}
                                        className="self-end rounded-[18px] px-[14px] py-2 max-w-[85%] text-[13px] leading-[1.45] mb-1" style={{ background: 'rgba(16,185,129,0.15)', color: '#F5F5F5' }}>
                                        ¡Genial! Te paso el PDF 📎
                                        <span className="block text-right text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>11:02</span>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 1.3 }}
                                        className="self-end text-[10px] px-1" style={{ color: '#A8A8A8' }}>Visto</motion.div>

                                    <div className="flex-1" />
                                </div>

                                {/* Alert Badge */}
                                <div style={{ margin: '14px 20px' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', color: '#F59E0B' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }}></span>
                                        Último contacto: hace 12 días
                                    </div>
                                </div>

                                {/* Title + Desc */}
                                <div className="px-5 pb-5 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                                    <h3 className="text-[#F5F5F7] text-[18px] font-[650] mb-1.5">Nadie hace seguimiento</h3>
                                    <p className="text-[15px] leading-[1.5]" style={{ color: '#8B8B9E' }}>Mandaron el presupuesto y nadie volvió a escribir. El 80% de las ventas necesita al menos 5 seguimientos.</p>
                                </div>
                            </motion.div>

                            {/* ═══ CARD 3 — Dinero perdido (hero-metric) ═══ */}
                            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.16 }}
                                className="flex flex-col"
                                style={{ background: '#0C0C14', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', minHeight: '480px', padding: 0 }}>

                                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    {/* Header */}
                                    <div style={{ textAlign: 'center', paddingBottom: '12px', marginBottom: '16px', borderBottom: '1px solid rgba(239,68,68,0.10)' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#EF4444', opacity: 0.7 }}>PÉRDIDA ESTIMADA</span>
                                    </div>

                                    {/* Amount */}
                                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '16px', fontWeight: 500, color: '#8B8B9E' }}>- USD</span>
                                        <span style={{ fontSize: '42px', fontWeight: 700, color: '#EF4444', letterSpacing: '-0.02em', lineHeight: 1, textShadow: '0 0 30px rgba(239,68,68,0.3)' }}>20.000</span>
                                        <span style={{ fontSize: '16px', fontWeight: 500, color: 'rgba(239,68,68,0.6)' }}>/mes</span>
                                    </div>

                                    <div style={{ fontSize: '13px', color: '#8B8B9E', marginBottom: '16px', textAlign: 'center' }}>por mala gestión comercial</div>

                                    {/* Breakdown */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                                        {['~10 clientes perdidos por mes', 'Ticket promedio: USD 2.000', '47 seguimientos pendientes', '12 días promedio sin respuesta'].map((text, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#A0A0B5' }}>
                                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(239,68,68,0.6)', flexShrink: 0 }}></span>
                                                {text}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', padding: '10px 12px', background: 'rgba(239,68,68,0.06)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.12)' }}>
                                        <span style={{ color: '#EF4444', fontSize: '14px' }}>⚠</span>
                                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#EF4444' }}>Se pierden oportunidades todos los días</span>
                                    </div>
                                </div>

                                {/* Title + Desc */}
                                <div className="px-5 pb-5 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                                    <h3 className="text-[#F5F5F7] text-[18px] font-[650] mb-1.5">Vendés a ciegas</h3>
                                    <p className="text-[15px] leading-[1.5]" style={{ color: '#8B8B9E' }}>No sabés cuántos clientes perdés ni por qué. Sin datos, cada decisión comercial es una apuesta.</p>
                                </div>
                            </motion.div>

                        </div>

                        {/* Mid-CTA below explicitely requested */}
                        <div style={{ textAlign: 'center', padding: '48px 0 0', width: '100%' }}>
                            <Link to="/formulario" target="_blank" rel="noopener noreferrer" className="mid-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 32px', background: 'transparent', border: '1.5px solid rgba(34,197,94,0.4)', borderRadius: '100px', color: '#22C55E', fontSize: '15px', fontWeight: 600, textDecoration: 'none', cursor: 'pointer', transition: 'all 0.3s ease', width: 'auto' }}>¿Te pasa esto? Agendá tu llamada gratuita</Link>
                            <p style={{ marginTop: '10px', fontSize: '13px', color: '#5A5A6E' }}>Llamada sin costo. Sin compromiso.</p>
                        </div>

                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        .mid-cta-btn:hover { background: rgba(34,197,94,0.08) !important; border-color: rgba(34,197,94,0.6) !important; }
                        @keyframes typing-fade { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.5; } }
                    `
                }} />
            </div>
        </section>
    );
};
