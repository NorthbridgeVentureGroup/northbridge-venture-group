import type { Metadata } from "next";
import SuiteLandingPage from "@/components/marketing/SuiteLandingPage";

const origin = "https://aviation.northbridgeventuregroup.com";

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
          href: "https://aviatornetwork.northbridgeventuregroup.com",
          primaryLabel: "Open Aviator Network",
        },
        {
          name: "NOE / Aviation Operations",
          description:
            "Northbridge aviation operations software focused on workforce and operational decision workflows. Public naming and product-domain normalization remain subject to the canonical product identity.",
          href: "https://aerox.northbridgeventuregroup.com",
          primaryLabel: "Open Aviation Operations",
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
      finalTitle="Choose the aviation product that fits the job."
      finalDescription="Use the suite to understand the product family, then continue into the actual product experience."
      finalHref="https://aviatornetwork.northbridgeventuregroup.com"
      finalLabel="Explore Aviator Network"
    />
  );
}
