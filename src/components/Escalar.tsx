import { useRef, useEffect, useState } from 'react';
import { TrendingUp, UserPlus, Target, RefreshCw } from 'lucide-react';

export const Escalar = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [animated, setAnimated] = useState(false);
    const [c1, setC1] = useState(0);
    const [c2, setC2] = useState(0);
    const [c3, setC3] = useState(0);

    useEffect(() => {
        const el = chartRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setAnimated(true);
                const dur = 1200;
                const start = performance.now();
                function tick(now: number) {
                    const p = Math.min((now - start) / dur, 1);
                    const e = 1 - Math.pow(1 - p, 3);
                    setC1(Math.round(3 * e));
                    setC2(Math.round(100 * e));
                    setC3(Math.round(60 * e));
                    if (p < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
                obs.unobserve(el);
            }
        }, { threshold: 0.4 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const points = [
        { icon: TrendingUp, title: "Metés más leads sin miedo", desc: "Más tráfico ya no significa más caos. Cada lead entra a un proceso que funciona solo." },
        { icon: UserPlus, title: "Sumás vendedores sin perder control", desc: "Proceso documentado. Un vendedor nuevo replica lo que funciona en días." },
        { icon: Target, title: "Invertís en publicidad con datos", desc: "Sabés qué canal convierte, cuánto cuesta cada venta y cuánto podés pagar por lead." },
        { icon: RefreshCw, title: "Cada mes es mejor que el anterior", desc: "Con métricas claras, tu equipo mejora continuamente. Lo que se mide, se mejora." },
    ];

    return (
        <section className="relative text-center" style={{ background: '#0A0A0F', padding: '130px 0' }}>
            <div className="container-custom relative z-10 flex flex-col items-center">

                <div className="reveal">
                    <span className="mb-4 block" style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#22C55E' }}>
                        LO QUE VIENE DESPUÉS
                    </span>
                </div>

                <h2 className="mx-auto mb-4 reveal" style={{ fontSize: '48px', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '16px' }}>
                    Un sistema ordenado no solo recupera ventas.<br />Te deja escalar.
                </h2>

                <p className="mx-auto mb-14 reveal" style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.5, maxWidth: '520px', marginBottom: '56px' }}>
                    Cuando tu proceso comercial funciona sin depender de la memoria de nadie, podés crecer sin que se rompa todo.
                </p>

                {/* 2-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 w-full max-w-[1100px] text-left items-center mb-12">

                    {/* LEFT: Growth chart */}
                    <div ref={chartRef} className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-8 reveal">
                        <div className="text-[11px] text-[#5A5A6E] uppercase tracking-[0.06em] mb-3">Facturación</div>

                        <div className="relative w-full h-[200px] mb-6">
                            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.12" />
                                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,160 C30,155 50,165 80,158 C110,150 130,162 160,155 C180,150 195,158 200,152"
                                    fill="none" stroke="#5A5A6E" strokeWidth="2" strokeDasharray="4,4" opacity="0.5"
                                />
                                <path
                                    d="M200,152 C220,140 240,120 270,95 C300,70 330,50 370,25 C385,18 395,12 400,8"
                                    fill="none" stroke="#22C55E" strokeWidth="2.5"
                                    strokeDasharray="300"
                                    strokeDashoffset={animated ? "0" : "300"}
                                    style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                />
                                <path
                                    d="M200,152 C220,140 240,120 270,95 C300,70 330,50 370,25 C385,18 395,12 400,8 L400,200 L200,200 Z"
                                    fill="url(#greenGradient)"
                                    opacity={animated ? "1" : "0"}
                                    style={{ transition: 'opacity 1s ease 1s' }}
                                />
                            </svg>

                            <div className="absolute left-1/2 top-0 bottom-[30px] flex flex-col items-center">
                                <div className="w-[1px] flex-1" style={{ background: 'repeating-linear-gradient(to bottom, rgba(34,197,94,0.25) 0px, rgba(34,197,94,0.25) 4px, transparent 4px, transparent 8px)' }}></div>
                                <div className="text-[11px] font-bold text-[#22C55E] tracking-[0.1em] mt-2 px-2.5 py-0.5 bg-[#22C55E]/8 rounded">SCALA</div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 flex justify-between mt-2">
                                <span className="text-[12px] text-[#5A5A6E] opacity-50">Sin sistema</span>
                                <span className="text-[12px] text-[#22C55E]">Con sistema</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.05] text-center">
                            <div>
                                <span className="block text-[22px] font-bold text-[#22C55E] tabular-nums">{c1}x</span>
                                <span className="block text-[12px] mt-1 leading-[1.3]" style={{ color: 'rgba(203,213,225,0.60)' }}>Más cierres por vendedor</span>
                            </div>
                            <div>
                                <span className="block text-[22px] font-bold text-[#22C55E] tabular-nums">-{c2}%</span>
                                <span className="block text-[12px] mt-1 leading-[1.3]" style={{ color: 'rgba(203,213,225,0.60)' }}>Leads sin seguimiento</span>
                            </div>
                            <div>
                                <span className="block text-[22px] font-bold text-[#22C55E] tabular-nums">+{c3}%</span>
                                <span className="block text-[12px] mt-1 leading-[1.3]" style={{ color: 'rgba(203,213,225,0.60)' }}>Tasa de respuesta</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: 4 compact points */}
                    <div className="flex flex-col gap-2 reveal-stagger">
                        {points.map((pt, i) => {
                            const Icon = pt.icon;
                            return (
                                <div key={i} className="flex gap-4 items-start p-5 rounded-[14px] border border-transparent hover:bg-white/[0.02] hover:border-white/[0.05] transition-all duration-300">
                                    <div className="w-10 h-10 min-w-[40px] flex items-center justify-center rounded-[10px] bg-[#22C55E]/8 text-[#22C55E]">
                                        <Icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-[16px] font-semibold text-[#F5F5F7] mb-1">{pt.title}</h3>
                                        <p className="text-[15px] leading-[1.5]" style={{ color: 'rgba(203,213,225,0.70)' }}>{pt.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Closing */}
                <div className="max-w-[540px] mx-auto reveal">
                    <p className="text-[15px] italic leading-[1.5]" style={{ color: 'rgba(203,213,225,0.60)' }}>
                        SCALA no es un proyecto que termina en 30 días. Es la base sobre la que construís el crecimiento de tu negocio.
                    </p>
                </div>
            </div>
        </section>
    );
};
