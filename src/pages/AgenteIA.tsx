/**
 * Sentinel Landing Page — /agente-ia
 * VSL mobile-first landing for Sentinel AI Employee product
 */

import { SEO } from '../components/SEO';
import { Navbar } from '../components/agente-ia/Navbar';
import { Hero } from '../components/agente-ia/Hero';
import { Credibilidad } from '../components/agente-ia/Credibilidad';
import { NotABot } from '../components/agente-ia/StoryboardDolor'; // Dolor Simple
import { WhatIsSentinel } from '../components/agente-ia/QueEsScala'; // Demo
import { BotVsSentinel } from '../components/agente-ia/BotVsSentinel';
import { HumanoVsSentinel } from '../components/agente-ia/HumanoVsSentinel';
import { BloqueEquipo } from '../components/agente-ia/BloqueEquipo';
import { Calculadora } from '../components/agente-ia/Calculadora';
import { Resultados } from '../components/agente-ia/Resultados';
import { ForWho } from '../components/agente-ia/CostoInvisible'; // Para Quién
import { Pricing } from '../components/agente-ia/Escalar'; // Oferta
import { FAQ } from '../components/agente-ia/FAQ';
import { CtaFinal } from '../components/agente-ia/CtaFinal';
import { Footer } from '../components/agente-ia/Footer';
import { StickyCTA } from '../components/agente-ia/StickyCTA';
import { useAnimations } from '../hooks/useAnimations';

export const AgenteIA = () => {
  useAnimations();

  return (
    <div className="min-h-screen bg-[#030504] selection:bg-[#68E6A3] selection:text-[#030504] relative overflow-x-hidden">
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
        <Hero />
        <Credibilidad />
        <NotABot />
        <WhatIsSentinel />
        <BotVsSentinel />
        <HumanoVsSentinel />
        <BloqueEquipo />
        <Calculadora />
        <Resultados />
        <ForWho />
        <Pricing />
        <FAQ />
        <CtaFinal />
      </main>

      <Footer />
      <StickyCTA />
    </div>
  );
};
