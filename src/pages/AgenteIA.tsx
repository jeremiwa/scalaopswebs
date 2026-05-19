/**
 * Agente IA Landing Page
 * Clone of /por-que-scala for independent customization
 */

import { SEO } from '../components/SEO';
import { Navbar } from '../components/agente-ia/Navbar';
import { Hero } from '../components/agente-ia/Hero';
import { Resultados } from '../components/agente-ia/Resultados';
import { QueEsScala } from '../components/agente-ia/QueEsScala';
import { StoryboardDolor } from '../components/agente-ia/StoryboardDolor';
import { CostoInvisible } from '../components/agente-ia/CostoInvisible';
import { Escalar } from '../components/agente-ia/Escalar';
import { CapaIA } from '../components/agente-ia/CapaIA';
import { Diferencial } from '../components/agente-ia/Diferencial';
import { FAQ } from '../components/agente-ia/FAQ';
import { CtaFinal } from '../components/agente-ia/CtaFinal';
import { Footer } from '../components/agente-ia/Footer';
import { useAnimations } from '../hooks/useAnimations';

export const AgenteIA = () => {
  useAnimations();

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Testimonio Jordi Falcon - ScalaOps",
    "description": "Jordi Falcon, CEO de una empresa de servicios inmobiliarios en Barcelona, comparte su experiencia trabajando con ScalaOps.",
    "thumbnailUrl": "https://scalaops.com/images/jordi.jpg",
    "uploadDate": "2025-01-01",
    "contentUrl": "https://vimeo.com/1183439807",
    "embedUrl": "https://player.vimeo.com/video/1183439807"
  };

  return (
    <div className="min-h-screen bg-[#000000] selection:bg-[#6bdda1] selection:text-[#030712] relative overflow-x-hidden">
      <SEO
        title="Agente IA | ScalaOps"
        description="Descubrí cómo ScalaOps implementa agentes de IA personalizados para tu negocio. Automatizá respuestas, calificá leads y agendá reuniones 24/7."
        canonical="https://scalaops.com/agente-ia"
        schema={videoSchema}
      />
      
      {/* Global Noise Layer para dar la textura tipo film grain (Premium) */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999] mix-blend-overlay" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          opacity: 0.03
        }} 
      />

      <div className="scroll-bar"></div>
      <Navbar />
      <main>
        {/* 1. Hero + VSL */}
        <Hero />
        {/* 2. Proof / Testimonios */}
        <Resultados />
        {/* 3. Micro-bloque */}
        <QueEsScala />
        {/* 3. Storyboard dolor */}
        <StoryboardDolor />
        {/* 4. Calculadora de impacto */}
        <CostoInvisible />
        {/* 9. Ahora sí podés escalar */}
        <Escalar />
        {/* 10. Empleado IA */}
        <CapaIA />
        {/* 11. Diferenciación */}
        <Diferencial />
        {/* 12. FAQ */}
        <FAQ />
        {/* 13. CTA final */}
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
};
