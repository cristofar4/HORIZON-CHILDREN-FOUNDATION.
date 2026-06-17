import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { BackToTop } from '@/components/layout/BackToTop';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Safe homes, bright futures`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'orphanage',
    'child welfare',
    'children foundation',
    'donate to children',
    'child sponsorship',
    'nonprofit',
    'volunteer',
    'education for children',
    'healthcare for children',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Safe homes, bright futures`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Safe homes, bright futures`,
    description: site.description,
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
  },
  robots: { index: true, follow: true },
  category: 'nonprofit',
};

export const viewport: Viewport = {
  themeColor: '#1F5184',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    description: site.description,
    foundingDate: String(site.founded),
    email: site.email,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    sameAs: Object.values(site.social),
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-horizon-700 px-5 py-2.5 text-sm font-semibold text-cream-50 focus:not-sr-only focus:fixed focus:left-5 focus:top-5"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <BackToTop />
      </body>
    </html>
  );
}
