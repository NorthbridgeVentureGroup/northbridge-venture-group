import type { Metadata } from "next";
import { northbridgeVentures } from "@/lib/nordi/ventures";
import { SITE_ORIGIN } from "@/lib/seo";

const origin = "https://ventures.northbridgeventuregroup.com";
const corporatePartner = `${SITE_ORIGIN}/partner`;

export const metadata: Metadata = {
  title: "Northbridge Ventures",
  description:
    "Explore public Northbridge ventures and product families across aviation, games, logistics, digital systems, and future approved categories.",
  alternates: { canonical: origin },
  openGraph: {
    title: "Northbridge Ventures",
    description: "Companies and products built and operated by Northbridge Venture Group.",
    url: origin,
    type: "website",
  },
};

const suites = [
  {
    name: "Aviation Suite",
    description: "Training, pilot/instructor, and aviation operations products.",
    href: "https://aviation.northbridgeventuregroup.com",
  },
  {
    name: "Games",
    description: "Interactive products beginning with Quadrix.",
    href: "https://games.northbridgeventuregroup.com",
  },
  {
    name: "Logistics Suite",
    description: "Operational logistics and purchase-control software.",
    href: "https://logistics.northbridgeventuregroup.com",
  },
  {
    name: "Northbridge Digital",
    description: "Commercial digital services, integrations, business tools, and automation.",
    href: "https://digital.northbridgeventuregroup.com",
  },
];

export default function VenturesSuitePage() {
  const active = northbridgeVentures.filter((venture) => venture.status === "active");

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <section className="max-w-4xl pb-16">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-red">
            Northbridge Ventures
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Companies and products built by Northbridge.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-silver sm:text-lg">
            This is the portfolio discovery layer for public Northbridge ventures and product
            families. Product applications remain in their own repositories and deployments.
          </p>
        </section>

        <section className="border-y border-white/10 py-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">Explore by suite</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {suites.map((suite) => (
              <a
                key={suite.name}
                href={suite.href}
                className="rounded-2xl border border-white/10 bg-[#0b1017] p-6 transition hover:border-white/20"
              >
                <h3 className="text-xl font-semibold">{suite.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">{suite.description}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-red">
                  View suite →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">Public venture evidence</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {active.map((venture) => (
              <article
                key={venture.id}
                className="rounded-2xl border border-white/10 bg-[#0b1017] p-6"
              >
                <h3 className="text-xl font-semibold">{venture.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">{venture.description}</p>
                <p className="mt-4 text-xs uppercase tracking-wide text-stone">{venture.focus}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-16 text-center">
          <h2 className="text-3xl font-semibold">Have a venture or platform opportunity?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-silver">
            Venture partnerships are evaluated separately from Digital services and Engineering
            engagements.
          </p>
          <a
            href={corporatePartner}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-hover"
          >
            Partner With Northbridge
          </a>
        </section>
      </div>
    </main>
  );
}
