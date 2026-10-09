import type { Metadata } from "next";
import Link from "next/link";
import { capabilityRegistry } from "@/lib/nordy/capability-registry";

const origin = "https://digital.northbridgeventuregroup.com";

export const metadata: Metadata = {
  title: "Northbridge Digital",
  description:
    "Websites, ecommerce, business systems, integrations, automation, analytics, and practical digital implementation for growing businesses.",
  alternates: { canonical: origin },
  openGraph: {
    title: "Northbridge Digital",
    description:
      "Practical digital systems, integrations, websites, automation, and business technology.",
    url: origin,
    type: "website",
  },
};

const serviceFamilies = [
  "Websites & Digital Presence",
  "Ecommerce",
  "Business Systems & Integrations",
  "Payments",
  "Automation & AI",
  "Analytics & SEO",
];

export default function DigitalSuitePage() {
  const digital = capabilityRegistry.filter((item) => item.division === "DIGITAL");

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <section className="max-w-4xl pb-16">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-red">
            Northbridge Digital
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Practical digital systems for growing businesses.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-silver sm:text-lg">
            Northbridge Digital delivers standardized, repeatable digital services: websites,
            ecommerce, business-tool integrations, payments, automation, analytics, and selected
            AI-enabled workflows. More complex custom systems route to Northbridge Engineering.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#custom-project"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-hover"
            >
              Request a Quote
            </Link>
            <a
              href="#business-tools"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/5"
            >
              Browse Business Tools
            </a>
          </div>
        </section>

        <section className="border-y border-white/10 py-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">Service families</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceFamilies.map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-[#0b1017] p-5 text-sm text-silver">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">Current Digital offerings</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {digital.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white/10 bg-[#0b1017] p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="business-tools" className="border-y border-white/10 py-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">Business Tools</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-silver">
            Northbridge Digital is building a practical library of commonly used business tools,
            including productivity, ecommerce, payments, payroll, CRM, automation, and analytics.
            Tool pages will distinguish between learning about the third-party product and
            requesting Northbridge implementation work.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Google Workspace", "Microsoft 365", "Shopify", "Square", "Stripe", "ADP", "Make", "Gusto", "Airtable"].map((tool) => (
              <div key={tool} className="rounded-xl border border-white/10 bg-[#0b1017] p-4 text-sm text-silver">
                {tool}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-12 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#0b1017] p-6">
            <h2 className="text-xl font-semibold">Guides & useful content</h2>
            <p className="mt-3 text-sm leading-relaxed text-silver">
              Educational pages, tool comparisons, and utility guides can attract search traffic,
              create trust, and route people to relevant tools without forcing every article into
              a service sale.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0b1017] p-6">
            <h2 className="text-xl font-semibold">Need custom software?</h2>
            <p className="mt-3 text-sm leading-relaxed text-silver">
              If the requirement becomes a custom platform, specialized architecture, advanced AI,
              or a complex multi-system implementation, Northbridge Engineering is the better fit.
            </p>
            <Link href="/engineering-ai" className="mt-5 inline-block text-sm font-semibold text-red">
              Explore Engineering & AI →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
