"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getEventPixelTrackingConfig } from "@/lib/eventPixelTracking";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track?: (...args: unknown[]) => void;
    };
  }
}

type EventTrackingPixelsProps = {
  eventSlug: string;
  eventTitle: string;
};

const ticketClickSelector = 'a[data-tracking-event="ticketing-link-click"]';

function metaPixelScript(pixelId: string) {
  return `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(pixelId)});
fbq('track', 'PageView');
`;
}

function tikTokPixelScript(pixelId: string) {
  return `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load(${JSON.stringify(pixelId)});
  ttq.page();
}(window, document, 'ttq');
`;
}

function getTrackingAnchor(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest(ticketClickSelector) as HTMLAnchorElement | null;
}

function optionalDataValue(value?: string) {
  const normalizedValue = value?.trim();
  return normalizedValue || undefined;
}

function getTicketingPlatform(url: string) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");

    if (hostname.includes("ticketek")) {
      return "ticketek";
    }

    if (hostname.includes("flicket")) {
      return "flicket";
    }

    return hostname;
  } catch {
    return undefined;
  }
}

export function EventTrackingPixels({ eventSlug, eventTitle }: EventTrackingPixelsProps) {
  const trackingConfig = getEventPixelTrackingConfig(eventSlug);
  const contentName = trackingConfig?.contentName ?? eventTitle;
  const metaPixelId = trackingConfig?.metaPixelId;
  const tikTokPixelId = trackingConfig?.tikTokPixelId;

  useEffect(() => {
    if (!trackingConfig) {
      return undefined;
    }

    const handleTicketClick = (event: MouseEvent) => {
      const anchor = getTrackingAnchor(event.target);

      if (!anchor) {
        return;
      }

      const payload = {
        content_name: contentName,
        content_ids: [eventSlug],
        content_type: "event_ticket",
        event_slug: eventSlug,
        destination_url: anchor.href,
        ticketing_platform: getTicketingPlatform(anchor.href),
        button_location: optionalDataValue(anchor.dataset.trackingLocation),
        city: optionalDataValue(anchor.dataset.trackingCity),
        show: optionalDataValue(anchor.dataset.trackingShow),
      };

      window.fbq?.("trackCustom", "TicketingLinkClick", payload);
      window.ttq?.track?.("ClickButton", payload);

      if (anchor.dataset.trackingDestination === "external-ticket") {
        window.fbq?.("track", "InitiateCheckout", payload);
        window.ttq?.track?.("InitiateCheckout", payload);
      }
    };

    document.addEventListener("click", handleTicketClick, true);

    return () => {
      document.removeEventListener("click", handleTicketClick, true);
    };
  }, [contentName, eventSlug, trackingConfig]);

  if (!trackingConfig || (!metaPixelId && !tikTokPixelId)) {
    return null;
  }

  return (
    <>
      {metaPixelId ? (
        <>
          <Script
            id={`meta-pixel-${eventSlug}`}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: metaPixelScript(metaPixelId) }}
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${encodeURIComponent(metaPixelId)}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}
      {tikTokPixelId ? (
        <Script
          id={`tiktok-pixel-${eventSlug}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: tikTokPixelScript(tikTokPixelId) }}
        />
      ) : null}
    </>
  );
}
