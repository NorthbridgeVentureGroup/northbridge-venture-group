"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { analyticsCollectionEnabled, GA_MEASUREMENT_ID, sendPageView } from "@/lib/analytics/ga4";

/**
 * Next.js `next/script` Google tag.
 * The stock GoogleAnalytics helper always sends a page_view on config, so this
 * site sets send_page_view to false and emits one page_view per route after consent.
 * Nothing renders until the hostname is northbridgeventuregroup.com and the visitor accepts.
 */
export function GaScripts() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(analyticsCollectionEnabled());
    sync();
    window.addEventListener("nvg-analytics-consent", sync);
    return () => window.removeEventListener("nvg-analytics-consent", sync);
  }, []);

  useEffect(() => {
    if (!enabled || !pathname) return;
    let sent = false;
    const attempt = () => {
      if (sent) return;
      sent = sendPageView(pathname);
    };
    attempt();
    const timer = window.setInterval(() => {
      attempt();
      if (sent) window.clearInterval(timer);
    }, 250);
    return () => window.clearInterval(timer);
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          if (!window.__nvgGaConfigured) {
            window.__nvgGaConfigured = true;
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          }
        `}
      </Script>
    </>
  );
}
