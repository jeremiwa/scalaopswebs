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
 * Entrada sutil. El estado por defecto SIEMPRE es visible (opacity 1): la animación
 * es una mejora, no una condición. Con prefers-reduced-motion no anima.
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
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Sección: margen lateral 20px (24 en tablet), vertical 64px mobile / 96px desktop.
 * `padY` permite override donde la spec pide otra medida (hero, cierre).
 */
export function Section({
  children,
  tone = 'dark',
  id,
  className = '',
  padY = 'py-16 lg:py-24',
}: {
  children: React.ReactNode;
  tone?: 'dark' | 'soft';
  id?: string;
  className?: string;
  padY?: string;
}) {
  const bg = tone === 'soft' ? 'bg-[#07070c]' : 'bg-[#000000]';
  return (
    <section id={id} className={`relative ${bg} px-5 ${padY} sm:px-6 ${className}`}>
      <div className="mx-auto w-full max-w-[1120px]">{children}</div>
    </section>
  );
}

/** Etiqueta (eyebrow): 12px, mayúsculas, tracking 0.14em, peso 600, azul, margen inferior 12px. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#185de8]">
      {children}
    </span>
  );
}

/**
 * Logo de Meta (glyph infinity), SVG limpio con el azul de marca en degradado.
 * TODO: si consiguen el SVG OFICIAL de marca, reemplazar este path por el asset oficial.
 */
export function MetaLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="Meta" className={className}>
      <defs>
        <linearGradient id="metaBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0099FF" />
          <stop offset="100%" stopColor="#0064E1" />
        </linearGradient>
      </defs>
      <path
        fill="url(#metaBlue)"
        d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.572-1.257 1.313-1.82 2.188-.69-.875-1.335-1.547-1.958-2.01-1.182-.878-2.42-1.286-3.567-1.286zm10.846 2.924c1.36 0 2.629.837 3.603 2.293 1.157 1.728 1.73 4.063 1.73 6.633 0 1.365-.328 2.345-.904 3.001-.454.516-1.118.819-1.953.819-.808 0-1.5-.351-2.354-1.316-.581-.656-1.396-1.84-2.09-2.985l-.901-1.505-.726-1.216c.126-.207.252-.409.379-.605.63-.973 1.195-1.633 1.685-2.01.56-.43 1.013-.603 1.44-.603zm-10.846.013c.594 0 1.246.273 1.95.806.447.338.916.797 1.4 1.371-.53.808-1.09 1.745-1.69 2.806l-.756 1.34c-.618 1.094-1.151 1.981-1.639 2.667-.894 1.26-1.483 1.605-2.291 1.605-.796 0-1.351-.283-1.705-.852-.217-.35-.333-.802-.333-1.33 0-2.198.589-4.447 1.561-6.037.97-1.587 2.22-2.376 3.502-2.376z"
      />
    </svg>
  );
}

/**
 * CTA ÚNICO. Destino: /formulario (mismo que /por-que-scala), en pestaña nueva.
 * Mobile: 100% ancho, 56px alto. Desktop: ancho automático (mín. 260px).
 * `center` centra en desktop (cierre). `microcopy` agrega la línea inferior centrada.
 */
export function MetaCTA({
  location,
  id,
  microcopy,
  center = false,
}: {
  location: string;
  id?: string;
  microcopy?: string;
  center?: boolean;
}) {
  return (
    <div className={`w-full ${center ? 'text-center' : ''}`}>
      <Link
        id={id}
        to="/formulario"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackMeta('cta_click', { location })}
        className="inline-flex w-full items-center justify-center no-underline transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] sm:w-auto sm:min-w-[260px]"
        style={{
          background: CTA_GRADIENT,
          minHeight: 56,
          padding: '0 36px',
          borderRadius: 999,
          fontFamily: BRAND_FONT,
          fontWeight: 800,
          fontSize: 17,
          color: '#04140d',
          boxShadow: '0 10px 40px rgba(107,221,161,0.18)',
        }}
      >
        Quiero vender más
      </Link>
      {microcopy && (
        <p className="mx-auto mt-2.5 max-w-[460px] text-center text-[13px] leading-[1.4] text-white/55">
          {microcopy}
        </p>
      )}
    </div>
  );
}

/** Enlace secundario de WhatsApp (texto + ícono, área tocable 48px). Destino actual. */
export function WhatsAppButton({ where }: { where: string }) {
  return (
    <div className="flex flex-col items-center">
      <a
        href="https://wa.link/sn01qs"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackMeta('whatsapp_click', { where })}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 text-[16px] font-semibold text-[#6bdda1] no-underline transition-opacity hover:opacity-80"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.46 3.44 1.32 4.94L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.12-2.9-6.99A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.73c0 4.48-3.64 8.12-8.1 8.12a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.8.82-3-.19-.31a8.08 8.08 0 0 1-1.24-4.31c0-4.48 3.64-8.11 8.11-8.11Zm4.68 11.46c-.26-.13-1.52-.75-1.76-.84-.24-.09-.41-.13-.59.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.46-.06-.13-.59-1.42-.81-1.94-.21-.51-.43-.44-.59-.45l-.5-.01c-.17 0-.46.06-.7.32-.24.26-.92.9-.92 2.2 0 1.3.94 2.56 1.07 2.73.13.17 1.85 2.82 4.48 3.96.63.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.52-.62 1.74-1.22.21-.6.21-1.11.15-1.22-.06-.11-.24-.17-.5-.3Z" />
        </svg>
        Escribinos por WhatsApp
      </a>
      <p className="mt-1 text-[13px] text-white/50">Fijate cuánto tardamos en responderte.</p>
    </div>
  );
}
