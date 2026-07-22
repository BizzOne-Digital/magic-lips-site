"use client";

import { useEffect, useState } from "react";

export interface SiteSettingsData {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  instagramHandle: string;
  tiktokHandle: string;
  announcementBarText: string;
  announcementBarActive: boolean;
  footerCopyright: string;
  webDesignCredit?: string;
  metaTitle?: string;
  metaDescription?: string;
  logoUrl?: string;
}

const FALLBACK: SiteSettingsData = {
  businessName: "Magic Lips",
  phone: "+1 647 495 0299",
  email: "magiclips2013@gmail.com",
  address: "3735 Dundas St W, York, ON M6S 2T6, Canada",
  instagramHandle: "magiclips2013",
  tiktokHandle: "magiclips02",
  announcementBarText: "New subscribers get 10% off their first order — use code MAGIC LIPS 12",
  announcementBarActive: true,
  footerCopyright: "© 2024 Magic Lips. All rights reserved.",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsData>(FALLBACK);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.settings) setSettings({ ...FALLBACK, ...d.settings });
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return { settings, loaded };
}

export function usePageContent<T extends Record<string, unknown>>(pageKey: string, defaults: T) {
  const [content, setContent] = useState<T>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/page-content?page=${pageKey}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.content) setContent({ ...defaults, ...d.content } as T);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [pageKey]);

  return { content, loaded };
}
