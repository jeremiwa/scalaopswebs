import { Play } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative" style={{ background: '#0A0A0F', paddingTop: '120px', paddingBottom: '32px' }}>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%) translateZ(0)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(34, 197, 94, 0.06) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0, pointerEvents: 'none'
      }}></div>

      <div className="container-custom relative z-10 flex flex-col items-center text-center">

        {/* H1 */}
        <div className="max-w-[900px] mx-auto px-4 md:px-0">
          <h1 className="text-[32px] md:text-[48px] lg:text-[52px] font-[800] leading-[1.05] tracking-[-0.03em]" style={{ marginBottom: '12px' }}>
            <span className="text-white">Si sentís que podrías estar facturando mucho más...</span>
            <br />
            <span style={{ fontSize: '0.88em', fontWeight: 600, color: 'rgba(255,255,255,0.76)' }}>Probablemente tengas razón.</span>
          </h1>

          {/* Sub-copy */}
          <p style={{ fontSize: '17px', color: '#A0A0B5', opacity: 0.84, lineHeight: 1.5, maxWidth: '64ch', margin: '0 auto', marginBottom: '28px' }}>
            Multiplicá hasta 21 veces tus oportunidades de venta sin gastar un dólar más.
          </p>
        </div>

        {/* Video (Hero Card) */}
        <div className="relative w-full" style={{ maxWidth: '680px' }}>
          <div style={{ position: 'absolute', top: '-180px', left: '-180px', right: '-180px', bottom: '-180px', zIndex: 0, pointerEvents: 'none', borderRadius: '100px', background: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.015) 0%, rgba(99,102,241,0.012) 40%, transparent 70%)', filter: 'blur(160px)', transform: 'translateZ(0)' }}></div>
          <div className="video-wrapper bg-[#0C0C14] relative shadow-lg overflow-hidden z-20" style={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe
                src="https://player.vimeo.com/video/1180578010?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="VSL SCALA">
              </iframe>
            </div>
          </div>
        </div>

        {/* Social Proof — Logo Belt */}
        <div style={{ marginTop: '36px', marginBottom: '36px', width: '100%', height: '56px', display: 'flex', alignItems: 'center' }}>
          <div className="logo-belt-container">
            <div className="logo-track">
              {/* Double list mapped twice for linear marquee loop */}
              {[...Array(2)].map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: '48px' }}>
                  {['Grupo Riviera', 'Vertex Digital', 'GangAI', 'Capital Sur', 'Instituto NW'].map((name) => (
                    <span key={name} className="logo-item">{name}</span>
                  ))}
                  {/* Additional gap so the loop meets perfectly */}
                  <span style={{ width: '0' }}></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto" style={{ marginTop: '0px' }}>
          <Link to="/formulario" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button variant="primary" className="text-lg w-full sm:w-auto px-10 btn-hover-lift">Agendar llamada gratuita</Button>
          </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .logo-item { font-size: 14px !important; }
        }
      `}} />
    </section>
  );
};
