'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/store/recently-viewed';

/** Records a property view into the recently-viewed store (client-only side effect). */
export function TrackView({ propertyId }: { propertyId: string }) {
  const add = useRecentlyViewed((s) => s.add);
  useEffect(() => {
    add(propertyId);
  }, [propertyId, add]);
  return null;
}
