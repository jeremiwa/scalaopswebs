import { Check, X } from 'lucide-react';

export const ForWho = () => {
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
            Sentinel no es para cualquier negocio.
          </h2>
        </div>

        <div className="flex flex-col gap-4 reveal-stagger">
          
          {/* Positiva */}
          <div className="reveal flex flex-col p-6 rounded-[24px]" style={{
            background: '#080C0B',
            border: '1px solid rgba(105, 235, 170, 0.3)',
            boxShadow: '0 8px 32px rgba(105, 235, 170, 0.08)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#F5F7FA', marginBottom: '20px', letterSpacing: '-0.01em' }}>
              Es para vos si...
            </h3>
            <div className="flex flex-col gap-4">
              {[
                'Recibís consultas todos los días',
                'Tu equipo tarda en responder',
                'Querés vender más sin sumar estructura',
                'Necesitás seguimiento automático'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(105,235,170,0.15)' }}>
                    <Check className="w-4 h-4 text-[#68E6A3]" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '18px', color: '#F5F7FA', fontWeight: 500, lineHeight: 1.3 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Negativa */}
          <div className="reveal flex flex-col p-6 rounded-[24px]" style={{
            background: '#050706',
            border: '1px solid rgba(255,255,255,0.06)',
            opacity: 0.8
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#7D8195', marginBottom: '20px', letterSpacing: '-0.01em' }}>
              No es para vos si...
            </h3>
            <div className="flex flex-col gap-4">
              {[
                'Casi no recibís consultas',
                'Buscás solamente un bot barato',
                'No tenés una oferta clara',
                'No querés ordenar tu proceso comercial'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <X className="w-4 h-4 text-[#7D8195]" strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: '18px', color: '#9EA0B4', fontWeight: 500, lineHeight: 1.3 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
