import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: "1. Introducción",
    content: `Estos Términos y Condiciones regulan el acceso, navegación y uso del sitio web de Scala Ops. Al ingresar, navegar o utilizar este sitio, el usuario declara haber leído, comprendido y aceptado estas condiciones.\n\nSi el usuario no estuviera de acuerdo con estos Términos y Condiciones, deberá abstenerse de utilizar el sitio.`
  },
  {
    title: "2. Identificación",
    content: `El presente sitio se encuentra identificado comercialmente como Scala Ops y tiene como finalidad brindar información sobre servicios, soluciones, contenidos y formas de contacto vinculadas con consultoría, procesos, ventas, automatización e inteligencia artificial aplicada a empresas.\n\nScala Ops utiliza en este sitio su denominación comercial. Ciertos datos societarios, fiscales o registrales podrán ser incorporados cuando corresponda.\n\nCanal de contacto:\ninfo@scalaops.com\nCiudad Autónoma de Buenos Aires (CABA), Argentina`
  },
  {
    title: "3. Objeto del sitio",
    content: `El sitio web de Scala Ops tiene fines informativos, comerciales y de contacto. Su objetivo es presentar servicios, comunicar propuestas de valor, facilitar consultas y permitir que potenciales clientes o interesados puedan ponerse en contacto.\n\nEl sitio no constituye, por sí mismo, una oferta contractual cerrada, ni implica la aceptación automática de clientes, ni genera por sí solo una relación comercial definitiva.`
  },
  {
    title: "4. Uso del sitio",
    content: `El usuario se compromete a utilizar el sitio de manera lícita, responsable y conforme a estos Términos y Condiciones. Queda prohibido utilizar el sitio para:`,
    list: [
      "Realizar actividades ilícitas",
      "Vulnerar derechos de terceros",
      "Interferir con el funcionamiento del sitio",
      "Introducir software malicioso",
      "Intentar acceder sin autorización a sistemas, bases de datos o contenidos restringidos",
      "Enviar información falsa, engañosa o de mala fe mediante formularios o canales de contacto"
    ],
    content2: `Scala Ops podrá limitar, bloquear o restringir el acceso al sitio o a determinadas funcionalidades si detecta usos abusivos, irregulares o contrarios a estos términos.`
  },
  {
    title: "5. Propiedad intelectual",
    content: `Todos los contenidos del sitio, incluyendo textos, diseños, estructuras, nombres, marcas, logotipos, elementos visuales, gráficos, piezas de comunicación, código, recursos audiovisuales y demás materiales, son propiedad de Scala Ops o se utilizan con autorización correspondiente.\n\nQueda prohibida su reproducción, distribución, modificación, publicación, adaptación, explotación o utilización total o parcial sin autorización previa y expresa.`
  },
  {
    title: "6. Información publicada en el sitio",
    content: `Scala Ops procura que la información del sitio sea clara, actualizada y útil. Sin embargo, no garantiza que todo el contenido se encuentre permanentemente completo, exacto, libre de errores u actualizado en todo momento.\n\nLa información publicada podrá ser modificada, actualizada, reemplazada o eliminada sin previo aviso.`
  },
  {
    title: "7. Carácter informativo y no asesoramiento profesional",
    content: `La información contenida en este sitio tiene carácter general e informativo. Salvo indicación expresa en contrario, no constituye asesoramiento legal, contable, financiero, fiscal, comercial ni de ningún otro tipo profesional específico.\n\nNinguna decisión relevante debería tomarse exclusivamente sobre la base del contenido publicado en este sitio sin el debido análisis profesional correspondiente al caso concreto.`
  },
  {
    title: "8. Servicios y contratación",
    content: `Los servicios mencionados en el sitio son presentados de manera informativa y orientativa. La eventual prestación de servicios por parte de Scala Ops estará sujeta, en cada caso, a evaluación previa, disponibilidad, definición de alcance, propuesta comercial, aceptación expresa y, en su caso, firma de acuerdos específicos.\n\nEl envío de formularios, mensajes o solicitudes a través del sitio no implica aceptación automática, obligación de contratar ni nacimiento inmediato de una relación contractual.`
  },
  {
    title: "9. Sin garantía de resultados",
    content: `Scala Ops no garantiza resultados específicos, ingresos determinados, mejoras exactas, incrementos concretos de ventas ni resultados uniformes para todos los casos. Cualquier referencia a procesos, mejoras, automatización, eficiencia, crecimiento, ventas o resultados responde a objetivos generales, experiencias previas, criterios técnicos o escenarios posibles, pero no debe interpretarse como una promesa infalible o garantía absoluta.\n\nLos resultados pueden variar según múltiples factores, incluyendo la situación previa del cliente, sus procesos internos, su equipo, su ejecución, su mercado, sus recursos, su nivel de adopción, su contexto y otros elementos fuera del control directo de Scala Ops.`
  },
  {
    title: "10. Limitación de responsabilidad",
    content: `En la máxima medida permitida por la legislación aplicable, Scala Ops no será responsable por daños directos o indirectos, pérdidas, lucro cesante, interrupciones, errores, omisiones, caídas del sistema, afectaciones comerciales, pérdida de datos, decisiones adoptadas por el usuario o cualquier otro perjuicio derivado del uso o imposibilidad de uso del sitio, de la confianza depositada en sus contenidos o de la interacción con herramientas, integraciones o plataformas de terceros.\n\nEl usuario reconoce que el uso del sitio se realiza bajo su exclusiva responsabilidad.`
  },
  {
    title: "11. Herramientas, integraciones y terceros",
    content: `El sitio puede integrar o vincular herramientas, formularios, servicios de mensajería, plataformas de analítica, publicidad, CRM, email marketing y otros servicios prestados por terceros. Scala Ops no controla de manera integral el funcionamiento, disponibilidad, seguridad o políticas de dichas herramientas externas, por lo que no asume responsabilidad por fallas, interrupciones, cambios o decisiones de terceros.`
  },
  {
    title: "12. Disponibilidad del sitio",
    content: `Scala Ops no garantiza que el sitio se encuentre disponible de manera permanente, continua, ininterrumpida o libre de errores. Podrán realizarse modificaciones, interrupciones, tareas de mantenimiento, actualizaciones o cambios sin previo aviso.`
  },
  {
    title: "13. Enlaces externos",
    content: `El sitio puede contener enlaces hacia sitios o servicios de terceros. Esos enlaces son provistos únicamente a efectos de referencia, información o conveniencia. Scala Ops no se responsabiliza por contenidos, políticas, servicios, prácticas, seguridad o condiciones de uso de esos entornos externos.`
  },
  {
    title: "14. Datos enviados por el usuario",
    content: `El usuario garantiza que la información que proporcione a través de formularios o canales de contacto será veraz, actual y suficiente. Scala Ops podrá utilizar esa información conforme a su Política de Privacidad y no será responsable por consecuencias derivadas de datos falsos, incompletos o inexactos enviados por el usuario.`
  },
  {
    title: "15. Comunicaciones",
    content: `El envío de datos mediante formularios, WhatsApp, correo electrónico u otros medios habilitados podrá dar lugar a comunicaciones de respuesta, seguimiento o contacto comercial por parte de Scala Ops, dentro del marco de la interacción iniciada y de la Política de Privacidad vigente.`
  },
  {
    title: "16. Modificaciones",
    content: `Scala Ops podrá modificar en cualquier momento estos Términos y Condiciones, así como cualquier aspecto del sitio, sus contenidos, funcionalidades, servicios descriptos o formas de contacto, sin necesidad de aviso previo. La versión vigente será la publicada al momento de la consulta.`
  },
  {
    title: "17. Legislación aplicable y jurisdicción",
    content: `Estos Términos y Condiciones se regirán e interpretarán conforme a las leyes de la República Argentina. Toda controversia vinculada con el uso del sitio, en la medida en que corresponda, será sometida a la jurisdicción de los tribunales competentes con asiento en la Ciudad Autónoma de Buenos Aires, salvo norma imperativa en contrario.`
  },
  {
    title: "18. Contacto",
    content: `Para cualquier consulta relacionada con estos Términos y Condiciones, el usuario podrá escribir a:\n\ninfo@scalaops.com\nCiudad Autónoma de Buenos Aires (CABA), Argentina`
  }
];

