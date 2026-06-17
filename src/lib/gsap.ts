'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Register GSAP plugins exactly once on the client. Importing this module from
 * any client component guarantees ScrollTrigger is available and configured.
 */
if (typeof window !== 'undefined' && !(gsap as unknown as { _horizonReady?: boolean })._horizonReady) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  ScrollTrigger.config({ ignoreMobileResize: true });
  (gsap as unknown as { _horizonReady?: boolean })._horizonReady = true;
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
