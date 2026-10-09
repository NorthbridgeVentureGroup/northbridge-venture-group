import type { Metadata } from "next";
import SuiteLandingPage from "@/components/marketing/SuiteLandingPage";
import { SITE_ORIGIN } from "@/lib/seo";

const origin = "https://logistics.northbridgeventuregroup.com";

export const metadata: Metadata = {
  title: "Northbridge Logistics Suite",
  description:
    "Operational software for logistics teams, purchasing visibility, approvals, and control.",
  alternates: { canonical: origin },
  openGraph: {
    title: "Northbridge Logistics Suite",
    description:
      "Operational software for logistics, purchasing, visibility, and accountability.",
    url: origin,
    type: "website",
  },
};

export default function LogisticsSuitePage() {
  return (
    <SuiteLandingPage
      eyebrow="Northbridge Logistics Suite"
      title="Operational control for logistics teams."
      description="Northbridge Logistics is the product family for practical operational software across purchasing, visibility, approvals, and logistics workflows."
      problems={[
        "Purchase orders can disappear across email, spreadsheets, and disconnected systems.",
        "Approvals and vendor status are difficult to track consistently.",
        "Operations teams need clear ownership, auditability, and current status without adding unnecessary complexity.",
      ]}
      productsTitle="Featured logistics product"
      products={[
        {
          name: "Northbridge Purchase Control (NPC)",
          description:
            "A purchasing-control product designed to give operations teams clearer purchase-order workflows, status visibility, and accountability. Product capabilities shown publicly must remain aligned with the NPC source of truth.",
          href: "https://npc.northbridgeventuregroup.com",
          primaryLabel: "Open NPC",
          secondaryHref: `${SITE_ORIGIN}/engineering-ai`,
          secondaryLabel: "Need Custom Logistics Software?",
        },
      ]}
      useCasesTitle="Operational use cases"
      useCases={[
        "Purchase-order tracking",
        "Approval visibility",
        "Vendor and receiving status",
        "Operational accountability and audit trails",
      ]}
      whyTitle="Why a dedicated logistics suite"
      whyPoints={[
        "Keeps operational products discoverable without mixing them into unrelated ventures",
        "Lets each product preserve its own application and data model",
        "Creates a clear path from product discovery to custom Engineering when necessary",
        "Allows the suite to expand without forcing future products into NPC",
      ]}
      finalTitle="Start with Purchase Control."
      finalDescription="If NPC fits the workflow, open the product. If the requirement is materially custom, Northbridge Engineering can evaluate it separately."
      finalHref="https://npc.northbridgeventuregroup.com"
      finalLabel="Open NPC"
    />
  );
}
