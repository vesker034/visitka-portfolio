import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export default async function AdminLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (await verifySessionToken(sessionToken)) {
    redirect("/admin");
  }

  return children;
}
