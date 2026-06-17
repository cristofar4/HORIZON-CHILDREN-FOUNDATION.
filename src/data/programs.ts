import type { IconKey } from '@/components/ui/iconMap';
import type { PhotoKey } from '@/lib/images';

export type Program = {
  slug: string;
  icon: IconKey;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  photo: PhotoKey;
  highlights: string[];
  metrics: { value: number; suffix?: string; prefix?: string; label: string }[];
};

export const programs: Program[] = [
  {
    slug: 'education',
    icon: 'education',
    title: 'Education Support',
    tagline: 'A classroom seat for every child',
    description:
      'Full scholarships, learning centers, books, uniforms, and patient mentoring that keep children in school and reaching higher.',
    longDescription:
      'Education is the surest path out of poverty, so we remove every barrier between a child and their classroom. We fund tuition, supplies, transport, and uniforms, run our own learning centers for early years, and pair each student with a mentor who believes in them. From first letters to university acceptance, we walk the whole way.',
    photo: 'classroom',
    highlights: [
      'Full scholarships from early years to university',
      'On site learning centers and libraries',
      'One to one mentoring and homework clubs',
      'Digital literacy and computer labs',
    ],
    metrics: [
      { value: 3650, label: 'Scholarships funded' },
      { value: 96, suffix: '%', label: 'School retention' },
      { value: 28, label: 'Learning centers' },
    ],
  },
  {
    slug: 'healthcare',
    icon: 'healthcare',
    title: 'Healthcare Assistance',
    tagline: 'Healthy bodies, hopeful futures',
    description:
      'On site clinics, regular checkups, immunizations, and partnerships with hospitals so no child goes without care.',
    longDescription:
      'A child cannot learn or play while they are unwell. Our clinics provide routine checkups, immunizations, dental and vision care, and mental health support, while partnerships with regional hospitals cover surgeries and emergencies. Every child receives a complete health record and the consistent care of people who know their name.',
    photo: 'healthcare',
    highlights: [
      'On site clinics with full time nurses',
      'Immunizations and preventive screenings',
      'Counseling and trauma informed care',
      'Hospital partnerships for specialist needs',
    ],
    metrics: [
      { value: 8, label: 'Clinics operating' },
      { value: 41000, label: 'Checkups delivered' },
      { value: 100, suffix: '%', label: 'Children immunized' },
    ],
  },
  {
    slug: 'nutrition',
    icon: 'nutrition',
    title: 'Nutrition Programs',
    tagline: 'No child hungry, ever',
    description:
      'Three balanced meals a day, community kitchens, and nutrition plans designed by our care team for growing bodies.',
    longDescription:
      'Good food is the foundation of a good childhood. Our kitchens serve three balanced meals every day, with menus shaped by our nutritionists for healthy growth. We grow fresh produce in community gardens, teach older children to cook, and send nutrition support home with the families we reunite.',
    photo: 'nutrition',
    highlights: [
      'Three balanced meals every single day',
      'Community kitchens and fresh gardens',
      'Tailored plans for infants and toddlers',
      'Food support for reunified families',
    ],
    metrics: [
      { value: 2100000, suffix: '+', label: 'Meals served' },
      { value: 18, label: 'Community kitchens' },
      { value: 12, label: 'Fresh food gardens' },
    ],
  },
  {
    slug: 'shelter',
    icon: 'shelter',
    title: 'Shelter and Care',
    tagline: 'A home, not an institution',
    description:
      'Small family homes where every child has a caregiver, siblings, and a safe, warm place that is truly their own.',
    longDescription:
      'We believe children grow best in families, not institutions. Our small family homes give every child a dedicated caregiver, a handful of siblings, their own bed, and the daily rhythms of belonging. It is a model built on attachment, stability, and love, the things every child needs to feel safe enough to dream.',
    photo: 'shelter',
    highlights: [
      'Small family homes of six to eight children',
      'A dedicated caregiver for every home',
      'Safe, warm, and welcoming living spaces',
      'Stable routines and lasting relationships',
    ],
    metrics: [
      { value: 40, label: 'Family homes' },
      { value: 4800, suffix: '+', label: 'Children welcomed' },
      { value: 320, label: 'Caregivers on staff' },
    ],
  },
  {
    slug: 'skills',
    icon: 'skills',
    title: 'Skills Development',
    tagline: 'Futures built by their own hands',
    description:
      'Vocational studios, apprenticeships, and career mentoring that turn talent and ambition into real livelihoods.',
    longDescription:
      'For teenagers, hope needs a pathway. Our vocational studios teach tailoring, carpentry, coding, agriculture, hospitality, and the creative trades, paired with real apprenticeships and financial literacy. We help every young person leave Horizon with a skill, a plan, and the confidence to build a life they choose.',
    photo: 'skills',
    highlights: [
      'Studios for trades, technology, and crafts',
      'Apprenticeships with local employers',
      'Financial literacy and entrepreneurship',
      'Career mentoring and job placement',
    ],
    metrics: [
      { value: 900, suffix: '+', label: 'Graduates placed' },
      { value: 14, label: 'Vocational tracks' },
      { value: 87, suffix: '%', label: 'Employed within a year' },
    ],
  },
  {
    slug: 'community',
    icon: 'community',
    title: 'Community Outreach',
    tagline: 'Strengthening the village',
    description:
      'Family reunification, foster support, clean water, and local partnerships that help children thrive at home.',
    longDescription:
      'The best place for a child is a loving family, so we work to keep families together wherever we can. We support reunification and kinship care, train foster families, deliver clean water and hygiene, and partner with local leaders so entire communities become safer for children. Prevention is the quiet heart of our mission.',
    photo: 'community',
    highlights: [
      'Family reunification and kinship support',
      'Foster family training and stipends',
      'Clean water and sanitation projects',
      'Partnerships with local leaders and schools',
    ],
    metrics: [
      { value: 1240, label: 'Children reunified' },
      { value: 64, label: 'Communities reached' },
      { value: 52, label: 'Clean water projects' },
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
