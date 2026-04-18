import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 1.02, 0.73, 1] } }
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};
const cardFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 1.02, 0.73, 1] } }
};

/* ─── Data ─── */
const painPoints = [
  "Respuesta tardía a leads calificados",
  "Falta de seguimiento después del primer contacto",
  "Objeciones mal manejadas o sin respuesta",
  "Equipos comerciales sin un relato claro y consistente",
  "Oportunidades que quedan sin un próximo paso definido",
  "CRM desordenado, incompleto o mal utilizado",
  "Falta de automatización en tareas críticas",
  "Pérdida de trazabilidad en el proceso de venta",
  "Leads que se pierden por procesos manuales",
  "Desalineación entre marketing, ventas y operación",
  "Propuesta de valor confusa o mal comunicada",
  "Vendedores sin capacitación ni estructura para escalar"
];

const auditAreas = [
  {
    letter: "A",
    title: "Proceso comercial",
    items: ["Flujo completo del lead", "Tiempos de respuesta", "Velocidad de contacto", "Seguimiento y cierres", "Etapas, transiciones y puntos sin acción"]
  },
  {
    letter: "B",
    title: "Gestión de oportunidades",
    items: ["Leads sin seguimiento", "Oportunidades estancadas", "Falta de próximo paso", "Leads desordenados o mal calificados", "Motivos de pérdida no registrados"]
  },
  {
    letter: "C",
    title: "Equipo comercial",
    items: ["Nivel de ejecución individual", "Estructura y roles del equipo", "Consistencia en el seguimiento", "Criterios de priorización", "Gaps de performance"]
  },
  {
    letter: "D",
    title: "Relato y comunicación de venta",
    items: ["Claridad del mensaje comercial", "Propuesta de valor", "Ángulos de venta y narrativa", "Autoridad percibida", "Conexión con el dolor del cliente"]
  },
  {
    letter: "E",
    title: "Manejo de objeciones",
    items: ["Objeciones frecuentes no resueltas", "Respuestas débiles o genéricas", "Puntos de fricción comercial", "Dudas sin resolver", "Pérdida por falta de argumento"]
  },
  {
    letter: "F",
    title: "Automatización e IA",
    items: ["Tareas manuales repetitivas", "Calificación y scoring de leads", "Seguimiento automatizable", "Derivación inteligente", "Oportunidades de IA en ventas"]
  },
  {
    letter: "G",
    title: "Herramientas y sistema",
    items: ["CRM y pipelines", "Formularios y WhatsApp", "Integraciones activas", "Trazabilidad y reportes", "Estructura operativa general"]
  }
];

const leaks = [
  "Leads que llegan y nadie responde a tiempo",
  "Prospectos que responden una vez y nunca más reciben seguimiento",
  "Oportunidades calificadas que se enfrían por falta de proceso",
  "Objeciones que quedan flotando sin resolverse",
  "Cierres que dependen demasiado del talento individual del vendedor",
  "Vendedores que no siguen un mismo relato de venta",
  "Marketing trae oportunidades y ventas las trabaja mal",
  "No hay visibilidad real sobre por qué se pierde",
  "La empresa cree que necesita más publicidad cuando pierde valor en la ejecución",
  "Conversaciones que no convierten por falta de velocidad, claridad o estructura"
];

const deliverables = [
  { title: "Diagnóstico integral", desc: "Visión completa de la operación comercial actual, con fortalezas y debilidades identificadas." },
  { title: "Mapa de fugas", desc: "Detección precisa de dónde y por qué se escapan ventas en cada etapa del proceso." },
  { title: "Oportunidades de mejora", desc: "Identificación de ventas potencialmente recuperables y áreas de alto impacto." },
  { title: "Revisión del relato comercial", desc: "Análisis de mensajes, objeciones, ángulos de venta y estructura de comunicación." },
  { title: "Oportunidades de automatización e IA", desc: "Puntos concretos donde la tecnología puede mejorar velocidad, seguimiento y conversión." },
  { title: "Plan de acción y prioridades", desc: "Recomendaciones ordenadas por impacto con próximos pasos claros para implementar." }
];

