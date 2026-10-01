"use client";

import { useEffect, useState } from "react";
import { detectWebGL } from "@/lib/visual-engine/detectWebGL";
import { prefersReducedMotion } from "@/lib/visual-engine/prefersReducedMotion";
import VisualEngineViewport, {
  type ShowcaseObjectId,
} from "@/components/technology/VisualEngineViewport";

const OBJECT_LABELS: Record<ShowcaseObjectId, string> = {
  cube: "Cube",
  sphere: "Sphere",
  ring: "Ring",
};

export default function VisualEngineShowcase() {
  const [webgl, setWebgl] = useState(true);
  const [selected, setSelected] = useState<ShowcaseObjectId>("sphere");
  const [autoRotate, setAutoRotate] = useState(false);
  const [resetToken, setResetToken] = useState(0);

  useEffect(() => {
    setWebgl(detectWebGL());
    if (prefersReducedMotion()) {
      setAutoRotate(false);
    }
  }, []);

  return (
    <section aria-label="Interactive 3D demonstration">
      {webgl ? (
        <div className="h-[min(72vh,640px)] min-h-[280px] w-full overflow-hidden border border-white/10 bg-[#87b8e3]">
          <VisualEngineViewport
            autoRotate={autoRotate}
            onSelect={setSelected}
            resetToken={resetToken}
            selected={selected}
          />
        </div>
      ) : (
        <div
          className="flex h-[min(72vh,640px)] min-h-[280px] flex-col justify-center border border-white/10 bg-[#141414] px-6 py-8 text-silver"
          role="status"
        >
          <p>This demonstration needs WebGL. The engine is an interactive 3D visualization host.</p>
          <p className="mt-3">On this device, a static description is shown instead of the live scene.</p>
        </div>
      )}

      <p className="mt-3 text-sm text-silver">
        Drag to rotate · Scroll or pinch to zoom · Select an object
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          className="min-h-10 border border-white/15 bg-[#1a1a1a] px-3 py-2 text-sm text-white"
          type="button"
          onClick={() => setResetToken((value) => value + 1)}
        >
          Reset view
        </button>
        <button
          aria-pressed={autoRotate}
          className="min-h-10 border border-white/15 bg-[#1a1a1a] px-3 py-2 text-sm text-white aria-pressed:border-red aria-pressed:bg-[#2a1014]"
          type="button"
          onClick={() => setAutoRotate((value) => !value)}
        >
          {autoRotate ? "Stop rotation" : "Auto-rotate"}
        </button>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Highlight object">
          {(Object.keys(OBJECT_LABELS) as ShowcaseObjectId[]).map((id) => (
            <button
              key={id}
              aria-pressed={selected === id}
              className="min-h-10 border border-white/15 bg-[#1a1a1a] px-3 py-2 text-sm text-white aria-pressed:border-red aria-pressed:bg-[#2a1014]"
              type="button"
              onClick={() => setSelected(id)}
            >
              {OBJECT_LABELS[id]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
