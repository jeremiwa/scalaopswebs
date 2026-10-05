import { Eyebrow, MetaCTA, WhatsAppLink, Reveal } from './ui';

/** VSL embebido (Vimeo). TODO: confirmar que 1180578010 es el VSL correcto para /meta-ads. */
function VSL() {
  return (
    <div className="relative w-full overflow-hidden rounded-[22px] border border-white/10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <iframe
          src="https://player.vimeo.com/video/1180578010?badge=0&autopause=0&player_id=0&app_id=58479"
          loading="lazy"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          title="VSL SCALA — Meta Ads"
        />
      </div>
    </div>
  );
}

export function MetaHero() {
  return (
    <section className="relative overflow-hidden bg-black px-5 pt-12 pb-16 sm:pt-16 sm:pb-20">
      {/* glow de marca */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(90% 60% at 50% 0%, rgba(24,93,232,0.16), transparent 60%), radial-gradient(70% 50% at 80% 20%, rgba(107,221,161,0.10), transparent 60%)' }}
      />
      <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="text-center lg:text-left">
            <Eyebrow>Agencia de Meta Ads</Eyebrow>
            <h1 className="mt-4 text-[34px] leading-[1.06] font-extrabold tracking-tight text-white sm:text-[46px] lg:text-[54px]">
              Más clientes con{' '}
              <span className="bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent">
                Meta Ads
              </span>
              .
            </h1>
            <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed text-white/70 lg:mx-0 sm:text-[17px]">
              Hacemos tu publicidad completa: el mensaje, los guiones, los videos y las campañas.
              Y cuando entra una consulta, nuestra IA la responde en menos de un minuto y te agenda la
              reunión. Sin sumar gente a tu equipo.
            </p>

            <div className="mt-8 flex flex-col items-center lg:items-start">
              <MetaCTA location="hero" align="start" />
            </div>

            {/* Franja de prueba. TODO: confirmar autorización del caso. */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="text-[15px] font-bold text-white sm:text-[16px]">
                De $6 a $40 millones de pesos por mes, en 3 meses.
              </span>
            </div>
            {/* TODO: confirmar autorización del caso $6M → $40M antes de indexar/pautar */}
            {/* TODO: logos de clientes solo si están disponibles en el proyecto */}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-full">
            <VSL />
            <div className="mt-4 text-center lg:text-left">
              <WhatsAppLink where="hero" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