const steps = [
  { num: "01", title: "Reunión inicial", desc: "Entendemos tu negocio, equipo, proceso y objetivos comerciales." },
  { num: "02", title: "Recolección y revisión", desc: "Analizamos información, herramientas, flujos y materiales comerciales." },
  { num: "03", title: "Análisis profundo", desc: "Revisamos estructura, mensajes, seguimiento, objeciones y sistema completo." },
  { num: "04", title: "Detección de fugas", desc: "Identificamos oportunidades perdidas, cuellos de botella y prioridades." },
  { num: "05", title: "Entrega de diagnóstico", desc: "Presentamos el diagnóstico con mapa de fugas y plan de acción claro." },
  { num: "06", title: "Próximos pasos", desc: "Definimos junto con la empresa qué implementar primero y cómo avanzar." }
];

const profiles = [
  "Empresas con equipo comercial activo",
  "Empresas que ya generan leads pero no convierten lo esperado",
  "Empresas que venden por WhatsApp, llamadas, formularios o reuniones",
  "Empresas con procesos desordenados o inconsistentes",
  "Empresas que quieren escalar con más estructura y control",
  "Empresas que sospechan que pierden ventas pero no saben dónde",
  "Empresas que quieren aplicar IA pero primero necesitan entender su operación"
];

const implications = [
  "Apertura para revisar el proceso comercial actual con honestidad",
  "Acceso a información comercial y operativa relevante",
  "Conversaciones con responsables o equipo de ventas",
  "Revisión de materiales, herramientas y flujo comercial",
  "Voluntad de entender dónde están las fallas",
  "Intención real de mejorar y actuar sobre los hallazgos"
];

