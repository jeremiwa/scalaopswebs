/**
 * Sentinel Landing Page — /agente-ia
 * VSL mobile-first landing for Sentinel AI Employee product
 * 
 * Section order:
 * 01 Hero → 02 Credibilidad → 03 Diagnóstico (Dolor) → 04 Tabla USD →
 * 05 Qué es Sentinel → 06 Demo (QueEsScala) → 07 Bot vs Sentinel →
 * 08 Calculadora ROI → 09 Resultados → 10 Garantía → 11 Filtro →
 * 12 Pricing → 13 Proceso → 14 FAQ → 15 CTA Final → Footer
 */

import { SEO } from '../components/SEO';
import { Navbar } from '../components/agente-ia/Navbar';
import { Hero } from '../components/agente-ia/Hero';
import { Credibilidad } from '../components/agente-ia/Credibilidad';
import { NotABot } from '../components/agente-ia/StoryboardDolor';
import { TablaUSD } from '../components/agente-ia/TablaUSD';
import { QueEsSentinel } from '../components/agente-ia/QueEsSentinel';
import { WhatIsSentinel } from '../components/agente-ia/QueEsScala';
import { BotVsSentinel } from '../components/agente-ia/BotVsSentinel';
import { Calculadora } from '../components/agente-ia/Calculadora';
import { Resultados } from '../components/agente-ia/Resultados';
import { Garantia } from '../components/agente-ia/Garantia';
import { ForWho } from '../components/agente-ia/CostoInvisible';
import { Pricing } from '../components/agente-ia/Escalar';
import { Proceso } from '../components/agente-ia/Proceso';
import { FAQ } from '../components/agente-ia/FAQ';
import { CtaFinal } from '../components/agente-ia/CtaFinal';
import { Footer } from '../components/agente-ia/Footer';
import { StickyCTA } from '../components/agente-ia/StickyCTA';
import { useAnimations } from '../hooks/useAnimations';

export const AgenteIA = () => {
  useAnimations();

  return (
    <div className="min-h-screen bg-[#000000] selection:bg-[#00D4AA] selection:text-[#000000] relative overflow-x-hidden">
      <SEO
        title="Sentinel — Tu Empleado IA Comercial | ScalaOps"
        description="Sentinel responde, califica y sigue oportunidades por WhatsApp e Instagram con el tono de tu negocio. Implementación personalizada por USD 997."
        canonical="https://scalaops.com/agente-ia"
      />

      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none z-[999] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          opacity: 0.03,
        }}
      />

      <div className="scroll-bar" />
      <Navbar />

      <main>
        {/* S01 */}<Hero />
        {/* S02 */}<Credibilidad />
        {/* S03 */}<NotABot />
        {/* S04 */}<TablaUSD />
        {/* S05 */}<QueEsSentinel />
        {/* S06 */}<WhatIsSentinel />
        {/* S07 */}<BotVsSentinel />
        {/* S08 */}<Calculadora />
        {/* S09 */}<Resultados />
        {/* S10 */}<Garantia />
        {/* S11 */}<ForWho />
        {/* S12 */}<Pricing />
        {/* S13 */}<Proceso />
        {/* S14 */}<FAQ />
        {/* S15 */}<CtaFinal />
      </main>

      <Footer />
      <StickyCTA />
    </div>
  );
};
