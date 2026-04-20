import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  MessageSquare,
  Filter,
  Route,
  Zap,
  Users,
  Workflow,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Cpu,
  Target,
  ChevronDown,
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import AIEmployeeLiveDemo from '../../components/web/AIEmployeeLiveDemo';

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

const paraQueSirve = [
  "Responder entre 1 y 5 segundos cuando entra un lead caliente.",
  "Hacer la primera interacción sin que el usuario sienta fricción.",
  "Captar información clave antes de pasar a un humano.",
  "Evitar que se enfríe una oportunidad en horarios no laborales.",
  "Asistir en ventas completas por WhatsApp o Instagram.",
  "Ordenar ingresos masivos de prospectos durante pautas.",
  "Derivar al vendedor correcto según presupuesto o ubicación.",
  "Reducir en un 80% la carga manual inicial del equipo."
];

const entregables = [
  "Instanciación de solución IA personalizada y entrenada",
  "Lógica conversacional codificada según tu negocio",
  "Criterios de calificación de Leads definidos y activos",
  "Árbol de derivación integrado al equipo humano",
  "Estructura de automatización e integraciones (CRM/WhatsApp)",
  "Mayor velocidad operativa demostrable",
  "Reducción masiva de tareas netamente manuales",
  "Base sólida para escalar ingresos sin duplicar soporte"
];

