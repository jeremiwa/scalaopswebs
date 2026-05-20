import { X, Check } from 'lucide-react';

export const HumanoVsSentinel = () => {
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
            Antes de contratar a alguien más, automatizá lo repetitivo.
          </h2>
          <p style={{ 
            fontSize: '17px', 
            color: '#9EA0B4', 
            lineHeight: 1.45,
            maxWidth: '42ch',
            margin: '0 auto'
          }}>
            Sentinel cubre la primera atención, el filtro y el seguimiento sin sumar estructura fija.
          </p>
        </div>

        {/* Cards Stack */}
        <div className="flex flex-col gap-4 mb-8 reveal-stagger">
          
          {/* Empleado */}
          <div className="reveal flex flex-col p-6 rounded-[24px]" style={{
            background: '#050706',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '18px' }}>👤</span>
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
                Empleado adicional
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                'Tiene horarios',
                'Se olvida seguimientos',
                'Se satura con mensajes',
                'Puede faltar o rotar',
                'Requiere capacitación constante'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 opacity-60">
                  <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <X className="w-3 h-3 text-[#7D8195]" />
                  </div>
                  <span style={{ fontSize: '16px', color: '#9EA0B4', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sentinel */}
          <div className="reveal flex flex-col p-6 rounded-[24px] relative overflow-hidden" style={{
            background: '#080C0B',
            border: '1px solid rgba(36,107,254,0.3)',
            boxShadow: '0 8px 32px rgba(36,107,254,0.08)'
          }}>
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#246BFE] opacity-15 blur-[60px] pointer-events-none rounded-full" />
            
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#111815', border: '1px solid rgba(36,107,254,0.3)' }}>
                <div className="w-3 h-3 rounded-full bg-[#246BFE] animate-pulse" />
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#246BFE',
                textTransform: 'uppercase',
                border: '1px solid rgba(36,107,254,0.3)',
                background: 'rgba(36,107,254,0.05)',
                padding: '4px 10px',
                borderRadius: '100px'
              }}>
                Sentinel
              </div>
            </div>
            
            <div className="flex flex-col gap-3 relative z-10">
              {[
                'Trabaja 24/7',
                'Sigue automáticamente',
                'Atiende múltiples chats a la vez',
                'Se entrena con tu negocio',
                'Está siempre operativo'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full" style={{ background: 'rgba(36,107,254,0.15)' }}>
                    <Check className="w-3.5 h-3.5 text-[#246BFE]" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '16px', color: '#F5F7FA', fontWeight: 600 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phrase */}
        <div className="reveal flex justify-center mt-4">
          <div style={{
            background: 'rgba(105, 235, 170, 0.06)',
            border: '1px solid rgba(105, 235, 170, 0.22)',
            borderRadius: '16px',
            padding: '16px 24px',
            textAlign: 'center',
            width: '100%'
          }}>
            <p style={{ fontSize: '18px', fontWeight: 600, margin: 0, lineHeight: 1.35 }}>
              <span className="text-white">Humanos para cerrar.<br/></span>
              <span style={{ color: '#68E6A3' }}>Sentinel para que ninguna oportunidad quede tirada.</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
