export type DownloadSettings = {
  apkUrl: string;
  rustoreUrl: string;
  googlePlayUrl: string;
  appStoreUrl: string;
};

export const defaultSettings: DownloadSettings = {
  apkUrl: "",
  rustoreUrl: "",
  googlePlayUrl: "",
  appStoreUrl: "",
};
