import { Hero } from '@/components/home/Hero';
import { PartnersMarquee } from '@/components/sections/PartnersMarquee';
import { StatsBand } from '@/components/sections/StatsBand';
import { MissionIntro } from '@/components/home/MissionIntro';
import { ProgramsGrid } from '@/components/sections/ProgramsGrid';
import { ImpactTimeline } from '@/components/home/ImpactTimeline';
import { FeaturedStories } from '@/components/home/FeaturedStories';
import { Testimonials } from '@/components/sections/Testimonials';
import { TransparencyBand } from '@/components/sections/TransparencyBand';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnersMarquee />
      <StatsBand />
      <MissionIntro />
      <ProgramsGrid limit={6} />
      <ImpactTimeline />
      <FeaturedStories />
      <Testimonials />
      <TransparencyBand />
      <CTASection />
    </>
  );
}
