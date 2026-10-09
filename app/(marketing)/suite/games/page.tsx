import type { Metadata } from "next";
import SuiteLandingPage from "@/components/marketing/SuiteLandingPage";

const origin = "https://games.northbridgeventuregroup.com";

export const metadata: Metadata = {
  title: "Northbridge Games",
  description:
    "Northbridge Games presents interactive products built and operated by Northbridge, beginning with Quadrix.",
  alternates: { canonical: origin },
  openGraph: {
    title: "Northbridge Games",
    description: "Interactive products and games built by Northbridge.",
    url: origin,
    type: "website",
  },
};

export default function GamesSuitePage() {
  return (
    <SuiteLandingPage
      eyebrow="Northbridge Games"
      title="Games built as real products, not experiments."
      description="Northbridge Games is the portfolio home for interactive entertainment products built and operated under Northbridge engineering and product standards."
      problemsTitle="What the portfolio emphasizes"
      problems={[
        "Clear, polished player experiences across supported devices.",
        "Reliable game systems, progression, and product operations.",
        "A product discipline that treats games as long-lived software, not disposable prototypes.",
      ]}
      productsTitle="Featured product"
      products={[
        {
          name: "Quadrix",
          description:
            "Northbridge's current game product. The product experience, purchases, release state, and player workflows remain owned by the Quadrix application.",
          href: "https://quadrix.northbridgeventuregroup.com",
          primaryLabel: "Open Quadrix",
        },
      ]}
      useCasesTitle="What belongs here"
      useCases={[
        "Game discovery and product presentation",
        "Links into live game experiences",
        "Public platform and availability information",
        "Future approved Northbridge game products",
      ]}
      whyTitle="Portfolio principles"
      whyPoints={[
        "Player-facing product quality over portfolio volume",
        "Only approved public products are shown",
        "Game application logic stays in the product repo",
        "The suite page explains and routes; the product domain runs the game",
      ]}
      finalTitle="Start with Quadrix."
      finalDescription="The Games suite introduces the product. The actual Quadrix experience runs from its own product deployment."
      finalHref="https://quadrix.northbridgeventuregroup.com"
      finalLabel="Open Quadrix"
    />
  );
}
