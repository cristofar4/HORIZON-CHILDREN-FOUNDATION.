import Link from 'next/link';
import { cn } from '@/lib/utils';

/** The Horizon mark: a rising sun cresting a horizon line, framing hope. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3BC6E" />
          <stop offset="100%" stopColor="#E8862A" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" className="fill-horizon-700" />
      <circle cx="20" cy="22.5" r="7.5" fill="url(#logo-sun)" />
      <g stroke="#F3BC6E" strokeWidth="1.6" strokeLinecap="round">
        <path d="M20 7.5v3.2" />
        <path d="M31.5 13.5l-2.4 2.1" />
        <path d="M8.5 13.5l2.4 2.1" />
      </g>
      <path d="M6 26h28" stroke="#DAEAF7" strokeWidth="2" strokeLinecap="round" />
      <path d="M9.5 30h21" stroke="#88BBE1" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function Logo({
  className,
  textClassName,
  href = '/',
}: {
  className?: string;
  textClassName?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Horizon Children Foundation home"
      className={cn('group inline-flex items-center gap-3', className)}
    >
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-500 ease-horizon group-hover:rotate-[8deg]" />
      <span className={cn('flex flex-col leading-none', textClassName)}>
        <span className="font-serif text-lg font-semibold tracking-tight">Horizon</span>
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] opacity-70">
          Children Foundation
        </span>
      </span>
    </Link>
  );
}
