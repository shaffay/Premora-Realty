'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import type { Community } from '@/data/types';
import type { Locale } from '@/lib/i18n/routing';
import { formatPriceShort } from '@/lib/format';
import { MediaImage } from '@/components/ui/media-image';

export function CommunityCard({
  community,
  index = 0,
  withBlurb = false,
}: {
  community: Community;
  index?: number;
  withBlurb?: boolean;
}) {
  const locale = useLocale() as Locale;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
    >
      <Link
        href={`/communities/${community.slug}`}
        className="group relative block h-72 overflow-hidden rounded-card border border-gold/15 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-card-hover"
      >
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
          <MediaImage
            src={community.image}
            alt={community.name}
            hue={community.hue}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="relative flex h-full flex-col justify-end p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl text-warm transition group-hover:text-gold">
              {community.name}
            </h3>
            <ArrowUpRight className="h-5 w-5 text-gold opacity-0 transition group-hover:opacity-100" />
          </div>
          {withBlurb && (
            <p className="mt-2 line-clamp-2 text-sm text-body/90">
              {community.blurb}
            </p>
          )}
          {community.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {community.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-gold/30 bg-black/35 px-2.5 py-1 text-[0.68rem] font-medium tracking-wide text-gold/95 backdrop-blur-sm transition group-hover:border-gold/55"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 flex items-center gap-4 text-xs text-gold/90">
            <span>
              {community.count} {community.count === 1 ? 'Property' : 'Properties'}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
            <span>From {formatPriceShort(community.fromPrice, locale)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
