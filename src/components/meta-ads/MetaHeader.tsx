import { Link } from 'react-router-dom';
import { trackMeta } from './ui';

/** Header mínimo: logo + CTA (el CTA se oculta en mobile; ahí gobierna el sticky inferior). */
export function MetaHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-5">
        <img src="/images/scala-logo-white.png" alt="SCALA" className="h-[22px] w-auto" />
        <Link
          to="/formulario"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMeta('cta_click', { location: 'header' })}
          className="hidden sm:inline-flex items-center rounded-full px-5 py-2 text-[13px] font-bold text-[#04140d] no-underline"
          style={{ background: 'linear-gradient(90deg,#185de8,#6bdda1)' }}
        >
          Quiero vender más
        </Link>
      </div>
    </header>
  );
}
