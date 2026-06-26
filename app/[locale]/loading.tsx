export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border-2 border-gold/20" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold" />
        </div>
        <span className="eyebrow text-gold/60">Loading</span>
      </div>
    </div>
  );
}
