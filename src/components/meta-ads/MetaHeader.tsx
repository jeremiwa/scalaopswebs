import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { trackMeta } from './ui';

/** Header mínimo: logo SCALA (mismo componente que /por-que-scala) + CTA compacto. */
export function MetaHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-5 sm:px-6">
        <Logo />
        <Link
          to="/formulario"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMeta('cta_click', { location: 'header' })}
          className="inline-flex items-center justify-center text-[#04140d] no-underline"
          style={{
            background: 'linear-gradient(90deg,#185de8,#6bdda1)',
            height: 36,
            padding: '0 16px',
            borderRadius: 100,
            fontFamily: 'var(--font-primary)',
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          <span className="sm:hidden">Vender más</span>
          <span className="hidden sm:inline">Quiero vender más</span>
        </Link>
      </div>
    </header>
  );
}
