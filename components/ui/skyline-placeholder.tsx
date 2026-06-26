import { cn } from '@/lib/utils';

type SkylinePlaceholderProps = {
  hue?: number;
  label?: string;
  className?: string;
  showSkyline?: boolean;
  intensity?: 'soft' | 'rich';
};

/**
 * Branded skyline-gradient placeholder used in place of real photography.
 * Combines an emerald base, a burgundy→gold radial wash, a faux night-skyline
 * silhouette and the signature gold light-dot texture — never a plain box.
 */
export function SkylinePlaceholder({
  hue = 150,
  label,
  className,
  showSkyline = true,
  intensity = 'rich',
}: SkylinePlaceholderProps) {
  const base = `linear-gradient(160deg, hsl(${hue} 35% 12%) 0%, #0b1610 55%, #081109 100%)`;
  const wash =
    intensity === 'rich'
      ? 'radial-gradient(circle at 25% 18%, rgba(138,31,61,.42), transparent 55%), radial-gradient(circle at 82% 30%, rgba(203,163,92,.30), transparent 50%)'
      : 'radial-gradient(circle at 30% 20%, rgba(138,31,61,.22), transparent 55%), radial-gradient(circle at 80% 60%, rgba(203,163,92,.14), transparent 50%)';

  return (
    <div
      className={cn('relative h-full w-full overflow-hidden', className)}
      style={{ background: base }}
      aria-hidden={!label}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <div className="absolute inset-0" style={{ background: wash }} />
      {/* gold light-dot texture */}
      <div className="skyline-dots absolute inset-0 opacity-40 motion-safe:animate-floatLights" />

      {showSkyline && (
        <svg
          className="absolute bottom-0 left-0 h-2/5 w-full"
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <g fill="rgba(8,17,9,.92)">
            <rect x="10" y="50" width="22" height="70" />
            <rect x="36" y="32" width="16" height="88" />
            <rect x="58" y="64" width="20" height="56" />
            <rect x="84" y="20" width="14" height="100" />
            <rect x="104" y="44" width="24" height="76" />
            <rect x="134" y="58" width="18" height="62" />
            <rect x="158" y="8" width="12" height="112" />
            <rect x="176" y="38" width="22" height="82" />
            <rect x="204" y="54" width="18" height="66" />
            <rect x="228" y="26" width="16" height="94" />
            <rect x="250" y="48" width="24" height="72" />
            <rect x="280" y="60" width="18" height="60" />
            <rect x="304" y="30" width="14" height="90" />
            <rect x="324" y="52" width="22" height="68" />
            <rect x="352" y="40" width="18" height="80" />
            <rect x="376" y="62" width="18" height="58" />
          </g>
          {/* lit windows */}
          <g fill="rgba(203,163,92,.5)">
            <rect x="89" y="34" width="3" height="3" />
            <rect x="162" y="22" width="3" height="3" />
            <rect x="163" y="40" width="3" height="3" />
            <rect x="232" y="40" width="3" height="3" />
            <rect x="308" y="44" width="3" height="3" />
          </g>
        </svg>
      )}

      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="eyebrow text-center text-[0.62rem] text-gold/80">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
