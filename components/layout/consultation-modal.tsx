'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ConsultationForm } from '@/components/forms/consultation-form';
import { useUi } from '@/store/ui';

/** Global consultation modal, openable from anywhere via the `useUi` store. */
export function ConsultationModal() {
  const t = useTranslations('consultation');
  const { consultationOpen, consultationContext, closeConsultation } = useUi();
  const openConsultation = useUi((s) => s.openConsultation);

  // Deep link: any URL with ?consult=1 opens the consultation modal on load.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('consult') === '1') {
      openConsultation();
    }
  }, [openConsultation]);

  return (
    <Dialog
      open={consultationOpen}
      onOpenChange={(open) => !open && closeConsultation()}
    >
      <DialogContent>
        <div className="mb-5">
          <span className="eyebrow">{t('title')}</span>
          <DialogTitle className="mt-2 text-3xl">
            {consultationContext.propertyTitle
              ? `Enquire · ${consultationContext.propertyTitle}`
              : t('subtitle')}
          </DialogTitle>
        </div>
        <ConsultationForm
          source={
            consultationContext.propertyTitle
              ? `property:${consultationContext.propertyTitle}`
              : 'consultation-modal'
          }
          defaultInterest={consultationContext.defaultInterest}
          onSuccess={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
}
