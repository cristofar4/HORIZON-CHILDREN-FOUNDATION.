'use client';

import { useState } from 'react';
import type { PhotoTone } from '@/lib/images';
import { cn } from '@/lib/utils';

type TonePalette = {
  from: string;
  via: string;
  to: string;
  glow: string;
  accent: string;
};

const TONES: Record<PhotoTone, TonePalette> = {
  horizon: { from: '#1C446C', via: '#2766A1', to: '#88BBE1', glow: '#B6D5EE', accent: '#F3BC6E' },
  dawn: { from: '#8C401E', via: '#E8862A', to: '#F8D7A6', glow: '#FCEDD3', accent: '#88BBE1' },
  sage: { from: '#244B40', via: '#3E7F63', to: '#A8CDB4', glow: '#D6E9D9', accent: '#F3BC6E' },
  blush: { from: '#7C3050', via: '#C56B86', to: '#F3C9D2', glow: '#FBE3E7', accent: '#88BBE1' },
  dusk: { from: '#172A4A', via: '#4A4E8C', to: '#E8862A', glow: '#F3BC6E', accent: '#B6D5EE' },
  mist: { from: '#1E4A5A', via: '#3E8497', to: '#AEDDE4', glow: '#DCF1F2', accent: '#F3BC6E' },
};

/** Deterministic hash so a given seed always paints the same scene. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export type FigureKind = 'female' | 'male' | 'child';

/** A tasteful head and shoulders silhouette so portrait placeholders always read
 * as a person of the right gender, matching the name they accompany. */
function Figure({ kind, color }: { kind: FigureKind; color: string }) {
  const headY = kind === 'child' ? 46 : 43;
  const headR = kind === 'child' ? 12.5 : 14.5;
  return (
    <g fill={color}>
      {/* hair framing, varies subtly by figure */}
      {kind === 'female' && (
        <>
          <path
            d={`M${50 - headR - 3} ${headY + 3} a ${headR + 3} ${headR + 5} 0 1 1 ${(headR + 3) * 2} 0 Z`}
            opacity="0.92"
          />
          {/* soft hair falling along the sides of the face */}
          <path
            d={`M${50 - headR - 3} ${headY + 1} q -2 12 3 18 q 3 -3 3 -9 q -3 -4 -3 -9 Z`}
            opacity="0.92"
          />
          <path
            d={`M${50 + headR + 3} ${headY + 1} q 2 12 -3 18 q -3 -3 -3 -9 q 3 -4 3 -9 Z`}
            opacity="0.92"
          />
        </>
      )}
      {kind === 'male' && (
        <path d={`M${50 - headR} ${headY - 3} q ${headR} -13 ${headR * 2} 0 q -${headR} -7 -${headR * 2} 0 Z`} opacity="0.9" />
      )}
      <circle cx="50" cy={headY} r={headR} />
      <path
        d={`M${kind === 'child' ? 30 : 24} 100 C ${kind === 'child' ? 30 : 24} ${kind === 'child' ? 82 : 78}, 38 ${headY + headR + 6}, 50 ${headY + headR + 6} C 62 ${headY + headR + 6}, ${kind === 'child' ? 70 : 76} ${kind === 'child' ? 82 : 78}, ${kind === 'child' ? 70 : 76} 100 Z`}
      />
    </g>
  );
}

function GenerativeScene({ seed, tone, figure }: { seed: string; tone: PhotoTone; figure?: FigureKind }) {
  const p = TONES[tone];
  const r = hash(seed);
  const r2 = hash(seed + 'x');
  const r3 = hash(seed + 'y');
  const gid = `g-${seed.replace(/[^a-z0-9]/gi, '')}`;
  const sun = 24 + r * 52;

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="55%" stopColor={p.via} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <radialGradient id={`${gid}-sun`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.95" />
          <stop offset="60%" stopColor={p.accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gid}-halo`} cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.65" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${gid}-bg)`} />
      <circle cx={sun} cy={28 + r2 * 26} r={26 + r3 * 12} fill={`url(#${gid}-sun)`} />
      <circle cx={12 + r2 * 76} cy={70 + r * 22} r={30 + r2 * 16} fill={p.glow} opacity="0.16" />
      <circle cx={70 + r3 * 24} cy={16 + r3 * 20} r={10 + r * 8} fill={p.accent} opacity="0.18" />
      <path
        d={`M0 ${74 + r * 8} Q 30 ${66 + r2 * 8} 52 ${72 + r3 * 6} T 100 ${70 + r * 6} V100 H0 Z`}
        fill={p.from}
        opacity="0.32"
      />
      <path
        d={`M0 ${84 + r2 * 6} Q 40 ${78 + r * 6} 64 ${82 + r2 * 5} T 100 ${80 + r3 * 5} V100 H0 Z`}
        fill={p.from}
        opacity="0.5"
      />
      {figure && (
        <>
          <rect width="100" height="100" fill={`url(#${gid}-halo)`} />
          <g opacity="0.62">
            <Figure kind={figure} color="#13243A" />
          </g>
        </>
      )}
    </svg>
  );
}

export type PhotoProps = {
  src?: string;
  alt: string;
  seed: string;
  tone?: PhotoTone;
  figure?: FigureKind;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
  overlay?: boolean;
};

/**
 * Resilient image. Paints an on brand generative scene at once, then fades a real
 * photograph over it when the network delivers one. A failed or blocked image
 * simply leaves the elegant scene in place, so there is never a broken state.
 */
export function Photo({
  src,
  alt,
  seed,
  tone = 'horizon',
  figure,
  className,
  imgClassName,
  priority = false,
  sizes = '100vw',
  rounded = false,
  overlay = false,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-horizon-900',
        rounded && 'rounded-3xl',
        className,
      )}
    >
      <GenerativeScene seed={seed} tone={tone} figure={figure} />

      {/* The gender correct silhouette above shows instantly and stays as the
          fallback; a real photograph fades in over it once it loads. */}
      {src && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          // @ts-expect-error fetchpriority is a valid html attribute
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-horizon',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay" />
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      )}
    </div>
  );
}
