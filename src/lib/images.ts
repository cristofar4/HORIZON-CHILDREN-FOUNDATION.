/**
 * Curated photography references.
 *
 * Each entry pairs a real photograph (served from a production image CDN) with a
 * deterministic "seed" and "tone" that drive an on brand gradient illustration.
 * The Photo component shows the branded illustration immediately and fades the
 * photograph in on top once it loads, so the experience is always polished even
 * when a network blocks the remote image.
 */

export type PhotoTone = 'horizon' | 'dawn' | 'sage' | 'blush' | 'dusk' | 'mist';

export type PhotoRef = {
  src: string;
  alt: string;
  seed: string;
  tone: PhotoTone;
};

/** Build a sized photograph URL from an image id. */
function u(id: string, w = 1400): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const photos = {
  heroChild: {
    src: u('photo-1503454537195-1dcabb73ffb9'),
    alt: 'A child looking toward a bright horizon at dusk',
    seed: 'hero-child',
    tone: 'dusk',
  },
  classroom: {
    src: u('photo-1497486751825-1233686d5d80'),
    alt: 'Children learning together in a bright classroom',
    seed: 'classroom',
    tone: 'horizon',
  },
  reading: {
    src: u('photo-1503676260728-1c00da094a0b'),
    alt: 'A young student reading a book with focus',
    seed: 'reading',
    tone: 'dawn',
  },
  healthcare: {
    src: u('photo-1559757148-5c350d0d3c56'),
    alt: 'A caregiver checking on a child during a health visit',
    seed: 'healthcare',
    tone: 'mist',
  },
  nutrition: {
    src: u('photo-1488521787991-ed7bbaae773c'),
    alt: 'Warm meals being shared at a community kitchen',
    seed: 'nutrition',
    tone: 'dawn',
  },
  shelter: {
    src: u('photo-1518398046578-8cca57782e17'),
    alt: 'A safe and welcoming home for children',
    seed: 'shelter',
    tone: 'sage',
  },
  skills: {
    src: u('photo-1573164713988-8665fc963095'),
    alt: 'Young people learning practical skills together',
    seed: 'skills',
    tone: 'horizon',
  },
  community: {
    src: u('photo-1469571486292-0ba58a3f068b'),
    alt: 'Community members gathering in support of children',
    seed: 'community',
    tone: 'blush',
  },
  caregiver: {
    src: u('photo-1591474200742-8e512e6f98f8'),
    alt: 'A caregiver holding a smiling child',
    seed: 'caregiver',
    tone: 'dawn',
  },
  joy: {
    src: u('photo-1542652694-40abf526446e'),
    alt: 'Children laughing together outdoors',
    seed: 'joy',
    tone: 'dawn',
  },
  graduation: {
    src: u('photo-1523050854058-8df90110c9f1'),
    alt: 'A graduate celebrating an academic milestone',
    seed: 'graduation',
    tone: 'horizon',
  },
  volunteerField: {
    src: u('photo-1488190211105-8b0e65b80b4e'),
    alt: 'Volunteers working side by side in the field',
    seed: 'volunteer-field',
    tone: 'sage',
  },
  water: {
    src: u('photo-1541252260730-0412e8e2108e'),
    alt: 'Clean water reaching a rural community',
    seed: 'water',
    tone: 'mist',
  },
  portrait1: {
    src: u('photo-1517070208541-6ddc4d3efbcb', 900),
    alt: 'Portrait of a hopeful young girl',
    seed: 'portrait-1',
    tone: 'dawn',
  },
  portrait2: {
    src: u('photo-1545048702-79362596cdc9', 900),
    alt: 'Portrait of a determined young boy',
    seed: 'portrait-2',
    tone: 'horizon',
  },
  portrait3: {
    src: u('photo-1531123897727-8f129e1688ce', 900),
    alt: 'Portrait of a smiling student',
    seed: 'portrait-3',
    tone: 'blush',
  },
  teamLeader: {
    src: u('photo-1573496359142-b8d87734a5a2', 900),
    alt: 'Portrait of a foundation leader',
    seed: 'team-leader',
    tone: 'horizon',
  },
} satisfies Record<string, PhotoRef>;

export type PhotoKey = keyof typeof photos;
