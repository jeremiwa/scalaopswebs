import React from 'react';
import { SEO } from '../../components/SEO';

import { HeroInstitutional } from '../../components/web/home/HeroInstitutional';
import { TheProblem } from '../../components/web/home/TheProblem';
import { Methodology } from '../../components/web/home/Methodology';
import { ServiceGrid } from '../../components/web/home/ServiceGrid';
import { FeaturedCases } from '../../components/web/home/FeaturedCases';
import { FinalCTA } from '../../components/web/home/FinalCTA';

export const WebHome = () => {
  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ScalaOps",
      "url": "https://scalaops.com",
      "logo": "https://scalaops.com/logo-scala.svg",
      "description": "Consultora de operaciones comerciales B2B. Optimizamos ventas con IA, automatización y procesos en LATAM.",
      "foundingDate": "2024",
      "founder": [
        { "@type": "Person", "name": "Franco Villa" },
        { "@type": "Person", "name": "Jeremías Walsh" }
      ],
      "sameAs": [],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "url": "https://scalaops.com/formulario"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ScalaOps",
      "url": "https://scalaops.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://scalaops.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <div className="w-full relative bg-[#000000] overflow-hidden">
      <SEO 
        title="SCALA | El sistema operativo para escalar ventas B2B" 
        description="Optimizamos equipos comerciales B2B en LATAM con IA y procesos que recuperan rentabilidad en 30 días."
        canonical="https://scalaops.com/"
        schema={homeSchema}
      />
      <HeroInstitutional />
      <TheProblem />
      <Methodology />
      <ServiceGrid />
      <FeaturedCases />
      <FinalCTA />
    </div>
  );
};
