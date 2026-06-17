import type { IconKey } from '@/components/ui/iconMap';
import type { PhotoKey } from '@/lib/images';
import type { PhotoTone } from '@/lib/images';

/* Gallery -------------------------------------------------------------- */

export type GalleryItem = {
  id: string;
  title: string;
  category: 'Education' | 'Healthcare' | 'Care' | 'Community' | 'Celebration';
  seed: string;
  tone: PhotoTone;
  photo?: PhotoKey;
  span: 'tall' | 'wide' | 'normal';
};

export const galleryCategories = ['All', 'Education', 'Healthcare', 'Care', 'Community', 'Celebration'] as const;

export const galleryItems: GalleryItem[] = [
  { id: 'g1', title: 'Morning lessons begin', category: 'Education', seed: 'gal-1', tone: 'horizon', photo: 'classroom', span: 'tall' },
  { id: 'g2', title: 'A gentle checkup', category: 'Healthcare', seed: 'gal-2', tone: 'mist', photo: 'healthcare', span: 'normal' },
  { id: 'g3', title: 'Lunch in the courtyard', category: 'Care', seed: 'gal-3', tone: 'dawn', photo: 'nutrition', span: 'wide' },
  { id: 'g4', title: 'First day of school', category: 'Education', seed: 'gal-4', tone: 'dawn', photo: 'reading', span: 'normal' },
  { id: 'g5', title: 'Home at last', category: 'Care', seed: 'gal-5', tone: 'sage', photo: 'shelter', span: 'normal' },
  { id: 'g6', title: 'Clean water arrives', category: 'Community', seed: 'gal-6', tone: 'mist', photo: 'water', span: 'tall' },
  { id: 'g7', title: 'Graduation day', category: 'Celebration', seed: 'gal-7', tone: 'horizon', photo: 'graduation', span: 'wide' },
  { id: 'g8', title: 'Learning a trade', category: 'Education', seed: 'gal-8', tone: 'horizon', photo: 'skills', span: 'normal' },
  { id: 'g9', title: 'Caregiver and child', category: 'Care', seed: 'gal-9', tone: 'dawn', photo: 'caregiver', span: 'normal' },
  { id: 'g10', title: 'The whole village', category: 'Community', seed: 'gal-10', tone: 'blush', photo: 'community', span: 'tall' },
  { id: 'g11', title: 'Pure joy', category: 'Celebration', seed: 'gal-11', tone: 'dawn', photo: 'joy', span: 'normal' },
  { id: 'g12', title: 'Reading together', category: 'Education', seed: 'gal-12', tone: 'horizon', photo: 'reading', span: 'wide' },
];

/* Partners ------------------------------------------------------------- */

export type Partner = {
  name: string;
  category: 'Corporate' | 'Foundation' | 'Healthcare' | 'Education' | 'Community';
  blurb: string;
};

export const partners: Partner[] = [
  { name: 'Northwind Group', category: 'Corporate', blurb: 'Funds our nutrition program and matches employee giving.' },
  { name: 'Meridian Foundation', category: 'Foundation', blurb: 'Multi year support for our family homes model.' },
  { name: 'Lumen Health', category: 'Healthcare', blurb: 'Provides specialist surgeries and medical equipment.' },
  { name: 'Brightpath University', category: 'Education', blurb: 'Scholarships and teacher training partnerships.' },
  { name: 'Aria Bank', category: 'Corporate', blurb: 'Underwrites our financial literacy curriculum.' },
  { name: 'Greenfield Trust', category: 'Foundation', blurb: 'Backs clean water and sanitation projects.' },
  { name: 'Solace Medical', category: 'Healthcare', blurb: 'Staffs mobile clinics across rural communities.' },
  { name: 'Atlas Logistics', category: 'Corporate', blurb: 'Moves food and supplies to every home, at no cost.' },
  { name: 'Harbor Collective', category: 'Community', blurb: 'Mobilizes local volunteers and foster families.' },
  { name: 'Vista Technologies', category: 'Corporate', blurb: 'Equips our computer labs and digital classrooms.' },
  { name: 'Kindred Foundation', category: 'Foundation', blurb: 'Champions our skills and apprenticeship studios.' },
  { name: 'Riverstone Care', category: 'Healthcare', blurb: 'Trains our nurses and counselors every year.' },
];

export const partnerTiers = [
  {
    name: 'Community Partner',
    icon: 'community' as IconKey,
    range: 'In kind and local support',
    perks: ['Volunteer team days', 'Shared storytelling', 'Local event hosting', 'Annual partner gathering'],
  },
  {
    name: 'Program Partner',
    icon: 'target' as IconKey,
    range: 'Fund a program or home',
    perks: ['Named program sponsorship', 'Quarterly impact reports', 'Site visits for your team', 'Co branded campaigns'],
  },
  {
    name: 'Visionary Partner',
    icon: 'globe' as IconKey,
    range: 'Transformational, multi year',
    perks: ['Strategic seat at the table', 'Dedicated impact officer', 'Custom reporting and audits', 'Global recognition'],
  },
];

