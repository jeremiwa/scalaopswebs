import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackMeta } from './ui';

/**
 * Barra fija SOLO mobile. Visible únicamente cuando NO se ve el botón del hero
 * NI el del cierre (IntersectionObserver). Transición 200ms.
 */
export function MetaStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('meta-hero-cta');
    const cierre = document.getElementById('meta-cierre-cta');
    let heroVisible = !!hero; // al cargar, el hero está en pantalla
    let cierreVisible = false;
    const update = () => setShow(!heroVisible && !cierreVisible);

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) heroVisible = e.isIntersecting;
          if (e.target === cierre) cierreVisible = e.isIntersecting;
        }
        update();
      },
      { threshold: 0 }
    );

    if (hero) obs.observe(hero);
    if (cierre) obs.observe(cierre);
    update();
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-200 lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-[130%]'
      }`}
    >
      <div className="meta-shell bg-black/90 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] backdrop-blur-md">
        <Link
          to="/formulario"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMeta('cta_click', { location: 'sticky' })}
          className="flex h-[52px] w-full items-center justify-center rounded-full text-[16px] font-extrabold text-[#04140d] no-underline"
          style={{ background: 'linear-gradient(90deg,#185de8,#6bdda1)' }}
        >
          Quiero vender más
        </Link>
      </div>
    </div>
  );
}
