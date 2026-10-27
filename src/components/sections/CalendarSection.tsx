"use client";

import { ClipboardList, FileText, Frown, HelpCircle, Smile, BarChart3 } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { BabyInWombIcon } from "@/components/ui/BabyInWombIcon";
import { DoctorReportCard } from "@/components/ui/DoctorReportCard";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { IconCircle } from "@/components/ui/IconCircle";
import { PhoneMockup, SectionTitle } from "@/components/ui/Primitives";
import { cardAnimDelay, pickCardAnim } from "@/lib/cardAnimation";

const cardThemes = ["pink", "violet", "teal"] as const;
const cardIcons = [ClipboardList, FileText];

const flowSteps = [
  { icon: Smile, tone: "green" as const, ring: "shadow-emerald-200/70" },
  { icon: Frown, tone: "orange" as const, ring: "shadow-amber-200/70" },
  { icon: BarChart3, tone: "blue" as const, ring: "shadow-sky-200/70" },
  { icon: HelpCircle, tone: "purple" as const, ring: "shadow-purple-200/70" },
  { icon: FileText, tone: "pink" as const, ring: "shadow-pink-200/70" },
];

const calloutOffsets = ["", "lg:ml-3", "lg:ml-6"];

export function CalendarSection() {
  const { t } = useLocale();

  return (
    <section id="features" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>{t.calendar.title}</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-violet-700/75">
          {t.calendar.subtitle}
        </p>

        <div className="relative mt-14">
          <svg
            className="pointer-events-none absolute top-[4.5rem] right-[12%] left-[12%] hidden h-8 md:block"
            viewBox="0 0 800 32"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line x1="0" y1="16" x2="800" y2="16" stroke="#e9d5ff" strokeWidth="1.5" opacity="0.7" />
            <circle cx="0" cy="16" r="4" fill="#f9a8d4" opacity="0.8" />
            <circle cx="400" cy="16" r="4" fill="#c4b5fd" opacity="0.8" />
            <circle cx="800" cy="16" r="4" fill="#5eead4" opacity="0.8" />
          </svg>

          <div className="grid justify-items-center gap-8 md:grid-cols-3 md:gap-6">
            <FeatureCard
              title={t.calendar.cards[0].title}
              description={t.calendar.cards[0].description}
              theme={cardThemes[0]}
              iconNode={<BabyInWombIcon className="h-12 w-12" gradientId="card-baby" />}
              animIndex={0}
            />
            <FeatureCard
              title={t.calendar.cards[1].title}
              description={t.calendar.cards[1].description}
              theme={cardThemes[1]}
              icon={cardIcons[0]}
              animIndex={1}
            />
            <FeatureCard
              title={t.calendar.cards[2].title}
              description={t.calendar.cards[2].description}
              theme={cardThemes[2]}
              icon={cardIcons[1]}
              animIndex={2}
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold text-[#2d2654] lg:text-left">
            {t.calendar.preparationTitle}
          </h3>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-1 gap-y-4 lg:justify-start">
            {flowSteps.map((step, i) => (
              <div key={step.tone} className="flex items-center gap-1 sm:gap-2">
                <div className="flex w-[4.75rem] flex-col items-center gap-2 sm:w-[5.25rem]">
                  <div
                    className={`${pickCardAnim(i)} rounded-[1.25rem] bg-white p-1 shadow-lg ring-2 ring-white/90 ${step.ring}`}
                    style={cardAnimDelay(i, 0.25)}
                  >
                    <IconCircle icon={step.icon} tone={step.tone} size="xl" />
                  </div>
                  <span className="text-center text-xs font-medium text-[#2d2654] sm:text-sm">
                    {t.calendar.flowSteps[i]}
                  </span>
                </div>
                {i < flowSteps.length - 1 && (
                  <span
                    className="mb-5 text-lg font-light text-violet-400 sm:mb-6 sm:text-xl"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[minmax(0,440px)_auto_minmax(0,280px)] lg:gap-6 xl:gap-8">
            <div className="order-2 lg:order-1">
              <DoctorReportCard />
            </div>

            <div className="order-1 flex justify-center lg:order-2">
              <PhoneMockup variant="report" />
            </div>

            <div className="order-3 flex flex-col gap-4 lg:gap-5">
              {t.calendar.callouts.map((callout, i) => (
                <div
                  key={callout.text}
                  className={`callout-card ${pickCardAnim(i)} flex items-center gap-4 rounded-2xl px-6 py-4 sm:px-7 sm:py-5 ${calloutOffsets[i]}`}
                  style={cardAnimDelay(i, 0.5)}
                >
                  <span className="text-3xl leading-none sm:text-4xl" aria-hidden>
                    {callout.emoji}
                  </span>
                  <span className="text-base font-semibold text-[#2d2654] sm:text-lg">
                    {callout.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
