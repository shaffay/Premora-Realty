import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal, RevealStagger } from '@/components/ui/reveal';
import { Icon } from '@/components/ui/icon';
import { ContactForm } from '@/components/forms/contact-form';
import { OfficeMap } from '@/components/sections/office-map';
import { contactInfo, contactReasons } from '@/data/site';
import { whatsappLink } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to PREMORA Realty — call, WhatsApp, email or visit our DIFC office. A Dubai property advisor will respond within one business day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const details = [
    { icon: Phone, label: 'Call', value: contactInfo.phone, href: contactInfo.phoneHref },
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: contactInfo.phone,
      href: whatsappLink(),
    },
    { icon: MapPin, label: 'Office', value: contactInfo.address },
    { icon: Clock, label: 'Business Hours', value: contactInfo.hours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="GET IN TOUCH"
        title="Let’s talk property"
        description="Whether you’re buying, selling, investing or simply exploring your options, a PREMORA Advisor is here to provide clear advice without pressure."
        hue={340}
      />

      <Container className="py-8">
        <SectionHeading
          eyebrow="WHY CLIENTS CONTACT US"
          title="What clients come to us for"
          align="center"
          rule="burgundy-gold"
        />
        <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactReasons.map((reason) => (
            <Reveal key={reason.title}>
              <div className="flex h-full flex-col gap-3 rounded-card border border-gold/15 bg-card p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy-gold text-warm">
                  <Icon name={reason.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-xl leading-tight text-warm">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {reason.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </RevealStagger>
      </Container>

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
          <OfficeMap />
        </div>

        <div>
          <h2 className="mb-5 font-serif text-3xl text-warm">How can we help?</h2>
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