const faqs = [
  { q: "¿La auditoría es solo para empresas grandes?", a: "No. Es para cualquier empresa que ya venda y quiera entender dónde está perdiendo oportunidades. Funciona tanto para equipos de 3 personas como para operaciones más grandes." },
  { q: "¿Necesito tener CRM para hacer la auditoría?", a: "No es requisito excluyente. Revisamos el sistema que tenga la empresa, incluyendo WhatsApp, planillas, herramientas de seguimiento o lo que se esté usando. Parte del valor de la auditoría es justamente evaluar eso." },
  { q: "¿La auditoría incluye implementación?", a: "La auditoría entrega diagnóstico, mapa de fugas y plan de acción. La implementación de mejoras es un paso posterior que puede coordinarse con Scala si la empresa lo decide." },
  { q: "¿Qué tipo de información necesitan de mi empresa?", a: "Acceso al proceso comercial, herramientas que se usen, materiales de venta, métricas disponibles y conversaciones con el equipo. Todo con absoluta confidencialidad." },
  { q: "¿Cuánto tiempo lleva el proceso?", a: "Dependiendo del tamaño de la operación, el proceso completo suele tomar entre 5 y 10 días hábiles desde el inicio de la recolección de información." },
  { q: "¿Qué pasa después de la auditoría?", a: "Recibís un diagnóstico completo con prioridades y plan de acción. A partir de ahí, la empresa decide si avanza con Scala para la implementación o si lo ejecuta internamente." },
  { q: "¿Pueden ayudarnos a implementar los cambios?", a: "Sí. Scala ofrece servicios de implementación, capacitación, automatización e IA que se construyen directamente sobre los hallazgos de la auditoría." }
];

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export const WebAuditoria = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#000000] min-h-screen text-white overflow-hidden">

      {/* ═══ 1. HERO ═══ */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-[#000000] overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")', opacity: 0.03 }} />
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] pointer-events-none z-0 bg-[#185de8] blur-[140px] opacity-[0.12] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] pointer-events-none z-0 bg-[#6bdda1] blur-[140px] opacity-[0.10] rounded-full" />

        <div className="container-custom relative z-10 w-full grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 items-center">
          <div className="flex flex-col items-start text-left pt-10 pb-20 lg:py-0">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-block px-4 py-1.5 bg-[#185de8]/10 text-[#185de8] text-[11px] font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-[#185de8]/20">
              AUDITORÍA COMERCIAL
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-[36px] md:text-[48px] lg:text-[60px] font-bold tracking-tight leading-[1.08] text-white mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
              Auditamos tu operación comercial para detectar dónde se están perdiendo ventas.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-[17px] md:text-[19px] text-[#999] max-w-[560px] mb-12 leading-[1.65]" style={{ fontFamily: 'var(--font-secondary)' }}>
              Analizamos tu proceso comercial de punta a punta para encontrar fugas, oportunidades desaprovechadas y todo lo que hoy está frenando tus ventas. Te mostramos qué corregir, qué optimizar y qué implementar para vender más con mayor control.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <motion.a href="https://scalaops.com/formulario" className="relative text-[#000] overflow-hidden flex items-center justify-center cursor-pointer" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)', padding: '18px 44px', borderRadius: '100px', fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '15px', boxShadow: '0 0 40px rgba(107,221,161,0.1)', textDecoration: 'none' }} whileHover={{ scale: 1.03, boxShadow: '0 0 50px rgba(24,93,232,0.4)' }} whileTap={{ scale: 0.98 }}>
                <motion.div className="absolute inset-0 bg-white/30 skew-x-[-20deg]" style={{ left: '-30%', width: '30%' }} animate={{ left: ['-30%', '130%'] }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3, ease: 'easeOut' }} />
                <span className="relative z-10">Solicitar auditoría</span>
              </motion.a>
              <a href="https://wa.link/sn01qs" target="_blank" rel="noopener noreferrer" className="group flex items-center text-white text-[15px] font-bold transition-colors">
                Hablar con un especialista
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
            </motion.div>
          </div>

          {/* Right: Abstract dashboard visual */}
          <div className="relative w-full min-h-[450px] hidden lg:flex items-center justify-center">
            {/* Pipeline visual */}
            <div className="absolute inset-0 flex flex-col justify-center gap-5 pr-4">
              {[
                { label: "Leads entrantes", value: "847", color: "#185de8", w: "90%" },
                { label: "Contactados < 5 min", value: "312", color: "#3b82f6", w: "75%" },
                { label: "Con seguimiento activo", value: "184", color: "#6bdda1", w: "55%" },
                { label: "Propuesta enviada", value: "96", color: "#6bdda1", w: "38%" },
                { label: "Cerrados", value: "41", color: "#22c55e", w: "22%" },
              ].map((row, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.12, duration: 0.7 }} className="relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/50" style={{ fontFamily: 'var(--font-secondary)' }}>{row.label}</span>
                    <span className="text-[13px] font-bold text-white/70 tabular-nums" style={{ fontFamily: 'var(--font-primary)' }}>{row.value}</span>
                  </div>
                  <div className="w-full h-[6px] bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ width: row.w, background: row.color, boxShadow: `0 0 12px ${row.color}40` }} initial={{ width: 0 }} animate={{ width: row.w }} transition={{ delay: 0.8 + i * 0.12, duration: 1.2, ease: [0.21, 1.02, 0.73, 1] }} />
                  </div>
                  {i < 4 && (
                    <div className="absolute -bottom-3.5 left-4 flex items-center gap-1.5">
                      <svg className="w-2.5 h-2.5 text-red-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
                      <span className="text-[10px] text-red-400/50 font-medium">{["−63%", "−41%", "−48%", "−57%"][i]} fuga</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. EL PROBLEMA REAL ═══ */}
      <section className="relative py-20 md:py-28 bg-[#020202] border-t border-white/[0.04]">
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-[800px] mx-auto text-center mb-16">
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">EL PROBLEMA REAL</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
              Muchas empresas no necesitan más leads.<br className="hidden md:block" /> Necesitan entender por qué no convierten mejor.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[16px] md:text-[18px] text-[#888] leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>
              En la mayoría de las operaciones comerciales, las ventas no se pierden por falta de demanda. Se pierden por fallas en la ejecución, el proceso y el seguimiento.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((p, i) => (
              <motion.div key={i} variants={cardFade} className="group flex items-start gap-3.5 p-5 rounded-[16px] bg-[#080808] border border-white/[0.05] hover:border-red-500/20 transition-all duration-300">
                <div className="mt-1 w-2 h-2 rounded-full bg-red-400/40 shrink-0 group-hover:bg-red-400/70 transition-colors" />
                <span className="text-[14px] text-[#aaa] leading-[1.5] font-medium group-hover:text-white/80 transition-colors" style={{ fontFamily: 'var(--font-secondary)' }}>{p}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. QUÉ ES LA AUDITORÍA ═══ */}
      <section className="relative py-20 md:py-28 border-t border-white/[0.04]">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[35%] h-full opacity-[0.06] pointer-events-none" style={{ background: 'radial-gradient(circle at right, #185de8 0%, transparent 60%)' }} />
        <div className="container-custom relative z-10 max-w-[900px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#185de8] uppercase tracking-[0.2em] mb-4">QUÉ HACEMOS</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
              No revisamos solo métricas.<br className="hidden md:block" /> Revisamos cómo está vendiendo tu empresa de verdad.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[17px] md:text-[19px] text-[#999] leading-[1.65] mb-6" style={{ fontFamily: 'var(--font-secondary)' }}>
              La auditoría comercial de Scala es una revisión profunda de la operación y el proceso de venta de tu empresa, orientada a detectar fugas de ingresos, oportunidades desaprovechadas, errores de proceso, debilidades en el seguimiento, cuellos de botella comerciales y fallas en la comunicación de venta.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[17px] md:text-[19px] text-[#999] leading-[1.65] mb-6" style={{ fontFamily: 'var(--font-secondary)' }}>
              También identificamos oportunidades concretas de automatización e inteligencia artificial, y analizamos mejoras posibles en relato, objeciones, posicionamiento y conversión.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[16px] text-[#6bdda1]/80 leading-[1.6] font-medium border-l-2 border-[#6bdda1]/30 pl-5 mt-8" style={{ fontFamily: 'var(--font-secondary)' }}>
              No se trata de un informe superficial. Es una instancia estratégica para entender con precisión qué está frenando los resultados comerciales de tu empresa.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. TODO LO QUE ANALIZAMOS ═══ */}
      <section className="relative py-20 md:py-28 bg-[#020202] border-t border-white/[0.04] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#185de8]/[0.04] blur-[200px] rounded-full pointer-events-none z-0" />
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-16">
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">ALCANCE</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
              Qué revisamos dentro de la auditoría
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {auditAreas.map((area, i) => (
              <motion.div key={i} variants={cardFade} className={`group flex flex-col bg-[#080808] border border-white/[0.06] rounded-[20px] p-7 transition-all duration-300 hover:border-[#185de8]/30 ${i === 6 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[28px] font-black text-transparent leading-none" style={{ WebkitTextStroke: '1.5px #185de8', fontFamily: 'var(--font-primary)' }}>{area.letter}</span>
                  <h3 className="text-[18px] font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>{area.title}</h3>
                </div>
                <div className="w-8 h-[2px] mb-5" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
                <ul className="flex flex-col gap-2.5">
                  {area.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[14px] text-[#888] leading-[1.5]" style={{ fontFamily: 'var(--font-secondary)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#185de8]/50 mt-[7px] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. FUGAS TÍPICAS ═══ */}
      <section className="relative py-20 md:py-28 border-t border-white/[0.04]">
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-[800px] mx-auto text-center mb-16">
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-red-400/80 uppercase tracking-[0.2em] mb-4">FUGAS FRECUENTES</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
              Dónde suelen escaparse las ventas
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="max-w-[900px] mx-auto flex flex-col gap-4">
            {leaks.map((leak, i) => (
              <motion.div key={i} variants={cardFade} className="group flex items-start gap-4 p-5 md:p-6 rounded-[16px] bg-[#060606] border border-white/[0.04] hover:border-red-500/15 transition-all duration-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-red-400/20 bg-red-400/5 shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-red-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
                <p className="text-[15px] md:text-[16px] text-[#aaa] leading-[1.6] font-medium group-hover:text-white/80 transition-colors" style={{ fontFamily: 'var(--font-secondary)' }}>{leak}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 6. QUÉ ENTREGAMOS ═══ */}
      <section className="relative py-20 md:py-28 bg-[#020202] border-t border-white/[0.04] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#6bdda1]/[0.04] blur-[180px] rounded-full pointer-events-none z-0 -translate-x-1/2 translate-y-1/2" />
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-16">
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">ENTREGABLES</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
              Qué recibe tu empresa al finalizar la auditoría
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {deliverables.map((d, i) => (
              <motion.div key={i} variants={cardFade} className="group relative flex flex-col bg-[#080808] border border-white/[0.06] rounded-[20px] p-7 transition-all duration-300 hover:border-[#6bdda1]/30">
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#6bdda1]/0 to-[#6bdda1]/0 group-hover:from-[#6bdda1]/[0.03] group-hover:to-transparent transition-all duration-500 z-0" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#6bdda1]/10 border border-[#6bdda1]/20 flex items-center justify-center mb-5">
                    <svg className="w-5 h-5 text-[#6bdda1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 className="text-[18px] font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>{d.title}</h3>
                  <p className="text-[14px] text-[#888] leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 7. OPORTUNIDADES A RECUPERAR ═══ */}
      <section className="relative py-20 md:py-28 border-t border-white/[0.04]">
        <div className="container-custom relative z-10 max-w-[900px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#185de8] uppercase tracking-[0.2em] mb-4">OPORTUNIDADES OCULTAS</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
              Muchas veces no faltan oportunidades.<br className="hidden md:block" /> Falta recuperar las que ya existen.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[17px] text-[#999] leading-[1.65] mb-5" style={{ fontFamily: 'var(--font-secondary)' }}>
              Una parte fundamental del valor de la auditoría es mostrar cuántas oportunidades la empresa ya generó pero no aprovechó correctamente: leads que quedaron a mitad de camino, conversaciones que se enfriaron, contactos que podrían reactivarse y ventas que podrían haberse cerrado con mejor seguimiento, velocidad o relato.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[16px] text-[#6bdda1]/80 leading-[1.6] font-medium border-l-2 border-[#6bdda1]/30 pl-5 mt-6" style={{ fontFamily: 'var(--font-secondary)' }}>
              La auditoría puede revelar una base real de oportunidades perdidas o mal trabajadas que, con las correcciones adecuadas, podrían convertirse en ingresos.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 8. MUCHO MÁS QUE UN INFORME ═══ */}
      <section className="relative py-20 md:py-28 bg-[#020202] border-t border-white/[0.04]">
        <div className="container-custom relative z-10 max-w-[900px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">DESPUÉS DEL DIAGNÓSTICO</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
              La auditoría no termina en detectar problemas. Sirve para corregirlos.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[17px] text-[#999] leading-[1.65] mb-8" style={{ fontFamily: 'var(--font-secondary)' }}>
              La auditoría puede abrir el camino a mejoras concretas que transforman la operación comercial:
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Capacitación del equipo comercial", "Mejora del relato de venta", "Redefinición de ángulos comerciales", "Optimización del manejo de objeciones", "Rediseño del seguimiento", "Automatización de tareas críticas", "Mejoras de CRM y pipeline", "Implementación de IA estratégica", "Orden operativo para escalar"].map((item, i) => (
              <motion.div key={i} variants={cardFade} className="flex items-center gap-3 p-4 rounded-[12px] bg-[#080808] border border-white/[0.05]">
                <div className="w-2 h-2 rounded-full bg-[#6bdda1]/50 shrink-0" />
                <span className="text-[14px] text-[#aaa] font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-[16px] text-[#6bdda1]/80 leading-[1.6] font-medium border-l-2 border-[#6bdda1]/30 pl-5 mt-10 max-w-[700px]" style={{ fontFamily: 'var(--font-secondary)' }}>
            Scala no se queda en la teoría. Entiende lo que hay que hacer para que la empresa venda más de verdad.
          </motion.p>
        </div>
      </section>

      {/* ═══ 9. PARA QUIÉN ES ═══ */}
      <section className="relative py-20 md:py-28 border-t border-white/[0.04]">
        <div className="container-custom relative z-10 max-w-[900px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#185de8] uppercase tracking-[0.2em] mb-4">PERFIL IDEAL</motion.span>
            <motion.h2 variants={fadeUp} className="text-[28px] md:text-[40px] font-bold text-white tracking-tight leading-[1.12] mb-10" style={{ fontFamily: 'var(--font-primary)' }}>
              Esta auditoría es para empresas que ya venden, pero sienten que podrían estar vendiendo mucho mejor.
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="flex flex-col gap-3.5">
            {profiles.map((p, i) => (
              <motion.div key={i} variants={cardFade} className="flex items-start gap-4 p-5 rounded-[14px] bg-[#060606] border border-white/[0.04]">
                <svg className="w-5 h-5 text-[#6bdda1] mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span className="text-[15px] text-[#aaa] leading-[1.5] font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>{p}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 10. QUÉ IMPLICA ═══ */}
      <section className="relative py-20 md:py-28 bg-[#020202] border-t border-white/[0.04]">
        <div className="container-custom relative z-10 max-w-[900px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">COMPROMISO</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
              Qué implica hacer esta auditoría
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[17px] text-[#999] leading-[1.65] mb-10" style={{ fontFamily: 'var(--font-secondary)' }}>
              No es algo invasivo, pero sí es un proceso serio. Cuanto más compromiso haya del lado de la empresa, más valor genera la auditoría.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {implications.map((item, i) => (
              <motion.div key={i} variants={cardFade} className="flex items-start gap-3 p-5 rounded-[14px] bg-[#080808] border border-white/[0.05]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#185de8]/60 mt-[9px] shrink-0" />
                <span className="text-[14px] text-[#aaa] leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 11. CÓMO TRABAJAMOS ═══ */}
      <section className="relative py-20 md:py-28 border-t border-white/[0.04] overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40%] h-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle at right, #6bdda1 0%, transparent 60%)' }} />
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-16">
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">PROCESO</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
              Cómo se desarrolla la auditoría
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="max-w-[800px] mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#185de8]/40 via-[#6bdda1]/30 to-transparent z-0 hidden md:block" />
            <div className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <motion.div key={i} variants={cardFade} className="flex items-start gap-6 relative z-10">
                  <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#0a0a0a] border-2 border-[#185de8]/40 shrink-0">
                    <span className="text-[14px] font-black text-[#185de8]" style={{ fontFamily: 'var(--font-primary)' }}>{step.num}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-[18px] font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>{step.title}</h3>
                    <p className="text-[15px] text-[#888] leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 12. POR QUÉ SCALA ═══ */}
      <section className="relative py-20 md:py-28 bg-[#020202] border-t border-white/[0.04]">
        <div className="container-custom relative z-10 max-w-[900px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#185de8] uppercase tracking-[0.2em] mb-4">POR QUÉ SCALA</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold text-white tracking-tight leading-[1.1] mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
              No auditamos desde afuera.<br className="hidden md:block" /> Entendemos lo que pasa dentro de una operación comercial.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[17px] text-[#999] leading-[1.65] mb-10" style={{ fontFamily: 'var(--font-secondary)' }}>
              Scala combina expertise en ventas, procesos de negocio, tecnología, automatización e inteligencia artificial. Esa combinación permite mirar la operación comercial con una profundidad que va más allá del marketing o de la tecnología aislada.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="flex flex-wrap justify-center gap-4">
            {["Ventas", "Proceso", "Negocio", "Tecnología", "Automatización", "Inteligencia Artificial"].map((tag, i) => (
              <motion.div key={i} variants={cardFade} className="relative rounded-full p-[1px] overflow-hidden" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }}>
                <div className="bg-[#020202] rounded-full px-6 py-2.5">
                  <span className="text-[14px] text-white font-semibold" style={{ fontFamily: 'var(--font-secondary)' }}>{tag}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 13. CTA FINAL ═══ */}
      <section className="relative py-20 md:py-32 border-t border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-center items-center gap-[50px] opacity-[0.08]">
          <motion.div className="w-[120%] h-[20px] rounded-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} animate={{ x: ['-5%', '5%', '-5%'] }} transition={{ duration: 15, ease: 'linear', repeat: Infinity }} />
          <motion.div className="w-[140%] h-[25px] rounded-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} animate={{ x: ['5%', '-5%', '5%'] }} transition={{ duration: 20, ease: 'linear', repeat: Infinity }} />
          <motion.div className="w-[100%] h-[30px] rounded-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} animate={{ x: ['-2%', '8%', '-2%'] }} transition={{ duration: 18, ease: 'linear', repeat: Infinity }} />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div className="max-w-[700px] mx-auto relative overflow-hidden" style={{ background: 'radial-gradient(circle at center, #0F1419 0%, #000 100%)', borderRadius: '32px', padding: '64px 32px', boxShadow: 'inset 0 0 40px rgba(107,221,161,0.02), 0 20px 60px rgba(0,0,0,0.5)' }} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ padding: '1px', background: 'linear-gradient(135deg, rgba(24,93,232,0.4), rgba(107,221,161,0.4))', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'xor' }} />

            <h2 className="text-[28px] md:text-[40px] font-bold text-white tracking-tight leading-[1.12] mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
              Si tu empresa ya genera oportunidades, podemos ayudarte a entender por qué no está convirtiendo más.
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#999] leading-[1.6] mb-10 max-w-[540px] mx-auto" style={{ fontFamily: 'var(--font-secondary)' }}>
              La auditoría de Scala te permite ver con claridad qué está frenando tus ventas y qué hacer para corregirlo.
            </p>
            <motion.a href="https://scalaops.com/formulario" className="relative inline-flex items-center justify-center text-[#000] overflow-hidden cursor-pointer" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)', padding: '20px 52px', borderRadius: '100px', fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '16px', boxShadow: '0 0 60px rgba(107,221,161,0.2)', textDecoration: 'none' }} whileHover={{ scale: 1.03, boxShadow: '0 0 80px rgba(107,221,161,0.5)' }} whileTap={{ scale: 0.98 }}>
              <motion.div className="absolute inset-0 bg-white/20 skew-x-[-20deg]" style={{ left: '-20%', width: '30%' }} animate={{ left: ['-20%', '120%'] }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }} />
              <span className="relative z-10">Solicitar auditoría</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══ 14. FAQ ═══ */}
      <section className="relative py-20 md:py-28 bg-[#020202] border-t border-white/[0.04]">
        <div className="container-custom relative z-10 max-w-[800px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-16">
            <motion.span variants={fadeUp} className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">FAQ</motion.span>
            <motion.h2 variants={fadeUp} className="text-[32px] md:text-[40px] font-bold text-white tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
              Preguntas frecuentes
            </motion.h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-[16px] bg-[#080808] border border-white/[0.06] overflow-hidden">
                <button className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-[15px] md:text-[16px] font-bold text-white pr-4 leading-[1.4]" style={{ fontFamily: 'var(--font-primary)' }}>{faq.q}</span>
                  <motion.svg animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="w-5 h-5 text-[#6bdda1] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></motion.svg>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="px-5 md:px-6 pb-6 text-[14px] md:text-[15px] text-[#888] leading-[1.7]" style={{ fontFamily: 'var(--font-secondary)' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
