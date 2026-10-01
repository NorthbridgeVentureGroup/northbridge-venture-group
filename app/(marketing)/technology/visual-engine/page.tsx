import dynamic from "next/dynamic";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Northbridge Visual Engine",
  description:
    "Interactive 3D visualization technology developed by Northbridge Venture Group.",
  path: "/technology/visual-engine",
  openGraphTitle: "Northbridge Visual Engine | Northbridge Venture Group",
  openGraphDescription:
    "Reusable interactive 3D visualization for simulation, training, product visualization, and digital environments.",
});

const VisualEngineShowcase = dynamic(
  () => import("@/components/technology/VisualEngineShowcase"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(72vh,640px)] min-h-[280px] items-center border border-white/10 bg-[#141414] px-6 text-silver">
        Loading 3D demonstration…
      </div>
    ),
  },
);

export default function VisualEnginePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-red">
          Northbridge Visual Engine
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Interactive 3D visualization
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-silver sm:text-base">
          Interactive 3D visualization technology developed by Northbridge Venture Group.
        </p>

        <div className="mt-8">
          <VisualEngineShowcase />
        </div>

        <section className="mt-10 max-w-2xl text-sm leading-relaxed text-silver sm:text-base">
          <p>
            Northbridge Visual Engine is reusable 3D visualization technology — scenes, cameras,
            lighting, and interactive presentation that products can specialize.
          </p>
          <p className="mt-4">
            It can support simulation, training, interactive education, product visualization,
            operational visualization, digital environments, games, and specialized industry
            applications. Aviation is one possible consumer, not the identity of the engine.
          </p>
          <p className="mt-4 text-xs text-stone sm:text-sm">
            This demonstration uses Northbridge-authored primitive geometry. It is not a physics
            engine, flight simulator, or certified simulation system.
          </p>
        </section>
      </div>
    </main>
  );
}
