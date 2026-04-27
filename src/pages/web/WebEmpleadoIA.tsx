import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, BrainCircuit, MessageSquare, Filter, Route, Zap, Users, Workflow, CheckCircle2, XCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import AIEmployeeLiveDemo from '../../components/web/AIEmployeeLiveDemo';
import CustomAIEmployeeCapabilities from '../../components/web/CustomAIEmployeeCapabilities';
import ScalaProcessShowcase from '../../components/web/ScalaProcessShowcase';

/* ═══════════════════════════════════════════════════════════════════
   DATA & TEXT RESOURCES
   ═══════════════════════════════════════════════════════════════════ */

const quePuedeHacer = [
  {
    icon: <MessageSquare className="w-6 h-6 text-[#185de8]" />,
    title: "Responder consultas",
    items: [
      "Respuestas inmediatas a toda hora",
      "Disponibilidad 24/7 sin domingos ni feriados",
      "Atención inicial y contención del lead",
      "Solución de preguntas frecuentes al instante"
    ]
  },
  {
    icon: <Filter className="w-6 h-6 text-[#6bdda1]" />,
    title: "Pre calificar oportunidades",
    items: [
      "Filtro inteligente de interesados reales",
      "Detección de nivel de interés e intención",
      "Ordenamiento de prioridades",
      "Clasificación estricta antes de derivar"
    ]
  },
  {
    icon: <Route className="w-6 h-6 text-[#185de8]" />,
    title: "Derivar inteligentemente",
    items: [
      "Derivación técnica según tipo de consulta",
      "Segmentación precisa por interés",
      "Envío directo al área o vendedor correcto",
      "Reducción total de tiempos muertos"
    ]
  },
  {
    icon: <Zap className="w-6 h-6 text-[#6bdda1]" />,
    title: "Automatizar seguimiento",
    items: [
      "Follow-up inicial sin demora",
      "Recuperación activa de conversaciones",
      "Sistema de insistencia ordenada",
      "Continuidad operativa sin depender del vendedor"
    ]
  },
  {
    icon: <Users className="w-6 h-6 text-[#185de8]" />,
    title: "Dar soporte al equipo",
    items: [
      "Filtrado que evita carga operativa inútil",
      "Liberación de tareas repetitivas",
      "Foco humano 100% en el cierre de ventas",
      "Manejo de objeciones estructurales"
    ]
  },
  {
    icon: <Workflow className="w-6 h-6 text-[#6bdda1]" />,
    title: "Integrarse al sistema",
    items: [
      "Conexión nativa con WhatsApp",
      "Sincronización bidireccional con CRM",
      "Lectura de procesos y formularios",
      "Criterios de negocio codificados"
    ]
  }
];

const comparativa = [
  {
    type: "Bot Simple (Lo Tradicional)",
    isNegative: true,
    features: [
      "Responde scripts fijos y frágiles",
      "Poca o nula adaptación al rubro",
      "Lógica comercial limitada",
      "Mala derivación, rompe la experiencia",
      "No entiende el negocio, solo detecta palabras",
      "Poca utilidad operativa real"
    ]
  },
  {
    type: "Empleado IA de Scala",
    isNegative: false,
    features: [
      "Adaptado a la lógica de la empresa",
      "Responde con criterio comercial definido",
      "Sigue el proceso de venta",
      "Califica y deriva inteligentemente",
      "Acompaña el proceso 24/7 de forma táctica",
      "Ayuda concretamente a vender mejor y facturar más"
    ]
  }
];

