'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Photo } from '@/components/ui/Photo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon, type IconKey } from '@/components/ui/iconMap';
import { Play, Pause, Replay, Close, Heart, Clock } from '@/components/ui/icons';

/**
 * If you have your own explainer film, drop it in at public/explainer.mp4 and the
 * player switches to it automatically. Until then it plays the animated film below,
 * which explains exactly what Horizon Children Foundation does.
 */
const EXPLAINER_SOURCES = ['/explainer.mp4'];

type Scene = {
  icon: IconKey;
  caption: string;
  sub: string;
  from: string;
  via: string;
};

const SCENES: Scene[] = [
  {
    icon: 'heart',
    caption: 'It begins with a child alone in the dark.',
    sub: 'Every night, somewhere, a child waits for someone to come.',
    from: '#0B1B33',
    via: '#27406B',
  },
  {
    icon: 'shelter',
    caption: 'We bring them home.',
    sub: 'Not an institution. A real family home, warm and safe.',
    from: '#1C446C',
    via: '#2766A1',
  },
  {
    icon: 'education',
    caption: 'We open the classroom door.',
    sub: 'Full scholarships, learning centers, and patient mentoring.',
    from: '#8C401E',
    via: '#E8862A',
  },
  {
    icon: 'healthcare',
    caption: 'We keep them healthy.',
    sub: 'On site clinics and care whenever a child needs it.',
    from: '#1E4A5A',
    via: '#3E8497',
  },
  {
    icon: 'nutrition',
    caption: 'We feed them, every day.',
    sub: 'Three balanced meals so growing bodies can thrive.',
    from: '#244B40',
    via: '#3E7F63',
  },
  {
    icon: 'graduation',
    caption: 'We help them build a future.',
    sub: 'Skills, apprenticeships, and the confidence to choose their path.',
    from: '#1C446C',
    via: '#3580BE',
  },
  {
    icon: 'globe',
    caption: 'This is Horizon Children Foundation.',
    sub: 'Join us, and a child you may never meet will never forget you.',
    from: '#11253B',
    via: '#1F5184',
  },
];

export function StoryFilm() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Watch our film"
          title="Ninety seconds that explain everything"
          intro="Press play to see exactly how Horizon turns your support into a safe home, an education, healthcare, and a future for a child who has no one."
        />

        <Reveal variant="scale" className="mt-12">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play the Horizon film"
            className="group relative block w-full overflow-hidden rounded-[2rem] shadow-lift"
          >
            <Photo
              src="/explainer-poster.jpg"
              alt="The Horizon Children Foundation film"
              seed="story-film"
              tone="dusk"
              className="aspect-[16/9] w-full transition-transform duration-[1.6s] ease-horizon group-hover:scale-[1.04]"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-horizon-950/80 via-horizon-950/25 to-horizon-950/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-cream-50/95 text-horizon-700 shadow-lift transition-transform duration-500 ease-horizon group-hover:scale-110 sm:h-24 sm:w-24">
                <span className="absolute inset-0 animate-ping rounded-full bg-cream-50/40" />
                <Play className="ml-1 h-8 w-8 sm:h-9 sm:w-9" />
              </span>
              <p className="mt-6 font-serif text-2xl text-cream-50 sm:text-3xl">The Horizon story</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-cream-100/80">
                <Clock className="h-4 w-4" />
                90 seconds
              </p>
            </div>
          </button>
        </Reveal>
      </div>

      <AnimatePresence>{open && <FilmModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
}

function FilmModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'film' | 'video'>('video');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-horizon-950 shadow-lift"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close film"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/40 text-cream-50 backdrop-blur transition-colors hover:bg-ink/60"
        >
          <Close className="h-5 w-5" />
        </button>

        {/* Real explainer film, with the animated film as a graceful fallback */}
        {mode === 'video' ? (
          <video
            className="aspect-video w-full bg-black"
            poster="/explainer-poster.jpg"
            controls
            autoPlay
            muted
            playsInline
            onError={() => setMode('film')}
          >
            {EXPLAINER_SOURCES.map((src) => (
              <source key={src} src={src} type="video/mp4" />
            ))}
          </video>
        ) : (
          <AnimatedFilm onClose={onClose} />
        )}
      </motion.div>
    </motion.div>
  );
}

