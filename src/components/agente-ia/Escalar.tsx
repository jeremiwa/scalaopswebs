import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

const CTA_URL = '/formulario';

const trackEvent = (location: string) => {
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({ event: 'sentinel_cta_clicked', location, page: 'agente-ia', offer: 'sentinel_997' });
  }
};

const includes = [
  'Diagnóstico inicial',
  'Configuración del Empleado IA',
  'Entrenamiento con información de tu negocio',
  'Tono personalizado',
  'Flujo de calificación',
  'Seguimiento inicial',
  'Derivación al equipo',
  'Pruebas y ajustes',
  'Puesta en marcha',
];

const bonuses = [
  'Mapa de fugas comerciales',
  'Guion comercial base',
  'Flujo de seguimiento',
  'Ajuste de tono para que no suene robótico',
];

export const Pricing = () => {
  return (
    <section id="sentinel-pricing" className="relative" style={{ background: '#000000', padding: '80px 0' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '-120px', left: '-120px', right: '-120px', bottom: '-120px',
        zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(107,221,161,0.05) 0%, rgba(24,93,232,0.02) 40%, transparent 65%)',
        filter: 'blur(120px)', transform: 'translateZ(0)',
      }} />

      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 reveal">
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Implementá tu Empleado IA comercial por precio lanzamiento.
          </h2>
        </div>

        {/* Pricing Card */}
        <div className="w-full max-w-[560px] reveal" style={{
          padding: '1px', borderRadius: '24px',
          background: 'linear-gradient(145deg, rgba(107,221,161,0.20) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.03) 60%, rgba(107,221,161,0.15) 100%)',
        }}>
          <div style={{
            background: '#050505', borderRadius: '23px', padding: '48px 36px',
            backgroundImage: 'radial-gradient(ellipse at 30% 0%, rgba(107,221,161,0.04) 0%, transparent 45%)',
          }}>

            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600,
                background: 'rgba(107,221,161,0.06)', border: '1px solid rgba(107,221,161,0.15)',
                color: '#6bdda1', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6bdda1' }} />
                Precio lanzamiento
              </span>
            </div>

            {/* Price */}
            <div className="text-center mb-2">
              <span style={{ fontSize: 'clamp(48px, 10vw, 64px)', fontWeight: 800, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1 }}>
                USD 997
              </span>
            </div>
            <p className="text-center mb-8" style={{ fontSize: '16px', color: '#8B8B9E' }}>
              Implementación personalizada de Sentinel para tu negocio.
            </p>

            {/* Value text */}
            <p className="text-center mb-8" style={{
              fontSize: '15px', color: 'rgba(203,213,225,0.68)', lineHeight: 1.6,
              maxWidth: '440px', margin: '0 auto 32px',
              padding: '16px 20px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
            }}>
              Contratar una persona para responder, filtrar y seguir clientes todos los meses cuesta mucho más. Sentinel trabaja 24/7 y ayuda a que ninguna oportunidad quede olvidada.
            </p>

            {/* Includes */}
            <div className="mb-6">
              <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5A5A6E', marginBottom: '12px' }}>
                Qué incluye
              </p>
              <div className="flex flex-col gap-2.5">
                {includes.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span style={{ color: '#6bdda1', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', margin: '24px 0' }} />

            {/* Bonuses */}
            <div className="mb-8">
              <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6bdda1', marginBottom: '12px' }}>
                Bonos incluidos
              </p>
              <div className="flex flex-col gap-2.5">
                {bonuses.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span style={{ color: '#6bdda1', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>+</span>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              to={CTA_URL} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
              onClick={() => trackEvent('pricing')}
            >
              <Button variant="primary" className="w-full text-base py-4">
                Quiero mi Empleado IA por USD 997
              </Button>
            </Link>

            {/* Microcopy */}
            <p className="text-center mt-4" style={{ fontSize: '12px', color: '#5A5A6E', lineHeight: 1.5 }}>
              Precio lanzamiento · Implementación personalizada · Cupos sujetos a disponibilidad
            </p>
          </div>
        </div>

        {/* Transparency note */}
        <p className="text-center mt-6 reveal" style={{ fontSize: '13px', color: '#5A5A6E', maxWidth: '480px', lineHeight: 1.5 }}>
          Costos de mantenimiento, herramientas externas o plataformas, si aplican, se informan antes de avanzar.
        </p>
      </div>
    </section>
  );
};
