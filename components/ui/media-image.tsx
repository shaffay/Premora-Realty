import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SkylinePlaceholder } from './skyline-placeholder';

type MediaImageProps = {
  src: string;
  alt: string;
  hue?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  showSkyline?: boolean;
};

/**
 * A real photograph layered over the branded skyline-gradient placeholder.
 * The gradient is what shows while the image streams in (and if it ever fails),
 * so there is never a plain empty box.
 */
export function MediaImage({
  src,
  alt,
  hue = 150,
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false,
  className,
  imageClassName,
  showSkyline = false,
}: MediaImageProps) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <SkylinePlaceholder
        hue={hue}
        showSkyline={showSkyline}
        className="absolute inset-0"
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
}
