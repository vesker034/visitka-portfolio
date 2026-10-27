"use client";

import { useEffect, useState } from "react";
import { defaultSettings, type DownloadSettings } from "@/types/settings";

export function useDownloadSettings() {
  const [settings, setSettings] = useState<DownloadSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data: DownloadSettings) => setSettings(data))
      .catch(() => setSettings(defaultSettings))
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}
