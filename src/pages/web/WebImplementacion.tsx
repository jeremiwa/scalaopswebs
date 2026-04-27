import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Layers,
  GitMerge,
  Workflow,
  Cpu,
  MessageSquare,
  Clock,
  Target,
  Shield,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import ImplementacionNetworkAnimation from '../../components/web/ImplementacionNetworkAnimation';
import ImplementacionProcessAnimation from '../../components/web/ImplementacionProcessAnimation';

/* ═══════════════════════════════════════════════════════════════════
   DATA & TEXT RESOURCES
   ═══════════════════════════════════════════════════════════════════ */

const implementationAreas = [
  {
    icon: <Layers className="w-6 h-6 text-[#185de8]" />,
    title: "Estructura comercial",
    items: [
      "Definición o mejora del proceso comercial",
      "Etapas claras y criterios de avance",
      "Orden de pipeline y responsables",
      "Mejora de trazabilidad total"
    ]
  },
  {
    icon: <GitMerge className="w-6 h-6 text-[#6bdda1]" />,
    title: "CRM y pipeline",
    items: [
      "Implementación / reorganización de CRM",
      "Limpieza de etapas y campos clave",
      "Estructuración de motivos de pérdida",
      "Visibilidad del negocio en tiempo real"
    ]
  },
  {
    icon: <Workflow className="w-6 h-6 text-[#185de8]" />,
    title: "Automatización operativa",
    items: [
      "Follow-ups y recordatorios automáticos",
      "Disparadores y secuencias avanzadas",
      "Distribución inteligente de leads",
      "Reducción de carga manual repetitiva"
    ]
  },
  {
    icon: <Cpu className="w-6 h-6 text-[#6bdda1]" />,
    title: "IA aplicada a ventas",
    items: [
      "Pre-calificación y scoring inteligente",
      "Respuestas y automatización conversacional",
      "Clasificación automática de oportunidades",
      "Derivación acelerada de alto valor"
    ]
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-[#185de8]" />,
    title: "WhatsApp y entrada de leads",
    items: [
      "Optimización del ingreso de oportunidades",
      "Integración impecable con formularios",
      "Orden estructurado del primer contacto",
      "Reducción de fricción en la atención"
    ]
  },
  {
    icon: <Clock className="w-6 h-6 text-[#6bdda1]" />,
    title: "Seguimiento comercial",
    items: [
      "Secuencias sistemáticas de seguimiento",
      "Lógica de insistencia y timing exacto",
      "Recuperación de conversaciones frías",
      "No dejar oportunidades sin trabajar"
    ]
  },
  {
    icon: <Target className="w-6 h-6 text-[#185de8]" />,
    title: "Relato y estructura de venta",
    items: [
      "Mejora de la narrativa y discurso",
      "Claridad en la propuesta de valor",
      "Ángulos de venta de impacto profundo",
      "Enfoque real en el dolor del cliente"
    ]
  },
  {
    icon: <Shield className="w-6 h-6 text-[#6bdda1]" />,
    title: "Manejo de objeciones",
    items: [
      "Diagnóstico de objeciones frecuentes",
      "Arquitectura de respuestas sólidas",
      "Estructura argumental de alto nivel",
      "Reducción de pérdidas por cierres débiles"
    ]
  },
  {
    icon: <Users className="w-6 h-6 text-[#185de8]" />,
    title: "Capacitación de equipo",
    items: [
      "Alineación operativa y estratégica",
      "Entrenamiento en procesos",
      "Mejora de consistencia comercial",
      "Coaching en discurso y objeciones"
    ]
  }
];

const problemsSolved = [
  "Leads que llegan, se pierden y nadie los trabaja bien.",
  "Respuestas tardías que dilapidan el esfuerzo de marketing.",
  "Seguimiento inexistente, inconsistente o librado a la memoria.",
  "CRM desordenado donde nadie sabe el estado real del negocio.",
  "Vendedores trabajando cada uno a su propia manera.",
  "Conversaciones que se enfrían sin un sistema de reactivación.",
  "Marketing generando oportunidades orgánicas que Ventas no capitaliza.",
  "Montañas de tareas manuales que consumen horas de venta activa.",
  "Ausencia de IA en puntos donde podría multiplicar la velocidad.",
  "Dificultad evidente para escalar porque todo depende del esfuerzo humano."
];

const deliverables = [
  "Estructura comercial definida y documentada",
  "Herramientas tecnológicas limpias y organizadas",
  "Automatizaciones en la nube configuradas",
  "Mecánicas de seguimiento aplicadas al equipo",
  "Mejoras de mensaje y objeciones implementadas",
  "Recomendaciones estratégicas aterrizadas",
  "Criterio comercial mucho más claro y ágil",
  "Base sólida, predecible y lista para escalar"
];

const targetAudience = [
  "Empresas que ya detectaron problemas y quieren corregirlos rápido.",
  "Operaciones que ya venden pero tienen un desorden comercial limitante.",
  "Empresas con volumen de leads y un equipo de ventas que necesita estructura.",
  "Dueños que quieren automatizar sin perder el control o la calidad humana.",
  "Equipos que necesitan capitalizar IA pero con verdadero sentido comercial.",
  "Empresas que no quieren más consultas vacías; quieren un sistema para crecer."
];

const processSteps = [
  { step: "01", title: "Entendimiento profundo", desc: "Análisis de la necesidad real y del ecosistema actual." },
  { step: "02", title: "Priorización de mejoras", desc: "Definición del mapa de ruta con mayor impacto a corto plazo." },
  { step: "03", title: "Diseño operativo", desc: "Arquitectura de la solución lógica, técnica y comercial." },
  { step: "04", title: "Configuración y ajuste", desc: "Aterrizaje en el CRM, flujos, IA y entrenamiento al usuario final." },
  { step: "05", title: "Validación estricta", desc: "Pruebas de estrés para garantizar el funcionamiento impecable." },
  { step: "06", title: "Acompañamiento", desc: "Soporte inicial y optimización táctica durante el despegue." }
];

const faqs = [
  { q: "¿Necesito haber hecho antes la auditoría?", a: "No siempre. Si ya tenés clarísimo dónde está el problema, podemos pasar directamente a implementar. Sin embargo, en operaciones complejas solemos recomendar una auditoría corta para no implementar a ciegas." },
  { q: "¿La implementación es solo técnica?", a: "Para nada. Un CRM perfecto no sirve si el equipo no sabe vender. Nuestra implementación impacta en relato, objeciones, táctica de seguimiento y alineación humana." },
  { q: "¿Pueden trabajar sobre mi CRM actual?", a: "Sí, intervenimos y ordenamos CRMs existentes (HubSpot, Pipedrive, Salesforce, Clientify, etc.) o hacemos migraciones si la herramienta actual te está frenando." },
  { q: "¿Incluye automatizaciones e IA?", a: "Absolutamente. Son el brazo armado de la eficiencia actual. Automatizamos tareas repetitivas e integramos IA en puntos críticos de contacto y scoring." },
  { q: "¿También ayudan con el discurso de venta?", a: "Sí. Analizamos cómo está vendiendo el equipo y reconstruimos el argumento, la propuesta de valor y las matrices de manejo de objeciones." },
  { q: "¿Se adapta a empresas chicas y medianas?", a: "Scala implementa sistemas que escalan. Una Pyme necesita orden incluso más que una enterprise para sobrevivir y crecer sin que el fundador sea esclavo de las ventas." },
  { q: "¿La implementación reemplaza a mi equipo?", a: "No. Los potencia. Le quita al vendedor la carga manual, robótica y administrativa, permitiéndole hacer lo único que la IA todavía no hace perfecto: cerrar la venta humana." },
  { q: "¿Qué pasa después de implementar?", a: "Hacemos un acompañamiento táctico para asegurar la adopción del sistema. Después, el equipo opera de forma autónoma con una estructura drásticamente superior." }
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

export const WebImplementacion = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="w-full bg-[#000000] text-white overflow-hidden relative">
      <SEO 
        title="Implementación de Sistemas SCALA | ScalaOps" 
        description="Estructuramos, configuramos y documentamos tu CRM y procesos comerciales para que dejes de depender del talento aislado y empieces a operar como sistema."
        canonical="https://scalaops.com/implementacion"
        schema={faqSchema}
      />
      
      {/* ═══ 1. HERO ═══ */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-[#000000] overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")', opacity: 0.03 }} />
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] pointer-events-none z-0 bg-[#185de8] blur-[140px] opacity-[0.10] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] pointer-events-none z-0 bg-[#6bdda1] blur-[140px] opacity-[0.08] rounded-full" />

        <div className="container-custom relative z-10 w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center">
          <div className="flex flex-col items-start text-left pt-10 pb-20 lg:py-0">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-block px-4 py-1.5 bg-[#185de8]/10 text-[#185de8] text-[11px] font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-[#185de8]/20">
              Implementación Comercial, Automatización e IA
            </motion.span>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-tight leading-[1.08] mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
              Implementamos el ecosistema comercial para que vendas más y mejor.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-[17px] md:text-[19px] text-[#A0A0B5] max-w-[540px] mb-10 leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>
              Llevamos a la práctica las mejoras necesarias en ventas, procesos, automatización e IA para que tu operación comercial funcione con más velocidad, orden y capacidad de conversión.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row items-center gap-6">
              <a href="/formulario" className="relative text-[#000000] overflow-hidden flex items-center justify-center transition-shadow group cursor-pointer" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)', padding: '18px 40px', borderRadius: '100px', fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '15px' }}>
                Solicitar implementación
              </a>
              <a href="#contacto" className="text-white text-[15px] font-bold transition-colors hover:text-[#6bdda1] flex items-center">
                Hablar con un especialista <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }} className="relative h-full w-full hidden lg:flex items-center justify-center">
            <ImplementacionNetworkAnimation />
          </motion.div>
        </div>
      </section>



      {/* ═══ 4. TODO LO QUE PODEMOS IMPLEMENTAR (CARDS) ═══ */}
      <section className="py-32 bg-[#020202] border-t border-white/[0.04] relative">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[800px] h-[500px] bg-[#6bdda1] blur-[180px] opacity-[0.03] pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 text-center max-w-[700px] mx-auto">
            <h2 className="text-[36px] md:text-[46px] font-bold leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
              Qué puede incluir una implementación con Scala
            </h2>
            <p className="text-[#8B8B9E] text-[17px]">
              La arquitectura del sistema comercial se construye a medida, sumando los bloques funcionales que tu operación traccione mejor.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {implementationAreas.map((area, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-[#050505] border border-white/[0.05] rounded-2xl p-8 hover:border-white/[0.12] transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-bl-full transition-transform group-hover:scale-110" />
                <div className="mb-6">{area.icon}</div>
                <h3 className="text-[20px] font-bold text-white mb-6" style={{ fontFamily: 'var(--font-primary)' }}>{area.title}</h3>
                <ul className="space-y-3">
                  {area.items.map((item, i) => (
                    <li key={i} className="flex items-start text-[14px] text-[#A0A0B5]">
                      <div className="w-1 h-1 rounded-full bg-[#185de8] mt-[8px] mr-3 flex-shrink-0" />
                      <span className="leading-[1.5]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. PROBLEMAS QUE RESOLVEMOS & 6. QUÉ ENTREGAMOS ═══ */}
      <section className="py-32 bg-[#000000] relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col justify-center">
              <h3 className="text-[32px] md:text-[40px] font-bold mb-6 text-white leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>Qué cambia cuando <br/><span className="text-[#6bdda1]">la operación funciona</span></h3>
              <p className="text-[#8B8B9E] text-[17px] leading-[1.6] mb-10 max-w-[500px]">
                Atrás queda el desorden, los leads que se olvidan y la dependencia de planillas manuales. Esto es todo lo que construimos y dejamos operativo adentro de tu empresa:
              </p>
              <div className="space-y-4">
                {deliverables.map((del, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="flex items-center bg-[#050505] border border-white/[0.03] p-5 rounded-xl hover:border-[#6bdda1]/30 transition-all hover:-translate-y-1">
                    <CheckCircle2 className="w-6 h-6 text-[#6bdda1] mr-4 flex-shrink-0 drop-shadow-[0_0_8px_rgba(107,221,161,0.5)]" />
                    <p className="text-white text-[16px] font-medium tracking-wide">{del}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Animación Interactiva */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative h-full flex flex-col justify-center items-center lg:items-end">
              <ImplementacionProcessAnimation />
            </motion.div>
          </div>
        </div>
      </section>



      {/* ═══ 10. CÓMO TRABAJAMOS ═══ */}
      <section className="py-32 bg-[#000000] border-t border-white/[0.04] relative">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
            <h2 className="text-[36px] md:text-[46px] font-bold mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
              Cómo lo llevamos a la práctica
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-[#050505] border border-white/[0.04] rounded-xl p-8 relative isolate overflow-hidden group hover:border-white/[0.1] transition-all">
                <div className="text-[54px] font-black text-white/[0.02] absolute top-[-10px] right-[10px] leading-none select-none transition-transform group-hover:scale-110">
                  {step.step}
                </div>
                <div className="text-[#185de8] font-bold text-[13px] mb-4 tracking-wider">PASO {step.step}</div>
                <h4 className="text-[18px] font-bold text-white mb-3">{step.title}</h4>
                <p className="text-[14px] text-[#8B8B9E] leading-[1.5]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ EL APPROACH (Reemplaza a Por qué Scala) ═══ */}
      <section className="relative py-20 md:py-32 bg-[#000000] overflow-hidden border-t border-white/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(24,93,232,0.3) 50%, rgba(107,221,161,0.3) 100%, transparent 100%)' }} />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#185de8] blur-[150px] opacity-[0.05] rounded-full pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto mb-16 md:mb-20 text-center flex flex-col items-center">
            <span className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">
              POR QUÉ SCALA
            </span>
            <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
              Combinamos ingeniería y ventas.<br/>Nada de agencias genéricas.
            </h2>
            <p className="text-[17px] md:text-[19px] text-white/50 leading-relaxed font-normal mb-8 max-w-[600px]" style={{ fontFamily: 'var(--font-secondary)' }}>
              No venimos a hacerte posteos ni diseño. Operamos exclusivamente sobre el ecosistema comercial para aumentar tracción, automatización y cierres efectivos.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: <Target className="w-6 h-6 text-[#6bdda1]" />,
                title: "Enfoque Directo en Cierre",
                text: "Entendemos lo que necesita el vendedor y la IA para facturar. Descartamos lo que no impacta en el MRR."
              },
              {
                icon: <Cpu className="w-6 h-6 text-[#185de8]" />,
                title: "Arquitectura + IA",
                text: "No es solo usar ChatGPT. Es integrar modelos dentro de tu CRM y WhatsApp para crear agentes que pre-califiquen."
              },
              {
                icon: <Shield className="w-6 h-6 text-[#6bdda1]" />,
                title: "Adopción sin Fricción",
                text: "No te tiramos el software por la cabeza. Instalamos, entrenamos y acompañamos a tu equipo humano."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                className="group relative flex flex-col h-full rounded-[20px] transition-all duration-400 ease-in-out cursor-default overflow-hidden bg-[#0A0A0A]"
                style={{ border: '1px solid #1A1A1A', padding: '40px' }}
                whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(24, 93, 232, 0.1), 0 10px 40px rgba(107, 221, 161, 0.05)' }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[20px]" 
                  style={{ 
                    padding: '1px', background: 'linear-gradient(135deg, #185de8, #6bdda1)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
                    WebkitMaskComposite: 'xor', maskComposite: 'exclude' 
                  }} 
                />
                
                <div className="mb-8 inline-flex relative w-12 h-12 items-center justify-center rounded-full bg-[#030303]">
                  <div 
                    className="absolute inset-0 rounded-full opacity-50" 
                    style={{ 
                      padding: '1.5px', background: 'linear-gradient(135deg, #185de8, #6bdda1)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
                      WebkitMaskComposite: 'xor', maskComposite: 'exclude' 
                    }} 
                  />
                  {item.icon}
                </div>
                
                <div className="flex-grow z-10 relative">
                  <h3 className="text-[22px] md:text-[24px] font-bold text-white mb-4 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-[#A0A0B5] leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 12. FAQ ═══ */}
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

      {/* ═══ 13. CTA FINAL ═══ */}
      <section className="py-32 bg-[#000000] relative border-t border-white/[0.05]">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[300px] bg-[#185de8] blur-[150px] opacity-[0.08] pointer-events-none" />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-[40px] md:text-[52px] font-bold mb-6 max-w-[900px] mx-auto leading-[1.05]" style={{ fontFamily: 'var(--font-primary)' }}>
            Si ya sabés que podrías vender más, construyamos el sistema correcto.
          </h2>
          <p className="text-[18px] text-[#A0A0B5] max-w-[600px] mx-auto mb-10">
            Implementamos lo necesario para ordenar, automatizar y potenciar tu operación comercial sin improvisar.
          </p>
          <a href="/formulario" className="inline-flex text-[#000000] items-center justify-center transition-transform hover:scale-105" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)', padding: '18px 48px', borderRadius: '100px', fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '16px' }}>
            Solicitar implementación
          </a>
        </div>
      </section>
      
    </div>
  );
};
