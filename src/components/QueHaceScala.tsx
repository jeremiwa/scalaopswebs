import { useState, useEffect } from 'react';
import { MessageCircle, RefreshCw, BarChart3, CheckCircle2, Calendar, Phone, FileText, Users, Zap, LayoutDashboard, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const QueHaceScala = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering]);
  return (
    <section className="section-padding bg-scala-bg border-t border-white/[0.08]">
      <div className="container-custom max-w-[1240px]">

        {/* PARTE 1: Qué hace SCALA (en simple) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">

          {/* Left Column: Human Photo + Overlays */}
          <div className="relative">
            {/* Photo */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] relative aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
              {/* Dark Navy Tint */}
              <div className="absolute inset-0 bg-[#07101D]/40 mix-blend-multiply z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/20 to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000"
                alt="Profesional usando SCALA"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-10 pointer-events-none">
              <div className="relative w-full max-w-[340px] mx-auto flex flex-col gap-6">

                {/* Dotted line connecting them */}
                <div className="absolute left-1/2 top-10 bottom-10 w-[2px] border-l-2 border-dashed border-white/20 -translate-x-1/2 z-0"></div>

                {/* Overlay 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -24, y: 20 }}
                  whileInView={{ opacity: 1, x: -24, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#0B0F14]/90 backdrop-blur-md border border-white/[0.12] rounded-[16px] p-4 flex items-center justify-between shadow-2xl relative z-10"
                >
                  <div>
                    <div className="text-white font-bold text-base md:text-lg flex items-center gap-2">
                      <span className="text-white/40 text-sm font-medium">1/3</span> Nuevo lead
                    </div>
                    <div className="text-white/60 text-sm mt-0.5">Respondido en 5 min</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-scala-green/10 flex items-center justify-center border border-scala-green/20 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-scala-green" />
                  </div>
                </motion.div>

                {/* Overlay 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 24, y: 20 }}
                  whileInView={{ opacity: 1, x: 24, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-[#0B0F14]/90 backdrop-blur-md border border-white/[0.12] rounded-[16px] p-4 flex items-center justify-between shadow-2xl relative z-10"
                >
                  <div>
                    <div className="text-white font-bold text-base md:text-lg flex items-center gap-2">
                      <span className="text-white/40 text-sm font-medium">2/3</span> Seguimiento activo
                    </div>
                    <div className="text-white/60 text-sm mt-0.5">Próximo paso: hoy 18:00</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-scala-green/10 flex items-center justify-center border border-scala-green/20 shrink-0">
                    <RefreshCw className="w-5 h-5 text-scala-green" />
                  </div>
                </motion.div>

                {/* Overlay 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -24, y: 20 }}
                  whileInView={{ opacity: 1, x: -24, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="bg-[#0B0F14]/90 backdrop-blur-md border border-white/[0.12] rounded-[16px] p-4 flex items-center justify-between shadow-2xl relative z-10"
                >
                  <div>
                    <div className="text-white font-bold text-base md:text-lg flex items-center gap-2">
                      <span className="text-white/40 text-sm font-medium">3/3</span> Reunión agendada
                    </div>
                    <div className="text-white/60 text-sm mt-0.5">Confirmada</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-scala-green/10 flex items-center justify-center border border-scala-green/20 shrink-0">
                    <Calendar className="w-5 h-5 text-scala-green" />
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

          {/* Right Column: Copy + Modules */}
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">QUÉ HACEMOS</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Qué hace SCALA (en simple)
              </h2>
              <p className="text-lg md:text-xl text-white/60">
                Instalamos un sistema comercial para que cada lead reciba respuesta, seguimiento y control.
              </p>
            </div>

            {/* 3 Bullets / Rows */}
            <div className="space-y-8 mb-12">

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Respuesta en minutos</h3>
                  <p className="text-white/60 text-base">Para que el lead no se enfríe.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <RefreshCw className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Seguimiento consistente</h3>
                  <p className="text-white/60 text-base">Para que no se pierdan oportunidades.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Control en tiempo real</h3>
                  <p className="text-white/60 text-base">Para ver dónde se cae la venta.</p>
                </div>
              </div>

            </div>

            {/* Entregables & CTA */}
            <div className="pt-8 border-t border-white/[0.08]">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">ENTREGABLES</div>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Pipeline', 'Automatizaciones', 'Tablero', 'Playbook', 'Entrenamiento'].map((item, i) => (
                  <span key={i} className="bg-white/[0.03] border border-white/[0.08] text-white/70 text-xs px-3 py-1.5 rounded-md font-medium">
                    {item}
                  </span>
                ))}
              </div>

              <Link to="/formulario" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button variant="primary" className="w-full md:w-auto px-8 py-4 text-lg justify-center">
                  Agendar llamada gratuita
                </Button>
              </Link>
              <p className="text-xs text-white/40 mt-4 font-medium tracking-wide">
                Sprint 30 días · Implementación 1 a 1
              </p>
            </div>

          </div>

        </div>

        {/* PARTE 2: Qué hacemos exactamente (Timeline Nuevo - Apple Style) */}
        <div className="pt-24 lg:pt-32 border-t border-white/[0.08]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-20"
          >

            {/* Columna Izquierda (55%): Foto + Overlays */}
            <div className="lg:w-[55%] relative w-full mb-8 lg:mb-0">
              {/* Imagen Realista */}
              <div className="relative rounded-[24px] overflow-hidden bg-[#07101D] aspect-[4/5] lg:aspect-[4/5] border border-white/[0.08] shadow-2xl group">
                {/* Degradado para texto */}
                <div className="absolute inset-0 bg-[#07101D]/20 mix-blend-multiply z-10 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/90 via-[#0B0F14]/20 to-transparent z-10"></div>

                <img
                  src="/images/implementacion.png"
                  alt="Implementación de procesos SCALA"
                  className="w-full h-full object-cover object-center scale-[1.01] transform transition-transform duration-[15s] group-hover:scale-105"
                  style={{ willChange: "transform" }}
                />

                {/* Overlays Glass */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-5 sm:p-8 lg:p-12 gap-5 sm:gap-6 pointer-events-none">

                  {/* Overlay A: Auditoría (Active step 0) */}
                  <div className={`transition-all duration-500 bg-[#0B0F14]/75 backdrop-blur-xl border rounded-[18px] p-4 sm:p-5 shadow-2xl relative w-full sm:max-w-[340px] transform ${activeStep === 0 ? 'opacity-100 scale-100 border-scala-green/30' : 'opacity-85 scale-[0.98] border-white/[0.08] brightness-75'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors ${activeStep === 0 ? 'bg-scala-green/10 border-scala-green/20 text-scala-green' : 'bg-white/[0.03] border-white/[0.08] text-white/50'}`}>
                        <Search className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm sm:text-base mb-0.5">Día 1–7 · Auditoría</div>
                        <div className="flex items-center gap-1.5 h-auto">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                          <span className="text-amber-500/90 text-xs font-medium">Fugas detectadas: 12</span>
                        </div>
                      </div>
                    </div>
                    {/* Active highlight line */}
                    <div className={`absolute inset-x-0 bottom-0 h-[2px] bg-scala-green rounded-b-[18px] transition-opacity duration-300 ${activeStep === 0 ? 'opacity-20' : 'opacity-0'}`}></div>
                  </div>

                  {/* Overlay B: Script + Proceso (Active step 1, 2) */}
                  <div className={`transition-all duration-500 bg-[#0B0F14]/75 backdrop-blur-xl border rounded-[18px] p-4 sm:p-5 shadow-2xl relative w-full sm:max-w-[340px] sm:ml-auto transform ${activeStep === 1 || activeStep === 2 ? 'opacity-100 scale-100 border-scala-green/30' : 'opacity-85 scale-[0.98] border-white/[0.08] brightness-75'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors ${activeStep === 1 || activeStep === 2 ? 'bg-scala-green/10 border-scala-green/20 text-scala-green' : 'bg-white/[0.03] border-white/[0.08] text-white/50'}`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm sm:text-base mb-0.5">Día 8–15 · Script + proceso</div>
                        <div className="flex items-center gap-1.5 h-auto">
                          <div className="w-1.5 h-1.5 rounded-full bg-scala-green"></div>
                          <span className="text-scala-green/90 text-xs font-medium">Guión v2 aprobado</span>
                        </div>
                      </div>
                    </div>
                    <div className={`absolute inset-x-0 bottom-0 h-[2px] bg-scala-green rounded-b-[18px] transition-opacity duration-300 ${activeStep === 1 || activeStep === 2 ? 'opacity-20' : 'opacity-0'}`}></div>
                  </div>

                  {/* Overlay C: Sistema activo (Active step 3, 4) */}
                  <div className={`transition-all duration-500 bg-[#0B0F14]/75 backdrop-blur-xl border rounded-[18px] p-4 sm:p-5 shadow-2xl relative w-full sm:max-w-[340px] transform ${activeStep === 3 || activeStep === 4 ? 'opacity-100 scale-100 border-scala-green/30' : 'opacity-85 scale-[0.98] border-white/[0.08] brightness-75'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors ${activeStep === 3 || activeStep === 4 ? 'bg-scala-green/10 border-scala-green/20 text-scala-green' : 'bg-white/[0.03] border-white/[0.08] text-white/50'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm sm:text-base mb-0.5">Día 16–30 · Sistema activo</div>
                        <div className="flex items-center gap-1.5 h-auto">
                          <div className="w-1.5 h-1.5 rounded-full bg-scala-green"></div>
                          <span className="text-scala-green/90 text-xs font-medium">Seguimiento + tablero</span>
                        </div>
                      </div>
                    </div>
                    <div className={`absolute inset-x-0 bottom-0 h-[2px] bg-scala-green rounded-b-[18px] transition-opacity duration-300 ${activeStep === 3 || activeStep === 4 ? 'opacity-20' : 'opacity-0'}`}></div>
                  </div>

                </div>
              </div>
            </div>

            {/* Columna Derecha (45%): Textos e Items */}
            <div className="lg:w-[45%] flex flex-col justify-center">
              <div className="mb-8 lg:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white leading-tight">
                  Qué hacemos exactamente
                </h2>
                <p className="text-base sm:text-lg text-white/60">
                  Nada de teoría. Pura implementación.
                </p>
              </div>

              {/* Lista interactiva de 5 items */}
              <div
                className="flex flex-col mb-10"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {[
                  { title: "Auditoría de llamadas", desc: "Detectamos fugas y medimos tiempos reales." },
                  { title: "Ingeniería de script", desc: "Reescribimos guiones para eliminar objeciones." },
                  { title: "Entrenamiento real", desc: "Roleplays con tu equipo hasta que lo dominen." },
                  { title: "Automatización de flujo", desc: "Seguimiento y asignación para que nadie se pierda." },
                  { title: "Visibilidad total", desc: "Tablero con alertas y métricas claras." }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveStep(idx)}
                    className={`py-4 sm:py-5 border-t border-white/[0.06] first:border-none cursor-pointer transition-all duration-300 ${activeStep === idx ? 'opacity-100 pl-2 lg:pl-4 bg-white/[0.02]' : 'opacity-50 hover:opacity-80'}`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`mt-0.5 text-xs sm:text-sm font-bold font-mono tracking-widest transition-colors ${activeStep === idx ? 'text-scala-green' : 'text-white/30'}`}>
                        0{idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-base sm:text-lg font-semibold mb-1 transition-colors ${activeStep === idx ? 'text-white' : 'text-white/80'}`}>
                          {item.title}
                        </h4>
                        <p className={`text-sm tracking-wide transition-all duration-400 overflow-hidden text-white/60 ${activeStep === idx ? 'max-h-[100px] opacity-100 mt-2' : 'max-h-0 opacity-0 m-0'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Area */}
              <div className="flex flex-col items-start pt-8 border-t border-white/[0.08]">
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#0B0F14] border border-white/[0.12] text-white/90 text-xs sm:text-[13px] tracking-wide px-4 py-2 rounded-[10px] font-medium shadow-sm">
                        Pipeline listo
                      </span>
                      <span className="bg-[#0B0F14] border border-white/[0.12] text-white/90 text-xs sm:text-[13px] tracking-wide px-4 py-2 rounded-[10px] font-medium shadow-sm">
                        Automatizaciones listas
                      </span>
                      <span className="bg-[#0B0F14] border border-white/[0.12] text-white/90 text-xs sm:text-[13px] tracking-wide px-4 py-2 rounded-[10px] font-medium shadow-sm">
                        Tablero + alertas
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-white/40 text-xs font-medium ml-1">
                      <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-white/30"></div> Playbook</span>
                      <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-white/30"></div> Entrenamiento</span>
                    </div>
                  </div>

                  <div className="w-full mt-2">
                    <Link to="/formulario" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', width: '100%' }}>
                      <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-base font-semibold shadow-[0_4px_24px_rgba(0,255,148,0.15)] hover:shadow-[0_4px_32px_rgba(0,255,148,0.25)] transition-all">
                        Agendar llamada gratuita
                      </Button>
                    </Link>
                    <p className="text-xs text-white/40 mt-3 font-medium tracking-wide">
                      Sprint 30 días · Implementación 1 a 1
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