const metodologia = [
  { step: "01", title: "Entendimiento", desc: "Radiografía profunda del negocio, el usuario que compra y el proceso interno actual." },
  { step: "02", title: "Definición del Rol", desc: "Qué tareas asume el Empleado IA y cuáles estrictamente quedan en manos humanas." },
  { step: "03", title: "Arquitectura", desc: "Diseño de lógica comercial, estructura de datos y criterios de respuesta algorítmica." },
  { step: "04", title: "Implementación", desc: "Integración con WhatsApp, CRMs y flujos comerciales operativos empresariales." },
  { step: "05", title: "Validación", desc: "Pruebas de estrés conversacional y ajuste contra usuarios reales u objeciones complejas." },
  { step: "06", title: "Optimización", desc: "Re-entrenamiento inicial sobre las primeras interacciones en vivo para pulir rendimiento." }
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
    <div className="bg-[#000000] min-h-screen text-white overflow-hidden">
      
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

      {/* ═══ 2. NO ES UN BOT GENÉRICO ═══ */}
      <section className="py-24 border-y border-white/[0.04] bg-[#020202]">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-[800px] mx-auto text-center">
            <h2 className="text-[32px] md:text-[42px] font-bold leading-[1.1] mb-6 text-white" style={{ fontFamily: 'var(--font-primary)' }}>
              No construimos bots genéricos.<br/>
              <span className="text-[#185de8]">Creamos sistemas conversacionales de impacto.</span>
            </h2>
            <p className="text-[17px] text-[#A0A0B5] leading-[1.6] mb-6" style={{ fontFamily: 'var(--font-secondary)' }}>
              El fracaso habitual de la IA empresarial nace al usar bots rígidos que responden sin entender el negocio comercial. Un bot básico no discrimina la intención de compra real, rompe el flujo del usuario y termina degradando la marca hasta que la persona exige hablar con un representante humano.
            </p>
            <p className="text-[17px] text-white font-medium leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>
              El Empleado IA de Scala nace a la inversa. Primero entendemos la lógica de ventas y la integración operativa. Luego paramatrizamos la IA para que tenga un sentido comercial estricto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. QUÉ ES EL EMPLEADO IA ═══ */}
      <section className="py-32 bg-[#000000] relative overflow-hidden">
        <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-[#6bdda1] blur-[150px] opacity-[0.04] pointer-events-none rounded-full" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="text-[#6bdda1] text-[12px] font-bold tracking-[0.15em] uppercase mb-4 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4" /> La Capa Inteligente
              </div>
              <h2 className="text-[36px] md:text-[46px] font-bold leading-[1.1] mb-6 text-white" style={{ fontFamily: 'var(--font-primary)' }}>
                Una IA entrenada para trabajar <span className="text-[#6bdda1]">dentro de tu operación.</span>
              </h2>
              <p className="text-[#8B8B9E] text-[17px] leading-[1.6] mb-8">
                El Empleado IA no es un juguete tecnológico ni una respuesta genérica pegada a tu dominio web o WhatsApp empresarial. Es una solución de automatización diseñada a tu medida que actúa como la primera línea de fuego para filtrar ruidosos, nutrir prospectos calientes y ordenar las interacciones antes de pasar el control al ecosistema humano y CRM.
              </p>
              <div className="p-4 rounded-xl border border-[#6bdda1]/20 bg-[#6bdda1]/5">
                <p className="text-[#6bdda1] text-[14px] font-medium italic">
                  "No reemplaza a tus mejores vendedores. Libera a tus mejores vendedores del trabajo de baja calidad."
                </p>
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 gap-4">
              {[
                { title: "Velocidad de Respuesta", icon: <Zap className="w-5 h-5" /> },
                { title: "Precalificación Real", icon: <Target className="w-5 h-5" /> },
                { title: "Derivación Inteligente", icon: <Route className="w-5 h-5" /> },
                { title: "Integración de Sistemas", icon: <Layers className="w-5 h-5" /> }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-[#050505] p-6 rounded-2xl border border-white/[0.04] flex flex-col items-center justify-center text-center hover:border-white/[0.1] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 text-white/70">
                    {item.icon}
                  </div>
                  <span className="text-[14px] font-bold text-white">{item.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

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

      {/* ═══ 5. PARA QUÉ SIRVE EN LA PRÁCTICA ═══ */}
      <section className="py-24 bg-[#050505] border-y border-white/[0.04]">
        <div className="container-custom">
          <div className="max-w-[900px] mx-auto text-center mb-16">
            <span className="text-[#6bdda1] font-bold text-[12px] uppercase tracking-widest mb-4 block">Aplicación Directa</span>
            <h2 className="text-[32px] md:text-[44px] font-bold text-white mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
              Dónde genera valor real adentro de una empresa
            </h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-[1000px] mx-auto">
            {paraQueSirve.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start bg-[#000000] p-4 rounded-xl border border-white/[0.03]">
                <Shield className="w-5 h-5 text-[#6bdda1] flex-shrink-0 mr-4 drop-shadow-[0_0_8px_rgba(107,221,161,0.5)]" />
                <p className="text-[#8B8B9E] text-[15px] font-medium leading-[1.5]">{item}</p>
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

      {/* ═══ 7. CÓMO LO PERSONALIZAMOS & 8. QUÉ IMPLICA ═══ */}
      <section className="py-32 bg-[#020202] border-t border-white/[0.04]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col">
              <h3 className="text-[28px] font-bold mb-6 text-white leading-tight" style={{ fontFamily: 'var(--font-primary)' }}>
                Cada Empleado IA se diseña según el <span className="text-[#185de8]">negocio</span>, el <span className="text-[#185de8]">proceso</span> y el <span className="text-[#185de8]">objetivo</span>.
              </h3>
              <p className="text-[#8B8B9E] text-[16px] leading-[1.6] mb-8">
                Personalizamos desde los fundamentos mecánicos operativos hasta los estilos lingüísticos. Tomamos tu forma de venta, objeciones naturales de tu industria, tipo de canal principal y variables de calificación. Nada de instalaciones estándar. 
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[ "Tono de marca", "Objeciones Típicas", "Reglas de Derivación", "Herramientas Existentes" ].map((tag, i) => (
                  <div key={i} className="bg-[#050505] border border-white/[0.06] rounded-lg p-3 text-center text-[#A0A0B5] text-[13px] font-bold">
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col bg-[#050505] border border-white/[0.06] p-10 rounded-2xl relative overflow-hidden">
              <h3 className="text-[28px] font-bold mb-6 text-[#6bdda1] leading-tight" style={{ fontFamily: 'var(--font-primary)' }}>
                Implementar IA de alto impacto requiere estructura.
              </h3>
              <p className="text-[#8B8B9E] text-[16px] leading-[1.6] mb-6">
                Para que la tecnología no descarrile, definimos brutalmente el scope: qué hace el bot y con qué métricas entrega a un usuario humano. Fijamos lógicamente quién, cuándo, cómo y dónde actúa el Agente IA.
              </p>
              <p className="text-white text-[15px] font-bold bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent italic">
                La Inteligencia Artificial no encubre procesos desprovistos de estrategia. Los potencia donde la estrategia es clara.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══ 9. QUÉ ENTREGAMOS & 10. BENEFICIOS REALES ═══ */}
      <section className="py-32 bg-[#000000] relative border-t border-white/[0.04]">
        <div className="absolute w-[500px] h-[500px] right-[-10%] bottom-0 bg-[#6bdda1] blur-[200px] opacity-[0.05] pointer-events-none rounded-full" />
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Lado Entregables */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="order-2 lg:order-1">
              <h3 className="text-[32px] md:text-[40px] font-bold mb-6 text-white leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>Qué <span className="text-[#185de8]">construimos</span> y entregamos en formato llave en mano.</h3>
              <div className="space-y-4">
                {entregables.map((del, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="flex items-center bg-[#050505] border border-[#185de8]/10 p-5 rounded-xl hover:border-[#185de8]/30 transition-all">
                    <TrendingUp className="w-5 h-5 text-[#185de8] mr-4 flex-shrink-0" />
                    <p className="text-white text-[15px] font-medium tracking-wide">{del}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Beneficios Textos Largos */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="order-1 lg:order-2 flex flex-col justify-center">
              <span className="text-[#6bdda1] font-bold text-[12px] uppercase tracking-widest mb-4 block">LOS RESULTADOS A ESCALA</span>
              <h3 className="text-[32px] md:text-[40px] font-bold mb-6 text-white leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>Qué mejora cuando la IA opera con exactitud.</h3>
              
              <div className="space-y-8 mt-6">
                <motion.div variants={fadeUp} className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#185de8]/10 flex items-center justify-center flex-shrink-0 mt-1"><Zap className="w-6 h-6 text-[#185de8]" /></div>
                  <div>
                    <h4 className="font-bold text-white text-[18px] mb-2">Respuesta en Tiempo Cero</h4>
                    <p className="text-[#8B8B9E] text-[15px] leading-relaxed">No hay demoras fatales entre el primer contacto de lead caliente y la provisión de información crítica.</p>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#6bdda1]/10 flex items-center justify-center flex-shrink-0 mt-1"><Filter className="w-6 h-6 text-[#6bdda1]" /></div>
                  <div>
                    <h4 className="font-bold text-white text-[18px] mb-2">Eliminación del Ruido Comercial</h4>
                    <p className="text-[#8B8B9E] text-[15px] leading-relaxed">Los Leads descalificados sin rango crediticio ni intención no desgastarán horas vitales del equipo humano de ventas.</p>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1"><Workflow className="w-6 h-6 text-white" /></div>
                  <div>
                    <h4 className="font-bold text-white text-[18px] mb-2">Orden Permanente del Flow</h4>
                    <p className="text-[#8B8B9E] text-[15px] leading-relaxed">Seguimiento absoluto y derivación mecánica en segundos desde Whatsapp a tu Base de Datos, sin fallas empíricas.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══ 11. PARA QUIÉN ES & EL APPROACH MÁS ONDA ═══ */}
      <section className="relative py-20 md:py-32 bg-[#020202] overflow-hidden border-t border-white/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(24,93,232,0.3) 50%, rgba(107,221,161,0.3) 100%, transparent 100%)' }} />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#185de8] blur-[150px] opacity-[0.05] rounded-full pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto mb-16 md:mb-20 text-center flex flex-col items-center">
            <span className="block text-[11px] font-bold text-[#185de8] uppercase tracking-[0.2em] mb-4">
              PERFIL IDEAL
            </span>
            <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
              Implementar IA de manera estratégica.<br/>Nada de modas vacías.
            </h2>
            <p className="text-[17px] md:text-[19px] text-[#A0A0B5] leading-relaxed font-normal mb-8 max-w-[700px]" style={{ fontFamily: 'var(--font-secondary)' }}>
              Este servicio está desarrollado para estructuras que venden masivamente por canales conversacionales, poseen mucho volúmen entrante que rebasa su operatividad y sienten la rotura entre Marketing orgánico y la absorción de los ejecutivos actuales.
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
                title: "Alto Volumen B2C / B2B",
                text: "Recibís decenas o centenas de consultas sueltas de forma persistente y el tiempo te come oportunidades."
              },
              {
                icon: <Cpu className="w-6 h-6 text-[#185de8]" />,
                title: "Obsesión a la Conversión",
                text: "Entendés que el 80% de los leads se enfrían a los 5 minutos, y querés automatizar esa ventana letal."
              },
              {
                icon: <Shield className="w-6 h-6 text-[#6bdda1]" />,
                title: "Deseo Racional de IA",
                text: "No querés instalar Inteligencia Artificial por instalar, sino porque ves un cuello de botella matemático identificable que arreglar."
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
                  <h3 className="text-[22px] font-bold text-white mb-4 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-primary)' }}>
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

      {/* ═══ 12. CÓMO TRABAJAMOS (Pasos Metodología) ═══ */}
      <section className="py-32 bg-[#000000] border-t border-white/[0.04] relative">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
            <h2 className="text-[36px] md:text-[46px] font-bold mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
              Cómo diseñamos un Empleado IA en Scala
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
            {metodologia.map((step, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-[#050505] border border-[#185de8]/10 rounded-xl p-8 relative isolate overflow-hidden group hover:border-[#185de8]/30 transition-all">
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

      {/* ═══ 13. POR QUÉ SCALA ═══ */}
      <section className="py-24 bg-[#050505] text-center border-y border-white/[0.04]">
        <div className="container-custom max-w-[900px]">
          <h2 className="text-[32px] md:text-[40px] font-bold mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
            No vemos la IA como una moda de software. <br/>La aplicamos para rentabilizar tu operación comercial.
          </h2>
          <p className="text-[17px] text-[#A0A0B5] leading-[1.6]">
            En Scala iteramos las redes de automatización bajo sangre de negocio, ventas, procesos y tecnología. Si el Agente IA que diseñamos para tu compañía no tiene impacto real cuantificable en tu operación comercial (MRR o Reducción del Tiempo de Ventas), entonces no lo construimos. Tu éxito determina el nuestro.
          </p>
        </div>
      </section>

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
