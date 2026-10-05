/**
 * Primitivos compartidos SOLO de la landing /meta-ads. No se usan en otras páginas.
 * Identidad SCALA (index.css): accent #6bdda1, azul #185de8, fuentes var(--font-primary/secondary).
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

type Win = Window & { dataLayer?: unknown[]; fbq?: (...a: unknown[]) => void };

const BRAND_FONT = 'var(--font-primary)';
const CTA_GRADIENT = 'linear-gradient(90deg,#185de8,#6bdda1)';

/** Evento propio de /meta-ads (no afecta el tracking de /por-que-scala). */
export function trackMeta(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as Win;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: `meta_ads_${event}`, page: 'meta-ads', ...params });
  try {
    w.fbq?.('trackCustom', 'MetaAdsLeadIntent', { action: event, page: 'meta-ads', ...params });
  } catch {
    /* pixel ausente: no romper */
  }
}

/**
 * Entrada sutil. Rápida (≤300ms, ≤10px), dispara al 10% visible, una sola vez.
 * Con prefers-reduced-motion no anima. El contenido nunca queda "a medias".
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/** Sección: margen lateral 20px (24 en tablet), vertical 56px mobile / 96px desktop. */
export function Section({
  children,
  tone = 'dark',
  id,
  className = '',
  padY = 'py-10 sm:py-16',
}: {
  children: React.ReactNode;
  tone?: 'dark' | 'soft';
  id?: string;
  className?: string;
  /** Override de padding vertical (default preserva el de las demás secciones). */
  padY?: string;
}) {
  const bg = tone === 'soft' ? 'bg-[#07070c]' : 'bg-[#000000]';
  return (
    <section id={id} className={`relative ${bg} px-5 ${padY} sm:px-6 ${className}`}>
      <div className="mx-auto w-full max-w-[1120px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6bdda1]">
      {children}
    </span>
  );
}

/** CTA ÚNICO. Destino: el mismo que hoy usa /por-que-scala (/formulario). Mismo estilo de botón.
 *  `tall` sube la altura/tamaño solo donde se pida (hero), sin afectar los demás CTAs. */
export function MetaCTA({ location, tall = false }: { location: string; tall?: boolean }) {
  return (
    <div className="w-full">
      <Link
        to="/formulario"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackMeta('cta_click', { location })}
        className="inline-flex w-full sm:w-auto items-center justify-center no-underline transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
        style={{
          background: CTA_GRADIENT,
          minHeight: tall ? 60 : 52,
          padding: tall ? '0 44px' : '0 40px',
          borderRadius: 100,
          fontFamily: BRAND_FONT,
          fontWeight: 800,
          fontSize: tall ? 17 : 16,
          color: '#04140d',
          boxShadow: '0 10px 40px rgba(107,221,161,0.18)',
        }}
      >
        Quiero vender más
      </Link>
      <p className="mt-3 max-w-[460px] text-[14px] leading-snug text-white/55">
        Agendá una llamada. Revisamos tu publicidad y te decimos qué cambiaríamos.
      </p>
    </div>
  );
}

/** Botón secundario de WhatsApp (contorno, ícono, full-width en mobile). */
export function WhatsAppButton({ where }: { where: string }) {
  return (
    <div className="w-full">
      <a
        href="https://wa.link/sn01qs"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackMeta('whatsapp_click', { where })}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-white/15 bg-white/[0.03] text-white no-underline transition-colors hover:bg-white/[0.07]"
        style={{ minHeight: 48, padding: '0 24px', borderRadius: 100, fontFamily: BRAND_FONT, fontWeight: 700, fontSize: 15 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-[#6bdda1]">
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.46 3.44 1.32 4.94L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.12-2.9-6.99A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.73c0 4.48-3.64 8.12-8.1 8.12a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.8.82-3-.19-.31a8.08 8.08 0 0 1-1.24-4.31c0-4.48 3.64-8.11 8.11-8.11Zm4.68 11.46c-.26-.13-1.52-.75-1.76-.84-.24-.09-.41-.13-.59.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.46-.06-.13-.59-1.42-.81-1.94-.21-.51-.43-.44-.59-.45l-.5-.01c-.17 0-.46.06-.7.32-.24.26-.92.9-.92 2.2 0 1.3.94 2.56 1.07 2.73.13.17 1.85 2.82 4.48 3.96.63.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.52-.62 1.74-1.22.21-.6.21-1.11.15-1.22-.06-.11-.24-.17-.5-.3Z" />
        </svg>
        Escribinos por WhatsApp
      </a>
      <p className="mt-2 text-[13px] text-white/45">Fijate cuánto tardamos en responderte.</p>
    </div>
  );
}
