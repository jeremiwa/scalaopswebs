import React from 'react';

import { HeroInstitutional } from '../../components/web/home/HeroInstitutional';
import { TheProblem } from '../../components/web/home/TheProblem';
import { Methodology } from '../../components/web/home/Methodology';
import { ServiceGrid } from '../../components/web/home/ServiceGrid';
import { FeaturedCases } from '../../components/web/home/FeaturedCases';
import { FinalCTA } from '../../components/web/home/FinalCTA';

export const WebHome = () => {
  return (
    <div className="w-full relative bg-[#000000] overflow-hidden">
      <HeroInstitutional />
      <TheProblem />
      <Methodology />
      <ServiceGrid />
      <FeaturedCases />
      <FinalCTA />
    </div>
  );
};
