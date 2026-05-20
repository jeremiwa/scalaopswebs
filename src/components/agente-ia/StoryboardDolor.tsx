import { MessageSquare, Timer, BellOff, Users, Moon } from 'lucide-react';

const painPoints = [
  {
    title: 'Mensaje sin responder',
    desc: 'El cliente consulta y nadie llega.',
    icon: MessageSquare,
  },
  {
    title: 'Respuesta lenta',
    desc: 'Cuando contestás, ya compró en otro lado.',
    icon: Timer,
  },
  {
    title: 'Seguimiento olvidado',
    desc: 'Pidió precio y nadie volvió a escribirle.',
    icon: BellOff,
  },
  {
    title: 'Equipo saturado',
    desc: 'Tus vendedores hacen lo que pueden.',
    icon: Users,
  },
  {
    title: 'Fuera de horario',
    desc: 'De noche también entran oportunidades.',
    icon: Moon,
  },
];

export const NotABot = () => {
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
            Estás pagando consultas que después se pierden.
          </h2>
          <p style={{ 
            fontSize: '17px', 
            color: '#9EA0B4', 
            lineHeight: 1.45,
            maxWidth: '42ch',
            margin: '0 auto'
          }}>
            Cada mensaje sin respuesta, cada cliente esperando y cada seguimiento olvidado puede ser una venta menos.
          </p>
        </div>

        {/* Cards - 1 column layout */}
        <div className="flex flex-col gap-3 mb-10 reveal-stagger">
          {painPoints.map((point) => (
            <div 
              key={point.title}
              className="reveal flex items-center p-4 rounded-[24px]"
              style={{
                background: '#080C0B',
                border: '1px solid rgba(105, 235, 170, 0.16)',
                minHeight: '118px',
              }}
            >
              <div 
                className="flex items-center justify-center shrink-0 mr-4 rounded-full"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(105, 235, 170, 0.08)',
                }}
              >
                <point.icon className="w-6 h-6 text-[#68E6A3]" />
              </div>
              <div className="flex flex-col">
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#F5F7FA', marginBottom: '2px', letterSpacing: '-0.01em' }}>
                  {point.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#9EA0B4', lineHeight: 1.35 }}>
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Capsule Summary */}
        <div className="reveal flex justify-center">
          <div 
            style={{
              background: 'rgba(105, 235, 170, 0.06)',
              border: '1px solid rgba(105, 235, 170, 0.22)',
              borderRadius: '100px',
              padding: '12px 20px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#F5F7FA', margin: 0 }}>
              Sentinel cubre ese primer contacto <span style={{ color: '#68E6A3' }}>antes de que el cliente se enfríe.</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
