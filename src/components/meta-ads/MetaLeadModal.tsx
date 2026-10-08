/**
 * Formulario de /meta-ads en la MISMA página: los CTA abren este modal en vez de
 * mandar a /formulario en otra pestaña. Mobile: pantalla completa. Desktop: tarjeta centrada.
 */
import React, { Suspense, createContext, lazy, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';

// Se carga aparte (trae la librería de validación de teléfonos) y se pide de antemano
// apenas la landing queda quieta, para que al tocar el CTA ya esté lista.
const cargarLeadForm = () => import('../lead-form/LeadForm').then((m) => ({ default: m.LeadForm }));
const LeadForm = lazy(cargarLeadForm);

const LeadModalContext = createContext<() => void>(() => {});

/** Devuelve la función que abre el formulario. Fuera del provider no hace nada. */
export const useLeadModal = () => useContext(LeadModalContext);

const FOCUSABLES = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled])';

export function MetaLeadModalProvider({ children }: { children: React.ReactNode }) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const volverA = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  // El formulario se monta la primera vez que se abre y queda montado:
  // si la persona cierra sin querer, no pierde lo que ya escribió.
  const [montado, setMontado] = useState(false);

  const abrir = useCallback(() => {
    volverA.current = document.activeElement as HTMLElement | null;
    setMontado(true);
    setOpen(true);
  }, []);

  const cerrar = useCallback(() => {
    setOpen(false);
    volverA.current?.focus?.();
  }, []);

  useEffect(() => {
    const reloj = window.setTimeout(() => void cargarLeadForm().catch(() => {}), 2000);
    return () => window.clearTimeout(reloj);
  }, []);

  useEffect(() => {
    if (!open) return;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cerrar();
        return;
      }
      // El foco no sale del modal mientras está abierto.
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items: HTMLElement[] = Array.from(panelRef.current.querySelectorAll(FOCUSABLES));
      if (!items.length) return;
      const primero = items[0];
      const ultimo = items[items.length - 1];
      const activo = document.activeElement as HTMLElement | null;
      const afuera = !activo || !panelRef.current.contains(activo);
      if (e.shiftKey && (afuera || activo === primero || activo === panelRef.current)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && (afuera || activo === ultimo)) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflowPrevio;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, cerrar]);

  return (
    <LeadModalContext.Provider value={abrir}>
      {children}
      {/* Sin transición ni desenfoque en mobile: aparece al instante aunque el teléfono sea lento. */}
      {montado && (
        <div
          className={`fixed inset-0 z-[100] items-stretch justify-center bg-black/80 sm:items-center sm:p-6 sm:backdrop-blur-sm ${
            open ? 'flex' : 'hidden'
          }`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cerrar();
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative flex w-full flex-col overflow-y-auto overscroll-contain bg-[#07070c] outline-none sm:max-h-[min(92vh,880px)] sm:max-w-[560px] sm:rounded-2xl sm:border sm:border-white/10 sm:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/5 bg-[#07070c] px-6 py-4 sm:px-7">
              <div>
                <h2 id={titleId} className="text-[20px] font-bold leading-tight text-white">
                  Agendá tu llamada
                </h2>
                <p className="mt-1 text-[14px] leading-[1.4] text-white/60">
                  Completá tus datos y te escribimos por WhatsApp para coordinarla.
                </p>
              </div>
              <button
                type="button"
                onClick={cerrar}
                aria-label="Cerrar"
                className="-mr-2 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="px-6 pb-10 pt-6 sm:px-7 sm:pb-8">
              <Suspense fallback={<p className="py-16 text-center text-[14px] text-white/50">Cargando…</p>}>
                <LeadForm />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}
