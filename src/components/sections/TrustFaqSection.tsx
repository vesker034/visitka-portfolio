"use client";

import { FileText, Heart, Lock, Stethoscope } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { IconCircle } from "@/components/ui/IconCircle";
import {
  HeartAccent,
  PhoneMockup,
  PregnantIllustration,
  SectionBadge,
  SectionTitle,
} from "@/components/ui/Primitives";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { cardAnimDelay, pickCardAnim } from "@/lib/cardAnimation";

const trustIcons = [Stethoscope, Lock, Heart, FileText];
const trustTones = ["violet", "blue", "pink", "green"] as const;
const avatarColors = ["bg-pink-100", "bg-violet-100", "bg-rose-100", "bg-fuchsia-100", "bg-purple-100"];

export function TrustFaqSection() {
  const { t } = useLocale();

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <SectionBadge>{t.trust.badge}</SectionBadge>
          <SectionTitle>
            {t.trust.title}
            <HeartAccent />
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-violet-700/75">{t.trust.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.trust.cards.map((card, i) => (
            <article
              key={card.title}
              className={`rounded-3xl bg-white p-6 text-center shadow-md ring-1 ring-violet-50/80 ${pickCardAnim(i)}`}
              style={cardAnimDelay(i)}
            >
              <div className="mx-auto mb-4 flex justify-center">
                <IconCircle icon={trustIcons[i]} tone={trustTones[i]} size="lg" />
              </div>
              <h3 className="font-semibold text-[#2d2654]">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-violet-600">{card.description}</p>
            </article>
          ))}
        </div>

        <div
          id="faq"
          className={`card-sway mt-16 grid gap-10 rounded-[2rem] bg-gradient-to-br from-pink-50/90 to-violet-50/90 p-6 ring-1 ring-violet-100/60 sm:p-10 lg:grid-cols-2 lg:items-stretch`}
          style={cardAnimDelay(0, 0.3)}
        >
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-[#2d2654]">
              {t.trust.faqTitle}
              <HeartAccent />
            </h3>
            <p className="mt-2 text-violet-700">{t.trust.faqSubtitle}</p>
            <div className="mt-8 flex flex-1 flex-col lg:mt-10">
              <PregnantIllustration
                variant="faq"
                cover
                className="mx-auto h-[380px] w-full max-w-[360px] sm:h-[420px] lg:mx-0 lg:h-full lg:min-h-[460px] lg:max-w-none"
              />
            </div>
          </div>
          <FaqAccordion />
        </div>

        <div
          className={`card-float-slow mt-16 grid items-center gap-10 rounded-[2rem] bg-gradient-to-br from-violet-50/90 to-pink-50/90 p-6 ring-1 ring-violet-100/60 sm:p-10 lg:grid-cols-2`}
          style={cardAnimDelay(1, 0.3)}
        >
          <div>
            <h3 className="text-2xl font-bold text-[#2d2654] sm:text-3xl">{t.trust.ctaTitle}</h3>
            <p className="mt-3 text-violet-700">{t.trust.ctaSubtitle}</p>
            <div className="mt-8">
              <StoreButtons showDisclaimer={false} />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {avatarColors.map((color, i) => (
                  <div
                    key={color}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-violet-700 ring-2 ring-white ${color}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-amber-400 tracking-wider">★★★★★</p>
                <p className="text-sm text-violet-700">{t.trust.socialProof}</p>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center">
            <PhoneMockup variant="dashboard" />
            <div
              className={`card-float absolute -right-2 bottom-4 hidden h-14 w-10 rounded-2xl bg-pink-100 shadow-md sm:block`}
              style={cardAnimDelay(2, 0.4)}
            />
            <div
              className={`card-sway absolute right-14 bottom-10 hidden h-16 w-12 rounded-lg bg-white shadow-md ring-1 ring-violet-100 sm:block`}
              style={cardAnimDelay(3, 0.4)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
