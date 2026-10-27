"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/context/LocaleContext";

export function Header() {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-30 bg-transparent">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="relative z-10 shrink-0">
          <Logo />
        </Link>

        <nav className="absolute top-1/2 left-1/2 hidden w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2 grid-cols-3 md:grid lg:w-[30rem]">
          {t.header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2 text-center text-sm font-medium text-violet-700/90 transition hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-3 sm:gap-4">
          <LanguageSwitcher />
          <a
            href="#download"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-200/60 transition hover:bg-primary-dark sm:px-5"
          >
            {t.header.download}
          </a>
        </div>
      </div>
    </header>
  );
}
