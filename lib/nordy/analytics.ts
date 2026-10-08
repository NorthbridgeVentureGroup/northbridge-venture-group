import { forwardAnalyticsEvent } from "@/lib/analytics/ga4";

export type AnalyticsEventName =
  | "homepage_view"
  | "intent_card_selected"
  | "explore_northbridge_selected"
  | "engineering_ai_selected"
  | "digital_selected"
  | "nordy_opened"
  | "nordy_engineering_started"
  | "nordy_digital_started"
  | "nordy_ai_escalated"
  | "nordy_lead_qualified"
  | "nordy_human_handoff"
  | "mobile_app_offer_viewed"
  | "project_cta_clicked";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

type AnalyticsSink = (event: AnalyticsEventName, payload?: AnalyticsPayload) => void;

const memoryEvents: Array<{ event: AnalyticsEventName; payload?: AnalyticsPayload; at: string }> =
  [];

let sink: AnalyticsSink | null = null;

export function setAnalyticsSink(next: AnalyticsSink | null): void {
  sink = next;
}

/**
 * First-party analytics adapter.
 * GA4 receives a sanitized copy only after consent on the production host.
 * homepage_view is not forwarded: the Google tag sends one page_view itself.
 */
export function trackAnalytics(
  event: AnalyticsEventName,
  payload?: AnalyticsPayload,
): void {
  const at = new Date().toISOString();
  memoryEvents.push({ event, payload, at });

  try {
    forwardAnalyticsEvent(event, payload);
  } catch {
    // Analytics must never break UX.
  }

  if (typeof window !== "undefined") {
    const posthog = (window as unknown as { posthog?: { capture?: AnalyticsSink } }).posthog;
    if (posthog?.capture) {
      try {
        posthog.capture(event, payload);
      } catch {
        // Analytics must never break UX.
      }
    }
  }

  if (sink) {
    try {
      sink(event, payload);
    } catch {
      // ignore sink failures
    }
  }
}

export function getAnalyticsEventsForTests() {
  return [...memoryEvents];
}

export function clearAnalyticsEventsForTests(): void {
  memoryEvents.length = 0;
}
