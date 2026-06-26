'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { mainNav } from './nav-config';
import { Logo } from '@/components/ui/logo';
import { LocaleSwitcher } from './locale-switcher';
import { SavedLink } from './saved-link';
import { BookConsultationButton } from './book-consultation-button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const tb = useTranslations('brand');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="accent-bar" />
      <div
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'glass border-b border-gold/15 py-2.5'
            : 'bg-gradient-to-b from-base/80 to-transparent py-4',
        )}
      >
        <Container className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Premora Realty home">
            <Logo size={scrolled ? 40 : 44} />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-sm font-medium transition',
                  isActive(item.href)
                    ? 'text-gold'
                    : 'text-body hover:text-warm',
                )}
              >
                {t(item.labelKey)}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gold-sweep"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${tb('phone').replace(/\s/g, '')}`}
              className="hidden items-center gap-2 text-sm text-body transition hover:text-warm xl:flex"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              {tb('phone')}
            </a>
            <LocaleSwitcher className="hidden sm:flex" />
            <SavedLink />
            <BookConsultationButton
              variant="gold"
              size="sm"
              className="hidden md:inline-flex"
              label={t('bookConsultation')}
            />
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 text-warm lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="fixed inset-y-0 end-0 z-50 flex w-[82%] max-w-sm flex-col bg-panel ltr:border-l rtl:border-r border-gold/15 lg:hidden"
            >
              <div className="accent-bar" />
              <div className="flex items-center justify-between p-5">
                <Logo size={40} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 text-warm"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav
                className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-2"
                aria-label="Mobile navigation"
              >
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-xl px-4 py-3 text-lg font-medium transition',
                      isActive(item.href)
                        ? 'bg-primary/20 text-gold'
                        : 'text-body hover:bg-white/5 hover:text-warm',
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3 border-t border-gold/15 p-5">
                <LocaleSwitcher />
                <BookConsultationButton
                  variant="gold"
                  size="lg"
                  className="w-full"
                  label={t('bookConsultation')}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
