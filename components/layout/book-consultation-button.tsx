'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { useUi } from '@/store/ui';

type BookConsultationButtonProps = ButtonProps & {
  propertyTitle?: string;
  defaultInterest?: string;
  label?: string;
};

export function BookConsultationButton({
  propertyTitle,
  defaultInterest,
  label = 'Book Consultation',
  children,
  ...props
}: BookConsultationButtonProps) {
  const openConsultation = useUi((s) => s.openConsultation);
  return (
    <Button
      onClick={() => openConsultation({ propertyTitle, defaultInterest })}
      {...props}
    >
      {children ?? label}
    </Button>
  );
}
