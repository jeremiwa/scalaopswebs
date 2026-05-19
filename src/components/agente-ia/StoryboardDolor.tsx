const botItems = [
  'Menús rígidos',
  'Respuestas genéricas',
  'Se rompe con preguntas reales',
  'No entiende intención comercial',
  'No hace seguimiento serio',
  'Se siente robótico',
];

const sentinelItems = [
  'Conversa con lenguaje natural',
  'Usa información real de tu negocio',
  'Califica clientes',
  'Hace seguimiento',
  'Deriva cuando corresponde',
  'Trabaja dentro de tu proceso comercial',
];

export const NotABot = () => {
  return (
    <section className="relative" style={{ background: '#000000', padding: '130px 0' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px', right: '-100px', bottom: '-100px',
        zIndex: 0, pointerEvents: 'none', borderRadius: '80px',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(107,221,161,0.04) 0%, transparent 55%)',
        filter: 'blur(120px)', transform: 'translateZ(0)',
      }} />

      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 reveal">
          <span style={{ display: 'block', marginBottom: '14px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6bdda1' }}>
            La diferencia
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px' }}>
            No es un chatbot.<br />Es un empleado comercial de IA.
          </h2>
          <p style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.55, maxWidth: '520px', margin: '0 auto' }}>
            Un bot responde mensajes. Sentinel trabaja oportunidades.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[860px] reveal-stagger">

          {/* Bot Común */}
          <div className="reveal" style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '22px',
            padding: '32px 28px',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: '#5A5A6E', marginBottom: '20px', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              Bot común
            </div>
            <div className="flex flex-col gap-3">
              {botItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span style={{ marginTop: '5px', width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#EF4444', fontWeight: 700, flexShrink: 0 }}>✕</span>
                  <span style={{ fontSize: '15px', color: '#6B6B80', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sentinel */}
          <div className="reveal" style={{
            background: 'rgba(107,221,161,0.02)',
            border: '1px solid rgba(107,221,161,0.12)',
            borderRadius: '22px',
            padding: '32px 28px',
            boxShadow: '0 0 40px rgba(107,221,161,0.03)',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600,
              background: 'rgba(107,221,161,0.06)', border: '1px solid rgba(107,221,161,0.15)',
              color: '#6bdda1', marginBottom: '20px', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6bdda1' }} />
              Sentinel
            </div>
            <div className="flex flex-col gap-3">
              {sentinelItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span style={{ marginTop: '5px', width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(107,221,161,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#6bdda1', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing */}
        <p className="reveal max-w-[560px] text-center mt-12" style={{ fontSize: '15px', color: '#8B8B9E', lineHeight: 1.55, fontStyle: 'italic' }}>
          Sentinel no está pensado para contestar por contestar. Está pensado para evitar oportunidades perdidas.
        </p>
      </div>
    </section>
  );
};
