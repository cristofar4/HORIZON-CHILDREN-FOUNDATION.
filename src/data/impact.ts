import type { IconKey } from '@/components/ui/iconMap';

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: IconKey;
  description: string;
};

export const heroStats: Stat[] = [
  {
    label: 'Children supported',
    value: 4800,
    suffix: '+',
    icon: 'care',
    description: 'Boys and girls welcomed into safe, loving homes since 2009.',
  },
  {
    label: 'Meals provided',
    value: 2100000,
    suffix: '+',
    icon: 'nutrition',
    description: 'Warm, nourishing meals served across our family homes and centers.',
  },
  {
    label: 'Educational scholarships',
    value: 3650,
    suffix: '',
    icon: 'graduation',
    description: 'Full scholarships funding school, books, uniforms, and mentoring.',
  },
  {
    label: 'Communities reached',
    value: 64,
    suffix: '',
    icon: 'globe',
    description: 'Villages and neighborhoods strengthened through local partnership.',
  },
];

export type Milestone = {
  year: string;
  title: string;
  description: string;
  metric?: string;
};

export const timeline: Milestone[] = [
  {
    year: '2009',
    title: 'A single rescue',
    description:
      'Founder Amara Okonkwo finds a young girl waiting alone under a street light and opens the first Horizon home with three children and one promise.',
    metric: '3 children',
  },
  {
    year: '2012',
    title: 'The first school opens',
    description:
      'Our learning center welcomes its first class, proving that consistent education changes the trajectory of a childhood.',
    metric: '120 students',
  },
  {
    year: '2015',
    title: 'Healthcare for every child',
    description:
      'We launch on site clinics and partner with regional hospitals so no child goes without care.',
    metric: '8 clinics',
  },
  {
    year: '2018',
    title: 'Family homes model',
    description:
      'We move from dormitories to small family homes, giving every child a caregiver, siblings, and a place that feels like their own.',
    metric: '40 homes',
  },
  {
    year: '2021',
    title: 'Skills and futures',
    description:
      'Vocational studios open for teenagers, pairing classrooms with apprenticeships and real career pathways.',
    metric: '900 graduates',
  },
  {
    year: '2025',
    title: 'A growing horizon',
    description:
      'Today Horizon cares for thousands of children across dozens of communities, with a waiting list we are determined to end.',
    metric: '4,800 children',
  },
];

export type Transparency = {
  label: string;
  value: number;
  suffix: string;
  note: string;
};

export const allocation: Transparency[] = [
  { label: 'Programs for children', value: 84, suffix: '%', note: 'Care, education, healthcare, and nutrition' },
  { label: 'Community and outreach', value: 8, suffix: '%', note: 'Local partnerships and family reunification' },
  { label: 'Operations and stewardship', value: 8, suffix: '%', note: 'Audited governance and safeguarding' },
];

export const accountability = [
  {
    icon: 'shield' as IconKey,
    title: 'Independently audited',
    description:
      'Our finances are audited every year by an accredited firm, and the full report is published for anyone to read.',
  },
  {
    icon: 'eye' as IconKey,
    title: 'Radical transparency',
    description:
      'We share where every gift goes through quarterly impact reports and an open annual review.',
  },
  {
    icon: 'heart' as IconKey,
    title: 'Child safeguarding first',
    description:
      'Every caregiver, volunteer, and partner is vetted and trained under a strict child protection policy.',
  },
];
