import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: "1. Introducción",
    content: `En Scala Ops valoramos la privacidad de las personas que visitan nuestro sitio web y se contactan con nosotros. Esta Política de Privacidad describe de qué manera recopilamos, utilizamos, almacenamos y protegemos la información que los usuarios nos proporcionan a través de nuestro sitio web, formularios, canales de contacto y herramientas vinculadas.\n\nEl uso del sitio web de Scala Ops implica la lectura y aceptación de esta Política de Privacidad. Si una persona no estuviera de acuerdo con alguna de sus disposiciones, deberá abstenerse de utilizar el sitio y de proporcionar datos personales por medio del mismo.`
  },
  {
    title: "2. Alcance",
    content: `Esta política aplica al uso del sitio web de Scala Ops, a los formularios de contacto, a los medios de comunicación integrados en el sitio —incluyendo WhatsApp— y a las herramientas que puedan utilizarse para gestionar consultas, seguimiento comercial, automatización y comunicaciones informativas o comerciales.`
  },
  {
    title: "3. Información que recopilamos",
    content: `Scala Ops puede recopilar información personal y comercial proporcionada voluntariamente por el usuario, incluyendo, entre otros, los siguientes datos:`,
    list: [
      "Nombre y apellido",
      "Dirección de correo electrónico",
      "Número de teléfono",
      "Nombre de empresa",
      "Cargo o rol dentro de la empresa",
      "Facturación estimada mensual",
      "Cualquier otra información que el usuario decida incluir en formularios, mensajes o consultas"
    ],
    content2: `Asimismo, el sitio puede recopilar información técnica y de navegación, tales como:`,
    list2: [
      "Dirección IP",
      "Tipo de dispositivo",
      "Navegador utilizado",
      "Páginas visitadas",
      "Duración de la visita",
      "Interacción con el sitio",
      "Origen del tráfico",
      "Eventos asociados a formularios o acciones dentro del sitio"
    ]
  },
  {
    title: "4. Cómo recopilamos la información",
    content: `La información puede ser recopilada por Scala Ops a través de:`,
    list: [
      "Formularios completados por el usuario",
      "Mensajes enviados por WhatsApp",
      "Interacciones directas por correo electrónico",
      "Herramientas de analítica, seguimiento y medición",
      "Cookies y tecnologías similares",
      "Integraciones con CRM, automatizaciones y sistemas de marketing"
    ]
  },
  {
    title: "5. Finalidad del tratamiento de la información",
    content: `La información recopilada podrá ser utilizada por Scala Ops para:`,
    list: [
      "Responder consultas y solicitudes",
      "Contactar a potenciales clientes",
      "Evaluar necesidades comerciales u operativas",
      "Brindar información sobre servicios, soluciones o propuestas",
      "Realizar seguimiento comercial",
      "Automatizar comunicaciones y procesos internos",
      "Mejorar la experiencia de navegación",
      "Medir rendimiento del sitio y campañas",
      "Analizar comportamiento agregado de usuarios",
      "Optimizar contenidos, formularios y procesos comerciales",
      "Enviar comunicaciones informativas, comerciales o promocionales, siempre dentro del marco aplicable"
    ]
  },
  {
    title: "6. Base de uso y consentimiento",
    content: `Al completar un formulario, escribir por WhatsApp, enviar un correo o interactuar con el sitio, el usuario consiente el tratamiento de sus datos conforme a esta Política de Privacidad. Ese consentimiento podrá ser utilizado como base para responder su consulta, mantener comunicaciones relacionadas con los servicios de Scala Ops y gestionar acciones comerciales o informativas razonablemente vinculadas.`
  },
  {
    title: "7. Cookies y tecnologías de seguimiento",
    content: `El sitio de Scala Ops puede utilizar cookies, píxeles y tecnologías similares con fines técnicos, analíticos, funcionales y comerciales. Estas herramientas permiten, entre otras cosas:`,
    list: [
      "Recordar preferencias del usuario",
      "Comprender cómo se utiliza el sitio",
      "Medir campañas publicitarias",
      "Optimizar conversiones",
      "Realizar seguimiento de interacciones y eventos"
    ],
    content2: `Entre las herramientas que pueden utilizarse se incluyen Meta Pixel, cookies del navegador, formularios integrados, CRM y soluciones de email marketing. El usuario puede configurar su navegador para rechazar o limitar el uso de cookies, aunque ello podría afectar ciertas funcionalidades del sitio.`
  },
  {
    title: "8. Herramientas de terceros",
    content: `Scala Ops puede utilizar servicios de terceros para gestionar formularios, análisis, CRM, automatizaciones, comunicaciones por email, mensajería, marketing y medición publicitaria. En la medida en que dichas herramientas intervengan en el tratamiento de datos, el usuario reconoce que parte de la información podría ser procesada por esos proveedores según sus propios términos y políticas.\n\nScala Ops procura utilizar herramientas razonablemente adecuadas para la actividad desarrollada, pero no asume responsabilidad por políticas, prácticas o decisiones propias de terceros ajenos a su control directo.`
  },
  {
    title: "9. Conservación de la información",
    content: `Los datos podrán conservarse durante el tiempo que resulte razonablemente necesario para cumplir con las finalidades para las que fueron recopilados, incluyendo contacto comercial, seguimiento de consultas, organización interna, cumplimiento de obligaciones y resguardo de antecedentes de interacción.\n\nScala Ops podrá eliminar, anonimizar o depurar información cuando considere que ya no resulta necesaria para los fines perseguidos o cuando corresponda hacerlo.`
  },
  {
    title: "10. Protección de la información",
    content: `Scala Ops adopta medidas razonables de organización, gestión y seguridad orientadas a proteger la información contra accesos no autorizados, pérdida, alteración o divulgación indebida. Sin perjuicio de ello, ningún sistema de transmisión o almacenamiento de datos puede garantizar una seguridad absoluta.\n\nEn consecuencia, Scala Ops no garantiza que el sitio, las bases de datos o los sistemas utilizados sean totalmente invulnerables, aunque procura aplicar criterios razonables de protección de la información.`
  },
  {
    title: "11. Compartición de datos",
    content: `Scala Ops no vende datos personales a terceros. Sin embargo, podrá compartir información con proveedores, plataformas o herramientas que intervengan en tareas vinculadas con:`,
    list: [
      "Analítica",
      "Publicidad",
      "Automatización",
      "CRM",
      "Email marketing",
      "Soporte técnico",
      "Hosting",
      "Comunicaciones"
    ],
    content2: `Dicha compartición se limita, en principio, a lo necesario para operar el sitio, gestionar consultas y desarrollar actividades razonablemente vinculadas a la prestación o promoción de los servicios.`
  },
  {
    title: "12. Derechos del usuario",
    content: `El usuario podrá solicitar, cuando corresponda y conforme a la normativa aplicable, el acceso, actualización o rectificación de sus datos personales, así como realizar consultas sobre el tratamiento de su información.\n\nPara ello podrá escribir a: info@scalaops.com\n\nScala Ops hará esfuerzos razonables para atender solicitudes legítimas dentro de un plazo razonable, sin perjuicio de las limitaciones técnicas, operativas o legales que pudieran existir.`
  },
  {
    title: "13. Comunicaciones comerciales",
    content: `Al proporcionar sus datos mediante formularios o canales de contacto, el usuario acepta que Scala Ops pueda enviar comunicaciones vinculadas a sus servicios, contenidos, novedades o propuestas comerciales, siempre que exista una relación razonable con la interacción iniciada por el usuario o con el interés manifestado.\n\nEl usuario podrá solicitar dejar de recibir dichas comunicaciones escribiendo a info@scalaops.com.`
  },
  {
    title: "14. Menores de edad",
    content: `El sitio y los servicios descriptos por Scala Ops no están dirigidos específicamente a menores de edad. Si un menor proporciona información sin la debida intervención de sus representantes legales, dicha situación deberá ser informada para que Scala Ops evalúe su eventual eliminación.`
  },
  {
    title: "15. Enlaces externos",
    content: `El sitio puede incluir enlaces a sitios, servicios o plataformas de terceros. Scala Ops no controla ni garantiza las políticas de privacidad, prácticas o contenidos de dichos entornos externos, por lo que recomienda a cada usuario revisar sus términos y políticas de manera independiente.`
  },
  {
    title: "16. Cambios en esta política",
    content: `Scala Ops podrá modificar esta Política de Privacidad en cualquier momento, especialmente ante cambios en el sitio, en las herramientas utilizadas, en la forma de prestar servicios o en la normativa aplicable. La versión vigente será la publicada en el sitio al momento de la consulta.`
  },
  {
    title: "17. Contacto",
    content: `Para consultas relacionadas con esta Política de Privacidad o con el uso de datos, el usuario puede contactarse a:\n\ninfo@scalaops.com\nCiudad Autónoma de Buenos Aires (CABA), Argentina`
  }
];

export const WebPrivacidad = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 1.02, 0.73, 1] } }
  };

  return (
    <div className="bg-[#000000] min-h-screen text-white overflow-hidden pb-10">

      {/* HERO */}
      <section className="relative pt-[140px] pb-16 md:pb-20 overflow-hidden border-b border-white/[0.04]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none z-0 bg-[#185de8] blur-[150px] opacity-[0.08] rounded-full translate-x-1/2 -translate-y-1/2" />

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
            Política de Privacidad
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[17px] md:text-[19px] text-[#999] leading-[1.6] max-w-[640px]"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Conocé cómo recopilamos, utilizamos y protegemos la información de quienes interactúan con Scala Ops.
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

                {s.list2 && (
                  <ul className="mt-3 mb-4 flex flex-col gap-2.5 pl-1">
                    {s.list2.map((item, k) => (
                      <li key={k} className="flex items-start gap-3 text-[15px] text-[#aaa] leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#185de8]/60 mt-[9px] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="mt-20 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/web" className="text-[14px] text-[#666] hover:text-white transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
              ← Volver al inicio
            </Link>
            <Link to="/web/legales/terminos" className="text-[14px] text-[#666] hover:text-[#6bdda1] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
              Ver Términos y Condiciones →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
