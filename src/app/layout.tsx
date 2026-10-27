import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/context/LocaleContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MomCare",
  description:
    "MomCare помогает следить за сроком, самочувствием, визитами и важными делами — всё в одном приложении.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen antialiased`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
