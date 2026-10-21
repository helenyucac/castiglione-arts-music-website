"use client";

import { useEffect, useState } from "react";

const PIXEL_ID = "503218076005356";
const CONSENT_KEY = "cac-meta-marketing-consent";
const SYDNEY_SHOWS: Record<string, string> = {
  vbc_sydney_20270207_1200: "12:00",
  vbc_sydney_20270207_1700: "17:00",
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _cacMetaPixelIds?: string[];
    _cacVbcViewKey?: string;
  }
}

function loadMetaPixel() {
  if (!window.fbq) {
    type MetaPixelFunction = ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[][];
    };
    const fbq: MetaPixelFunction = (...args: unknown[]) => {
      const fn = window.fbq as MetaPixelFunction | undefined;
      if (!fn) return;
      if (fn.callMethod) fn.callMethod(...args);
      else (fn.queue ??= []).push(args);
    };
    window.fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  window._cacMetaPixelIds ??= [];
  if (!window._cacMetaPixelIds.includes(PIXEL_ID)) {
    window.fbq?.("init", PIXEL_ID);
    window._cacMetaPixelIds.push(PIXEL_ID);
  }
}

export function ViennaBoysChoirPixel() {
  const [consent, setConsent] = useState<"unknown" | "accepted" | "rejected">("unknown");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem(CONSENT_KEY);
    setConsent(choice === "accepted" ? "accepted" : choice === "rejected" ? "rejected" : "unknown");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || consent !== "accepted" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) return;
    loadMetaPixel();
    const key = window.location.pathname + window.location.search;
    if (window._cacVbcViewKey !== key) {
      window._cacVbcViewKey = key;
      window.fbq?.("trackSingle", PIXEL_ID, "PageView");
      window.fbq?.("trackSingle", PIXEL_ID, "ViewContent", {
        content_name: "Vienna Boys Choir Australian Tour",
        content_ids: ["vienna-boys-choir"],
        content_type: "event",
        event_slug: "vienna-boys-choir",
      });
    }
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[data-vbc-sydney-show]") as HTMLAnchorElement | null;
      if (!anchor || !event.isTrusted) return;
      const showId = anchor.dataset.vbcSydneyShow;
      const time = showId ? SYDNEY_SHOWS[showId] : undefined;
      if (!showId || !time || !/^https:\/\/castiglione\.flicket\.io\//.test(anchor.href)) return;
      window.fbq?.("trackSingleCustom", PIXEL_ID, "TicketClick", {
        show_id: showId,
        city: "Sydney",
        show_date: "2027-02-07",
        show_time: time,
        ticketing_platform: "Flicket",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent, ready]);

  if (!ready || consent !== "unknown") return null;
  return (
    <div role="region" aria-label="Advertising cookie preference" className="fixed bottom-4 left-4 right-4 z-50 max-w-lg rounded bg-white p-4 text-sm text-black shadow-lg">
      <p className="mb-3">Allow Meta advertising cookies to measure visits and ticket-link clicks for this event? You can decline and still use the website.</p>
      <div className="flex gap-3">
        <button type="button" className="rounded bg-black px-4 py-2 text-white" onClick={() => { window.localStorage.setItem(CONSENT_KEY, "accepted"); setConsent("accepted"); }}>Allow</button>
        <button type="button" className="rounded border px-4 py-2" onClick={() => { window.localStorage.setItem(CONSENT_KEY, "rejected"); setConsent("rejected"); }}>Decline</button>
      </div>
    </div>
  );
}
