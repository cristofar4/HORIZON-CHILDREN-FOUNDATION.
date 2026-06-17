import Link from 'next/link';
import { LogoMark } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-cream py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-dawn-200/40 blur-3xl"
      />
      <div className="container-narrow relative text-center">
        <LogoMark className="mx-auto h-16 w-16" />
        <p className="mt-8 font-serif text-7xl font-semibold tracking-tight text-horizon-700 sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          This path leads into the dark
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          The page you are looking for has moved or never existed. Let us guide you back toward the
          light.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary">
            Return home
          </Button>
          <Button href="/donate" variant="ghost" withArrow>
            Make a donation
          </Button>
        </div>
      </div>
    </section>
  );
}
