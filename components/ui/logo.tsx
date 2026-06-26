import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  invert?: boolean;
};

export function Logo({
  className,
  showWordmark = true,
  size = 44,
}: LogoProps) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span
        className="relative shrink-0 overflow-hidden rounded-xl border border-gold/30 bg-[#0e0d0d]"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo-monogram.png"
          alt="Premora Realty"
          fill
          sizes="44px"
          className="object-cover"
          priority
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-lg font-semibold tracking-[0.22em] text-warm">
            PREMORA
          </span>
          <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.52em] text-gold/85">
            REALTY
          </span>
        </span>
      )}
    </span>
  );
}
