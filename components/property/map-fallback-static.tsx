import { MapPin } from 'lucide-react';
import { contactInfo } from '@/data/site';

/** Static, themed office-location map panel (no tiles, zero network). */
export function MapFallbackStatic() {
  return (
    <div className="relative h-full w-full overflow-hidden border border-gold/15 bg-gradient-to-br from-[#0c1a13] to-[#081008]">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(203,163,92,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(203,163,92,.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy text-warm shadow-card motion-safe:animate-pulseRing">
          <MapPin className="h-6 w-6" />
        </span>
        <span className="rounded-full border border-gold/20 bg-black/50 px-3 py-1 text-xs text-gold backdrop-blur">
          {contactInfo.address}
        </span>
      </div>
    </div>
  );
}