export const WebTerminos = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 1.02, 0.73, 1] } }
  };

  return (
    <div className="bg-[#000000] min-h-screen text-white overflow-hidden pb-10">

      {/* HERO */}
      <section className="relative pt-[140px] pb-16 md:pb-20 overflow-hidden border-b border-white/[0.04]">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none z-0 bg-[#6bdda1] blur-[150px] opacity-[0.06] rounded-full -translate-x-1/2 -translate-y-1/2" />

        <div className="container-custom relative z-10 max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-[12px] font-medium text-[#666] tracking-wide" style={{ fontFamily: 'var(--font-secondary)' }}>
              Última actualización: 17 de abril de 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Términos y Condiciones
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[17px] md:text-[19px] text-[#999] leading-[1.6] max-w-[640px]"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Estas condiciones regulan el uso del sitio web de Scala Ops y la interacción con la información y servicios allí presentados.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative py-16 md:py-24">
        <div className="container-custom relative z-10 max-w-[800px] mx-auto">
          <div className="flex flex-col gap-12 md:gap-16">
            {sections.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <h2 className="text-[20px] md:text-[24px] font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>
                  {s.title}
                </h2>

                <div className="w-10 h-[2px] mb-6" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />

                {s.content.split('\n\n').map((p, j) => (
                  <p key={j} className="text-[15px] md:text-[16px] text-[#aaa] leading-[1.75] mb-4" style={{ fontFamily: 'var(--font-secondary)' }}>
                    {p}
                  </p>
                ))}

                {s.list && (
                  <ul className="mt-3 mb-4 flex flex-col gap-2.5 pl-1">
                    {s.list.map((item, k) => (
                      <li key={k} className="flex items-start gap-3 text-[15px] text-[#aaa] leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6bdda1]/60 mt-[9px] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {s.content2 && s.content2.split('\n\n').map((p, j) => (
                  <p key={`c2-${j}`} className="text-[15px] md:text-[16px] text-[#aaa] leading-[1.75] mb-4 mt-3" style={{ fontFamily: 'var(--font-secondary)' }}>
                    {p}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="mt-20 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/web" className="text-[14px] text-[#666] hover:text-white transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
              ← Volver al inicio
            </Link>
            <Link to="/web/legales/privacidad" className="text-[14px] text-[#666] hover:text-[#6bdda1] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
              Ver Política de Privacidad →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
