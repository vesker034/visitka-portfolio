import type { LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { cardAnimDelay, pickCardAnim } from "@/lib/cardAnimation";

const themes = {
  pink: {
    glow: "bg-pink-300/50",
    circle: "bg-pink-100/90 ring-pink-200/60",
    icon: "text-pink-500",
    heart: "text-pink-500",
    heartRing: "ring-pink-100",
  },
  violet: {
    glow: "bg-violet-300/50",
    circle: "bg-violet-100/90 ring-violet-200/60",
    icon: "text-violet-500",
    heart: "text-violet-500",
    heartRing: "ring-violet-100",
  },
  teal: {
    glow: "bg-teal-300/50",
    circle: "bg-teal-100/90 ring-teal-200/60",
    icon: "text-teal-500",
    heart: "text-teal-500",
    heartRing: "ring-teal-100",
  },
} as const;

type FeatureCardTheme = keyof typeof themes;

type FeatureCardProps = {
  title: string;
  description: string;
  theme: FeatureCardTheme;
  icon?: LucideIcon;
  iconNode?: ReactNode;
  animIndex?: number;
};

export function FeatureCard({
  title,
  description,
  theme,
  icon: Icon,
  iconNode,
  animIndex = 0,
}: FeatureCardProps) {
  const t = themes[theme];

  return (
    <article
      className={`relative mx-auto flex w-full max-w-[18.5rem] flex-col items-center rounded-[1.75rem] bg-white px-5 pt-6 pb-11 text-center shadow-[0_8px_30px_rgba(107,78,230,0.08)] ring-1 ring-violet-100/70 ${pickCardAnim(animIndex)}`}
      style={cardAnimDelay(animIndex) as CSSProperties}
    >
      <div className="relative mb-4 flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center">
        <div className={`absolute inset-0 rounded-full ${t.glow} blur-md`} aria-hidden />
        <div
          className={`relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full ring-1 ${t.circle}`}
        >
          {iconNode ??
            (Icon ? <Icon size={30} strokeWidth={1.6} className={t.icon} /> : null)}
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#2d2654]">{title}</h3>
      <p className="mt-2 w-full text-sm leading-6 text-violet-600/85">{description}</p>

      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-md ring-1 ${t.heartRing} ${t.heart}`}
          aria-hidden
        >
          ♥
        </span>
      </div>
    </article>
  );
}
