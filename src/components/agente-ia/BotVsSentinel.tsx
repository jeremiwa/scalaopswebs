import { X, Check } from 'lucide-react';

export const BotVsSentinel = () => {
  return (
    <section className="relative" style={{ background: '#030504', padding: '72px 0' }}>
      <div className="container-custom relative z-10 flex flex-col px-[24px] md:px-0 max-w-[600px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 reveal">
          <h2 style={{ 
            fontSize: 'clamp(28px, 7vw, 40px)', 
            fontWeight: 800, 
            color: '#F5F7FA', 
            letterSpacing: '-0.02em', 
            lineHeight: 1.1, 
            marginBottom: '14px' 
          }}>
            Un bot responde.<br />
            <span style={{ color: '#68E6A3' }}>Sentinel vende.</span>
          </h2>
          <p style={{ 
            fontSize: '17px', 
            color: '#9EA0B4', 
            lineHeight: 1.45,
            maxWidth: '42ch',
            margin: '0 auto'
          }}>
            No es un menú automático. Es un empleado IA entrenado con tu negocio.
          </p>
        </div>

        {/* Cards Stack */}
        <div className="flex flex-col gap-4 reveal-stagger">
          
          {/* Bot Común */}
          <div className="reveal flex flex-col p-6 rounded-[24px]" style={{
            background: '#050706',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '18px' }}>🤖</span>
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#7D8195',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '4px 10px',
                borderRadius: '100px'
              }}>
                Bot común
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                'Menús rígidos y opciones 1-2-3',
                'Respuestas genéricas armadas',
                'No entiende la intención de compra'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full" style={{ background: 'rgba(255,59,48,0.1)' }}>
                    <X className="w-3 h-3 text-[#FF453A]" />
                  </div>
                  <span style={{ fontSize: '16px', color: '#9EA0B4', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sentinel */}
          <div className="reveal flex flex-col p-6 rounded-[24px] relative overflow-hidden" style={{
            background: '#080C0B',
            border: '1px solid rgba(105,235,170,0.3)',
            boxShadow: '0 8px 32px rgba(105,235,170,0.08)'
          }}>
            {/* Glow */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#68E6A3] opacity-10 blur-[60px] pointer-events-none rounded-full" />
            
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#111815', border: '1px solid rgba(105,235,170,0.3)' }}>
                  <span style={{ fontSize: '18px' }}>⚡</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#68E6A3] border-2 border-[#080C0B]" />
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#68E6A3',
                textTransform: 'uppercase',
                border: '1px solid rgba(105,235,170,0.3)',
                background: 'rgba(105,235,170,0.05)',
                padding: '4px 10px',
                borderRadius: '100px'
              }}>
                Sentinel
              </div>
            </div>
            
            <div className="flex flex-col gap-3 relative z-10">
              {[
                'Conversa de forma natural y empática',
                'Sigue oportunidades automáticamente',
                'Cierra ventas, cobros o reuniones'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full" style={{ background: 'rgba(105,235,170,0.15)' }}>
                    <Check className="w-3.5 h-3.5 text-[#68E6A3]" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '16px', color: '#F5F7FA', fontWeight: 600 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
