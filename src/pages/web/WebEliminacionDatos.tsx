import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sections: Array<{ title: string; content: string; list?: string[]; content2?: string; list2?: string[] }> = [
  {
    title: "1. Quién puede pedirlo",
    content: `Cualquier persona puede pedir que Scala Ops elimine sus datos personales: quienes visitaron este sitio o completaron un formulario, y quienes conversaron por WhatsApp con una empresa que usa Sentinel, el asistente de atención que Scala Ops presta a empresas.`
  },
  {
    title: "2. Cómo pedirlo",
    content: `Escribí a info@scalaops.com con el asunto "Eliminación de datos" e incluí:`,
    list: [
      "El número de teléfono (con código de país) o el correo electrónico con el que te contactaste",
      "Si fue por WhatsApp, el nombre de la empresa con la que hablaste",
      "Si querés que se elimine todo o sólo una parte (por ejemplo, una conversación)"
    ],
    content2: `Si conversaste con una empresa que usa Sentinel, también podés pedírselo directamente a esa empresa: ella es la responsable de tus datos y Scala Ops los elimina por su instrucción.`
  },
  {
    title: "3. Empresas que usan Sentinel",
    content: `Una empresa que conectó su cuenta de WhatsApp Business a Sentinel puede desconectarla en cualquier momento desde Meta Business Suite (Configuración → Integraciones → Apps conectadas) o, si usa la app WhatsApp Business en el celular, desde Configuración → Cuenta → Business Platform. Para que además se eliminen las conversaciones y los datos de sus contactos guardados en Sentinel, la empresa debe pedirlo a info@scalaops.com desde el correo registrado como titular de la cuenta.`
  },
  {
    title: "4. Qué pasa después",
    content: `Confirmamos la recepción del pedido por el mismo medio y lo resolvemos dentro de los 30 días. Se eliminan los mensajes, notas de voz, imágenes, documentos y datos de contacto asociados, salvo los que una norma obligue a conservar, que se mantienen bloqueados y sólo por el plazo exigido. Al terminar te avisamos.`
  },
  {
    title: "5. Más información",
    content: `El detalle de qué datos tratamos y para qué está en la Política de Privacidad. Responsable: Scala Ops es el nombre comercial de Franco Villa (VILLA, FRANCO), Pinamar, Provincia de Buenos Aires, Argentina. Contacto: info@scalaops.com.`
  }
];

export const WebEliminacionDatos = () => {
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
              Última actualización: 15 de noviembre de 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Eliminación de datos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[17px] md:text-[19px] text-[#999] leading-[1.6] max-w-[640px]"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Cómo pedir que eliminemos tus datos, incluidos los de conversaciones de WhatsApp atendidas por Sentinel.
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
            <Link to="/" className="text-[14px] text-[#666] hover:text-white transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
              ← Volver al inicio
            </Link>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/legales/privacidad" className="text-[14px] text-[#666] hover:text-[#6bdda1] transition-colors font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
                Ver Política de Privacidad →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
