/**
 * Visuales de /meta-ads en HTML/CSS (sin imágenes pesadas). Números ilustrativos, rotulados.
 */
import React from 'react';
import { Check, CheckCheck, Calendar, Clock, Video, ThumbsUp, MessageCircle, Send } from 'lucide-react';

const card = 'rounded-[20px] border border-white/10 bg-[#0b0b12] shadow-[0_18px_44px_rgba(0,0,0,0.45)]';

/** Anuncio de Meta — feed. Texto grande y legible, CTA completo. */
export function AdFeedMock() {
  return (
    <div className={`${card} w-full max-w-[300px] overflow-hidden`}>
      <div className="flex items-center gap-2.5 p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#185de8] to-[#6bdda1] text-[12px] font-extrabold text-[#04140d]">
          A
        </div>
        <div className="leading-tight">
          <p className="text-[12.5px] font-semibold text-white">Aberturas del Sur</p>
          <p className="text-[10.5px] text-white/45">Publicidad</p>
        </div>
      </div>
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg,#123a7e 0%,#0b6b4a 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <span className="self-start rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Obra nueva
          </span>
          <div>
            <p className="text-[19px] font-extrabold leading-[1.1] text-white" style={{ fontFamily: 'var(--font-primary)' }}>
              Ventanas que aíslan de verdad
            </p>
            <p className="mt-1 text-[12.5px] text-white/80">Presupuesto en el día.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 bg-[#0e0e16] px-3 py-2.5">
        <span className="truncate text-[11.5px] text-white/55">aberturasdelsur.com</span>
        <span className="shrink-0 rounded-md bg-white/12 px-3 py-1.5 text-[11.5px] font-bold text-white">
          Pedir precio
        </span>
      </div>
      <div className="flex items-center gap-5 px-3 py-2 text-white/40">
        <ThumbsUp className="h-3.5 w-3.5" />
        <MessageCircle className="h-3.5 w-3.5" />
        <Send className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

/** Anuncio de Meta — reel (9:16), ≤240px, sin íconos encimando el texto. */
export function AdReelMock() {
  return (
    <div className={`${card} relative w-full max-w-[200px] overflow-hidden`}>
      <div className="relative aspect-[9/16] w-full">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg,#0b6b4a 0%,#123a7e 100%)' }}
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute left-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90">
          Reel
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[17px] font-extrabold leading-[1.12] text-white" style={{ fontFamily: 'var(--font-primary)' }}>
            El dueño te muestra cómo lo hace
          </p>
          <div className="mt-3 inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[11.5px] font-bold text-[#04140d]">
            Quiero saber más
          </div>
        </div>
      </div>
    </div>
  );
}

/** Marco de teléfono con barra de WhatsApp. `unread` muestra badge rojo en el header. */
export function PhoneFrame({
  children,
  title = 'Scala IA',
  subtitle = 'en línea',
  unread,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  unread?: number;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="rounded-[34px] border border-white/12 bg-[#0b141a] p-2 shadow-[0_28px_64px_rgba(0,0,0,0.55)]">
        <div className="overflow-hidden rounded-[26px] bg-[#0b141a]">
          <div className="flex items-center gap-3 bg-[#1f2c33] px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6bdda1] text-[12px] font-extrabold text-[#04140d]">
              {title.slice(0, 1)}
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-white">{title}</p>
              <p className="text-[11px] text-[#6bdda1]">{subtitle}</p>
            </div>
            {unread ? (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef4444] px-1.5 text-[11px] font-bold text-white">
                {unread}
              </span>
            ) : (
              <Video className="ml-auto h-4 w-4 text-white/40" />
            )}
          </div>
          <div
            className="space-y-2 bg-[#0b141a] px-3 py-4"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Bubble({ me, time, read, children }: { me?: boolean; time: string; read?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
          me ? 'rounded-br-md bg-[#144d36] text-white' : 'rounded-bl-md bg-[#202c33] text-white/90'
        }`}
      >
        <p>{children}</p>
        <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-white/45">
          {time}
          {me && (read ? <CheckCheck className="h-3 w-3 text-[#6bdda1]" /> : <Check className="h-3 w-3" />)}
        </span>
      </div>
    </div>
  );
}

/** Bandeja con consultas sin leer (sección "¿Te suena?"). Badge "12" coincide con el copy. */
export function WhatsAppUnread() {
  const items = [
    ['Nuevo · +54 9 11…', 'Hola, vi el anuncio, ¿precio?', 'sáb 23:14'],
    ['Nuevo · +54 9 351…', '¿Hacen envíos?', 'dom 00:42'],
    ['Nuevo · +54 9 341…', 'Me interesa, ¿cómo sigo?', 'dom 11:08'],
  ];
  return (
    <PhoneFrame title="Consultas" subtitle="12 sin leer" unread={12}>
      {items.map(([n, t, time], i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl bg-[#111b21] px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[12px] font-bold text-white/70">
            {i + 1}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-white/90">{n}</p>
            <p className="truncate text-[12px] text-white/55">{t}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40">{time}</span>
            <span className="mt-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-bold text-white">1</span>
          </div>
        </div>
      ))}
    </PhoneFrame>
  );
}

/** Tarjeta "reunión agendada". */
export function MeetingCard() {
  return (
    <div className={`${card} w-full max-w-[300px] p-4`}>
      <div className="flex items-center gap-2 text-[#6bdda1]">
        <Calendar className="h-4 w-4" />
        <span className="text-[12px] font-semibold uppercase tracking-wide">Reunión agendada</span>
      </div>
      <p className="mt-3 text-[16px] font-bold text-white">Visita con un asesor</p>
      <div className="mt-2 flex items-center gap-2 text-[13px] text-white/60">
        <Clock className="h-4 w-4" /> Jueves · 16:00
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
        <span className="text-[12px] text-white/60">Estado</span>
        <span className="rounded-full bg-[#6bdda1]/15 px-2.5 py-1 text-[11px] font-bold text-[#6bdda1]">Confirmada</span>
      </div>
    </div>
  );
}

/** Reporte diario. `example` rotula que los números son ilustrativos. */
export function ReportCard({ example = true }: { example?: boolean }) {
  const rows = [
    ['Consultas', '41'],
    ['Respondidas', '41'],
    ['Agendadas', '9'],
    ['Sin responder', '0'],
  ];
  return (
    <div className={`${card} w-full max-w-[320px] p-5`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wide text-white/50">Reporte diario</p>
          <p className="mt-1 text-[15px] font-bold text-white">Lunes · 9:00</p>
        </div>
        {example && (
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/45">
            Ejemplo
          </span>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white/[0.04] px-3 py-3">
            <p className="text-[22px] font-extrabold leading-none text-white">{v}</p>
            <p className="mt-1 text-[12px] text-white/55">{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
