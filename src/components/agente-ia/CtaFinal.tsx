import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

export const CtaFinal = () => {
  return (
    <section id="sentinel-cta-final" className="relative" style={{ background: '#030504', padding: '96px 0', overflow: 'hidden' }}>
      
      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 bg-[#246BFE] blur-[150px] opacity-10 rounded-full" />
      <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] pointer-events-none z-0 bg-[#68E6A3] blur-[120px] opacity-15 rounded-full" />

      <div className="container-custom relative z-10 flex flex-col items-center px-[24px] md:px-0 max-w-[600px] mx-auto text-center reveal">
        
        <h2 style={{ 
          fontSize: 'clamp(32px, 8vw, 48px)', 
          fontWeight: 800, 
          color: '#F5F7FA', 
          letterSpacing: '-0.03em', 
          lineHeight: 1.05, 
          marginBottom: '20px' 
        }}>
          Dejá de perder clientes por mensajes que nadie siguió.
        </h2>
        
        <p style={{ 
          fontSize: '18px', 
          color: '#9EA0B4', 
          lineHeight: 1.45,
          maxWidth: '42ch',
          margin: '0 auto 40px'
        }}>
          Sentinel atiende, filtra y vende 24/7 para que tu equipo llegue a las oportunidades correctas.
        </p>

        <Link
          to={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '380px',
            height: '60px',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #246BFE 0%, #68E6A3 100%)',
            fontFamily: 'var(--font-primary), Inter, sans-serif',
            fontWeight: 800,
            fontSize: '16px',
            color: '#030504',
            textDecoration: 'none',
            boxShadow: '0 4px 32px rgba(105,235,170,0.25)',
            letterSpacing: '-0.01em',
            marginBottom: '16px',
          }}
        >
          Implementar Sentinel · USD 997
        </Link>
        
        <p style={{ fontSize: '13px', color: '#7D8195', fontWeight: 600 }}>
          Precio lanzamiento · Implementación personalizada · Cupos limitados
        </p>

      </div>
    </section>
  );
};
