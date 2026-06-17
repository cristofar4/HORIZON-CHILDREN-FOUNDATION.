import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { GalleryMasonry } from '@/components/sections/GalleryMasonry';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Moments from the field. Education, healthcare, care, community, and celebration at Horizon Children Foundation, captured in photographs.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments worth a thousand donations"
        intro="Every image here is a small piece of a larger promise kept. Filter by what matters to you, and step inside the life of a Horizon home."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />
      <GalleryMasonry />
      <CTASection
        title="Become part of the picture"
        intro="The next photograph of hope could be one you helped create. Give today and watch the gallery grow."
      />
    </>
  );
}
