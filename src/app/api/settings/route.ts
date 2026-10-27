import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  defaultSettings,
  type DownloadSettings,
} from "@/types/settings";

const settingsPath = path.join(process.cwd(), "data", "settings.json");

async function readSettings(): Promise<DownloadSettings> {
  try {
    const raw = await fs.readFile(settingsPath, "utf-8");
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

async function writeSettings(settings: DownloadSettings): Promise<void> {
  await fs.mkdir(path.dirname(settingsPath), { recursive: true });
  await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
}

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (!(await verifySessionToken(sessionToken))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<DownloadSettings>;
  const settings: DownloadSettings = {
    ...defaultSettings,
    ...body,
  };

  await writeSettings(settings);
  return NextResponse.json(settings);
}
