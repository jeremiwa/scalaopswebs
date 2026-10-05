/**
 * Visuales de la landing /meta-ads construidos en HTML/CSS (sin imágenes pesadas).
 * Nada de números presentados como reales: los que aparecen son ilustrativos y están
 * rotulados como ejemplo donde corresponde.
 */
import React from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
  Check,
  CheckCheck,
  Calendar,
  Clock,
  Video,
  ThumbsUp,
} from 'lucide-react';

const card = 'rounded-[22px] border border-white/10 bg-[#0b0b12] shadow-[0_20px_50px_rgba(0,0,0,0.45)]';

/** Anuncio de Meta — formato feed. */
export function AdFeedMock() {
  return (
    <div className={`${card} w-full max-w-[320px] overflow-hidden`}>
      <div className="flex items-center gap-3 p-3.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#185de8] to-[#6bdda1] text-[13px] font-extrabold text-[#04140d]">
          A
        </div>
        <div className="leading-tight">
          <p className="text-[13px] font-semibold text-white">Tu empresa</p>
          <p className="text-[11px] text-white/45">Publicidad · Meta</p>
        </div>
        <MoreHorizontal className="ml-auto h-4 w-4 text-white/40" />
      </div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#05050a]">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(120% 90% at 20% 10%, rgba(24,93,232,0.30), transparent 55%), radial-gradient(120% 90% at 90% 90%, rgba(107,221,161,0.22), transparent 55%)' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <p className="text-[22px] font-extrabold leading-[1.1] text-white">
            Más clientes.<br />Menos vueltas.
          </p>
          <p className="mt-2 text-[13px] text-white/70">La publicidad que te trae gente que compra.</p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#0e0e16] px-4 py-3">
        <span className="text-[12px] font-medium text-white/60">tuempresa.com</span>
        <span className="rounded-md bg-white/10 px-3 py-1.5 text-[12px] font-bold text-white">Más info</span>
      </div>
      <div className="flex items-center gap-5 px-4 py-2.5 text-white/45">
        <ThumbsUp className="h-4 w-4" />
        <MessageCircle className="h-4 w-4" />
        <Send className="h-4 w-4" />
      </div>
    </div>
  );
}

/** Anuncio de Meta — formato reel (vertical). */
export function AdReelMock() {
  return (
    <div className={`${card} relative w-full max-w-[200px] overflow-hidden`}>
      <div className="relative aspect-[9/16] w-full bg-[#05050a]">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(100% 70% at 50% 0%, rgba(107,221,161,0.28), transparent 55%), radial-gradient(120% 60% at 50% 100%, rgba(24,93,232,0.28), transparent 60%)' }}
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/80">
          Reel
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[18px] font-extrabold leading-[1.12] text-white">
            El dueño te cuenta cómo lo hace
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#04140d]">
            Quiero saber más
          </div>
        </div>
        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white/85">
          <Heart className="h-5 w-5" />
          <MessageCircle className="h-5 w-5" />
          <Send className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ children, title = 'Scala IA' }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="rounded-[36px] border border-white/12 bg-[#0b141a] p-2 shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
        <div className="overflow-hidden rounded-[28px] bg-[#0b141a]">
          {/* barra de WhatsApp */}
          <div className="flex items-center gap-3 bg-[#1f2c33] px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6bdda1] text-[12px] font-extrabold text-[#04140d]">
              {title.slice(0, 1)}
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-white">{title}</p>
              <p className="text-[11px] text-[#6bdda1]">en línea</p>
            </div>
            <Video className="ml-auto h-4 w-4 text-white/40" />
          </div>
          <div className="space-y-2 bg-[#0b141a] px-3 py-4" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '18px 18px' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ me, time, read, children }: { me?: boolean; time: string; read?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
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

/** Celular con la bandeja llena de consultas sin leer (sección "¿Te suena?"). */
export function WhatsAppUnread() {
  return (
    <PhoneFrame title="Consultas">
      {[
        { n: 'Nuevo +54 9 11…', t: 'Hola, vi el anuncio, ¿precio?', time: 'sáb 23:14' },
        { n: 'Nuevo +54 9 351…', t: '¿Hacen envíos?', time: 'dom 00:42' },
        { n: 'Nuevo +54 9 341…', t: 'Me interesa, ¿cómo sigo?', time: 'dom 11:08' },
      ].map((m, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl bg-[#111b21] px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[12px] font-bold text-white/70">
            {i + 1}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-white/90">{m.n}</p>
            <p className="truncate text-[12px] text-white/55">{m.t}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40">{m.time}</span>
            <span className="mt-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6bdda1] px-1 text-[10px] font-bold text-[#04140d]">
              1
            </span>
          </div>
        </div>
      ))}
      <p className="pt-1 text-center text-[11px] font-medium text-white/40">12 sin responder</p>
    </PhoneFrame>
  );
}

/** Celular con la IA respondiendo y agendando (sección "Las dos cosas" / demo). */
export function WhatsAppIA() {
  return (
    <PhoneFrame title="Scala IA">
      <Bubble time="00:00">Hola, vi el anuncio. ¿Cómo es el servicio?</Bubble>
      <Bubble me time="00:47" read>
        ¡Hola! Te cuento en 1 minuto. ¿Para qué rubro lo necesitás?
      </Bubble>
      <Bubble time="01:05">Tengo una fábrica de aberturas.</Bubble>
      <Bubble me time="01:12" read>
        Buenísimo. ¿Querés que coordinemos una llamada esta semana?
      </Bubble>
      <Bubble time="01:30">Dale, mañana a la tarde.</Bubble>
      <Bubble me time="01:54" read>
        Listo ✅ Reunión agendada para mañana 16:00. Te llega la confirmación.
      </Bubble>
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
      <p className="mt-3 text-[16px] font-bold text-white">Llamada con un asesor</p>
      <div className="mt-2 flex items-center gap-2 text-[13px] text-white/60">
        <Clock className="h-4 w-4" /> Mañana · 16:00
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
        <span className="text-[12px] text-white/60">Estado</span>
        <span className="rounded-full bg-[#6bdda1]/15 px-2.5 py-1 text-[11px] font-bold text-[#6bdda1]">Confirmada</span>
      </div>
    </div>
  );
}

/** Tarjeta de reporte diario. `example` rotula que los números son ilustrativos. */
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
