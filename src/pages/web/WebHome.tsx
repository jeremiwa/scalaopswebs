import React from 'react';

import { HeroInstitutional } from '../../components/web/home/HeroInstitutional';
import { TrustBand } from '../../components/web/home/TrustBand';
import { ServiceGrid } from '../../components/web/home/ServiceGrid';
import { TargetAudience } from '../../components/web/home/TargetAudience';
import { Methodology } from '../../components/web/home/Methodology';
import { WhyScala } from '../../components/web/home/WhyScala';
import { FeaturedCases } from '../../components/web/home/FeaturedCases';
import { Founders } from '../../components/web/home/Founders';
import { FeaturedBlog } from '../../components/web/home/FeaturedBlog';
import { FinalCTA } from '../../components/web/home/FinalCTA';

export const WebHome = () => {
  return (
    <div className="w-full relative bg-[#030712] overflow-hidden">
      <HeroInstitutional />
      <TrustBand />
      <ServiceGrid />
      <TargetAudience />
      <Methodology />
      <WhyScala />
      <FeaturedCases />
      <Founders />
      <FeaturedBlog />
      <FinalCTA />
    </div>
  );
};
