/**
 * Primitivos compartidos SOLO de la landing /meta-ads. No se usan en otras páginas.
 * Paleta/tipografía heredadas de la identidad SCALA (index.css): accent #6bdda1, azul #185de8.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

type Win = Window & { dataLayer?: unknown[]; fbq?: (...a: unknown[]) => void };

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

/** Animación de entrada sutil, respeta prefers-reduced-motion. */
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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/** Sección con fondo alternable y padding mobile-first. */
export function Section({
  children,
  tone = 'dark',
  id,
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'dark' | 'soft';
  id?: string;
  className?: string;
}) {
  const bg = tone === 'soft' ? 'bg-[#07070c]' : 'bg-[#000000]';
  return (
    <section id={id} className={`relative ${bg} px-5 py-16 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-[1120px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6bdda1]">
      {children}
    </span>
  );
}

/** CTA ÚNICO de la landing. Destino: el mismo que hoy usa /por-que-scala (/formulario). */
export function MetaCTA({
  location,
  align = 'center',
}: {
  location: string;
  align?: 'center' | 'start';
}) {
  return (
    <div className={`w-full ${align === 'center' ? 'flex flex-col items-center text-center' : ''}`}>
      <Link
        to="/formulario"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackMeta('cta_click', { location })}
        className="inline-flex w-full sm:w-auto items-center justify-center min-h-[52px] px-10 rounded-full font-extrabold text-[16px] text-[#04140d] no-underline transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
        style={{
          background: 'linear-gradient(90deg,#185de8,#6bdda1)',
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

/** Link secundario de WhatsApp (mismo número del sitio). */
export function WhatsAppLink({ where }: { where: string }) {
  return (
    <a
      href="https://wa.link/sn01qs"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackMeta('whatsapp_click', { where })}
      className="inline-flex items-center gap-2 text-[14px] text-white/55 no-underline transition-colors hover:text-[#6bdda1]"
    >
      ¿Preferís escribirnos? Mandanos un WhatsApp y fijate cuánto tardamos en responderte.
      <span aria-hidden>→</span>
    </a>
  );
}
