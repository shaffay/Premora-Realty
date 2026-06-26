import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { ContactForm } from '@/components/forms/contact-form';
import { MapFallbackStatic } from '@/components/property/map-fallback-static';
import { contactInfo } from '@/data/site';
import { whatsappLink } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to Premora Realty — call, WhatsApp, email or visit our DIFC office. A Dubai property advisor will respond within one business day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const details = [
    { icon: Phone, label: 'Call us', value: contactInfo.phone, href: contactInfo.phoneHref },
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: contactInfo.phone,
      href: whatsappLink(),
    },
    { icon: MapPin, label: 'Office', value: contactInfo.address },
    { icon: Clock, label: 'Hours', value: contactInfo.hours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="GET IN TOUCH"
        title="Let’s talk property"
        description="Whether you’re buying, selling or simply exploring, a Premora advisor is ready to help — with clarity and care."
        hue={340}
      />

      <Container className="grid gap-10 py-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-3">
            {details.map((d) => {
              const content = (
                <span className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-card p-4 transition hover:border-gold/35">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-burgundy-gold text-warm">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-dim">
                      {d.label}
                    </span>
                    <span className="text-warm">{d.value}</span>
                  </span>
                </span>
              );
              return (
                <li key={d.label}>
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
          <div className="h-64 overflow-hidden rounded-card">
            <MapFallbackStatic />
          </div>
        </div>

        <div>
          <h2 className="mb-5 font-serif text-3xl text-warm">Send us a message</h2>
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
