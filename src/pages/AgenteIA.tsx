/**
 * Sentinel Landing Page — /agente-ia
 * VSL mobile-first landing for Sentinel AI Employee product
 * 
 * Section order (Simplified):
 * 01 Hero → 02 Demo (QueEsScala) → 03 Dolor Simple → 04 Diferenciación Breve →
 * 05 Sentinel Vs Vendedor → 06 Prueba Social Corta → 07 Oferta Simple → 
 * 08 FAQ Corta → 09 CTA Final Simple → Footer
 */

import { SEO } from '../components/SEO';
import { Navbar } from '../components/agente-ia/Navbar';
import { Hero } from '../components/agente-ia/Hero';
import { WhatIsSentinel } from '../components/agente-ia/QueEsScala';
import { DolorSimple } from '../components/agente-ia/DolorSimple';
import { DiferenciacionBreve } from '../components/agente-ia/DiferenciacionBreve';
import { SentinelVsVendedor } from '../components/agente-ia/SentinelVsVendedor';
import { PruebaSocialCorta } from '../components/agente-ia/PruebaSocialCorta';
import { OfertaSimple } from '../components/agente-ia/OfertaSimple';
import { FaqCorta } from '../components/agente-ia/FaqCorta';
import { CtaFinalSimple } from '../components/agente-ia/CtaFinalSimple';
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
        <Hero />
        <WhatIsSentinel />
        <DolorSimple />
        <DiferenciacionBreve />
        <SentinelVsVendedor />
        <PruebaSocialCorta />
        <OfertaSimple />
        <FaqCorta />
        <CtaFinalSimple />
      </main>

      <Footer />
      <StickyCTA />
    </div>
  );
};
