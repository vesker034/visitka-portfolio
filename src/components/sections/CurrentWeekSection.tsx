"use client";

import {
  Baby,
  Bell,
  Droplets,
  Heart,
  Moon,
  Pencil,
  Pill,
  Smile,
  Stethoscope,
  TestTube,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { IconCircle } from "@/components/ui/IconCircle";
import { FloatingCard, PhoneMockup, PhoneScreenCutout, SectionTitle } from "@/components/ui/Primitives";
import { cardAnimDelay, pickCardAnim } from "@/lib/cardAnimation";
import type { CardItem } from "@/i18n/types";

const floatMeta = [
  { position: "right-full top-0 mr-4 lg:mr-12 xl:mr-20 2xl:mr-24", tone: "pink" as const, icon: Baby },
  { position: "right-full bottom-24 mr-2 lg:mr-10 xl:mr-16 2xl:mr-20", tone: "green" as const, icon: Baby },
  { position: "left-full top-2 ml-4 lg:ml-12 xl:ml-20 2xl:ml-24", tone: "pink" as const, icon: Heart },
  { position: "left-full bottom-20 ml-2 lg:ml-10 xl:ml-16 2xl:ml-20", tone: "violet" as const, icon: Bell },
];

export function CurrentWeekSection() {
  const { t } = useLocale();

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>{t.currentWeek.title}</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-violet-700/75">
          {t.currentWeek.subtitle}
        </p>

        <div className="relative mx-auto mt-12 flex justify-center px-4 py-6 lg:px-32 xl:px-40 2xl:px-48">
          <div className="relative w-fit">
            <svg
              className="pointer-events-none absolute -left-72 -right-72 top-0 z-0 hidden h-full w-[calc(100%+36rem)] xl:block"
              viewBox="0 0 716 566"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              {/* left top: card → phone */}
              <path
                d="M 148 78 Q 188 142 224 198"
                fill="none"
                stroke="#e9d5ff"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* left bottom */}
              <path
                d="M 148 412 Q 188 358 224 352"
                fill="none"
                stroke="#e9d5ff"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* right top */}
              <path
                d="M 568 86 Q 528 145 492 198"
                fill="none"
                stroke="#e9d5ff"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* right bottom */}
              <path
                d="M 568 410 Q 528 358 492 352"
                fill="none"
                stroke="#e9d5ff"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>

            {t.currentWeek.floatingCards.map((card, i) => (
              <div
                key={card.title}
                className={`absolute z-20 hidden ${floatMeta[i].position} lg:block`}
              >
                <FloatingCard
                  data={{
                    text: card.title,
                    icon: floatMeta[i].icon,
                    tone: floatMeta[i].tone,
                  }}
                  animIndex={i}
                />
              </div>
            ))}

            <PhoneMockup variant="week" className="relative z-10" />
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <FeatureBlock
            title={t.currentWeek.diary.title}
            subtitle={t.currentWeek.diary.subtitle}
            items={t.currentWeek.diary.items}
            icons={[Smile, Moon, Zap, Droplets, Pencil]}
            tones={["pink", "violet", "orange", "blue", "purple"]}
            phoneVariant="diary"
            tint="from-pink-50/90 via-white to-white"
            animIndex={0}
          />
          <FeatureBlock
            title={t.currentWeek.visits.title}
            subtitle={t.currentWeek.visits.subtitle}
            items={t.currentWeek.visits.items}
            icons={[Stethoscope, TestTube, Pill, Bell]}
            tones={["violet", "green", "blue", "orange"]}
            phoneVariant="tasks"
            tint="from-violet-50/90 via-white to-white"
            animIndex={1}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({
  title,
  subtitle,
  items,
  icons,
  tones,
  phoneVariant,
  tint,
  animIndex = 0,
}: {
  title: string;
  subtitle: string;
  items: CardItem[];
  icons: LucideIcon[];
  tones: Array<"pink" | "violet" | "blue" | "green" | "purple" | "orange">;
  phoneVariant: "diary" | "tasks";
  tint: string;
  animIndex?: number;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-3xl bg-gradient-to-br ${tint} p-6 shadow-lg ring-1 ring-violet-100/80 sm:p-8 ${pickCardAnim(animIndex)}`}
      style={cardAnimDelay(animIndex, 0.5)}
    >
      <div className="min-h-[6.5rem] sm:min-h-[7.5rem]">
        <h3 className="text-xl font-bold text-[#2d2654] sm:text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-violet-700 sm:text-base">{subtitle}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8">
        <PhoneScreenCutout variant={phoneVariant} />

        <ul className="w-full space-y-3">
          {items.map((item, i) => (
            <li
              key={item.title}
              className={`flex items-start gap-3 rounded-2xl bg-white/90 px-4 py-3.5 shadow-sm ring-1 ring-violet-50 ${pickCardAnim(i + animIndex + 2)}`}
              style={cardAnimDelay(i + animIndex + 2, 0.25)}
            >
              <IconCircle icon={icons[i]} tone={tones[i]} size="md" />
              <div className="min-w-0 pt-0.5">
                <p className="text-sm font-semibold text-[#2d2654]">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-violet-600">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
