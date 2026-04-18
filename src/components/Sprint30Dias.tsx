import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const phases = [
    { day: "DÍAS 01-07", title: "AUDITORÍA", desc: "Mapeamos tu proceso actual, escuchamos llamadas, leemos chats, medimos tiempos y detectamos las fugas." },
    { day: "DÍAS 08-15", title: "REINGENIERÍA", desc: "Diseñamos el nuevo proceso comercial, reescribimos los guiones de venta y preparamos las automatizaciones." },
    { day: "DÍAS 16-25", title: "CONSTRUCCIÓN", desc: "Montamos el CRM con el proceso de venta, conectamos WhatsApp, configuramos alertas de SLA, y activamos el tablero de métricas." },
    { day: "DÍAS 26-30", title: "DESPLIEGUE + ENTRENAMIENTO", desc: "Go-live con tu equipo. Entrenamiento práctico (no teórico) con los casos reales de tu negocio." },
];

export const Sprint30Dias = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
    const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="como-funciona" className="relative" style={{ background: '#000000', padding: '130px 0' }}>
            <div className="container-custom relative z-10 flex flex-col items-center">

                {/* ── HEADER ── */}
                <div className="text-center mb-8 md:mb-10 reveal w-full flex flex-col items-center">
                    <span className="mb-4 block" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#6B6B80' }}>
                        QUÉ INSTALAMOS
                    </span>
                    <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '16px' }}>
                        30 días. De caos comercial a sistema funcionando.
                    </h2>
                    <p style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 56px auto' }}>
                        Sin teoría. Pura ejecución técnica e implementación 1 a 1.
                    </p>
                </div>

                {/* ══ TIMELINE 30 DÍAS ══ */}
                <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch max-w-6xl mx-auto mb-8 md:mb-10">
                    {/* Photo */}
                    <div className="w-full lg:w-1/2 shrink-0 reveal flex">
                        <div className="w-full h-full rounded-[18px] overflow-hidden bg-[#0D0D14] flex relative">
                            <img src="/images/implementacion.png" alt="Implementación SCALA" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%) sepia(20%) hue-rotate(80deg) brightness(80%) contrast(120%)' }} />
                            <div className="sprint-overlay" />
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="w-full lg:w-1/2 relative py-2 lg:py-6 flex flex-col justify-between h-auto" ref={containerRef}>
                        <div className="absolute left-[6px] top-2 bottom-6 w-[1px] bg-white/[0.08]" />
                        <motion.div className="absolute left-[6px] top-2 w-[1px] bg-[#6bdda1]" style={{ height: timelineHeight }} />
                        {phases.map((phase, i) => (
                            <div key={i} className="relative pl-10 md:pl-12 pb-8 last:pb-0 group reveal">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ margin: "-30%" }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-[1px] top-1.5 w-[11px] h-[11px] rounded-full bg-[#6bdda1] z-10"
                                />
                                <div className="text-[13px] font-bold tracking-wider mb-1.5 flex items-center gap-1.5">
                                    <span className="text-[#6bdda1]">{phase.day}</span>
                                    <span className="text-[#5A5A6E] font-normal">·</span>
                                    <span className="text-[#F5F5F7]">{phase.title}</span>
                                </div>
                                <p className="text-[14px] leading-[1.55] max-w-[480px]" style={{ color: 'rgba(203,213,225,0.70)' }}>{phase.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CTA ── */}
                <div className="flex flex-col items-center reveal">
                    <Link to="/formulario" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button variant="primary" className="px-8 text-[16px] mb-2">Agendá tu llamada gratuita</Button>
                    </Link>
                    <p className="text-[13px] text-[#5A5A6E] font-medium">Sin costo. Resultados en 72hs.</p>
                </div>
            </div>
        </section>
    );
};
