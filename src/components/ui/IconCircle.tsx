import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

const tones = {
  pink: "bg-pink-100 text-pink-600",
  violet: "bg-violet-100 text-violet-600",
  blue: "bg-sky-100 text-sky-600",
  green: "bg-emerald-100 text-emerald-600",
  orange: "bg-amber-100 text-amber-600",
  purple: "bg-purple-100 text-purple-600",
} as const;

type Tone = keyof typeof tones;

export function IconCircle({
  icon: Icon,
  tone = "violet",
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = { sm: 36, md: 44, lg: 52, xl: 64 };
  const iconSizes = { sm: 18, md: 22, lg: 26, xl: 30 };
  const px = sizes[size];

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl ${tones[tone]} ${className}`}
      style={{ width: px, height: px }}
    >
      <Icon size={iconSizes[size]} strokeWidth={1.75} />
    </div>
  );
}

export function HeartAccent() {
  return (
    <span className="inline-block text-pink-400" aria-hidden>
      {" "}
      ♥
    </span>
  );
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 inline-block text-xs font-semibold tracking-[0.2em] text-violet-500 uppercase">
      {children}
    </span>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center text-[1.75rem] leading-tight font-bold text-[#2d2654] sm:text-4xl">
      {children}
    </h2>
  );
}
