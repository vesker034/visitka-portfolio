"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CalendarSection } from "@/components/sections/CalendarSection";
import { CurrentWeekSection } from "@/components/sections/CurrentWeekSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { TrustFaqSection } from "@/components/sections/TrustFaqSection";
import { VisitsSection } from "@/components/sections/VisitsSection";
import { FloralBranches } from "@/components/ui/FloralBranches";
import { useLocale } from "@/context/LocaleContext";
import { useEffect } from "react";

export function LandingPage() {
  const { t } = useLocale();

  useEffect(() => {
    document.title = t.meta.title;
  }, [t.meta.title]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloralBranches />
      <div className="relative z-10">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <CalendarSection />
          <CurrentWeekSection />
          <VisitsSection />
          <ToolsSection />
          <TrustFaqSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
