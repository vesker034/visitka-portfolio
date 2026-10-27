import { Heart } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const iconSize = size === "sm" ? 22 : 28;
  const textClass = size === "sm" ? "text-lg" : "text-xl";

  return (
    <div className="flex items-center gap-2.5">
      <Heart
        size={iconSize}
        className="text-primary"
        strokeWidth={2}
        fill="none"
      />
      <span className={`${textClass} font-bold tracking-tight text-[#2d2654]`}>
        MomCare
      </span>
    </div>
  );
}
