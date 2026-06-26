'use client';

import { useTranslations } from 'next-intl';
import { Phone, MessageCircle, CalendarDays } from 'lucide-react';
import { whatsappLink } from '@/lib/constants';
import { contactInfo } from '@/data/site';
import { useUi } from '@/store/ui';

export function MobileActionBar() {
  const t = useTranslations('nav');
  const openConsultation = useUi((s) => s.openConsultation);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-gold/15 glass sm:hidden">
      <a
        href={contactInfo.phoneHref}
        className="flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium text-body transition active:bg-white/5"
      >
        <Phone className="h-5 w-5 text-gold" />
        Call
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 border-x border-gold/10 py-2.5 text-[0.65rem] font-medium text-body transition active:bg-white/5"
      >
        <MessageCircle className="h-5 w-5 text-whatsapp" />
        WhatsApp
      </a>
      <button
        onClick={() => openConsultation()}
        className="flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium text-body transition active:bg-white/5"
      >
        <CalendarDays className="h-5 w-5 text-gold" />
        {t('bookConsultation').split(' ')[0]}
      </button>
    </div>
  );
}
