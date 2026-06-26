'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Property } from '@/data/types';
import type { Locale } from '@/lib/i18n/routing';
import { formatPriceShort } from '@/lib/format';

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;

export default function PropertyMap({
  properties,
  selectedId,
  onSelect,
}: {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const locale = useLocale() as Locale;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const markers = markersRef.current;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${MAPTILER_KEY}`,
      center: [55.24, 25.13],
      zoom: 10.5,
      attributionControl: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }));
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, []);

  // Sync markers with the filtered property set.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    properties.forEach((p) => {
      const el = document.createElement('button');
      el.className = 'premora-pin';
      el.textContent = formatPriceShort(p.price, locale);
      el.setAttribute('aria-label', `${p.title} — ${formatPriceShort(p.price, locale)}`);
      el.style.cssText =
        'background:#8a1f3d;color:#f3efe6;border:none;border-radius:999px;padding:4px 9px;font:600 11px/1 system-ui;cursor:pointer;box-shadow:0 6px 16px -6px rgba(0,0,0,.7);';
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelect(p.id);
      });
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([p.lng, p.lat])
        .addTo(map);
      markersRef.current.set(p.id, marker);
    });
  }, [properties, locale, onSelect]);

  // Highlight selected marker.
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      const active = id === selectedId;
      el.style.background = active ? '#cba35c' : '#8a1f3d';
      el.style.color = active ? '#081109' : '#f3efe6';
      el.style.zIndex = active ? '10' : '1';
    });
    const map = mapRef.current;
    if (map && selectedId) {
      const p = properties.find((x) => x.id === selectedId);
      if (p) map.easeTo({ center: [p.lng, p.lat], duration: 600 });
    }
  }, [selectedId, properties]);

  return <div ref={containerRef} className="h-full w-full rounded-card" />;
}
