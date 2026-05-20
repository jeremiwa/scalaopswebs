import { Check, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

export const Pricing = () => {
  return (
    <section id="sentinel-pricing" className="relative" style={{ background: '#030504', padding: '72px 0' }}>
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
            Implementá tu Empleado IA por precio lanzamiento.
          </h2>
        </div>

        {/* Pricing Card */}
        <div className="reveal flex flex-col p-6 rounded-[32px] relative" style={{
          background: '#080C0B',
          border: '1px solid rgba(105, 235, 170, 0.3)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          {/* Glow */}
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#68E6A3] opacity-10 blur-[80px] pointer-events-none rounded-full" />
          
          <div className="flex flex-col items-center text-center relative z-10 border-b border-white/[0.06] pb-8 mb-8">
            <div style={{
              display: 'inline-flex',
              fontSize: '11px',
              fontWeight: 800,
              color: '#030504',
              background: '#68E6A3',
              padding: '6px 14px',
              borderRadius: '100px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              PRECIO LANZAMIENTO
            </div>
            
            <div style={{ fontSize: '64px', fontWeight: 800, color: '#F5F7FA', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '12px' }}>
              USD 997
            </div>
            
            <p style={{ fontSize: '16px', color: '#9EA0B4', maxWidth: '32ch', margin: '0 auto', lineHeight: 1.4 }}>
              Implementación personalizada de Sentinel para tu negocio.
            </p>
          </div>

          <div className="flex justify-center mb-8 relative z-10">
            <p style={{ fontSize: '15px', color: '#F5F7FA', fontWeight: 500, textAlign: 'center', lineHeight: 1.45, background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px' }}>
              Menos que sumar estructura comercial. Más rápido que contratar y capacitar a alguien desde cero.
            </p>
          </div>

          {/* Incluye */}
          <div className="flex flex-col gap-3.5 mb-8 relative z-10">
            {[
              'Diagnóstico inicial comercial',
              'Configuración técnica del Empleado IA',
              'Entrenamiento con la información de tu negocio',
              'Diseño del flujo de venta y seguimiento',
              'Pruebas y puesta en marcha en WhatsApp/IG'
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="shrink-0 flex items-center justify-center w-[22px] h-[22px] rounded-full mt-0.5" style={{ background: 'rgba(105,235,170,0.15)' }}>
                  <Check className="w-3.5 h-3.5 text-[#68E6A3]" strokeWidth={3} />
                </div>
                <span style={{ fontSize: '16px', color: '#E2E8F0', fontWeight: 500, lineHeight: 1.3 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Bonos */}
          <div className="flex flex-col p-5 rounded-[20px] mb-8 relative z-10" style={{ background: '#050706', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#F5F7FA', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Bonos incluidos
            </h4>
            <div className="flex flex-col gap-3">
              {[
                'Mapa de oportunidades perdidas actuales',
                'Guion comercial base optimizado',
                'Ajuste de tono para que no suene robótico'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <Plus className="w-4 h-4 text-[#68E6A3]" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: '15px', color: '#9EA0B4', fontWeight: 500, lineHeight: 1.3 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center relative z-10">
            <Link
              to={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '60px',
                borderRadius: '999px',
                background: 'linear-gradient(90deg, #246BFE 0%, #68E6A3 100%)',
                fontFamily: 'var(--font-primary), Inter, sans-serif',
                fontWeight: 800,
                fontSize: '16px',
                color: '#030504',
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(105,235,170,0.2)',
                letterSpacing: '-0.01em',
                marginBottom: '16px',
              }}
            >
              Reservar implementación por USD 997
            </Link>
            <p style={{ fontSize: '12px', color: '#7D8195', textAlign: 'center', maxWidth: '40ch', lineHeight: 1.4 }}>
              Costos externos de herramientas o mantenimiento, si aplican a tu caso, se informan transparente antes de avanzar.
            </p>
          </div>
        </div>

        {/* Proceso */}
        <div className="reveal flex flex-col items-center mt-10">
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#7D8195', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
            El proceso es simple
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Diagnóstico', 'Entrenamiento', 'Pruebas', 'Activación'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#F5F7FA' }}>{step}</span>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-[#68E6A3]" opacity={0.5} />}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
