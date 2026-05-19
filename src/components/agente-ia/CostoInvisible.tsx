const forYou = [
  'Recibís consultas todos los días por WhatsApp o Instagram.',
  'Tu equipo tarda en responder.',
  'Sentís que se pierden oportunidades.',
  'Tenés vendedores saturados.',
  'Querés automatizar sin perder trato humano.',
  'Querés ordenar el primer contacto comercial.',
];

const notForYou = [
  'Casi no recibís consultas.',
  'No tenés una oferta clara.',
  'Buscás solamente un bot barato.',
  'No querés ordenar tu proceso comercial.',
  'Esperás magia sin entregar información de tu negocio.',
];

export const ForWho = () => {
  return (
    <section className="relative" style={{ background: '#000000', padding: '130px 0' }}>
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px', right: '-100px', bottom: '-100px',
        zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 40% 50%, rgba(107,221,161,0.03) 0%, transparent 55%)',
        filter: 'blur(120px)', transform: 'translateZ(0)',
      }} />
      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 reveal">
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px' }}>
            Sentinel no es para cualquier negocio.
          </h2>
          <p style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.55, maxWidth: '560px', margin: '0 auto' }}>
            Funciona mejor cuando ya tenés consultas entrando y querés dejar de perder oportunidades por falta de respuesta, seguimiento u orden.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[860px] reveal-stagger">

          {/* For You */}
          <div className="reveal" style={{
            background: 'rgba(107,221,161,0.02)',
            border: '1px solid rgba(107,221,161,0.12)',
            borderRadius: '22px', padding: '32px 28px',
            boxShadow: '0 0 30px rgba(107,221,161,0.03)',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#F5F5F7', marginBottom: '20px' }}>
              Sentinel es para vos si…
            </h3>
            <div className="flex flex-col gap-3">
              {forYou.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span style={{ marginTop: '4px', width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(107,221,161,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#6bdda1', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Not For You */}
          <div className="reveal" style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '22px', padding: '32px 28px',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#F5F5F7', marginBottom: '20px' }}>
              No es para vos si…
            </h3>
            <div className="flex flex-col gap-3">
              {notForYou.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span style={{ marginTop: '4px', width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#5A5A6E', fontWeight: 700, flexShrink: 0 }}>✕</span>
                  <span style={{ fontSize: '15px', color: '#6B6B80', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
