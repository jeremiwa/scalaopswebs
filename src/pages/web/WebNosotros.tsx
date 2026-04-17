import React from 'react';
import { motion } from 'framer-motion';

export const WebNosotros = () => {
  // Animaciones standard
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 1.02, 0.73, 1] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  return (
    <div className="bg-[#000000] min-h-screen text-white overflow-hidden pb-20">
      
      {/* 1. HERO / TÍTULO PRINCIPAL */}
      <section className="relative pt-[180px] pb-16 md:pb-32 overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] pointer-events-none z-0 bg-[#185de8] blur-[150px] opacity-[0.12] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] pointer-events-none z-0 bg-[#6bdda1] blur-[150px] opacity-[0.08] rounded-full" />
        
        {/* Textura sutil en hero */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.span variants={fadeUp} className="inline-block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-6">
              Quiénes somos
            </motion.span>
            
            <motion.h1 variants={fadeUp} className="text-[36px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-tight mb-16" style={{ fontFamily: 'var(--font-primary)' }}>
              Scala nace de una convicción simple: hoy no alcanza con ser bueno. Hay que saber vender, sistematizar y crecer.
            </motion.h1>

            <motion.div variants={fadeUp} className="space-y-6 text-[#a1a1a1] text-[17px] md:text-[19px] leading-[1.7] max-w-3xl" style={{ fontFamily: 'var(--font-secondary)' }}>
              <p className="text-white font-medium">
                Scala fue fundada por Jeremías Walsh y Franco Villa, dos perfiles distintos pero profundamente complementarios, unidos por una misma visión:
              </p>
              <p>
                en el mercado actual, no siempre gana el que más sabe o el que tiene el mejor producto. Muchas veces gana el que mejor comunica, mejor vende, mejor estructura su proceso comercial y mejor aprovecha la tecnología.
              </p>
              <p>
                Porque la realidad es esta:<br/>
                podés ser excelente en tu área, pero si no sabés vender, alguien peor que vos puede crecer más, captar más clientes y quedarse con la oportunidad.
              </p>
              <p>
                Además, muchas empresas no pierden ventas por falta de demanda. Las pierden por problemas más silenciosos: respuestas que llegan tarde, seguimientos que no se hacen, objeciones mal manejadas, procesos desordenados y falta de visibilidad sobre lo que realmente está pasando en su operación comercial.
              </p>
              <p>
                Y eso cuesta caro.
              </p>
              <p>
                Porque cuando una empresa no responde a tiempo, no hace seguimiento o no sabe manejar bien una objeción, no solo pierde una oportunidad: puede perder miles de dólares en ingresos que ya estaban al alcance.
              </p>
              <p className="text-white font-medium pt-4">
                Ahí es donde entra Scala.
              </p>
              <p>
                Creamos Scala para ayudar a las empresas a cerrar esa brecha: combinar el valor que ya tienen con una estructura comercial moderna, procesos inteligentes y la inteligencia artificial más avanzada aplicada a mejorar ventas, seguimiento, velocidad de respuesta, análisis y conversión.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. BLOQUE JEREMÍAS WALSH */}
      <section className="relative py-16 md:py-24 border-t border-white/[0.04] bg-[#030303]">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Foto Placeholder Jeremías */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden"
              style={{ background: 'linear-gradient(180deg, #111111 0%, #080808 100%)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Eliminar cuando se agregue <img src="/images/jeremias.jpg" /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                <svg className="w-16 h-16 text-[#6bdda1] mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span className="text-[11px] font-bold tracking-widest text-[#6bdda1] uppercase">Foto Jeremías</span>
              </div>
              <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black to-transparent z-10" />
            </motion.div>

            {/* Contenido Jeremías */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="flex flex-col">
              <span className="inline-block px-3 py-1 bg-[#185de8]/10 text-[#185de8] text-[11px] font-bold tracking-widest uppercase rounded-full mb-6 w-max border border-[#185de8]/20">
                Inversiones / Ventas / Growth
              </span>
              <h2 className="text-[32px] md:text-[40px] font-extrabold tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-primary)' }}>
                Jeremías Walsh
              </h2>
              <p className="text-[#6bdda1] text-[14px] uppercase tracking-widest font-bold mb-8">
                Co-Founder · Estrategia de Negocios
              </p>
              
              <div className="space-y-6 text-[#a1a1a1] text-[16px] md:text-[18px] leading-[1.7]" style={{ fontFamily: 'var(--font-secondary)' }}>
                <p>
                  Jeremías Walsh es fundador del instituto de inversiones más grande de Latinoamérica, contador público, empresario y experto en inversiones, ventas, crecimiento de negocios y expansión comercial.
                </p>
                <p>
                  Su experiencia construyendo empresas, posicionando marcas y entendiendo cómo se mueve el mercado le dio una visión muy clara: muchos negocios no frenan su crecimiento porque les falte valor, sino porque no logran vender, ordenar y potenciar ese valor de forma correcta.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. BLOQUE FRANCO VILLA */}
      <section className="relative py-16 md:py-24 border-t border-white/[0.04]">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Contenido Franco (Invertido en Desktop) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="flex flex-col order-2 lg:order-1">
              <span className="inline-block px-3 py-1 bg-[#6bdda1]/10 text-[#6bdda1] text-[11px] font-bold tracking-widest uppercase rounded-full mb-6 w-max border border-[#6bdda1]/20">
                IA / Sistemas / Automatización
              </span>
              <h2 className="text-[32px] md:text-[40px] font-extrabold tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-primary)' }}>
                Franco Villa
              </h2>
              <p className="text-[#185de8] text-[14px] uppercase tracking-widest font-bold mb-8">
                Co-Founder · Arquitectura Técnica
              </p>
              
              <div className="space-y-6 text-[#a1a1a1] text-[16px] md:text-[18px] leading-[1.7]" style={{ fontFamily: 'var(--font-secondary)' }}>
                <p>
                  Franco Villa es programador senior y trabajó en grandes compañías como Coca-Cola y Accenture, entre otras. Además, combina una sólida experiencia técnica con expertise en inteligencia artificial, growth, partnerships, ventas y marketing.
                </p>
                <p>
                  Su fortaleza está en tomar problemas complejos de negocio y convertirlos en sistemas reales: procesos, automatizaciones, integraciones e implementaciones de IA pensadas para mejorar rendimiento comercial, eficiencia operativa y capacidad de crecimiento.
                </p>
              </div>
            </motion.div>

            {/* Foto Placeholder Franco */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden order-1 lg:order-2"
              style={{ background: 'linear-gradient(180deg, #111111 0%, #080808 100%)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Eliminar cuando se agregue <img src="/images/franco.jpg" /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                <svg className="w-16 h-16 text-[#185de8] mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span className="text-[11px] font-bold tracking-widest text-[#185de8] uppercase">Foto Franco</span>
              </div>
              <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black to-transparent z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. BLOQUE “POR QUÉ FUNDAMOS SCALA” (MANIFIESTO) */}
      <section className="relative py-20 md:py-32 bg-[#020202] border-t border-b border-white/[0.04]">
        {/* Abstract Background Detail */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30%] h-full opacity-10 pointer-events-none" 
             style={{ background: 'radial-gradient(circle at right, #6bdda1 0%, transparent 70%)', mixBlendMode: 'screen' }} />

        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="max-w-4xl mx-auto p-10 md:p-16 rounded-[24px] md:rounded-[32px] relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.95) 100%)', 
              border: '1px solid rgba(255,255,255,0.06)' 
            }}
          >
            {/* DNA Line sutil on top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-px" style={{ background: 'linear-gradient(90deg, transparent, #6bdda1, transparent)' }} />
            
            <h3 className="text-[28px] md:text-[36px] font-bold text-white mb-10 pb-10 border-b border-white/[0.05]" style={{ fontFamily: 'var(--font-primary)' }}>
              Por qué fundamos Scala
            </h3>

            <div className="space-y-6 text-[#a1a1a1] text-[17px] md:text-[20px] leading-[1.7]" style={{ fontFamily: 'var(--font-secondary)' }}>
              <p className="text-white font-medium">
                Fundamos Scala porque entendimos algo fundamental:<br/>
                hoy, ser muy bueno en lo que hacés no garantiza crecer.
              </p>
              <p>
                Podés tener un gran servicio.<br/>
                Podés tener un gran producto.<br/>
                Podés incluso ser mejor que tu competencia.<br/>
                Pero si no sabés vender, si no respondés a tiempo, si no hacés seguimiento, si no manejás bien las objeciones y si no tenés un sistema comercial sólido, muchas veces termina creciendo otro que simplemente supo estructurarse mejor.
              </p>
              <p className="font-bold text-white pt-4 pb-2">
                Por eso creamos Scala.
              </p>
              <p>
                Para ayudar a las empresas a vender mejor, operar mejor y crecer mejor.<br/>
                Para unir estrategia comercial, procesos, automatización e inteligencia artificial de última generación en sistemas que permitan responder más rápido, hacer mejor seguimiento, detectar fugas, ordenar la operación y convertir más oportunidades en ingresos.
              </p>
              <p className="text-white">
                No usamos IA por moda.<br/>
                La aplicamos de forma práctica, moderna e inteligente para mejorar ventas de verdad.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FRASE DESTACADA / CIERRE VISUAL */}
      <section className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center min-h-[60vh]">
        {/* Glow central puro minimalista */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] flex items-center justify-center opacity-20 pointer-events-none">
           <div className="absolute inset-0 bg-[#6bdda1] blur-[150px] mix-blend-screen mask-radial" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-[40px] md:text-[56px] lg:text-[72px] font-black tracking-tight text-white leading-tight mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
              Muchas empresas no están lejos de crecer más.
            </h2>
            <p className="text-[20px] md:text-[28px] text-[#999999] leading-snug font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
              Solo están perdiendo dinero en cada <span className="text-[#6bdda1]">respuesta tardía</span>, cada <span className="text-[#6bdda1]">seguimiento ausente</span> y cada <span className="text-[#6bdda1]">objeción mal manejada</span>.
            </p>
          </motion.div>
        </div>

        <style>{`
          .mask-radial {
            mask-image: radial-gradient(circle, black 0%, transparent 60%);
            -webkit-mask-image: radial-gradient(circle, black 0%, transparent 60%);
          }
        `}</style>
      </section>

    </div>
  );
};
