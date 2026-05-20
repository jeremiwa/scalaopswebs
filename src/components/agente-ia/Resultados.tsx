const testimonials = [
  {
    badge: 'Menos equipo operativo',
    antes: '5 personas respondiendo mensajes',
    despues: '2 personas + Sentinel filtrando oportunidades',
    testimonio: 'Sentinel nos ordenó la primera atención. Dejamos de tener vendedores tapados de mensajes y empezamos a trabajar solo las oportunidades reales.'
  },
  {
    badge: 'Más seguimiento',
    antes: 'Consultas que quedaban sin respuesta',
    despues: 'Seguimiento automático 24/7',
    testimonio: 'Nos dimos cuenta de que no perdíamos clientes por falta de demanda, sino por falta de respuesta y seguimiento.'
  },
  {
    badge: 'Respuesta inmediata',
    antes: 'Mensajes fuera de horario sin atender',
    despues: 'Sentinel respondiendo incluso cuando el equipo no estaba',
    testimonio: 'Ahora el cliente recibe una respuesta inmediata y el equipo retoma conversaciones más ordenadas.'
  }
];

export const Resultados = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: '#030504', padding: '72px 0' }}>
      <div className="container-custom relative z-10 flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-10 px-[24px] md:px-0 max-w-[600px] mx-auto reveal">
          <h2 style={{ 
            fontSize: 'clamp(28px, 7vw, 40px)', 
            fontWeight: 800, 
            color: '#F5F7FA', 
            letterSpacing: '-0.02em', 
            lineHeight: 1.1, 
            marginBottom: '14px' 
          }}>
            Negocios que dejaron de depender del seguimiento manual.
          </h2>
          <p style={{ 
            fontSize: '17px', 
            color: '#9EA0B4', 
            lineHeight: 1.45,
            maxWidth: '42ch',
            margin: '0 auto'
          }}>
            Resultados reales de procesos comerciales ordenados con IA.
          </p>
        </div>

        {/* Carousel */}
        <div className="w-full relative reveal">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-6 pr-6 pb-8 gap-4" style={{ WebkitOverflowScrolling: 'touch' }}>
            {testimonials.map((t, i) => (
              <div 
                key={i}
                className="snap-center shrink-0 flex flex-col p-6 rounded-[24px]"
                style={{
                  width: '86vw',
                  maxWidth: '360px',
                  background: '#080C0B',
                  border: '1px solid rgba(105, 235, 170, 0.12)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignSelf: 'flex-start',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#68E6A3',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'rgba(105, 235, 170, 0.08)',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  marginBottom: '16px'
                }}>
                  {t.badge}
                </div>

                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex flex-col p-3 rounded-[12px]" style={{ background: 'rgba(255,59,48,0.03)', border: '1px solid rgba(255,59,48,0.08)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF453A', textTransform: 'uppercase', marginBottom: '2px' }}>Antes</span>
                    <span style={{ fontSize: '14px', color: '#9EA0B4', lineHeight: 1.3 }}>{t.antes}</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-[12px]" style={{ background: 'rgba(105,235,170,0.05)', border: '1px solid rgba(105,235,170,0.15)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#68E6A3', textTransform: 'uppercase', marginBottom: '2px' }}>Después</span>
                    <span style={{ fontSize: '14px', color: '#F5F7FA', lineHeight: 1.3 }}>{t.despues}</span>
                  </div>
                </div>

                <p style={{ fontSize: '16px', color: '#E2E8F0', lineHeight: 1.5, fontStyle: 'italic', fontWeight: 400 }}>
                  "{t.testimonio}"
                </p>
              </div>
            ))}
          </div>
          
          <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-[#030504] to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
};