const faqs = [
  { q: "¿Es un bot técnico o algo más avanzado?", a: "Es radicalmente diferente a un chatbot clásico de opciones (1, 2 o 3). Integramos Inteligencia Artificial Generativa bajo criterios estrictos de tu empresa. Entiende contexto, lee la intención del lead, argumenta beneficios y dirige la conversación hacia el cierre o la calificación, no se limita a responder un Excel." },
  { q: "¿Se adapta a mi empresa?", a: "Absolutamente, de hecho ese es su valor. No vendemos software de IA empaquetado y ciego; construimos un Empleado IA parametrizado con los datos, objeciones típicas, tono de comunicación y reglas de ruteo de tu empresa particular." },
  { q: "¿Puede integrarse con mi CRM?", a: "Sí. El Empleado IA puede recolectar el nombre del lead, la intención de compra, el presupuesto detectado, y empujar automáticamente esos datos a plataformas como HubSpot, Pipedrive, o Salesforce, creando el negocio asignado al vendedor correspondiente." },
  { q: "¿Reemplaza a mi equipo?", a: "No. Los potencia brutalmente. La IA hace aquello para lo que las personas son lentas o ineficientes (responder en 1 segundo a las 3 de la mañana, pre-calificar a 100 leads en 5 minutos). Libera a tu equipo para interactuar únicamente con oportunidades maduras." },
  { q: "¿Necesito tener procesos definidos antes?", a: "Es preferible tener un mínimo de orden para que la IA sepa qué reglas cumplir. Sin embargo, en el diseño del Empleado IA nosotros te ayudamos forzosamente a esclarecer, limpiar y definir esos procesos, de lo contrario la automatización fallaría." },
  { q: "¿Qué pasa si mi operación todavía está desordenada?", a: "Si la operación carece de cualquier mapa lógico, recomendamos primero avanzar con nuestro servicio de Implementación Comercial para trazar la cancha de juego, y luego instalar el Empleado IA sobre terreno firme." }
];