function AnimatedFilm({ onClose }: { onClose: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(false);
  const reduced = typeof window !== 'undefined' && prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = stage.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const DUR = 3.6;

    const ctx = gsap.context(() => {
      gsap.set(q('.scene'), { autoAlpha: 0 });
      const master = gsap.timeline({
        onUpdate: () => setProgress(master.progress()),
        onComplete: () => {
          setEnded(true);
          setPlaying(false);
        },
      });

      SCENES.forEach((_, i) => {
        const scene = q(`.scene-${i}`);
        const icon = scene[0]?.querySelector('.s-icon');
        const cap = scene[0]?.querySelector('.s-cap');
        const sub = scene[0]?.querySelector('.s-sub');
        const at = i * DUR;
        master.to(scene, { autoAlpha: 1, duration: 0.7 }, at);
        master.fromTo(icon, { scale: 0.7, y: 12 }, { scale: 1, y: 0, duration: 1, ease: 'back.out(1.5)' }, at + 0.1);
        master.fromTo([cap, sub], { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, at + 0.35);
        master.to(icon, { scale: 1.08, duration: DUR, ease: 'none' }, at);
        if (i < SCENES.length - 1) {
          master.to(scene, { autoAlpha: 0, duration: 0.7 }, at + DUR - 0.2);
        }
      });
      master.to({}, { duration: 0.8 });
      tl.current = master;
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  const toggle = () => {
    const t = tl.current;
    if (!t) return;
    if (ended) {
      t.restart();
      setEnded(false);
      setPlaying(true);
      return;
    }
    if (t.paused()) {
      t.play();
      setPlaying(true);
    } else {
      t.pause();
      setPlaying(false);
    }
  };

  if (reduced) {
    return (
      <div className="max-h-[80vh] overflow-y-auto p-8 text-cream-50">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-dawn-200">What we do</p>
        <ul className="mt-6 space-y-5">
          {SCENES.map((s) => (
            <li key={s.caption} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream-50/10 text-dawn-300">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-serif text-xl">{s.caption}</p>
                <p className="text-sm text-cream-200/75">{s.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={stage} className="relative aspect-video w-full overflow-hidden">
        {SCENES.map((s, i) => (
          <div
            key={i}
            className={`scene scene-${i} absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-12`}
            style={{ background: `linear-gradient(135deg, ${s.from}, ${s.via})` }}
          >
            <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.08]" />
            <span className="s-icon relative flex h-20 w-20 items-center justify-center rounded-[1.4rem] bg-cream-50/10 text-cream-50 ring-1 ring-cream-50/20 backdrop-blur sm:h-24 sm:w-24">
              <Icon name={s.icon} className="h-10 w-10 sm:h-12 sm:w-12" />
            </span>
            <p className="s-cap mt-7 max-w-xl font-serif text-2xl font-semibold leading-snug tracking-tight text-cream-50 sm:text-4xl">
              {s.caption}
            </p>
            <p className="s-sub mt-3 max-w-md text-sm text-cream-200/80 sm:text-base">{s.sub}</p>
            {i === SCENES.length - 1 && (
              <Link
                href="/donate"
                onClick={onClose}
                className="btn-dawn mt-7 px-6 py-3"
              >
                <Heart className="h-4 w-4" />
                Donate now
              </Link>
            )}
          </div>
        ))}

        {/* subtle film vignette */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]" />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 bg-horizon-950 px-5 py-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={ended ? 'Replay film' : playing ? 'Pause film' : 'Play film'}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dawn-400 text-ink transition-transform hover:scale-105"
        >
          {ended ? <Replay className="h-5 w-5" /> : playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-50/15">
          <div
            className="h-full rounded-full bg-gradient-to-r from-horizon-400 to-dawn-400"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-medium text-cream-200/70">The Horizon story</span>
      </div>
    </div>
  );
}
