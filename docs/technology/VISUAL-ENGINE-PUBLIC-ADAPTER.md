# Public Visual Engine adapter

**Canonical engine:** `@northbridge/visual-engine` in the Northbridge Visual Engine repository (`SceneHost`).

**This website** is Next.js 14 / React 18. The recovered NVE workspace runs React 19 / R3F 9. Cross-repo `file:` consumption also fails GitHub CI for this site.

Therefore the public page uses a **thin Three.js client adapter** that reproduces the existing SceneHost demonstration (orbit, lighting, horizon, generated primitives). It is not a fork of the engine and does not copy Quadrix or Aviator product code.

Homepage does not import this module. The `/technology/visual-engine` route lazy-loads it with `next/dynamic` (`ssr: false`).
