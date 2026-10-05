import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackMeta } from './ui';

/** CTA sticky SOLO mobile, aparece después del hero. */
export function MetaStickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 sm:hidden transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-[130%]'
      }`}
    >
      <div className="border-t border-white/10 bg-black/85 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+10px)] backdrop-blur-md">
        <Link
          to="/formulario"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMeta('cta_click', { location: 'sticky' })}
          className="flex min-h-[52px] w-full items-center justify-center rounded-full text-[16px] font-extrabold text-[#04140d] no-underline"
          style={{ background: 'linear-gradient(90deg,#185de8,#6bdda1)' }}
        >
          Quiero vender más
        </Link>
      </div>
    </div>
  );
}