/* FAQs ----------------------------------------------------------------- */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: 'How much of my donation reaches the children',
    answer:
      'Eighty four cents of every dollar goes directly to programs for children. The rest funds the careful stewardship, safeguarding, and audits that keep your gift safe and effective. Our finances are independently audited and published every year.',
  },
  {
    question: 'Can I choose a specific child to sponsor',
    answer:
      'Yes. Our child sponsorship plans connect you with a specific child and send you regular updates, letters, and milestones. You can also give to a program or to wherever the need is greatest.',
  },
  {
    question: 'Is my donation tax deductible',
    answer:
      'Horizon Children Foundation is a registered nonprofit, and donations are tax deductible to the extent allowed by law. You will receive a receipt by email immediately and an annual giving summary.',
  },
  {
    question: 'How do you keep children safe',
    answer:
      'Every caregiver, volunteer, and partner is vetted and trained under a strict child protection policy. Safeguarding is overseen by a dedicated team and reviewed independently. The wellbeing of children is never negotiable.',
  },
  {
    question: 'Can I visit or volunteer in person',
    answer:
      'We welcome volunteers and arrange thoughtful, safeguarding led visits. To protect children, in person roles involve screening, training, and a minimum commitment. Start with our volunteer application and our team will guide you.',
  },
  {
    question: 'How will I know my gift made a difference',
    answer:
      'You will receive impact updates showing exactly what your support made possible, from meals served to scholarships funded, alongside our open annual report.',
  },
];

/* Donations ------------------------------------------------------------ */

export type DonationImpact = { amount: number; label: string; icon: IconKey };

export const donationImpacts: DonationImpact[] = [
  { amount: 25, label: 'Warm meals for a child for a month', icon: 'nutrition' },
  { amount: 50, label: 'School books and supplies for a term', icon: 'education' },
  { amount: 100, label: 'A full health checkup and immunizations', icon: 'healthcare' },
  { amount: 250, label: 'A month of safe, loving home care', icon: 'shelter' },
];

export type SponsorshipPlan = {
  name: string;
  monthly: number;
  icon: IconKey;
  description: string;
  includes: string[];
  featured?: boolean;
};

export const sponsorshipPlans: SponsorshipPlan[] = [
  {
    name: 'Friend',
    monthly: 25,
    icon: 'heart',
    description: 'Provide daily meals and a safe place for a child to belong.',
    includes: ['Nourishing daily meals', 'A welcome into a family home', 'Quarterly impact updates'],
  },
  {
    name: 'Guardian',
    monthly: 50,
    icon: 'graduation',
    description: 'Sponsor a child fully, from their classroom to their care.',
    includes: ['Everything in Friend', 'Full school scholarship', 'Healthcare and checkups', 'Letters from your child'],
    featured: true,
  },
  {
    name: 'Champion',
    monthly: 120,
    icon: 'globe',
    description: 'Carry a child and lift their whole community alongside them.',
    includes: ['Everything in Guardian', 'Skills and career support', 'Community outreach', 'Invitations to visit'],
  },
];

/* Volunteer ------------------------------------------------------------ */

export type VolunteerRole = {
  title: string;
  type: 'On site' | 'Remote' | 'Skilled' | 'Events';
  icon: IconKey;
  commitment: string;
  description: string;
};

export const volunteerRoles: VolunteerRole[] = [
  {
    title: 'Learning mentor',
    type: 'On site',
    icon: 'education',
    commitment: 'Six months, weekly',
    description: 'Guide a child through homework, reading, and the quiet confidence that comes from being believed in.',
  },
  {
    title: 'Healthcare volunteer',
    type: 'Skilled',
    icon: 'healthcare',
    commitment: 'Flexible rotations',
    description: 'Doctors, nurses, and counselors who can give time to our clinics and wellbeing programs.',
  },
  {
    title: 'Skills instructor',
    type: 'On site',
    icon: 'skills',
    commitment: 'Three months, weekly',
    description: 'Teach a trade or craft to teenagers building toward independent, hopeful futures.',
  },
  {
    title: 'Storyteller and creator',
    type: 'Remote',
    icon: 'star',
    commitment: 'Project based',
    description: 'Photographers, writers, and designers who help us share these stories with the world.',
  },
  {
    title: 'Fundraising champion',
    type: 'Events',
    icon: 'heart',
    commitment: 'Seasonal',
    description: 'Host events, run campaigns, and rally your community around children who need them.',
  },
  {
    title: 'Pro bono specialist',
    type: 'Skilled',
    icon: 'shield',
    commitment: 'Project based',
    description: 'Lawyers, accountants, and technologists who strengthen the systems behind our care.',
  },
];

export const volunteerBenefits = [
  { icon: 'heart' as IconKey, title: 'Purpose you can feel', description: 'Spend your time on something that genuinely changes a child life.' },
  { icon: 'community' as IconKey, title: 'A global community', description: 'Join thousands of volunteers and supporters who have become a family.' },
  { icon: 'star' as IconKey, title: 'Grow your skills', description: 'Training, mentoring, and experience that stay with you for life.' },
  { icon: 'globe' as IconKey, title: 'Real, visible impact', description: 'See the outcomes of your work through honest reporting and stories.' },
];

export const volunteerRequirements = [
  'Be eighteen years or older, or accompanied by a guardian',
  'Complete our safeguarding screening and training',
  'Commit to the minimum time for your chosen role',
  'Share our deep respect for the dignity of every child',
];

export const volunteerTestimonials = [
  {
    quote: 'I came to give a few months and stayed in spirit forever. These children taught me more than I ever taught them.',
    name: 'Sofia Marn',
    role: 'Learning mentor, two years',
  },
  {
    quote: 'The training and care for volunteers is exceptional. You are trusted, supported, and truly part of the team.',
    name: 'James Okoro',
    role: 'Skills instructor',
  },
  {
    quote: 'As a nurse, volunteering at Horizon clinics was the most meaningful work of my career. I will be back every year.',
    name: 'Dr Anya Patel',
    role: 'Healthcare volunteer',
  },
];
