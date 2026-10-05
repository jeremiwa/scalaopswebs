import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { trackMeta } from './ui';

/** Header mínimo: logo SCALA. El CTA del header se muestra SOLO en desktop (en mobile queda el del hero + la barra fija). */
export function MetaHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <div className="meta-shell meta-gutter flex h-14 items-center justify-between">
        <Logo />
        <Link
          to="/formulario"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMeta('cta_click', { location: 'header' })}
          className="hidden items-center justify-center text-[#04140d] no-underline lg:inline-flex"
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
          Quiero vender más
        </Link>
      </div>
    </header>
  );
}
