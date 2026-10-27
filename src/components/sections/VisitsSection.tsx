"use client";

import {
  Bell,
  Calendar,
  CheckCircle2,
  Droplets,
  HelpCircle,
  Pill,
  TestTube,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { FloatingCard, PhoneMockup, PregnantIllustration, SectionTitle, type FloatingCardData } from "@/components/ui/Primitives";
import { cardAnimDelay, pickCardAnim } from "@/lib/cardAnimation";

const floatMeta: Array<{ icon: FloatingCardData["icon"]; tone: FloatingCardData["tone"]; position: string }> = [
  { icon: Calendar, tone: "violet", position: "right-full top-4 mr-4 lg:mr-10 xl:mr-14" },
  { icon: TestTube, tone: "pink", position: "right-full top-1/3 mr-6 lg:mr-14 xl:mr-[4.5rem]" },
  { icon: Droplets, tone: "blue", position: "right-full bottom-16 mr-3 lg:mr-8 xl:mr-12" },
  { icon: Bell, tone: "orange", position: "left-full top-8 ml-4 lg:ml-10 xl:ml-14" },
  { icon: HelpCircle, tone: "purple", position: "left-full top-1/2 ml-6 lg:ml-14 xl:ml-[4.5rem]" },
  { icon: CheckCircle2, tone: "green", position: "left-full bottom-12 ml-3 lg:ml-8 xl:ml-12" },
];

export function VisitsSection() {
  const { t } = useLocale();

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>{t.visits.title}</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-violet-700/75">
          {t.visits.subtitle}
        </p>

        <div className="relative mx-auto mt-12 flex max-w-5xl justify-center px-4 py-8 lg:px-28 xl:px-36">
          <div className="relative w-fit">
            {t.visits.floatingCards.slice(0, 6).map((card, i) => (
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
            <PhoneMockup variant="tasks" className="relative z-10" />
          </div>
        </div>

        <div
          className={`card-float-slow mt-12 rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-violet-100/80 sm:p-10`}
          style={cardAnimDelay(0, 0.2)}
        >
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h3 className="text-2xl font-bold text-[#2d2654]">{t.visits.preparation.title}</h3>
              <p className="mt-3 text-sm leading-7 text-violet-700">{t.visits.preparation.subtitle}</p>
              <div
                className={`${pickCardAnim(0)} mt-6 rounded-2xl bg-violet-50/80 p-4 ring-1 ring-violet-100`}
                style={cardAnimDelay(0, 0.35)}
              >
                <p className="font-semibold text-[#2d2654]">{t.visits.preparation.questionsTitle}</p>
                <ol className="mt-3 space-y-2 text-sm text-violet-700">
                  {t.visits.preparation.questions.map((q, i) => (
                    <li key={q}>{i + 1}. {q}</li>
                  ))}
                </ol>
              </div>
            </div>

            <PregnantIllustration variant="garden" className="mx-auto max-w-[280px]" />

            <div>
              <ul className="space-y-3">
                {t.visits.preparation.checklist.map((item, i) => (
                  <li
                    key={item}
                    className={`flex items-center justify-between rounded-2xl bg-violet-50/80 px-4 py-3 text-sm font-medium text-[#2d2654] ${pickCardAnim(i + 1)}`}
                    style={cardAnimDelay(i + 1, 0.3)}
                  >
                    {item}
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-6 w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200/60"
              >
                {t.visits.preparation.cta} ✨
              </button>
              <div className="mt-6 space-y-2">
                {t.visits.sidebar.map((item, i) => (
                  <div
                    key={item.title}
                    className={`rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-violet-50 ${pickCardAnim(i + 4)}`}
                    style={cardAnimDelay(i + 4, 0.35)}
                  >
                    <p className="font-semibold text-[#2d2654]">{item.title}</p>
                    <p className="text-violet-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
