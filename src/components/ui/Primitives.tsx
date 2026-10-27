import { type LucideIcon } from "lucide-react";
import { type CSSProperties, type ReactNode } from "react";
import { cardAnimDelay, pickCardAnim } from "@/lib/cardAnimation";
import { IconCircle } from "./IconCircle";

export {
  HeartAccent,
  SectionBadge,
  SectionTitle,
  IconCircle,
} from "./IconCircle";

export { PhoneMockup, PhoneScreenCutout } from "./PhoneMockup";
export { PregnantIllustration, PregnantWomanImage } from "./PregnantWomanImage";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function GlassCard({ children, className = "", style }: GlassCardProps) {
  return (
    <div className={`glass-card rounded-2xl px-4 py-3 ${className}`} style={style}>
      {children}
    </div>
  );
}

export type FloatingCardData = {
  text: string;
  icon: LucideIcon;
  tone: "pink" | "violet" | "blue" | "green" | "purple" | "orange";
};

export type InfoFloatingCardData = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "pink" | "violet" | "blue" | "green" | "purple" | "orange";
};

const floatingCardSizeClass =
  "flex max-w-[168px] items-center gap-2.5 text-xs font-medium text-[#2d2654]";

export function InfoFloatingCard({
  data,
  className = "",
  animIndex = 0,
}: {
  data: InfoFloatingCardData;
  className?: string;
  animIndex?: number;
}) {
  return (
    <GlassCard
      className={`${pickCardAnim(animIndex)} ${floatingCardSizeClass} ${className}`}
      style={cardAnimDelay(animIndex) as CSSProperties}
    >
      <IconCircle icon={data.icon} tone={data.tone} size="sm" />
      <span className="leading-snug">{data.title}</span>
    </GlassCard>
  );
}

export function FloatingCard({
  data,
  className = "",
  animIndex = 0,
}: {
  data: FloatingCardData;
  className?: string;
  animIndex?: number;
}) {
  return (
    <GlassCard
      className={`${pickCardAnim(animIndex)} ${floatingCardSizeClass} ${className}`}
      style={cardAnimDelay(animIndex) as CSSProperties}
    >
      <IconCircle icon={data.icon} tone={data.tone} size="sm" />
      <span className="leading-snug">{data.text}</span>
    </GlassCard>
  );
}

export function StepsTimeline({
  steps,
  icons,
  tones,
}: {
  steps: Array<{ title: string; description: string }>;
  icons: LucideIcon[];
  tones: Array<"pink" | "orange" | "purple" | "orange" | "green">;
}) {
  return (
    <div className="card-float-slow relative mt-12 rounded-[2rem] bg-white/85 p-6 shadow-lg ring-1 ring-violet-100/80 backdrop-blur-md sm:p-8">
      <div className="relative grid gap-8 sm:grid-cols-5 sm:gap-4">
        <div
          className="pointer-events-none absolute top-0 right-0 left-0 z-0 hidden h-14 sm:block"
          aria-hidden
        >
          <svg className="h-full w-full overflow-visible" viewBox="0 0 1000 40" preserveAspectRatio="none">
            <path
              d="M 100 20 C 200 5 200 5 300 20 C 400 35 400 35 500 20 C 600 5 600 5 700 20 C 800 35 800 35 900 20"
              fill="none"
              stroke="#f9a8d4"
              strokeWidth="2.5"
              strokeDasharray="10 12"
              strokeLinecap="round"
              opacity="0.75"
            />
          </svg>
        </div>

        {steps.map((step, i) => (
          <div
            key={step.title}
            className={`relative text-center ${pickCardAnim(i)}`}
            style={cardAnimDelay(i, 0.3) as CSSProperties}
          >
            <div className="relative z-10 mx-auto mb-3 flex h-14 w-14 items-center justify-center">
              <span className="absolute -top-1 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                {i + 1}
              </span>
              <IconCircle icon={icons[i]} tone={tones[i]} size="md" />
            </div>
            <p className="text-sm font-semibold text-[#2d2654]">{step.title}</p>
            <p className="mt-1 text-[11px] leading-4 text-violet-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
