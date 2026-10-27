"use client";

import {
  Apple,
  BookOpen,
  Calendar,
  ClipboardList,
  Dumbbell,
  Heart,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { IconCircle } from "@/components/ui/IconCircle";
import { cardAnimDelay, pickCardAnim } from "@/lib/cardAnimation";
import { PhoneMockup, PregnantIllustration, SectionBadge, SectionTitle } from "@/components/ui/Primitives";

const toolIcons = [Apple, Dumbbell, ClipboardList, BookOpen, Heart];
const toolTones = ["pink", "violet", "green", "orange", "rose"] as const;
const heartColors = ["text-pink-400", "text-violet-400", "text-emerald-400", "text-orange-400", "text-rose-400"];
const benefitIcons = [MessageCircle, Calendar, Smartphone, Heart];
const benefitTones = ["pink", "green", "violet", "orange"] as const;

export function ToolsSection() {
  const { t } = useLocale();

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <SectionBadge>{t.tools.badge}</SectionBadge>
          <SectionTitle>{t.tools.title}</SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-violet-700/75">{t.tools.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-3 sm:gap-4 lg:grid-cols-6">
          <div
            className={`card-sway rounded-3xl bg-white/70 p-5 text-start ring-1 ring-violet-100 sm:p-6 lg:col-span-1`}
            style={cardAnimDelay(0)}
          >
            <p className="font-semibold text-[#2d2654]">{t.tools.sidebarTitle}</p>
            <p className="mt-2 text-sm leading-6 text-violet-600">{t.tools.sidebarText}</p>
          </div>

          {t.tools.cards.map((card, i) => (
            <ToolCard
              key={card.title}
              icon={toolIcons[i]}
              tone={toolTones[i] === "rose" ? "pink" : toolTones[i]}
              heartClass={heartColors[i]}
              title={card.title}
              description={card.description}
              animIndex={i + 1}
            />
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#fff3eb] via-[#fce9f1] to-[#eee9fb] p-6 shadow-sm ring-1 ring-pink-100/50 sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6 xl:gap-10">
            <PregnantIllustration
              variant="reading"
              glow="warm"
              className="mx-auto lg:mx-0"
              imageClassName="lg:max-w-[320px] xl:max-w-[360px]"
            />
            <PhoneMockup variant="checklists" className="relative z-10 shrink-0" />
            <div className="flex w-full flex-col gap-3.5 lg:max-w-[22rem] lg:justify-self-end lg:gap-4 xl:max-w-[24rem]">
              {t.tools.benefits.map((benefit, i) => (
                <BenefitRow
                  key={benefit.title}
                  icon={benefitIcons[i]}
                  tone={benefitTones[i]}
                  title={benefit.title}
                  description={benefit.description}
                  animIndex={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({
  icon,
  tone,
  heartClass,
  title,
  description,
  animIndex = 0,
}: {
  icon: LucideIcon;
  tone: Exclude<(typeof toolTones)[number], "rose">;
  heartClass: string;
  title: string;
  description: string;
  animIndex?: number;
}) {
  return (
    <article
      className={`flex flex-col rounded-2xl bg-white p-4 text-start shadow-md ring-1 ring-violet-50/80 sm:rounded-3xl sm:p-5 lg:col-span-1 ${pickCardAnim(animIndex)}`}
      style={cardAnimDelay(animIndex)}
    >
      <div className="flex justify-center">
        <IconCircle icon={icon} tone={tone} size="sm" className="sm:hidden" />
        <IconCircle icon={icon} tone={tone} size="md" className="hidden sm:flex" />
      </div>

      <div className="mt-3 min-w-0 flex-1">
        <h3 className="text-base font-semibold text-[#2d2654] sm:text-[1.05rem]">{title}</h3>
        <p className="mt-1 text-sm leading-snug text-violet-600 sm:mt-2 sm:leading-6">{description}</p>
      </div>

      <div className={`mt-3 self-center text-base sm:text-lg ${heartClass}`}>
        ♥
      </div>
    </article>
  );
}

function BenefitRow({
  icon: Icon,
  tone,
  title,
  description,
  animIndex = 0,
}: {
  icon: LucideIcon;
  tone: (typeof benefitTones)[number];
  title: string;
  description: string;
  animIndex?: number;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl bg-white/95 px-5 py-4 text-start shadow-[0_4px_20px_rgba(107,78,230,0.08)] ring-1 ring-white/90 ${pickCardAnim(animIndex)}`}
      style={cardAnimDelay(animIndex, 0.35)}
    >
      <IconCircle icon={Icon} tone={tone} size="md" />
      <div className="min-w-0">
        <p className="font-semibold text-[#2d2654]">{title}</p>
        <p className="mt-0.5 text-sm leading-snug text-violet-600">{description}</p>
      </div>
    </div>
  );
}
