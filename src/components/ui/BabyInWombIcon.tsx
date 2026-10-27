import Image from "next/image";

type BabyInWombIconProps = {
  className?: string;
  gradientId?: string;
};

export function BabyInWombIcon({ className = "" }: BabyInWombIconProps) {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-full bg-[#faf6f2] ring-1 ring-pink-100/80 ${className}`}
      aria-hidden
    >
      <Image
        src="/images/baby-fetus-logo.png"
        alt=""
        width={200}
        height={200}
        className="h-full w-full scale-[1.08] object-cover object-center"
        priority
      />
    </div>
  );
}
