import type { IconKey } from '@/components/ui/iconMap';
import { personPhoto, type PhotoKey } from '@/lib/images';
import type { FigureKind } from '@/components/ui/Photo';

export const mission =
  'To give every orphaned and vulnerable child a safe home, a complete education, healthcare, and the loving care they need to grow into their fullest potential.';

export const vision =
  'A world where no child waits alone in the dark, and where every child can see a horizon worth running toward.';

export type Value = {
  icon: IconKey;
  title: string;
  description: string;
};

export const coreValues: Value[] = [
  {
    icon: 'heart',
    title: 'Love first',
    description:
      'Every decision begins with the question, what does this child need to feel safe and cherished today.',
  },
  {
    icon: 'shield',
    title: 'Safety always',
    description:
      'We protect children fiercely, with rigorous safeguarding woven through everything we do.',
  },
  {
    icon: 'eye',
    title: 'Honest and open',
    description:
      'We share our finances, our outcomes, and our hard lessons openly, because trust is earned in daylight.',
  },
  {
    icon: 'compass',
    title: 'Dignity in all things',
    description:
      'We see potential, not pity. Every child and family is met with respect and a belief in their future.',
  },
  {
    icon: 'leaf',
    title: 'Built to last',
    description:
      'We invest in local people and lasting systems so the change we make outlives us.',
  },
  {
    icon: 'globe',
    title: 'Stronger together',
    description:
      'Communities, partners, and supporters are not our audience. They are our family and our strength.',
  },
];

export type Leader = {
  name: string;
  role: string;
  photo: PhotoKey;
  portrait: string;
  figure: FigureKind;
  bio: string;
};

export const leadership: Leader[] = [
  {
    name: 'Amara Okonkwo',
    role: 'Founder and Chief Executive',
    photo: 'teamLeader',
    portrait: personPhoto('female', 68),
    figure: 'female',
    bio: 'A former teacher who opened the first Horizon home with three children and a borrowed building. Fifteen years on, she still knows every child by name.',
  },
  {
    name: 'David Achterberg',
    role: 'Chief Operating Officer',
    photo: 'portrait2',
    portrait: personPhoto('male', 52),
    figure: 'male',
    bio: 'A logistics leader who left a corporate career to build the systems that let love scale with care and accountability.',
  },
  {
    name: 'Dr Helen Mensah',
    role: 'Director of Child Health',
    photo: 'caregiver',
    portrait: personPhoto('female', 72),
    figure: 'female',
    bio: 'A pediatrician overseeing our clinics and the health of every child, from first checkup to specialist care.',
  },
  {
    name: 'Esther Adeyemi',
    role: 'Director of Care',
    photo: 'portrait3',
    portrait: personPhoto('female', 29),
    figure: 'female',
    bio: 'A social worker who designed our family homes model and trains the caregivers who make each house a home.',
  },
  {
    name: 'Samuel Brooks',
    role: 'Director of Education',
    photo: 'graduation',
    portrait: personPhoto('male', 75),
    figure: 'male',
    bio: 'An educator leading our learning centers, scholarships, and the mentoring that keeps children reaching higher.',
  },
  {
    name: 'Lina Fortuna',
    role: 'Director of Partnerships',
    photo: 'community',
    portrait: personPhoto('female', 90),
    figure: 'female',
    bio: 'A community organizer connecting donors, companies, and local leaders around a shared promise to children.',
  },
];

export const transparencyDocs = [
  { title: 'Annual Report 2025', meta: 'PDF, 4.2 MB', desc: 'A full year of impact, outcomes, and finances.' },
  { title: 'Audited Financials', meta: 'PDF, 1.8 MB', desc: 'Independently audited statements and notes.' },
  { title: 'Child Safeguarding Policy', meta: 'PDF, 0.9 MB', desc: 'Our standards for protecting every child.' },
  { title: 'Form 990', meta: 'PDF, 2.1 MB', desc: 'Our public tax filing, available to all.' },
];
