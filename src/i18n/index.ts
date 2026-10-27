import { ar } from "./locales/ar";
import { en } from "./locales/en";
import { ru } from "./locales/ru";
import type { Locale, Translations } from "./types";

export const locales: Locale[] = ["ru", "en", "ar"];

export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  ar: "AR",
};

export const rtlLocales: Locale[] = ["ar"];

export const defaultLocale: Locale = "ru";

const dictionaries: Record<Locale, Translations> = {
  ru,
  en,
  ar,
};

export function getTranslations(locale: Locale): Translations {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
