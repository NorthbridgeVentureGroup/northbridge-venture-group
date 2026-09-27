"use client";

import { noeDemoHref, NOE_PILOT_MAILTO } from "@/lib/noe-demo";
import { trackAnalytics } from "@/lib/nordy";

type NoeVentureActionsProps = {
  /** Analytics location + UTM content suffix */
  location?: "ventures" | "home";
};

const primaryClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-hover sm:w-auto illum-l3";

const secondaryClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10 sm:w-auto";

export default function NoeVentureActions({
  location = "ventures",
}: NoeVentureActionsProps) {
  const utmContent = location === "home" ? "home_card" : "ventures_card";
  const demoHref = noeDemoHref(utmContent);

  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a
        href={demoHref}
        target="_blank"
        rel="noopener noreferrer"
        className={primaryClassName}
        onClick={() =>
          trackAnalytics("noe_demo_cta_clicked", {
            location,
            product: "noe_aviation",
            href: demoHref,
          })
        }
      >
        Try Live Demo
      </a>
      <a
        href={NOE_PILOT_MAILTO}
        className={secondaryClassName}
        onClick={() =>
          trackAnalytics("noe_pilot_cta_clicked", {
            location,
            product: "noe_aviation",
            action: "request_pilot",
          })
        }
      >
        Request 90-day Pilot
      </a>
    </div>
  );
}
