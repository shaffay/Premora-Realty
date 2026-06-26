import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  rule?: 'gold' | 'burgundy-gold';
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  rule = 'gold',
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={cn(
          'text-balance text-4xl sm:text-5xl lg:text-[3.4rem]',
          titleClassName,
        )}
      >
        {title}
      </h2>
      <span
        className={cn(
          rule === 'gold' ? 'rule-gold' : 'rule-burgundy-gold',
          align === 'center' && 'self-center',
        )}
        aria-hidden
      />
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
