"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/context/LocaleContext";
import {
  defaultSettings,
  type DownloadSettings,
} from "@/types/settings";

export default function AdminPage() {
  const { t } = useLocale();
  const [settings, setSettings] = useState<DownloadSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fields: Array<{ key: keyof DownloadSettings; label: string }> = [
    { key: "apkUrl", label: t.admin.apkUrl },
    { key: "rustoreUrl", label: t.admin.rustoreUrl },
    { key: "googlePlayUrl", label: t.admin.googlePlayUrl },
    { key: "appStoreUrl", label: t.admin.appStoreUrl },
  ];

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data: DownloadSettings) => setSettings(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);
    setError("");

    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (response.status === 401) {
      window.location.assign("/admin/login?next=/admin");
      return;
    }

    if (response.ok) {
      const data = (await response.json()) as DownloadSettings;
      setSettings(data);
      setSaved(true);
      return;
    }

    setError(t.admin.saveError);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <header className="border-b border-rose-100 bg-white/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-lg font-semibold text-rose-950">{t.admin.title}</p>
            <p className="text-sm text-rose-600">{t.admin.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
            >
              {t.admin.logout}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-6 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-violet-900">
          {t.admin.note}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm"
        >
          {fields.map((field) => (
            <label key={field.key} className="block space-y-2">
              <span className="text-sm font-medium text-rose-900">
                {field.label}
              </span>
              <input
                type="url"
                value={settings[field.key]}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    [field.key]: event.target.value,
                  }))
                }
                placeholder="https://"
                className="w-full rounded-xl border border-rose-200 px-4 py-3 text-sm text-rose-950 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                disabled={loading}
              />
            </label>
          ))}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-60"
            >
              {t.admin.save}
            </button>
            <Link
              href="/"
              className="rounded-full px-6 py-3 text-center text-sm font-medium text-rose-700 transition hover:bg-rose-50"
            >
              {t.admin.back}
            </Link>
            {saved && (
              <span className="text-sm font-medium text-emerald-600">
                {t.admin.saved}
              </span>
            )}
            {error && (
              <span className="text-sm font-medium text-rose-600">{error}</span>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
