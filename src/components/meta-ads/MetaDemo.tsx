import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Section, Reveal } from './ui';
import { PhoneFrame, ReportCard } from './mockups';

type Msg = { secs: number; label: string; me: boolean; text: string };

const SCRIPT: Msg[] = [
  { secs: 0, label: '00:00', me: false, text: 'Hola, vi el anuncio. ¿Precio de ventanas de aluminio?' },
  { secs: 47, label: '00:47', me: true, text: '¡Hola! Te ayudo. ¿Es para obra nueva o para reemplazar?' },
  { secs: 65, label: '01:05', me: false, text: 'Obra nueva, casa.' },
  { secs: 72, label: '01:12', me: true, text: '¿Cuántas aberturas son, más o menos, y para cuándo las necesitás?' },
  { secs: 90, label: '01:30', me: false, text: 'Unas 12. Antes de marzo.' },
  { secs: 98, label: '01:38', me: true, text: 'Perfecto, llegamos bien. Te agendo una visita con un asesor. ¿Jueves 10 h o 16 h?' },
  { secs: 110, label: '01:50', me: false, text: '16 h.' },
  { secs: 114, label: '01:54', me: true, text: 'Listo ✅ Visita agendada el jueves a las 16 h. Te llega la confirmación.' },
];

const TOTAL = 114;
const DURATION_MS = 6000;
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

function DemoPhone() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [visible, setVisible] = useState(reduce ? SCRIPT.length : 0);
  const [clock, setClock] = useState(reduce ? TOTAL : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const start = performance.now();
    const timers: number[] = [];
    SCRIPT.forEach((m, i) => {
      timers.push(
        window.setTimeout(() => setVisible(i + 1), (m.secs / TOTAL) * DURATION_MS),
      );
    });
    const tick = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / DURATION_MS);
      setClock(Math.round(t * TOTAL));
      if (t >= 1) window.clearInterval(tick);
    }, 90);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tick);
    };
  }, [inView, reduce]);

  return (
    <div ref={ref}>
      <PhoneFrame title="Aberturas del Sur" subtitle={`IA · ${fmt(clock)}`}>
        {SCRIPT.slice(0, visible).map((m, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                m.me ? 'rounded-br-md bg-[#144d36] text-white' : 'rounded-bl-md bg-[#202c33] text-white/90'
              }`}
            >
              <p>{m.text}</p>
              <span className="mt-0.5 block text-right text-[10px] text-white/45">{m.label}</span>
            </div>
          </motion.div>
        ))}
      </PhoneFrame>
    </div>
  );
}

export function MetaDemo() {
  return (
    <Section tone="soft">
      <Reveal>
        <h2 className="max-w-[720px] text-[28px] font-extrabold leading-[1.1] text-white sm:text-[38px]">
          No te pedimos que nos creas.
        </h2>
      </Reveal>

      <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <DemoPhone />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex flex-col items-start gap-5">
            <ReportCard example />
            <p className="text-[18px] font-bold text-white">
              Sin que nadie de la empresa tocara el teléfono.
            </p>
            {/* TODO: reemplazar por grabación/capturas reales de un cliente (con permiso) */}
            <p className="text-[12px] text-white/40">Ejemplo ilustrativo.</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
