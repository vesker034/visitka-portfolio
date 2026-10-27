export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getAuthSecret(): string | null {
  return process.env.VISITKA_AUTH_SECRET?.trim() ?? null;
}

export function getAdminUsername(): string | null {
  return process.env.VISITKA_ADMIN_USERNAME?.trim() ?? null;
}

export function getAdminPassword(): string | null {
  return process.env.VISITKA_ADMIN_PASSWORD?.trim() ?? null;
}

export function isAuthConfigured(): boolean {
  return Boolean(getAuthSecret() && getAdminUsername() && getAdminPassword());
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );

  return bytesToBase64Url(new Uint8Array(signature));
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function createSessionToken(): Promise<string | null> {
  const secret = getAuthSecret();
  if (!secret) return null;

  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = String(expiresAt);
  const signature = await signPayload(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const secret = getAuthSecret();
  if (!secret) return false;

  const [expiresAtRaw, signature] = token.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expectedSignature = await signPayload(expiresAtRaw, secret);
  return signature === expectedSignature;
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUsername = getAdminUsername();
  const expectedPassword = getAdminPassword();
  if (!expectedUsername || !expectedPassword) return false;

  return username === expectedUsername && password === expectedPassword;
}

export function sessionCookieOptions(maxAge = SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
