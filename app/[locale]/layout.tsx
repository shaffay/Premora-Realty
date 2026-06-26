import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { cormorant, mulish } from '@/lib/fonts';
import { routing, localeDirection, type Locale } from '@/lib/i18n/routing';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { MobileActionBar } from '@/components/layout/mobile-action-bar';
import { ConsultationModal } from '@/components/layout/consultation-modal';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BackToTop } from '@/components/ui/back-to-top';
import { CookieNotice } from '@/components/ui/cookie-notice';
import { organizationJsonLd } from '@/lib/seo';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://premora.ae';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'home',
  });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Premora Realty — Real Estate with Clarity & Care',
      template: '%s · Premora Realty',
    },
    description: t('subtitle'),
    keywords: [
      'Dubai real estate',
      'luxury property Dubai',
      'buy property Dubai',
      'Dubai investment',
      'Premora Realty',
    ],
    openGraph: {
      type: 'website',
      siteName: 'Premora Realty',
      title: 'Premora Realty — Real Estate with Clarity & Care',
      description: t('subtitle'),
      locale: params.locale === 'ar' ? 'ar_AE' : 'en_AE',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Premora Realty — Real Estate with Clarity & Care',
      description: t('subtitle'),
    },
    alternates: {
      canonical: '/',
      languages: { en: '/', ar: '/ar' },
    },
    icons: { icon: '/logo-monogram.png' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = localeDirection[locale as Locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cormorant.variable} ${mulish.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-base antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(location.search).get('theme');if(p==='light'||p==='dark'){localStorage.setItem('premora-theme',p)}if(localStorage.getItem('premora-theme')==='light'){document.documentElement.classList.add('light')}else{document.documentElement.classList.remove('light')}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(SITE_URL)),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ScrollProgress />
            <Header />
            <main id="main" className="pb-16 sm:pb-0">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
            <MobileActionBar />
            <ConsultationModal />
            <CookieNotice />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
