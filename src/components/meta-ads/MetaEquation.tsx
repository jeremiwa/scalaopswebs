import { Reveal } from './ui';
import { Sparkles } from 'lucide-react';

/**
 * Logo de Meta (glyph infinity), SVG limpio con el azul de marca en degradado.
 * TODO: si existe/consiguen el SVG OFICIAL de marca, reemplazar este path por el asset oficial.
 */
function MetaLogo({ className = '' }: { className?: string }) {
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

function Op({ children }: { children: string }) {
  return (
    <span className="text-[24px] font-light text-white/35 sm:text-[30px]" aria-hidden>
      {children}
    </span>
  );
}

/** Bloque "ecuación": Meta + IA = Más ventas. Reemplaza al bloque $24M→$58M en este tramo. */
export function MetaEquation() {
  return (
    <section className="bg-black px-5 py-6 sm:py-9">
      <div className="mx-auto max-w-[900px] text-center">
        <Reveal>
          {/* Dos unidades que NO se parten: "[Meta] + IA" y "= MÁS VENTAS" → corte limpio en 2 líneas. */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
            <span className="inline-flex items-center gap-3 whitespace-nowrap sm:gap-4">
              <MetaLogo className="h-9 w-auto sm:h-10" />
              <Op>+</Op>
              <span
                className="inline-flex items-center gap-1.5 text-[26px] font-extrabold sm:text-[32px]"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                <Sparkles className="h-4 w-4 text-[#6bdda1] sm:h-5 sm:w-5" aria-hidden />
                <span className="bg-gradient-to-r from-[#6bdda1] to-[#20c5ff] bg-clip-text text-transparent">IA</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-3 whitespace-nowrap sm:gap-4">
              <Op>=</Op>
              <span
                className="bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-[26px] font-extrabold uppercase tracking-tight text-transparent sm:text-[32px]"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Más ventas
              </span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-relaxed text-white/60 sm:text-[16px]">
            Más demanda. Respuestas inmediatas. Más oportunidades de venta.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
