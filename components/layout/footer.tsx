import { useTranslations } from 'next-intl';
import { Instagram, Linkedin, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import { NewsletterForm } from '@/components/forms/newsletter-form';
import { exploreNav } from './nav-config';
import { services } from '@/data/services';
import { contactInfo } from '@/data/site';

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');

  return (
    <footer className="on-dark relative mt-24 border-t border-gold/15 bg-[#081109]">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-60" />
      <Container className="relative grid gap-12 py-16 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Logo size={48} />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {t('blurb')}
          </p>
          <div className="flex gap-3">
            {[Instagram, Linkedin, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 text-muted transition hover:border-gold/50 hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow mb-4 text-gold/70">{t('explore')}</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {exploreNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition hover:text-warm"
                >
                  {tn(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow mb-4 text-gold/70">{t('services')}</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href="/services"
                  className="text-muted transition hover:text-warm"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow mb-4 text-gold/70">{t('stayInformed')}</h3>
          <p className="mb-4 text-sm text-muted">{t('newsletterNote')}</p>
          <NewsletterForm />
          <ul className="mt-6 flex flex-col gap-3 text-sm text-muted">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold" />
              <a href={contactInfo.phoneHref} className="hover:text-warm">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-warm">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gold" />
              {contactInfo.address}
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-gold/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-dim sm:flex-row">
          <p>{t('rights')}</p>
          <div className="flex gap-5">
            <Link href="/" className="transition hover:text-muted">
              {t('privacy')}
            </Link>
            <Link href="/" className="transition hover:text-muted">
              {t('terms')}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
