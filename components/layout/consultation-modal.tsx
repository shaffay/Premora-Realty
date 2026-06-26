'use client';

import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ConsultationForm } from '@/components/forms/consultation-form';
import { useUi } from '@/store/ui';

/** Global consultation modal, openable from anywhere via the `useUi` store. */
export function ConsultationModal() {
  const t = useTranslations('consultation');
  const { consultationOpen, consultationContext, closeConsultation } = useUi();

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
