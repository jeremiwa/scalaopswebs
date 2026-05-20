export const BloqueEquipo = () => {
  return (
    <section className="relative" style={{ background: '#030504', padding: '40px 0 72px' }}>
      <div className="container-custom relative z-10 flex flex-col px-[24px] md:px-0 max-w-[600px] mx-auto">
        
        <div className="reveal flex flex-col p-6 rounded-[24px] text-center" style={{
          background: '#080C0B',
          border: '1px solid rgba(105,235,170,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(24px, 6vw, 32px)', 
            fontWeight: 800, 
            color: '#F5F7FA', 
            letterSpacing: '-0.02em', 
            lineHeight: 1.1, 
            marginBottom: '12px' 
          }}>
            No reemplaza a tu equipo.<br/>Le saca trabajo repetitivo.
          </h2>
          
          <p style={{ 
            fontSize: '15px', 
            color: '#9EA0B4', 
            lineHeight: 1.45,
            marginBottom: '24px'
          }}>
            Sentinel responde, filtra y sigue. Tu equipo se enfoca en cerrar, negociar y atender los casos importantes.
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center p-4 rounded-[16px]" style={{ background: 'rgba(105,235,170,0.06)', border: '1px solid rgba(105,235,170,0.15)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#68E6A3', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                Sentinel
              </span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#F5F7FA' }}>
                responde · filtra · sigue
              </span>
            </div>

            <div className="flex flex-col items-center p-4 rounded-[16px]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#7D8195', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                Equipo
              </span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#F5F7FA' }}>
                cierra · negocia · asesora
              </span>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
};
