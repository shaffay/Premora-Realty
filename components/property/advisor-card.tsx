'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MessageCircle, CalendarCheck, Phone } from 'lucide-react';
import type { Agent, Property } from '@/data/types';
import { Button } from '@/components/ui/button';
import { useUi } from '@/store/ui';
import { whatsappLink } from '@/lib/constants';

export function AdvisorCard({
  agent,
  property,
}: {
  agent: Agent;
  property: Property;
}) {
  const t = useTranslations('detail');
  const openConsultation = useUi((s) => s.openConsultation);

  return (
    <div className="card-surface flex flex-col gap-5 p-6">
      <span className="eyebrow text-gold/70">{t('yourAdvisor')}</span>
      <div className="flex items-center gap-4">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gold/30 bg-burgundy-gold">
          <Image
            src={agent.avatar}
            alt={agent.name}
            fill
            sizes="64px"
            className="object-cover object-top"
          />
        </span>
        <div>
          <p className="font-serif text-xl text-warm">{agent.name}</p>
          <p className="text-sm text-muted">{agent.role}</p>
          <p className="mt-1 text-xs text-dim">{agent.languages.join(' · ')}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Button
          variant="gold"
          size="lg"
          onClick={() =>
            openConsultation({
              propertyTitle: property.title,
              agentId: agent.id,
              defaultInterest: 'Buying a home',
            })
          }
        >
          <CalendarCheck className="h-4 w-4" />
          {t('requestViewing')}
        </Button>
        <Button asChild variant="whatsapp" size="lg">
          <a
            href={whatsappLink(
              agent.whatsapp,
              `Hello ${agent.name}, I'm interested in the ${property.title} in ${property.community}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            {t('whatsappAdvisor')}
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={`tel:${agent.phone}`}>
            <Phone className="h-4 w-4" />
            {agent.phone}
          </a>
        </Button>
      </div>
    </div>
  );
}
