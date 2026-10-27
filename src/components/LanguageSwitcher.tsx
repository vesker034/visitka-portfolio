"use client";

import { locales, localeLabels } from "@/i18n";
import { useLocale } from "@/context/LocaleContext";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={`px-2 py-1 transition ${
            locale === item
              ? "font-bold text-primary"
              : "text-violet-500 hover:text-violet-700"
          }`}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}
