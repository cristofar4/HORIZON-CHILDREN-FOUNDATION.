# Horizon Children Foundation

A premium nonprofit experience for an orphanage and child welfare foundation, built to inspire trust, compassion, hope, and action. Every section tells a meaningful story, and the home page opens with a cinematic, hand built animation: a child waiting beneath a solar street light, a bus that arrives to carry her to her new home, and a sunrise breaking over the horizon.

## Tech stack

- **Next.js 14** with the App Router and TypeScript
- **Tailwind CSS** with a custom warm white and soft blue design system
- **GSAP** with ScrollTrigger for the hero film, parallax, counters, and scroll storytelling
- **Framer Motion** for page transitions, menus, and micro interactions
- **Lenis** for buttery smooth scrolling, wired into the GSAP ticker

## Pages

Home, About Us, Our Story, Children and Programs, Gallery, Success Stories, Volunteer, Donate, Partners, and Contact, plus a custom 404, sitemap, and robots route.

## Getting started

```bash
npm install
npm run dev      # start the development server at http://localhost:3000
npm run build    # create an optimized production build
npm run start    # serve the production build
npm run lint     # run eslint
```

Requires Node 18.18 or newer.

## Project structure

```
src/
  app/                 routes, layout, metadata, sitemap, robots
  components/
    home/              hero film and home only sections
    sections/          reusable page sections (programs, stories, cta, gallery, faqs)
    donate/            donation form, sponsorship plans, live impact calculator
    volunteer/         volunteer application form
    contact/           contact form
    layout/            navbar, footer, scroll progress, back to top
    providers/         Lenis smooth scroll provider
    ui/                design system primitives, icons, the resilient Photo component
  data/                all site content (programs, stories, team, impact, gallery, faqs)
  lib/                 site config, gsap setup, image references, helpers
```

## Notable engineering decisions

- **The hero film** is authored entirely in SVG and animated with a single GSAP timeline, so it is light, sharp at any size, replayable, and fully self contained. It honors reduced motion preferences by settling into a calm final frame.
- **Resilient imagery.** The `Photo` component paints an on brand generative gradient scene immediately, then fades a real photograph over it once the network delivers one. A blocked or missing image simply leaves the elegant scene in place, so there is never a broken image and the layout never shifts.
- **Accessibility and performance.** Semantic landmarks, a skip link, keyboard friendly menus and lightbox, reduced motion support, responsive layouts, and statically generated pages.
- **Forms** for donations, volunteering, and contact are fully built and validated with realistic, simulated submission flows. They are structured so a payment provider and a back end can be connected in production.

## Notes

Copy throughout the site is intentionally written without hyphens. Photographs load from a production image CDN when the network allows, and gracefully fall back to the branded scenes otherwise.
