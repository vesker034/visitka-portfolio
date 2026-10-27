import Image from "next/image";

const variants = {
  garden: {
    src: "/images/pregnant-woman-garden.png",
    width: 480,
    height: 720,
  },
  reading: {
    src: "/images/pregnant-woman-reading.png",
    width: 520,
    height: 680,
  },
  portrait: {
    src: "/images/pregnant-woman-portrait.png",
    width: 420,
    height: 620,
  },
  report: {
    src: "/images/pregnant-woman-portrait.png",
    width: 420,
    height: 620,
  },
  faq: {
    src: "/images/pregnant-woman-faq.png",
    width: 784,
    height: 1024,
  },
} as const;

type Variant = keyof typeof variants;

export function PregnantWomanImage({
  variant = "portrait",
  className = "",
  priority = false,
  fill = false,
  sizes,
}: {
  variant?: Variant;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}) {
  const image = variants[variant];

  if (fill) {
    return (
      <Image
        src={image.src}
        alt=""
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 1024px) 360px, 480px"}
        className={className}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt=""
      width={image.width}
      height={image.height}
      priority={priority}
      className={className}
    />
  );
}

export function PregnantIllustration({
  variant = "portrait",
  className = "",
  glow = "default",
  imageClassName = "",
  cover = false,
}: {
  variant?: Variant;
  className?: string;
  glow?: "default" | "warm" | "none";
  imageClassName?: string;
  cover?: boolean;
}) {
  const glowClass =
    glow === "warm"
      ? "from-orange-100/45 to-pink-100/35"
      : "from-pink-100/50 to-violet-100/40";

  if (cover) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-50/80 ${className}`}
        aria-hidden
      >
        <PregnantWomanImage
          variant={variant}
          fill
          className={`object-cover object-[center_18%] ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden>
      {glow !== "none" && (
        <div className={`absolute inset-4 rounded-[2rem] bg-gradient-to-br ${glowClass} blur-xl`} />
      )}
      <PregnantWomanImage
        variant={variant}
        className={`relative h-auto w-full max-w-[220px] object-contain drop-shadow-sm sm:max-w-[260px] lg:max-w-[280px] ${imageClassName}`}
      />
    </div>
  );
}
