import type { Metadata } from "next";
import SuiteLandingPage from "@/components/marketing/SuiteLandingPage";
import { EXTERNAL_PRODUCT_ORIGINS } from "@/lib/subdomain-routing";

const origin = "https://aviation.northbridgeventuregroup.com";
const aviatorMarketing = "https://aviatornetwork.northbridgeventuregroup.com";
const naeroxProduct = EXTERNAL_PRODUCT_ORIGINS.naerox;

export const metadata: Metadata = {
  title: "Northbridge Aviation Suite",
  description:
    "Northbridge aviation software for pilot training, instructor discovery, aviation operations, and connected digital workflows.",
  alternates: { canonical: origin },
  openGraph: {
    title: "Northbridge Aviation Suite",
    description:
      "Connected aviation software built around pilots, instructors, schools, and operators.",
    url: origin,
    type: "website",
  },
};

export default function AviationSuitePage() {
  return (
    <SuiteLandingPage
      eyebrow="Northbridge Aviation Suite"
      title="Aviation software built around real operators."
      description="Northbridge Aviation brings together products for training, pilot and instructor workflows, and aviation operations. Each product keeps its own application and operating model while the suite gives customers one place to understand what fits their needs."
      problems={[
        "Pilot and instructor discovery can be fragmented and inefficient.",
        "Training records, progress, and operational context often live in disconnected systems.",
        "Aviation teams need software that reflects real operational workflows instead of generic business templates.",
      ]}
      productsTitle="Products in the Aviation Suite"
      products={[
        {
          name: "Aviator Network",
          description:
            "Aviation training ecosystem for pilots, students, instructors, logbook workflows, CAT, and related training tools.",
          href: aviatorMarketing,
          primaryLabel: "Learn about Aviator Network",
        },
        {
          // Public name: Naerox only. Direct product host — no corporate detail page.
          name: "Naerox",
          description:
            "Northbridge aviation operations software focused on workforce and operational decision workflows. The live product runs on its own deployment.",
          href: naeroxProduct,
          primaryLabel: "Open Naerox",
        },
      ]}
      useCasesTitle="Common aviation use cases"
      useCases={[
        "Finding and connecting pilots, students, and instructors",
        "Training, learning, and logbook workflows",
        "Aviation workforce and operations coordination",
        "Connected digital workflows for aviation businesses",
      ]}
      whyTitle="Why Northbridge Aviation"
      whyPoints={[
        "Built from direct aviation operating experience",
        "Product-specific tools instead of one oversized generic application",
        "Web, mobile, AI, and operational systems under shared Northbridge engineering standards",
        "Clear separation between marketing suites and the actual product applications",
      ]}
      finalTitle="Start with Aviator Network."
      finalDescription="Use the suite to understand the product family, then continue to the Aviator Network marketing page — and open the live product when you are ready."
      finalHref={aviatorMarketing}
      finalLabel="Explore Aviator Network"
    />
  );
}
