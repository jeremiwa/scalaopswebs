import { LayoutGrid, MessageSquareText, BarChart3 } from 'lucide-react';

export const Capas = () => {
    return (
        <section className="py-[140px] relative bg-[#000000]">
            {/* #2 — Blue glow from top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center top, rgba(24, 93, 232,0.03) 0%, transparent 70%)' }}></div>

            <div className="container-custom relative z-10 flex flex-col items-center text-center">
                {/* #4 label grey, #1 solid H2 */}
                <div className="mb-[20px] reveal">
                    <span className="text-[12px] md:text-[13px] font-semibold tracking-[0.08em] uppercase text-[#5A5A6E] mb-[16px] block">
                        CÓMO LO ARREGLAMOS
                    </span>
                    <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-[650] tracking-[-0.03em] text-[#F5F5F7] leading-[1.1] max-w-[800px] mx-auto">
                        Las 3 capas de un sistema<br />que no pierde ventas.
                    </h2>
                </div>
                <div className="h-[20px]"></div>

                {/* #4 — All green borders with different opacities, all green icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl reveal-stagger text-left">
                    {/* Capa 1 — opacity 0.3 */}
                    <div className="rounded-[17px] p-[1px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-[#6bdda1]/40 hover:to-[#6bdda1]/5 transition-all duration-500">
                        <div className="bg-[#111116] rounded-[16px] p-8 relative group h-full">
                            <div className="w-full h-[3px] absolute top-0 left-0 bg-[#6bdda1]/30 rounded-t-[16px]"></div>
                            <LayoutGrid size={36} strokeWidth={1.5} className="text-[#6bdda1] mb-5 capa-icon" />
                            <div className="text-[12px] font-semibold tracking-widest uppercase text-[#5A5A6E] mb-2">CAPA 01 · PROCESO</div>
                            <h3 className="text-[20px] font-semibold text-[#F5F5F7] mb-4 leading-snug">Rediseñamos<br />tu proceso de venta</h3>
                            <p className="text-[#8B8B9E] text-[15px] leading-[1.6]">Definimos las etapas reales de tu venta y las reglas de avance. Tu equipo deja de improvisar.</p>
                        </div>
                    </div>

                    {/* Capa 2 — opacity 0.5, raised */}
                    <div className="rounded-[17px] p-[1px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-[#6bdda1]/40 hover:to-[#6bdda1]/5 transition-all duration-500 md:transform md:-translate-y-2">
                        <div className="bg-[#111116] rounded-[16px] p-8 relative group h-full">
                            <div className="w-full h-[3px] absolute top-0 left-0 bg-[#6bdda1]/50 rounded-t-[16px]"></div>
                            <MessageSquareText size={36} strokeWidth={1.5} className="text-[#6bdda1] mb-5 capa-icon" />
                            <div className="text-[12px] font-semibold tracking-widest uppercase text-[#5A5A6E] mb-2">CAPA 02 · DISCURSO</div>
                            <h3 className="text-[20px] font-semibold text-[#F5F5F7] mb-4 leading-snug">Reescribimos lo que<br />dice tu equipo</h3>
                            <p className="text-[#8B8B9E] text-[15px] leading-[1.6]">Guiones para WhatsApp, llamadas y seguimiento. Secuencias que manejan objeciones y llevan a la reunión.</p>
                        </div>
                    </div>

                    {/* Capa 3 — opacity 0.7 */}
                    <div className="rounded-[17px] p-[1px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-[#6bdda1]/40 hover:to-[#6bdda1]/5 transition-all duration-500">
                        <div className="bg-[#111116] rounded-[16px] p-8 relative group h-full">
                            <div className="w-full h-[3px] absolute top-0 left-0 bg-[#6bdda1]/70 rounded-t-[16px]"></div>
                            <BarChart3 size={36} strokeWidth={1.5} className="text-[#6bdda1] mb-5 capa-icon" />
                            <div className="text-[12px] font-semibold tracking-widest uppercase text-[#5A5A6E] mb-2">CAPA 03 · VISIBILIDAD</div>
                            <h3 className="text-[20px] font-semibold text-[#F5F5F7] mb-4 leading-snug">Instalamos lo que<br />necesitás para decidir</h3>
                            <p className="text-[#8B8B9E] text-[15px] leading-[1.6]">Tablero con tasa de cierre por vendedor, canal y campaña. Alertas cuando un lead lleva demasiado sin contacto.</p>
                        </div>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes icon-pop { 0% { transform: scale(0.5) translateY(10px); opacity: 0; } 60% { transform: scale(1.1) translateY(-2px); opacity: 1; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
                .capa-icon { opacity: 0; }
                .reveal-stagger.visible .capa-icon { animation: icon-pop 0.5s ease forwards; animation-delay: 300ms; }
                .reveal-stagger > *:nth-child(2) .capa-icon { animation-delay: 420ms; }
                .reveal-stagger > *:nth-child(3) .capa-icon { animation-delay: 540ms; }
            `}} />
        </section>
    );
};
