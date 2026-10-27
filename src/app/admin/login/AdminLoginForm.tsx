"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/context/LocaleContext";

export default function AdminLoginForm() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(
          response.status === 503
            ? t.admin.authNotConfigured
            : data.error === "Invalid credentials"
              ? t.admin.loginError
              : t.admin.loginFailed,
        );
        return;
      }

      const nextPath = searchParams.get("next") || "/admin";
      window.location.assign(nextPath);
    } catch {
      setError(t.admin.loginFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <header className="border-b border-rose-100 bg-white/90">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-lg font-semibold text-rose-950">{t.admin.loginTitle}</p>
            <p className="text-sm text-rose-600">{t.admin.loginSubtitle}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-10 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm"
        >
          <label className="block space-y-2">
            <span className="text-sm font-medium text-rose-900">{t.admin.username}</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
              className="w-full rounded-xl border border-rose-200 px-4 py-3 text-sm text-rose-950 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              disabled={loading}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-rose-900">{t.admin.password}</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-rose-200 px-4 py-3 text-sm text-rose-950 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              disabled={loading}
            />
          </label>

          {error && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-60"
            >
              {loading ? t.admin.loginLoading : t.admin.loginButton}
            </button>
            <Link
              href="/"
              className="rounded-full px-6 py-3 text-center text-sm font-medium text-rose-700 transition hover:bg-rose-50"
            >
              {t.admin.back}
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
