import type { ReactNode } from 'react';
import { Section, Reveal, MetaCTA } from './ui';
import { AdFeedMock, AdReelMock, MeetingCard } from './mockups';
import { Check } from 'lucide-react';

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6bdda1]" />
      <span className="text-[16px] leading-snug text-white/80">{children}</span>
    </li>
  );
}

export function MetaDosCosas() {
  return (
    <Section id="las-dos-cosas" tone="dark">
      <Reveal>
        <h2 className="max-w-[820px] text-[28px] font-extrabold leading-[1.1] text-white sm:text-[38px]">
          Vender más depende de dos cosas.{' '}
          <span className="text-[#6bdda1]">Nos hacemos cargo de las dos.</span>
        </h2>
      </Reveal>

      <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-2">
        {/* Card 1 — Publicidad */}
        <Reveal>
          <div className="flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#185de8]">01 · La publicidad</p>
            <p className="mt-3 text-[19px] font-bold text-white">Primero encontramos el mensaje. Después lo escalamos.</p>
            <ul className="mt-4 space-y-2.5">
              <Bullet>Qué decir y a quién.</Bullet>
              <Bullet>Guiones y videos. Si el dueño puede grabar, mejor: la cara del dueño vende.</Bullet>
              <Bullet>Anuncios y campañas en Meta.</Bullet>
              <Bullet>Testeamos y escalamos lo que funciona.</Bullet>
            </ul>
            <div className="mt-6 flex flex-1 items-end justify-center gap-4 rounded-2xl bg-black/30 p-5">
              {/* mobile: solo reel ≤240; desktop: feed + reel */}
              <div className="hidden sm:block">
                <AdFeedMock />
              </div>
              <div className="w-full max-w-[220px]">
                <AdReelMock />
              </div>
            </div>
            <p className="mt-5 text-[16px] font-semibold text-white">
              No te pasamos recomendaciones. <span className="text-[#6bdda1]">Lo hacemos nosotros.</span>
            </p>
          </div>
        </Reveal>

        {/* Card 2 — Después de la consulta */}
        <Reveal delay={0.08}>
          <div className="flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6bdda1]">02 · Después de la consulta</p>
            <p className="mt-3 text-[19px] font-bold text-white">
              La misma consulta respondida en un minuto o en una hora no es la misma consulta.
            </p>
            <ul className="mt-4 space-y-2.5">
              <Bullet>Responde en menos de un minuto, también a las 3 de la mañana.</Bullet>
              <Bullet>Separa al que compra del que mira.</Bullet>
              <Bullet>Agenda la reunión.</Bullet>
              <Bullet>Cada mañana, un reporte: qué entró, qué se respondió, qué se agendó, qué se perdió.</Bullet>
            </ul>
            <div className="mt-6 flex flex-1 items-end justify-center rounded-2xl bg-black/30 p-5">
              <MeetingCard />
            </div>
            <p className="mt-5 text-[16px] font-semibold text-white">
              No reemplaza a tu gente. <span className="text-[#6bdda1]">Tu equipo deja de perseguir mensajes y se dedica a cerrar.</span>
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-8">
        <MetaCTA location="dos-cosas" />
      </div>
    </Section>
  );
}