/* ═══════════════════════════════════════════════════════════════════
   FRAMER MOTION VARIANTS
   ═══════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export const WebEmpleadoIA = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#000000] text-white overflow-hidden relative">
      <SEO 
        title="Implementación de Empleado IA en Ventas | ScalaOps" 
        description="Agentes autónomos de IA que responden leads en segundos, precalifican prospectos y agendan reuniones 24/7. Integrado con tu CRM y WhatsApp."
        canonical="https://scalaops.com/empleado-ia"
      />
      
      {/* ═══ 1. HERO PRINCIPAL ═══ */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-[#000000] overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")', opacity: 0.03 }} />
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] pointer-events-none z-0 bg-[#6bdda1] blur-[150px] opacity-[0.08] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] pointer-events-none z-0 bg-[#185de8] blur-[140px] opacity-[0.08] rounded-full" />

        <div className="container-custom relative z-10 w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          <div className="flex flex-col items-start text-left pt-10 pb-20 lg:py-0">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center px-4 py-1.5 bg-[#6bdda1]/10 text-[#6bdda1] text-[11px] font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-[#6bdda1]/20">
              <Bot className="w-4 h-4 mr-2" />
              IA Comercial Personalizada
            </motion.span>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-tight leading-[1.08] mb-6 text-white" style={{ fontFamily: 'var(--font-primary)' }}>
              Creamos un Empleado IA, entrenado para calificar y vender.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-[17px] md:text-[19px] text-[#A0A0B5] max-w-[540px] mb-10 leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>
              Diseñamos una IA comercial personalizada para tu empresa, capaz de atender conversaciones, pre-calificar oportunidades, automatizar tareas y acompañar la venta con criterio de rentabilidad y disponibilidad 24/7.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <a href="/formulario" className="w-full sm:w-auto relative text-[#000000] overflow-hidden flex items-center justify-center transition-shadow group cursor-pointer" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)', padding: '18px 40px', borderRadius: '100px', fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '15px' }}>
                Solicitar Empleado IA
              </a>
              <a href="#contacto" className="text-white text-[15px] font-bold transition-colors hover:text-[#6bdda1] flex items-center w-full sm:w-auto justify-center">
                Hablar con un especialista <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }} className="relative h-full w-full hidden lg:flex items-center justify-center">
            <AIEmployeeLiveDemo />
          </motion.div>
        </div>
      </section>

      {/* ═══ 2+3. CAPACIDADES BENTO GRID ═══ */}
      <CustomAIEmployeeCapabilities />

      {/* ═══ 4. QUÉ PUEDE HACER (Service Grid Expandido) ═══ */}
      <section className="py-32 bg-[#020202] border-t border-white/[0.04] relative">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#185de8] blur-[180px] opacity-[0.03] pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 text-center max-w-[800px] mx-auto">
            <h2 className="text-[36px] md:text-[46px] font-bold leading-[1.1] mb-6 text-white" style={{ fontFamily: 'var(--font-primary)' }}>
              Todo lo que puede hacer un Empleado IA bien diseñado
            </h2>
            <p className="text-[#8B8B9E] text-[17px]">
              La arquitectura abarca desde atención primaria hasta integración pesada de datos en los sistemas centrales. Esto es lo que configuramos sobre la red neuronal.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quePuedeHacer.map((area, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-[#050505] border border-white/[0.05] rounded-2xl p-8 hover:border-[#185de8]/30 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-bl-full transition-transform group-hover:scale-110" />
                <div className="mb-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-[#185de8]/10 transition-colors">
                  {area.icon}
                </div>
                <h3 className="text-[20px] font-bold text-white mb-6" style={{ fontFamily: 'var(--font-primary)' }}>{area.title}</h3>
                <ul className="space-y-3 relative z-10">
                  {area.items.map((item, i) => (
                    <li key={i} className="flex items-start text-[14px] text-[#A0A0B5]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6bdda1] mt-[6px] mr-3 flex-shrink-0" />
                      <span className="leading-[1.5]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* ═══ 6. EMPLEADO IA vs BOT GENÉRICO ═══ */}
      <section className="py-32 bg-[#000000] relative">
        <div className="container-custom">
          <div className="mb-16 text-center max-w-[800px] mx-auto">
            <h2 className="text-[32px] md:text-[42px] font-bold leading-[1.1] mb-6 text-white" style={{ fontFamily: 'var(--font-primary)' }}>
              La diferencia no está solo en responder. <br/>
              <span className="text-[#185de8]">Está en cómo piensa dentro de tu proceso.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
            {/* Lado Bot Malo */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#050505] border border-white/[0.04] p-8 md:p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-[#ef4444]/20"><Bot className="w-24 h-24" /></div>
              <h3 className="text-[22px] font-bold text-white mb-8 relative z-10">{comparativa[0].type}</h3>
              <ul className="space-y-4 relative z-10">
                {comparativa[0].features.map((feat, i) => (
                  <li key={i} className="flex items-center text-[#8B8B9E] text-[15px]">
                    <XCircle className="w-5 h-5 text-[#ef4444] mr-4 flex-shrink-0 opacity-80" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Lado Scala IA */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-gradient-to-br from-[#0A0A0F] to-[#0A101C] border border-[#185de8]/30 p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-[0_0_30px_rgba(24,93,232,0.1)]">
              <div className="absolute top-0 right-0 p-6 text-[#185de8]/20"><BrainCircuit className="w-24 h-24" /></div>
              <h3 className="text-[22px] font-bold text-[#6bdda1] mb-8 relative z-10">{comparativa[1].type}</h3>
              <ul className="space-y-4 relative z-10">
                {comparativa[1].features.map((feat, i) => (
                  <li key={i} className="flex items-center text-white text-[15px] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#6bdda1] mr-4 flex-shrink-0 drop-shadow-[0_0_8px_rgba(107,221,161,0.5)]" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>







      {/* ═══ 12. CÓMO TRABAJAMOS (Sticky Scroll Process) ═══ */}
      <ScalaProcessShowcase />



      {/* ═══ 15. FAQ ═══ */}
      <section className="py-32 bg-[#020202]">
        <div className="container-custom max-w-[800px]">
          <h2 className="text-[32px] md:text-[42px] font-bold text-center mb-16" style={{ fontFamily: 'var(--font-primary)' }}>
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#050505] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.12] transition-colors">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                  <span className="text-[16px] font-bold text-white">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#8B8B9E] transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-6 pb-6 text-[#A0A0B5] text-[15px] leading-[1.6]">
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 14. CTA FINAL ═══ */}
      <section className="py-32 bg-[#000000] relative border-t border-white/[0.05]">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[300px] bg-[#6bdda1] blur-[150px] opacity-[0.08] pointer-events-none" />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-[40px] md:text-[52px] font-bold mb-6 max-w-[900px] mx-auto leading-[1.05]" style={{ fontFamily: 'var(--font-primary)' }}>
            Si querés ejecutar IA estratégica <br/>este es el siguiente paso.
          </h2>
          <p className="text-[18px] text-[#A0A0B5] max-w-[700px] mx-auto mb-10">
            Creamos un Empleado IA adaptado y modelado a la imagen táctica de tu negocio para responder masiva y profundamente con retención y rentabilidad operativa.
          </p>
          <a href="/formulario" className="inline-flex text-[#000000] items-center justify-center transition-transform hover:scale-105" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)', padding: '18px 48px', borderRadius: '100px', fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '16px' }}>
            Solicitar Empleado IA
          </a>
        </div>
      </section>

    </div>
  );
};
