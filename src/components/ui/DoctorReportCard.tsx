"use client";

import Image from "next/image";
import {
  Calendar,
  CalendarCheck,
  ClipboardList,
  Clock,
  Download,
  Eye,
  Heart,
  HelpCircle,
  Smile,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { cardAnimDelay, pickCardAnim } from "@/lib/cardAnimation";

const rowIcons = [Calendar, Clock, Smile, Heart, HelpCircle, CalendarCheck];
const rowStyles = [
  "bg-violet-100 text-violet-600",
  "bg-violet-100 text-violet-600",
  "bg-pink-100 text-pink-600",
  "bg-emerald-100 text-emerald-600",
  "bg-purple-100 text-purple-600",
  "bg-violet-100 text-violet-600",
];

const reportImage = {
  src: "/images/pregnant-woman-portrait.png",
  width: 420,
  height: 620,
};

function IllustrationDecor() {
  return (
    <>
      <div className="absolute top-8 right-6 h-20 w-20 rounded-full bg-violet-200/25 blur-2xl" />
      <div className="absolute bottom-16 left-4 h-24 w-24 rounded-full bg-pink-200/35 blur-2xl" />
      <span className="absolute top-14 right-10 text-base text-pink-300/65" aria-hidden>
        ♥
      </span>
      <span className="absolute top-28 right-5 text-sm text-pink-200/75" aria-hidden>
        ♥
      </span>
    </>
  );
}

export function DoctorReportCard() {
  const { t } = useLocale();
  const { reportTitle, reportItems, reportButtons } = t.calendar;

  return (
    <div
      className={`report-card ${pickCardAnim(0)} relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-violet-100/80`}
      style={cardAnimDelay(0, 0.4)}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[36%] min-w-[7.5rem] sm:w-[34%]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-l from-violet-100/55 via-pink-50/35 to-white/10" />
        <IllustrationDecor />
        <div className="absolute inset-0">
          <Image
            src={reportImage.src}
            alt=""
            fill
            sizes="(max-width: 640px) 36vw, 560px"
            quality={92}
            className="report-card-illustration object-cover object-center"
          />
        </div>
      </div>

      <div className="relative z-10 p-5 pr-[40%] sm:p-6 sm:pr-[36%]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 shadow-sm">
            <ClipboardList size={24} strokeWidth={1.75} />
          </div>
          <h4 className="text-xl font-bold text-[#2d2654] sm:text-2xl">{reportTitle}</h4>
        </div>

        <ul className="mt-4 divide-y divide-violet-100/90">
          {reportItems.map((item, i) => {
            const Icon = rowIcons[i];
            return (
              <li key={item.label} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${rowStyles[i]}`}
                >
                  <Icon size={19} strokeWidth={2} />
                </div>
                <p className="text-base leading-snug text-violet-700 sm:text-[17px]">
                  {item.highlight ? (
                    <>
                      {item.label}{" "}
                      <span className="font-bold text-[#2d2654]">{item.highlight}</span>
                    </>
                  ) : (
                    <span className="font-semibold text-[#2d2654]">{item.label}</span>
                  )}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-200/80 transition hover:bg-primary-dark"
          >
            <Eye size={20} strokeWidth={2} />
            {reportButtons.show}
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-violet-200 bg-white/90 px-4 py-3.5 text-base font-semibold text-violet-700 backdrop-blur-sm transition hover:border-violet-300 hover:bg-violet-50/50"
          >
            <Download size={20} strokeWidth={2} />
            {reportButtons.pdf}
          </button>
        </div>
      </div>
    </div>
  );
}
