import type { Metadata } from "next";
import { EXTERNAL_PRODUCT_ORIGINS } from "@/lib/subdomain-routing";
import { SITE_ORIGIN } from "@/lib/seo";

/**
 * PRODUCT_MARKETING page for Aviator Network.
 * Served at /products/aviator-network and rewritten from
 * aviatornetwork.northbridgeventuregroup.com/ (browser keeps that host).
 *
 * Content limited to PUBLIC_VERIFIED claims from this corporate repo
 * (company knowledge, ventures registry, launch checklist). No invented
 * capabilities, no NEO internals in CAT copy, no unverified mobile claims.
 */

const marketingOrigin = "https://aviatornetwork.northbridgeventuregroup.com";
const productionApp = EXTERNAL_PRODUCT_ORIGINS.aviatorNetwork;
const aviationSuite = "https://aviation.northbridgeventuregroup.com";

export const metadata: Metadata = {
  title: "Aviator Network",
  description:
    "Aviator Network is Northbridge's aviation platform for pilots, instructors, logbook workflows, and operational tools built around how flight businesses actually run.",
  alternates: { canonical: marketingOrigin },
  openGraph: {
    title: "Aviator Network",
    description:
      "Aviation training and operations software for pilots, instructors, and flight businesses.",
    url: marketingOrigin,
    type: "website",
  },
};

const audiences = [
  "Pilots and students looking for training connections and workflow tools",
  "Independent instructors and flight schools coordinating students and progress",
  "Aviation operators who need software shaped around real flight-business practice",
];

const capabilities = [
  {
    title: "Pilot & instructor discovery",
    body: "Connect pilots, students, and instructors without relying on fragmented, informal channels.",
  },
  {
    title: "Training & learning workflows",
    body: "Support aviation training workflows designed around how flight businesses actually run.",
  },
  {
    title: "Logbook workflows",
    body: "Keep training and flight activity context in product workflows built for aviation records.",
  },
  {
    title: "CAT",
    body: "CAT is Aviator Network's in-product assistant for training and aviation workflows. It helps users navigate the product experience — it is not a marketing claim about internal engineering platforms.",
  },
  {
    title: "Operational tools",
    body: "Practical operational tools for aviation businesses, scoped to the live product rather than a generic business template.",
  },
];

const faqs = [
  {
    q: "Is this the Aviator Network app?",
    a: "This page is the Northbridge marketing detail for Aviator Network. The live product experience runs at aviatornetwork.com.",
  },
  {
    q: "How does this relate to the Aviation Suite?",
    a: "Aviator Network is part of the Northbridge Aviation Suite. The suite explains the product family; this page explains Aviator Network; the production app runs the product.",
  },
  {
    q: "What is CAT?",
    a: "CAT is the in-product assistant inside Aviator Network for training and aviation workflows. Product behavior and availability are defined by the live Aviator Network application.",
  },
  {
    q: "Does Northbridge invent capabilities here?",
    a: "No. Public claims on this page stay limited to verified portfolio language from the corporate site. Deeper feature detail belongs to the live product.",
  },
];

export default function AviatorNetworkMarketingPage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* 1. Hero / identity */}
        <section className="max-w-4xl pb-14 sm:pb-16">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-red sm:text-xs">
            Aviator Network
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Aviation software built around how flight businesses actually run.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-silver sm:text-lg">
            Aviator Network is Northbridge&apos;s aviation platform for pilots,
            instructors, logbook workflows, and operational tools. This page
            explains the product. The live application runs at{" "}
            <span className="text-white">aviatornetwork.com</span>.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={productionApp}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-hover"
            >
              Open Aviator Network
            </a>
            <a
              href={aviationSuite}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/5"
            >
              View Aviation Suite
            </a>
          </div>
        </section>

        {/* 2. Who it serves */}
        <section className="border-y border-white/10 py-12 sm:py-14">
          <h2 className="text-2xl font-semibold sm:text-3xl">Who it serves</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {audiences.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-[#0b1017] p-4 text-sm leading-relaxed text-silver"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 3–7. Capabilities (verified only) */}
        <section className="py-12 sm:py-14">
          <h2 className="text-2xl font-semibold sm:text-3xl">What Aviator Network covers</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-silver">
            The following reflects publicly verified portfolio language for Aviator
            Network. Detailed feature availability is defined by the live product.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#0b1017] p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 8. Why */}
        <section className="border-y border-white/10 py-12 sm:py-14">
          <h2 className="text-2xl font-semibold sm:text-3xl">Why Aviator Network</h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-silver">
            <li>— Built around aviation training and flight-business workflows</li>
            <li>— Product experience owned by the Aviator Network application</li>
            <li>— Clear funnel from suite discovery → product marketing → live app</li>
            <li>— Part of the Northbridge Aviation Suite without duplicating other aviation products</li>
          </ul>
        </section>

        {/* 9. Suite relationship */}
        <section className="py-12 sm:py-14">
          <h2 className="text-2xl font-semibold sm:text-3xl">Part of the Aviation Suite</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-silver">
            Northbridge Aviation is the product family. Aviator Network is the
            training-focused product within that family. Other suite products keep
            their own applications and operating models.
          </p>
          <a
            href={aviationSuite}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-red hover:text-red-hover"
          >
            Back to Aviation Suite →
          </a>
        </section>

        {/* 10. FAQ */}
        <section className="border-y border-white/10 py-12 sm:py-14">
          <h2 className="text-2xl font-semibold sm:text-3xl">FAQ</h2>
          <div className="mt-8 space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <h3 className="text-base font-semibold">{item.q}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-silver">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Production CTA */}
        <section className="py-14 text-center sm:py-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Open the live product
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-silver sm:text-base">
            Continue to the Aviator Network application for accounts, workflows,
            and day-to-day product use.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={productionApp}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-hover"
            >
              Open Aviator Network
            </a>
            <a
              href={`${SITE_ORIGIN}/contact`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/5"
            >
              Contact Northbridge
            </a>
          </div>
        </section>

        {/* 12. Corporate identity */}
        <section className="border-t border-white/10 pb-4 pt-10 text-center">
          <p className="text-sm text-silver">
            Aviator Network is built by{" "}
            <a
              href={SITE_ORIGIN}
              className="font-semibold text-white hover:text-red"
            >
              Northbridge Venture Group
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
