"use client";

import { useLocale } from "@/context/LocaleContext";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-auto border-t border-violet-100 bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-violet-700">
            {t.footer.copyright} <span className="text-pink-400">♥</span>
          </p>
          <div className="flex gap-6 text-sm text-violet-600">
            <a href="#" className="hover:text-primary">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-primary">
              {t.footer.terms}
            </a>
          </div>
          <div className="flex gap-3 text-lg">
            {["📷", "VK", "✈️", "✉️"].map((icon) => (
              <span key={icon} className="opacity-60">
                {icon}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-6 rounded-2xl bg-pink-50 px-4 py-3 text-center text-xs text-violet-600">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
