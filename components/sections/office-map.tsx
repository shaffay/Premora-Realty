import { ExternalLink } from 'lucide-react';
import { contactInfo } from '@/data/site';

const query = encodeURIComponent(contactInfo.address);

/** Live Google Map for the office, with a link out to the full Maps app. */
export function OfficeMap() {
  return (
    <div className="overflow-hidden rounded-card border border-gold/15">
      <iframe
        title={`Map showing the PREMORA Realty office at ${contactInfo.address}`}
        src={`https://www.google.com/maps?q=${query}&z=15&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-64 w-full border-0"
        allowFullScreen
      />
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${query}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 bg-card px-4 py-3 text-sm text-body transition hover:text-gold"
      >
        <span>{contactInfo.address}</span>
        <span className="flex shrink-0 items-center gap-1.5 text-xs text-gold">
          Open in Google Maps
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </span>
      </a>
    </div>
  );
}
