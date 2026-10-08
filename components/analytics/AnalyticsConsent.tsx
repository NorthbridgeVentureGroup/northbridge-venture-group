"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONSENT_COOKIE,
  denyAnalyticsConsent,
  grantAnalyticsConsent,
  hasAnalyticsConsent,
  isDesignatedAnalyticsHost,
} from "@/lib/analytics/ga4";

/**
 * Shown only on the production host, before the Google tag loads.
 * The choice is a first-party cookie. Form fields and Nordi transcripts are not sent.
 */
export function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDesignatedAnalyticsHost(window.location.hostname)) return;
    const decided = document.cookie.split("; ").some((part) => part.startsWith(`${CONSENT_COOKIE}=`));
    if (!decided && !hasAnalyticsConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-xl rounded-2xl border border-white/15 bg-black/95 p-4 text-sm leading-relaxed text-silver shadow-lg">
      <p>
        This site can measure anonymous visits on northbridgeventuregroup.com. Names, email
        addresses, messages, and Nordi conversations are not sent to analytics.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red px-4 text-sm font-semibold text-white hover:bg-red-hover"
          onClick={() => {
            grantAnalyticsConsent();
            setVisible(false);
          }}
        >
          Accept analytics
        </button>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-4 text-sm font-semibold text-white hover:bg-white/5"
          onClick={() => {
            denyAnalyticsConsent();
            setVisible(false);
          }}
        >
          Decline
        </button>
        <Link
          href="/privacy"
          className="inline-flex min-h-11 items-center text-sm text-white underline-offset-4 hover:underline"
        >
          Privacy
        </Link>
      </div>
    </div>
  );
}
