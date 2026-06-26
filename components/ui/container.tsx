import { cn } from '@/lib/utils';

export function Container({
  className,
  children,
  as: Tag = 'div',
}: {
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'section' | 'header' | 'footer' | 'main';
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-7xl container-px', className)}>
      {children}
    </Tag>
  );
}
