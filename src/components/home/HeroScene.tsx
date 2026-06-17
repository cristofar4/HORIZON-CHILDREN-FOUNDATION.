'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * The cinematic foundation story, told in pure SVG and animated with GSAP.
 *
 * A child waits beneath a solar street light at night. A Horizon bus arrives,
 * a caregiver steps down and lifts her aboard, and as the bus carries her toward
 * her new home, dawn breaks across the horizon. The whole sequence is driven by
 * one master timeline so it stays perfectly in sync and can be replayed.
 */
export function HeroScene({ onReady }: { onReady?: (replay: () => void) => void }) {
  const root = useRef<SVGSVGElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // A scattering of stars, generated once.
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        x: (i * 53) % 1200,
        y: 20 + ((i * 79) % 330),
        r: 0.6 + ((i * 13) % 10) / 7,
        d: (i % 9) * 0.18,
      })),
    [],
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    const setStatic = () => {
      gsap.set(q('.h-dawn'), { opacity: 1 });
      gsap.set(q('.h-sun'), { y: -150, opacity: 1 });
      gsap.set(q('.h-star, .h-moon'), { opacity: 0 });
      gsap.set(q('.h-streetglow, .h-cone'), { opacity: 0.25 });
      gsap.set(q('.h-bus'), { x: 0 });
      gsap.set(q('.h-door'), { scaleX: 0.08 });
      gsap.set(q('.h-headlight'), { opacity: 0 });
      gsap.set(q('.h-caregiver'), { opacity: 1, x: -150 });
      gsap.set(q('.h-child'), { x: 20, y: -44, rotation: -5, opacity: 1 });
    };

    const ctx = gsap.context(() => {
      // Initial state.
      gsap.set(q('.h-bus'), { x: 880 });
      gsap.set(q('.h-caregiver'), { opacity: 0, x: 0 });
      gsap.set(q('.h-door'), { scaleX: 1 });
      gsap.set(q('.h-dawn'), { opacity: 0 });
      gsap.set(q('.h-sun'), { y: 120, opacity: 0 });
      gsap.set(q('.h-headlight'), { opacity: 0 });
      gsap.set(q('.h-sparkle'), { scale: 0, opacity: 0, transformOrigin: 'center' });
      gsap.set(q('.h-dust'), { opacity: 0, scale: 0.4, transformOrigin: 'center bottom' });

      // Ambient loops that always run.
      gsap.to(q('.h-star'), {
        opacity: 0.25,
        duration: 1.4,
        ease: 'sine.inOut',
        stagger: { each: 0.06, from: 'random', yoyo: true, repeat: -1 },
      });
      gsap.to(q('.h-child-breath'), {
        scaleY: 1.03,
        transformOrigin: 'center bottom',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(q('.h-streetglow'), {
        opacity: 0.85,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      if (prefersReducedMotion()) {
        setStatic();
        return;
      }

      const master = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.current = master;

      // Bus arrives from the right.
      master
        .to(q('.h-headlight'), { opacity: 1, duration: 0.4 }, 0.6)
        .to(q('.h-bus'), { x: 0, duration: 2.4, ease: 'power3.inOut' }, 0.7)
        .to(q('.h-wheel'), { rotation: 900, transformOrigin: 'center', duration: 2.4, ease: 'power3.inOut' }, 0.7)
        // Settle and a small dust puff at the stop.
        .to(q('.h-bus'), { y: -6, duration: 0.12, yoyo: true, repeat: 1 }, 3.0)
        .fromTo(q('.h-dust'), { opacity: 0.7, scale: 0.4 }, { opacity: 0, scale: 1.5, duration: 0.9 }, 3.0)
        // Door opens.
        .to(q('.h-door'), { scaleX: 0.08, duration: 0.5, ease: 'power2.inOut' }, 3.4)
        // Caregiver steps out and walks to the child.
        .to(q('.h-caregiver'), { opacity: 1, duration: 0.3 }, 3.7)
        .to(q('.h-caregiver'), { x: -150, duration: 1.5, ease: 'power1.inOut' }, 3.8)
        .to(q('.h-caregiver-leg-a'), { rotation: 16, transformOrigin: 'top center', duration: 0.3, repeat: 4, yoyo: true, ease: 'sine.inOut' }, 3.8)
        .to(q('.h-caregiver-leg-b'), { rotation: -16, transformOrigin: 'top center', duration: 0.3, repeat: 4, yoyo: true, ease: 'sine.inOut' }, 3.95)
        // The lift: child rises into the caregiver's arms with a sparkle of hope.
        .to(q('.h-child'), { y: -44, x: 20, rotation: -5, duration: 0.7, ease: 'back.out(1.4)' }, 5.5)
        .fromTo(q('.h-sparkle'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, 5.6)
        .to(q('.h-sparkle'), { scale: 0, opacity: 0, duration: 0.5 }, 6.4)
        // Caregiver and child return to the bus together.
        .to(q('.h-caregiver, .h-child'), { x: '+=150', duration: 1.5, ease: 'power1.inOut' }, 6.4)
        // They board; the figures ease into the bus and the door closes.
        .to(q('.h-caregiver, .h-child'), { x: '+=26', opacity: 0, duration: 0.6 }, 7.9)
        .to(q('.h-door'), { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 8.1)
        // Dawn breaks: sun rises, night fades, the new day begins.
        .to(q('.h-dawn'), { opacity: 1, duration: 2.4, ease: 'sine.inOut' }, 8.4)
        .to(q('.h-sun'), { y: -150, opacity: 1, duration: 2.6, ease: 'power2.out' }, 8.4)
        .to(q('.h-star, .h-moon'), { opacity: 0, duration: 1.6 }, 8.4)
        .to(q('.h-cone, .h-streetglow'), { opacity: 0.2, duration: 1.6 }, 8.6)
        .to(q('.h-headlight'), { opacity: 0, duration: 0.8 }, 8.8)
        // The bus departs toward her new home.
        .to(q('.h-bus'), { x: -1320, duration: 3.2, ease: 'power2.in' }, 9.0)
        .to(q('.h-wheel'), { rotation: '+=1440', transformOrigin: 'center', duration: 3.2, ease: 'power2.in' }, 9.0)
        .to(q('.h-birds'), { opacity: 1, x: -60, duration: 3, ease: 'sine.inOut' }, 9.6);

      onReady?.(() => master.restart());
    }, el);

    return () => ctx.revert();
  }, [onReady]);

  return (
    <svg
      ref={root}
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="h-sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1B33" />
          <stop offset="45%" stopColor="#142A4C" />
          <stop offset="100%" stopColor="#27406B" />
        </linearGradient>
        <linearGradient id="h-sky-dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#214E7E" />
          <stop offset="42%" stopColor="#E89B6C" />
          <stop offset="72%" stopColor="#F6C57E" />
          <stop offset="100%" stopColor="#FBE2B0" />
        </linearGradient>
        <radialGradient id="h-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF4D6" />
          <stop offset="35%" stopColor="#F9C66B" />
          <stop offset="100%" stopColor="#F9C66B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="h-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23364F" />
          <stop offset="100%" stopColor="#16263C" />
        </linearGradient>
        <linearGradient id="h-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE3A6" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FFE3A6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="h-pool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE3A6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFE3A6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="h-bus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF8F2" />
          <stop offset="100%" stopColor="#E7EEF6" />
        </linearGradient>
        <radialGradient id="h-headlight" cx="0%" cy="50%" r="90%">
          <stop offset="0%" stopColor="#FFF4D0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFF4D0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky layers */}
      <rect width="1200" height="760" fill="url(#h-sky-night)" />
      <rect className="h-dawn" width="1200" height="760" fill="url(#h-sky-dawn)" opacity="0" />

      {/* Moon */}
      <g className="h-moon">
        <circle cx="250" cy="150" r="34" fill="#FBE9C6" opacity="0.9" />
        <circle cx="250" cy="150" r="58" fill="#FBE9C6" opacity="0.12" />
      </g>

      {/* Stars */}
      {stars.map((s, i) => (
        <circle key={i} className="h-star" cx={s.x} cy={s.y} r={s.r} fill="#EAF2FF" opacity="0.85" />
      ))}

      {/* Sun (dawn) */}
      <g className="h-sun" opacity="0">
        <circle cx="900" cy="300" r="150" fill="url(#h-sun-glow)" />
        <circle cx="900" cy="300" r="58" fill="#FFEFC2" />
      </g>

      {/* Distant hills */}
      <path d="M0 520 Q 220 452 460 506 T 900 496 T 1200 510 V760 H0 Z" fill="#2B4D74" opacity="0.55" />
      <path d="M0 540 Q 320 486 640 528 T 1200 524 V760 H0 Z" fill="#24405F" opacity="0.7" />

      {/* Birds (appear at dawn) */}
      <g className="h-birds" opacity="0" stroke="#1B3147" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M740 180 q 12 -10 24 0 q 12 -10 24 0" />
        <path d="M820 150 q 9 -8 18 0 q 9 -8 18 0" />
        <path d="M690 210 q 9 -8 18 0 q 9 -8 18 0" />
      </g>

      {/* Ground / road */}
      <rect y="515" width="1200" height="245" fill="url(#h-ground)" />
      <ellipse className="h-pool" cx="445" cy="520" rx="150" ry="22" fill="url(#h-pool)" />
      {/* Road markings */}
      <g opacity="0.5">
        <rect x="120" y="700" width="70" height="7" rx="3.5" fill="#3C5575" />
        <rect x="320" y="700" width="70" height="7" rx="3.5" fill="#3C5575" />
        <rect x="520" y="700" width="70" height="7" rx="3.5" fill="#3C5575" />
        <rect x="720" y="700" width="70" height="7" rx="3.5" fill="#3C5575" />
        <rect x="920" y="700" width="70" height="7" rx="3.5" fill="#3C5575" />
      </g>

      {/* Solar street light */}
      <g>
        <rect x="436" y="150" width="8" height="372" rx="4" fill="#33485F" />
        {/* Solar panel */}
        <g transform="rotate(-18 440 132)">
          <rect x="404" y="120" width="74" height="26" rx="4" fill="#1C3A5C" stroke="#3E5C80" strokeWidth="2" />
          <line x1="421" y1="121" x2="421" y2="145" stroke="#3E5C80" strokeWidth="1.2" />
          <line x1="440" y1="121" x2="440" y2="145" stroke="#3E5C80" strokeWidth="1.2" />
          <line x1="459" y1="121" x2="459" y2="145" stroke="#3E5C80" strokeWidth="1.2" />
        </g>
        {/* Lamp arm and head */}
        <path d="M440 158 q 28 4 34 26" stroke="#33485F" strokeWidth="7" fill="none" strokeLinecap="round" />
        <rect x="462" y="182" width="30" height="13" rx="6" fill="#43607F" />
        <ellipse className="h-streetglow" cx="477" cy="196" rx="16" ry="7" fill="#FFE3A6" opacity="0.85" />
        {/* Volumetric cone of light */}
        <path className="h-cone" d="M477 198 L 300 520 L 654 520 Z" fill="url(#h-cone)" opacity="0.7" />
      </g>

      {/* The child, sitting beneath the light */}
      <g className="h-child" style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}>
        <g className="h-child-breath">
          <ellipse cx="447" cy="519" rx="34" ry="7" fill="#0C1828" opacity="0.4" />
          {/* small bag */}
          <rect x="404" y="498" width="22" height="20" rx="5" fill="#9C6B3F" />
          <path d="M409 498 q 6 -8 12 0" stroke="#7E5430" strokeWidth="2.5" fill="none" />
          {/* body */}
          <path d="M432 516 q -4 -34 14 -40 q 18 6 14 40 Z" fill="#2E5E8C" />
          {/* folded legs */}
          <path d="M432 516 q 14 -10 30 0 q -2 6 -15 6 q -13 0 -15 -6 Z" fill="#1F4570" />
          <path d="M434 514 q 12 -8 26 0 l -2 5 q -11 -5 -22 0 Z" fill="#24507A" />
          {/* arm hugging knees */}
          <path d="M436 494 q -8 12 0 22" stroke="#2E5E8C" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* head */}
          <circle cx="447" cy="470" r="14" fill="#F1C7A0" />
          <path d="M434 466 q 13 -16 26 0 q -4 -10 -13 -10 q -9 0 -13 10 Z" fill="#3A2A22" />
          {/* warm rim light */}
          <path d="M458 462 a 14 14 0 0 1 0 16" stroke="#FFE3A6" strokeWidth="2" fill="none" opacity="0.8" />
        </g>
        {/* sparkle of hope on lift */}
        <g className="h-sparkle">
          <path d="M470 440 l 4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#FFE08A" />
        </g>
      </g>

      {/* The caregiver */}
      <g className="h-caregiver" opacity="0" style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}>
        <ellipse cx="596" cy="519" rx="22" ry="6" fill="#0C1828" opacity="0.4" />
        {/* legs */}
        <rect className="h-caregiver-leg-a" x="589" y="476" width="8" height="42" rx="4" fill="#243B57" style={{ transformBox: 'fill-box' }} />
        <rect className="h-caregiver-leg-b" x="599" y="476" width="8" height="42" rx="4" fill="#1E3550" style={{ transformBox: 'fill-box' }} />
        {/* torso */}
        <path d="M584 440 q 12 -8 24 0 l 4 40 q -16 8 -32 0 Z" fill="#2766A1" />
        {/* arms reaching forward to hold the child */}
        <path d="M586 452 q -16 6 -22 20" stroke="#2766A1" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M606 452 q 8 6 8 16" stroke="#2766A1" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* head */}
        <circle cx="596" cy="426" r="13" fill="#E8B894" />
        <path d="M584 424 q 12 -15 24 0 q -3 -11 -12 -11 q -9 0 -12 11 Z" fill="#2A1E18" />
      </g>

      {/* The Horizon bus */}
      <g className="h-bus" style={{ transformBox: 'fill-box', transform: 'translateX(880px)' }}>
        {/* headlight beams */}
        <path className="h-headlight" d="M520 432 L 360 392 L 360 506 L 520 470 Z" fill="url(#h-headlight)" />
        {/* dust puff at the wheels on stop */}
        <ellipse className="h-dust" cx="620" cy="500" rx="40" ry="16" fill="#5A6E88" opacity="0" />
        {/* body */}
        <rect x="520" y="300" width="520" height="172" rx="30" fill="url(#h-bus)" stroke="#C9D8E8" strokeWidth="2" />
        {/* roof accent */}
        <path d="M550 300 q -30 0 -30 26 v 8 h 520 v -8 q 0 -26 -30 -26 Z" fill="#2766A1" />
        <rect x="520" y="332" width="520" height="9" fill="#1F5184" />
        {/* windshield (front, facing left) */}
        <path d="M520 348 q 0 -10 12 -10 h 30 v 60 h -42 Z" fill="#BFE0F2" opacity="0.9" />
        {/* side windows */}
        <g fill="#BFE0F2" opacity="0.9">
          <rect x="648" y="348" width="58" height="50" rx="7" />
          <rect x="716" y="348" width="58" height="50" rx="7" />
          <rect x="848" y="348" width="58" height="50" rx="7" />
          <rect x="916" y="348" width="58" height="50" rx="7" />
          <rect x="984" y="348" width="44" height="50" rx="7" />
        </g>
        {/* destination sign */}
        <rect x="560" y="312" width="120" height="16" rx="3" fill="#16293A" />
        <text x="620" y="324" textAnchor="middle" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700" fill="#FBE2B0" letterSpacing="1">
          NEW HOME
        </text>
        {/* wordmark */}
        <text x="812" y="438" textAnchor="middle" fontSize="30" fontFamily="Georgia, serif" fontWeight="700" fill="#1F5184" letterSpacing="1">
          HORIZON
        </text>
        {/* door (opens) */}
        <g className="h-door" style={{ transformBox: 'fill-box', transformOrigin: 'right center' }}>
          <rect x="566" y="350" width="64" height="116" rx="8" fill="#9FC4DE" stroke="#1F5184" strokeWidth="2" />
          <line x1="598" y1="352" x2="598" y2="464" stroke="#1F5184" strokeWidth="2" />
        </g>
        {/* headlights */}
        <circle cx="524" cy="436" r="7" fill="#FFF1C2" />
        <circle cx="524" cy="456" r="5" fill="#FFD27A" />
        {/* bumper */}
        <rect x="514" y="452" width="16" height="22" rx="6" fill="#9FB4CC" />
        {/* wheels */}
        <g>
          <circle cx="620" cy="474" r="34" fill="#1A2738" />
          <circle className="h-wheel" cx="620" cy="474" r="34" fill="none" stroke="#3A4C64" strokeWidth="7" strokeDasharray="6 14" style={{ transformBox: 'fill-box' }} />
          <circle cx="620" cy="474" r="12" fill="#54688A" />
        </g>
        <g>
          <circle cx="900" cy="474" r="34" fill="#1A2738" />
          <circle className="h-wheel" cx="900" cy="474" r="34" fill="none" stroke="#3A4C64" strokeWidth="7" strokeDasharray="6 14" style={{ transformBox: 'fill-box' }} />
          <circle cx="900" cy="474" r="12" fill="#54688A" />
        </g>
      </g>
    </svg>
  );
}
