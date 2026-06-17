'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { mainNav, site } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { Magnetic } from '@/components/ui/Magnetic';
import { Menu, Close, Heart, Phone, Mail } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and close the menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[95] transition-all duration-500 ease-horizon',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div className="container-x">
        <nav
          className={cn(
            'flex items-center justify-between gap-6 rounded-full px-4 py-2.5 transition-all duration-500 ease-horizon sm:px-5',
            scrolled
              ? 'glass border border-cream-300/70 shadow-soft'
              : 'border border-transparent',
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-0.5 xl:flex">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative rounded-full px-3 py-2 text-[0.92rem] font-medium transition-colors duration-300',
                    isActive(link.href)
                      ? 'text-horizon-700'
                      : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-horizon-100/80"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <Magnetic className="hidden sm:block">
              <Link
                href="/donate"
                className="btn-dawn px-5 py-2.5 text-sm shadow-soft"
              >
                <Heart className="h-4 w-4" />
                Donate
              </Link>
            </Magnetic>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-300/70 bg-cream-50/70 text-ink transition-colors hover:bg-cream-200 xl:hidden"
            >
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && <MobileMenu pathname={pathname} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 top-0 z-[80] h-[100dvh] overflow-y-auto bg-cream xl:hidden"
    >
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="container-x relative flex min-h-[100dvh] flex-col pb-12 pt-28">
        <ul className="flex flex-col">
          {mainNav.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-cream-300/80"
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(
                  'flex items-baseline justify-between gap-4 py-4',
                  isActive(link.href) ? 'text-horizon-700' : 'text-ink',
                )}
              >
                <span className="font-serif text-3xl tracking-tight sm:text-4xl">{link.label}</span>
                {link.description && (
                  <span className="hidden max-w-[45%] text-right text-sm text-ink-muted sm:block">
                    {link.description}
                  </span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-auto flex flex-col gap-5 pt-10"
        >
          <Link href="/donate" onClick={onClose} className="btn-dawn w-full py-4 text-base">
            <Heart className="h-5 w-5" />
            Donate now
          </Link>
          <div className="flex flex-col gap-2 text-sm text-ink-soft">
            <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-horizon-600" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-horizon-600" />
              {site.email}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
