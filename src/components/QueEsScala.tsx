import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Search, Wrench, Bot, TrendingUp, MessageCircle, Camera, Users } from 'lucide-react';

export const QueEsScala = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "center center"]
    });

    const lineFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Badge counter animation
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const dur1 = 800;
        const start1 = performance.now();
        function tick1(now: number) {
            const p = Math.min((now - start1) / dur1, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount1(Math.round(7 * eased));
            if (p < 1) requestAnimationFrame(tick1);
        }
        requestAnimationFrame(tick1);

        setTimeout(() => {
            const dur2 = 800;
            const start2 = performance.now();
            function tick2(now: number) {
                const p = Math.min((now - start2) / dur2, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                setCount2(Math.round(30 * eased));
                if (p < 1) requestAnimationFrame(tick2);
            }
            requestAnimationFrame(tick2);
        }, 200);
    }, [isInView]);

    const nodes = [
        {
            step: 1,
            number: "01",
            days: `${count1} días`,
            icon: Search,
            title: "Auditoría profunda",
            desc: "Escuchamos tus llamadas, leemos tus chats y medimos dónde exactamente se te escapan ventas.",
            color: "green" as const,
        },
        {
            step: 2,
            number: "02",
            days: `${count2} días`,
            icon: Wrench,
            title: "Implementación completa",
            desc: "Rearmamos discurso de venta, proceso comercial, automatizaciones, tablero de métricas y entrenamos a tu equipo.",
            color: "green" as const,
        },
        {
            step: 3,
            number: "03",
            days: "Empleado IA",
            icon: Bot,
            title: "Agente 24/7",
            desc: "Responde en segundos, califica leads y agenda reuniones. Integrado a tu proceso y con traspaso a humano con contexto.",
            color: "green" as const,
        },
        {
            step: 4,
            number: "∞",
            days: "Resultado",
            icon: TrendingUp,
            title: "SCALA",
            desc: "Más ventas. Más cierres. Mismo presupuesto.",
            color: "result" as const,
        },
    ];

    const colorMap = {
        green: {
            badgeBg: 'rgba(34,197,94,0.06)',
            badgeBorder: 'rgba(34,197,94,0.15)',
            badgeBgActive: 'rgba(34,197,94,0.1)',
            badgeBorderActive: 'rgba(34,197,94,0.3)',
            badgeShadow: 'rgba(34,197,94,0.1)',
            iconBg: 'rgba(34,197,94,0.06)',
            iconBorder: 'rgba(34,197,94,0.1)',
            iconBgActive: 'rgba(34,197,94,0.1)',
            iconShadow: 'rgba(34,197,94,0.08)',
            textColor: '#22C55E',
        },
        blue: {
            badgeBg: 'rgba(59,130,246,0.06)',
            badgeBorder: 'rgba(59,130,246,0.15)',
            badgeBgActive: 'rgba(59,130,246,0.1)',
            badgeBorderActive: 'rgba(59,130,246,0.3)',
            badgeShadow: 'rgba(59,130,246,0.1)',
            iconBg: 'rgba(59,130,246,0.06)',
            iconBorder: 'rgba(59,130,246,0.1)',
            iconBgActive: 'rgba(59,130,246,0.1)',
            iconShadow: 'rgba(59,130,246,0.08)',
            textColor: '#3B82F6',
        },
        result: {
            badgeBg: 'rgba(34,197,94,0.08)',
            badgeBorder: 'rgba(34,197,94,0.2)',
            badgeBgActive: 'rgba(34,197,94,0.14)',
            badgeBorderActive: 'rgba(34,197,94,0.4)',
            badgeShadow: 'rgba(34,197,94,0.15)',
            iconBg: 'rgba(34,197,94,0.1)',
            iconBorder: 'rgba(34,197,94,0.2)',
            iconBgActive: 'rgba(34,197,94,0.15)',
            iconShadow: 'rgba(34,197,94,0.25)',
            textColor: '#22C55E',
        },
    };

    return (
        <section
            ref={sectionRef}
            className="section-scala relative flex flex-col items-center"
        >
            <div className="container-custom relative z-10 flex flex-col items-center">

                {/* ── CARD WRAPPER (with glows behind) ── */}
                <div className="relative w-full max-w-[1100px] mx-auto">

                    {/* ═══ FULL AMBIENT GLOW — covers entire card area ═══ */}
                    <div
                        className="absolute pointer-events-none z-0"
                        style={{
                            top: '-250px',
                            left: '-250px',
                            right: '-250px',
                            bottom: '-250px',
                            background: `radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.22), transparent 50%)`,
                            filter: 'blur(30px)',
                        }}
                    />

                    {/* ═══ GLOW TOP — intense blue edge bleed ═══ */}
                    <div
                        className="absolute pointer-events-none z-0"
                        style={{
                            top: '-220px',
                            left: '-200px',
                            right: '-200px',
                            height: '500px',
                            background: `radial-gradient(1000px 400px at 50% 100%, rgba(59,130,246,0.55), transparent 60%), radial-gradient(700px 300px at 65% 85%, rgba(99,102,241,0.35), transparent 55%), radial-gradient(500px 250px at 35% 90%, rgba(79,70,229,0.25), transparent 55%)`,
                            filter: 'blur(20px)',
                        }}
                    />

                    {/* ═══ GLOW BOTTOM — intense blue edge bleed ═══ */}
                    <div
                        className="absolute pointer-events-none z-0"
                        style={{
                            bottom: '-220px',
                            left: '-200px',
                            right: '-200px',
                            height: '500px',
                            background: `radial-gradient(1000px 400px at 50% 0%, rgba(59,130,246,0.50), transparent 60%), radial-gradient(700px 300px at 40% 15%, rgba(99,102,241,0.30), transparent 55%), radial-gradient(500px 250px at 60% 10%, rgba(79,70,229,0.22), transparent 55%)`,
                            filter: 'blur(20px)',
                        }}
                    />

                    {/* ═══ THE CARD — everything inside ═══ */}
                    <div
                        className="relative rounded-[24px] flex flex-col items-center"
                        style={{
                            background: 'linear-gradient(180deg, rgba(13,13,20,0.95) 0%, rgba(10,10,15,0.90) 100%)',
                            border: '1px solid rgba(99,102,241,0.15)',
                            padding: '56px 48px 40px',
                            boxShadow: `
                                0 0 30px rgba(59,130,246,0.20),
                                0 0 80px rgba(59,130,246,0.16),
                                0 0 160px rgba(59,130,246,0.12),
                                0 0 300px rgba(79,70,229,0.08),
                                0 20px 60px rgba(0,0,0,0.5)
                            `,
                            zIndex: 1,
                        }}
                    >
                        {/* ── LABEL ── */}
                        <motion.p
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '100px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#D0D0DC', marginBottom: '20px' }}
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            Qué es SCALA
                        </motion.p>

                        {/* ── H2 TITLE ── */}
                        <motion.h2
                            className="section-h2 text-center"
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Auditamos, arreglamos y entrenamos.<br />En 30 días.
                        </motion.h2>

                        {/* ── SUBTITLE ── */}
                        <motion.p
                            className="section-sub text-center"
                            initial={{ opacity: 0, y: 14 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Todo lo que tu equipo necesita para dejar de perder ventas, implementado de principio a fin.
                        </motion.p>

                        {/* Timeline */}
                        <div ref={timelineRef} className="relative w-full mb-10">
                            {/* Horizontal connecting track (desktop) */}
                            <div className="hidden md:block absolute top-[84px] z-0" style={{ left: 'calc(12.5%)', right: 'calc(12.5%)' }}>
                                <div className="h-[3px] w-full bg-white/[0.06] rounded-full">
                                    <motion.div
                                        className="h-full rounded-full timeline-line-fill"
                                        style={{
                                            width: lineFill,
                                            background: 'linear-gradient(90deg, #22C55E 0%, #10B981 33%, #3B82F6 66%, #22C55E 100%)',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Vertical connecting track (mobile) — LEFT SIDE */}
                            <div className="md:hidden absolute left-[23px] top-10 bottom-10 w-[3px] bg-white/[0.06] z-0">
                                <motion.div
                                    className="w-full rounded-full"
                                    style={{
                                        height: lineFill,
                                        background: 'linear-gradient(180deg, #22C55E, #10B981, #3B82F6)',
                                        boxShadow: '0 0 12px rgba(34,197,94,0.2)',
                                    }}
                                />
                            </div>

                            {/* 4 Nodes */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-0 relative z-10">
                                {nodes.map((node) => {
                                    const c = colorMap[node.color];
                                    const Icon = node.icon;
                                    const isResult = node.color === 'result';
                                    return (
                                        <motion.div
                                            key={node.step}
                                            className="flex flex-col items-start text-left pl-16 md:items-center md:text-center md:pl-0 px-3 relative"
                                            initial={{ opacity: 0, y: 24 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.6, delay: (node.step - 1) * 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            {/* Watermark Number */}
                                            <div className="absolute top-[40px] left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 text-[100px] font-bold leading-none pointer-events-none select-none" style={{ color: '#ffffff', opacity: 0.03, zIndex: -1 }}>
                                                {node.number}
                                            </div>

                                            {/* Badge */}
                                            <div
                                                className={`flex items-center justify-center gap-[8px] mb-8 px-[16px] rounded-full transition-all duration-400 h-[28px] ${isResult ? 'node-badge-green' : c.textColor === '#3B82F6' ? 'node-badge-blue' : 'node-badge-green'}`}
                                                style={{
                                                    background: isInView ? c.badgeBgActive : c.badgeBg,
                                                }}
                                            >
                                                {!isResult && <span className="text-[11px] font-bold opacity-50 uppercase tracking-widest" style={{ color: c.textColor }}>{node.number}</span>}
                                                {!isResult && <span className="w-[3px] h-[3px] rounded-full bg-white/20"></span>}
                                                <span className="text-[13px] font-semibold" style={{ color: c.textColor }}>{node.days}</span>
                                            </div>

                                            {/* Icon — on left line in mobile, centered in desktop */}
                                            <div
                                                className={`w-[48px] h-[48px] flex items-center justify-center rounded-full mb-4 md:mb-6 transition-all duration-400 z-10 md:relative absolute left-0 md:left-auto ${isResult ? 'node-icon-result' : c.textColor === '#22C55E' ? 'node-icon-green' : ''}`}
                                                style={{
                                                    background: '#0D0D14',
                                                    border: `2px solid ${isInView ? c.textColor : c.iconBorder}`,
                                                    color: isInView ? c.textColor : '#A0A0B0',
                                                }}
                                            >
                                                <Icon size={20} strokeWidth={2} />
                                            </div>

                                            {/* Title */}
                                            <h3
                                                className="text-[17px] font-semibold mb-2 tracking-tight"
                                                style={{ color: isResult ? '#22C55E' : '#F5F5F7' }}
                                            >
                                                {node.title}
                                            </h3>

                                            {/* Description */}
                                            <p
                                                className="text-[14.5px] leading-relaxed max-w-[220px]"
                                                style={{ color: isResult ? 'rgba(34,197,94,0.85)' : '#A0A0B0' }}
                                            >
                                                {node.desc}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer: Ideal para + chips */}
                        <div className="w-full pt-7 mt-2 border-t border-white/[0.04] flex flex-col items-center">
                            <p className="text-[12px] font-semibold text-[#5A5A6E] uppercase tracking-[0.1em] mb-5">Ideal para:</p>
                            <div className="flex justify-center gap-3 flex-wrap">
                                <div className="inline-flex items-center gap-2 px-[16px] py-[8px] rounded-full bg-white/[0.02] border border-white/[0.05] text-[13px] text-[#A0A0B0] hover:bg-white/[0.05] hover:text-[#F5F5F7] transition-colors">
                                    <MessageCircle size={16} className="text-[#8B8B9E] shrink-0" />
                                    <span>Ventas por WhatsApp</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-[16px] py-[8px] rounded-full bg-white/[0.02] border border-white/[0.05] text-[13px] text-[#A0A0B0] hover:bg-white/[0.05] hover:text-[#F5F5F7] transition-colors">
                                    <Camera size={16} className="text-[#8B8B9E] shrink-0" />
                                    <span>Ventas por Instagram</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-[16px] py-[8px] rounded-full bg-white/[0.02] border border-white/[0.05] text-[13px] text-[#A0A0B0] hover:bg-white/[0.05] hover:text-[#F5F5F7] transition-colors">
                                    <Users size={16} className="text-[#8B8B9E] shrink-0" />
                                    <span>Equipos comerciales</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
