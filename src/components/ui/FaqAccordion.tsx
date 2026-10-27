"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { cardAnimDelay, pickCardAnim } from "@/lib/cardAnimation";

export function FaqAccordion() {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {t.trust.faq.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100 ${pickCardAnim(index)}`}
            style={cardAnimDelay(index, 0.35)}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center gap-3 px-5 py-4 text-start"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                {index + 1}
              </span>
              <span className="flex-1 font-medium text-violet-950">{item.question}</span>
              <span className="text-violet-400">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
              <div className="border-t border-violet-50 px-5 py-4 text-sm leading-7 text-violet-700">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
