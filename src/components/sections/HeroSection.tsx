"use client";

import {
  Baby,
  Bell,
  Calendar,
  Droplets,
  FileText,
  Heart,
  HelpCircle,
  Stethoscope,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import {
  FloatingCard,
  HeartAccent,
  SectionTitle,
  StepsTimeline,
  type FloatingCardData,
} from "@/components/ui/Primitives";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { StoreButtons } from "@/components/ui/StoreButtons";

const floatMeta = [
  { position: "right-full top-[1%] mr-4 lg:mr-10 xl:mr-14 2xl:mr-20", rotate: -20 },
  { position: "right-full top-[33%] mr-6 lg:mr-14 xl:mr-20 2xl:mr-24", rotate: 38 },
  { position: "right-full bottom-[16%] mr-3 lg:mr-8 xl:mr-12 2xl:mr-16", rotate: -12 },
  { position: "left-full top-[-1%] ml-4 lg:ml-10 xl:ml-14 2xl:ml-20", rotate: 22 },
  { position: "left-full top-[35%] ml-6 lg:ml-14 xl:ml-20 2xl:ml-24", rotate: -40 },
  { position: "left-full bottom-[26%] ml-3 lg:ml-8 xl:ml-12 2xl:ml-16", rotate: 16 },
  { position: "left-full bottom-[1%] ml-8 lg:ml-16 xl:ml-[4.5rem] 2xl:ml-24", rotate: -28 },
];

const stepIcons = [Baby, Heart, Stethoscope, Bell, FileText];
const stepTones = ["pink", "orange", "purple", "orange", "green"] as const;

export function HeroSection() {
  const { t } = useLocale();

  const floatingData: FloatingCardData[] = [
    { text: t.hero.floatingCards[0], icon: Calendar, tone: "violet" },
    { text: t.hero.floatingCards[1], icon: Baby, tone: "pink" },
    { text: t.hero.floatingCards[2], icon: Droplets, tone: "blue" },
    { text: t.hero.floatingCards[3], icon: Calendar, tone: "pink" },
    { text: t.hero.floatingCards[4], icon: Heart, tone: "green" },
    { text: t.hero.floatingCards[5], icon: HelpCircle, tone: "purple" },
    { text: t.hero.floatingCards[6], icon: FileText, tone: "green" },
  ];

  return (
    <section className="relative px-4 pt-8 pb-10 sm:px-6 sm:pt-10 lg:pt-12">
      <div className="relative mx-auto max-w-6xl">
        <div className="relative mx-auto flex justify-center px-4 py-4 sm:py-6 lg:px-28 xl:px-36 2xl:px-44">
          <div className="relative w-fit">
            {floatingData.map((data, i) => (
              <div
                key={data.text}
                className={`absolute z-20 hidden ${floatMeta[i].position} lg:block`}
                style={{ transform: `rotate(${floatMeta[i].rotate}deg)` }}
              >
                <FloatingCard
                  data={data}
                  animIndex={i}
                />
              </div>
            ))}

            <PhoneMockup size="lg" variant="dashboard" className="relative z-10" />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl text-center sm:mt-10 lg:mt-12">
          <SectionTitle>
            {t.hero.title}
            <HeartAccent />
          </SectionTitle>
          <p className="mt-4 text-base leading-8 text-violet-700/75 sm:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-8" id="download">
            <StoreButtons />
          </div>
        </div>

        <div id="how-it-works">
          <StepsTimeline steps={t.hero.steps} icons={stepIcons} tones={[...stepTones]} />
        </div>
      </div>
    </section>
  );
}
