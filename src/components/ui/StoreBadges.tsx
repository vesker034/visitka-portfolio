export function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 135 40" className={className} aria-hidden>
      <rect width="135" height="40" rx="6" fill="#000" />
      <path
        fill="#fff"
        d="M24.77 20.3c-.03-3.2 2.6-4.74 2.72-4.83-1.48-2.17-3.79-2.47-4.61-2.5-1.96-.2-3.84 1.16-4.84 1.16-.99 0-2.53-1.13-4.16-1.1-2.14.03-4.12 1.25-5.22 3.17-2.23 3.87-.57 9.6 1.6 12.74 1.06 1.54 2.33 3.27 4 3.18 1.6-.07 2.21-1.04 4.15-1.04 1.94 0 2.48 1.04 4.17.99 1.72-.04 2.82-1.57 3.87-3.12 1.22-1.78 1.72-3.5 1.75-3.59-.04-.02-3.36-1.29-3.39-5.06zM21.3 11.67c.88-1.07 1.48-2.56 1.32-4.04-1.27.05-2.81.85-3.72 1.92-.82.95-1.54 2.48-1.35 3.94 1.43.11 2.89-.73 3.75-1.82z"
      />
      <text x="44" y="15" fill="#fff" fontSize="7" fontFamily="system-ui,sans-serif">
        Download on the
      </text>
      <text x="44" y="28" fill="#fff" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">
        App Store
      </text>
    </svg>
  );
}

export function GooglePlayBadge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 135 40" className={className} aria-hidden>
      <rect width="135" height="40" rx="6" fill="#000" />
      <path fill="#00D6FF" d="M8 8.5l12 11.5L8 31.5z" />
      <path fill="#00F076" d="M8 8.5l12 11.5 5-2.8z" />
      <path fill="#FF3A44" d="M8 31.5l12-11.5-5-2.8z" />
      <path fill="#FFD900" d="M20 20l5 2.8 7.5-4.3L20 8.5z" />
      <text x="38" y="15" fill="#fff" fontSize="7" fontFamily="system-ui,sans-serif">
        GET IT ON
      </text>
      <text x="38" y="28" fill="#fff" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">
        Google Play
      </text>
    </svg>
  );
}

export function ApkBadge({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-white shadow-md ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden>
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 00-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C2.92 11.03 1 14.22 1 17.83h22c0-3.61-1.92-6.8-5.4-8.35zM7 15.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
      </svg>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}