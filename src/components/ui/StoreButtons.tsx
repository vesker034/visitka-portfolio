"use client";

import { useLocale } from "@/context/LocaleContext";
import { useDownloadSettings } from "@/hooks/useDownloadSettings";
import { ApkBadge, AppStoreBadge, GooglePlayBadge } from "@/components/ui/StoreBadges";
import type { DownloadSettings } from "@/types/settings";

type StoreButtonsProps = {
  className?: string;
  showDisclaimer?: boolean;
};

export function StoreButtons({ className = "", showDisclaimer = true }: StoreButtonsProps) {
  const { t } = useLocale();
  const { settings } = useDownloadSettings();

  const stores: Array<{
    key: keyof DownloadSettings;
    type: "appstore" | "googleplay" | "apk" | "text";
    label?: string;
  }> = [
    { key: "appStoreUrl", type: "appstore" },
    { key: "googlePlayUrl", type: "googleplay" },
    { key: "apkUrl", type: "apk", label: t.download.apk },
  ];

  if (settings.rustoreUrl) {
    stores.push({ key: "rustoreUrl", type: "text", label: t.download.rustore });
  }

  const renderBadge = (store: (typeof stores)[number]) => {
    if (store.type === "appstore") {
      return <AppStoreBadge className="h-10 w-[135px] drop-shadow-md" />;
    }
    if (store.type === "googleplay") {
      return <GooglePlayBadge className="h-10 w-[135px] drop-shadow-md" />;
    }
    if (store.type === "apk") {
      return <ApkBadge label={store.label!} />;
    }
    return (
      <span className="inline-flex h-10 items-center rounded-lg bg-white px-4 text-sm font-semibold text-[#2d2654] shadow-md ring-1 ring-violet-100">
        {store.label}
      </span>
    );
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {stores.map((store) => {
          const href = settings[store.key];

          if (href) {
            return (
              <a
                key={store.key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-[1.03] hover:opacity-90"
              >
                {renderBadge(store)}
              </a>
            );
          }

          return (
            <span
              key={store.key}
              className="cursor-default"
              title={t.download.unavailable}
              aria-disabled="true"
            >
              {renderBadge(store)}
            </span>
          );
        })}
      </div>

      {showDisclaimer && (
        <p className="mt-4 max-w-xl text-center text-sm leading-6 text-violet-700/85">
          {t.hero.disclaimer}
        </p>
      )}
    </div>
  );
}
