import type { PhotoKey } from '@/lib/images';
import type { FigureKind } from '@/components/ui/Photo';

export type Story = {
  slug: string;
  name: string;
  age: number;
  location: string;
  program: string;
  photo: PhotoKey;
  portrait: string;
  figure: FigureKind;
  headline: string;
  before: string;
  after: string;
  quote: string;
  fullStory: string[];
  outcome: string;
};

export const stories: Story[] = [
  {
    slug: 'amina-the-engineer',
    name: 'Amina',
    age: 19,
    location: 'Eastern Region',
    program: 'Education Support',
    photo: 'portrait1',
    portrait: '/people/amina.jpg',
    figure: 'female',
    headline: 'From a street corner to an engineering scholarship',
    before:
      'Amina was found sleeping near a market at the age of seven, selling water to survive and missing school entirely.',
    after:
      'Today she studies civil engineering on a national scholarship and mentors younger girls in our learning center.',
    quote:
      'Horizon did not just give me a bed. They gave me the belief that a girl from nowhere could build bridges.',
    fullStory: [
      'When our outreach team first met Amina, she was carrying a tray of water bottles through a crowded market, barefoot and far too thin. She had never spent a full day in a classroom.',
      'Her first months at Horizon were quiet. Then a teacher noticed how quickly she solved puzzles, how she sketched the shapes of buildings in the margins of her notebooks.',
      'With steady meals, a safe home, and a mentor who refused to let her give up, Amina raced through school. She sat the national exams and earned a place studying engineering.',
      'She comes back every holiday to tutor the youngest children, telling them the same thing her mentor once told her.',
    ],
    outcome: 'National engineering scholarship',
  },
  {
    slug: 'daniel-the-carpenter',
    name: 'Daniel',
    age: 21,
    location: 'Northern Hills',
    program: 'Skills Development',
    photo: 'portrait2',
    portrait: '/people/daniel.jpg',
    figure: 'male',
    headline: 'A workshop apprenticeship became a thriving business',
    before:
      'Orphaned at ten, Daniel drifted between relatives who could not care for him and left school to find work.',
    after:
      'He now runs a furniture workshop that employs four other young people from his community.',
    quote:
      'I learned to measure twice and cut once. I also learned that someone was finally measuring out a future for me.',
    fullStory: [
      'Daniel arrived withdrawn and unsure whether to trust the people offering him a place to stay. He had been let down before.',
      'In our vocational studio he discovered carpentry. The focus of the work steadied him, and the praise of his instructors slowly rebuilt his confidence.',
      'An apprenticeship with a local craftsman turned skill into livelihood. Within two years Daniel opened his own workshop.',
      'He hires young people who remind him of himself, paying forward the chance he was given.',
    ],
    outcome: 'Owns a furniture business',
  },
  {
    slug: 'grace-the-nurse',
    name: 'Grace',
    age: 23,
    location: 'Lakeside',
    program: 'Healthcare Assistance',
    photo: 'portrait3',
    portrait: '/people/grace.jpg',
    figure: 'female',
    headline: 'The girl our clinic saved now saves others',
    before:
      'Grace came to us gravely ill and grieving, with no family able to care for her or fund her treatment.',
    after:
      'She qualified as a nurse and works in the very clinic network that once nursed her back to health.',
    quote:
      'The hands that cared for me taught me how to care for others. That is the circle I live inside now.',
    fullStory: [
      'Grace was eight when she arrived, frightened and unwell. Our clinic team treated her through a long recovery and never left her side.',
      'She decided early that she wanted to wear the same uniform as the nurses who comforted her.',
      'With a scholarship and relentless effort, Grace completed her nursing degree.',
      'Now she works in our clinics, holding the hands of children the way hers were once held.',
    ],
    outcome: 'Qualified nurse',
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: PhotoKey;
  portrait?: string;
  figure?: FigureKind;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'I have visited many foundations. Few combine this level of warmth with this level of rigor. Horizon earns every ounce of trust it is given.',
    name: 'Dr Helen Mensah',
    role: 'Pediatrician and program advisor',
    photo: 'teamLeader',
    portrait: '/people/helen.jpg',
    figure: 'female',
  },
  {
    quote:
      'Sponsoring a child here changed my life as much as theirs. The updates, the honesty, the obvious love in every home. It is the real thing.',
    name: 'Marcus Bennett',
    role: 'Monthly sponsor since 2016',
  },
  {
    quote:
      'As a corporate partner we expected good work. What we found was world class stewardship and children who are genuinely flourishing.',
    name: 'Priya Raman',
    role: 'Head of social impact, Northwind Group',
  },
];

export type VideoStory = {
  slug: string;
  title: string;
  name: string;
  duration: string;
  video: string;
  poster: string;
  seed: string;
  figure: FigureKind;
};

export const videoStories: VideoStory[] = [
  {
    slug: 'amina-the-engineer',
    title: 'From the street to engineering',
    name: 'Amina, 19',
    duration: '0:12',
    video: '/stories/amina-the-engineer.mp4',
    poster: '/stories/amina-the-engineer.jpg',
    seed: 'video-amina',
    figure: 'female',
  },
  {
    slug: 'daniel-the-carpenter',
    title: 'A future built by hand',
    name: 'Daniel, 21',
    duration: '0:12',
    video: '/stories/daniel-the-carpenter.mp4',
    poster: '/stories/daniel-the-carpenter.jpg',
    seed: 'video-daniel',
    figure: 'male',
  },
  {
    slug: 'grace-the-nurse',
    title: 'The girl our clinic saved',
    name: 'Grace, 23',
    duration: '0:12',
    video: '/stories/grace-the-nurse.mp4',
    poster: '/stories/grace-the-nurse.jpg',
    seed: 'video-grace',
    figure: 'female',
  },
];
