export const site = {
  name: 'Horizon Children Foundation',
  shortName: 'Horizon',
  tagline: 'Every child deserves a horizon worth running toward.',
  description:
    'Horizon Children Foundation gives orphaned and vulnerable children a safe home, an education, healthcare, and the loving care they need to thrive. Join a global community of donors, volunteers, and partners building brighter futures.',
  url: 'https://horizonchildren.org',
  email: 'hello@horizonchildren.org',
  supportEmail: 'care@horizonchildren.org',
  phone: '+1 (202) 555 0184',
  phoneHref: '+12025550184',
  address: {
    line1: '1200 Compassion Avenue',
    line2: 'Suite 300',
    city: 'Washington',
    region: 'District of Columbia',
    postal: '20009',
    country: 'United States',
  },
  hours: 'Monday to Friday, 9am to 6pm',
  founded: 2009,
  ein: '47 0921634',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
    x: 'https://x.com',
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about', description: 'Mission, vision and the people behind Horizon' },
  { label: 'Our Story', href: '/our-story', description: 'How a single rescue grew into a movement' },
  { label: 'Programs', href: '/programs', description: 'Education, healthcare, nutrition and care' },
  { label: 'Gallery', href: '/gallery', description: 'Moments from the field' },
  { label: 'Success Stories', href: '/success-stories', description: 'Lives transformed, in their own words' },
  { label: 'Volunteer', href: '/volunteer', description: 'Lend your time and talent' },
  { label: 'Partners', href: '/partners', description: 'Organizations building with us' },
  { label: 'Contact', href: '/contact', description: 'Reach our team' },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Foundation',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/our-story' },
      { label: 'Programs', href: '/programs' },
      { label: 'Partners', href: '/partners' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Donate', href: '/donate' },
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Success Stories', href: '/success-stories' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Newsletter', href: '/contact#newsletter' },
      { label: 'Careers', href: '/contact' },
      { label: 'Press', href: '/contact' },
    ],
  },
];
