# NVG Website Architecture

Canonical public-site architecture for Northbridge Venture Group after the Nordy 2.0 upgrade.

## Positioning

Northbridge Venture Group is the front door for:

1. Northbridge Ventures
2. Northbridge Engineering & AI
3. Northbridge Digital
4. Northbridge Operating Ventures (understated until public-ready)

NEO is **not** a commercial division. NEO is the shared engineering, intelligence, learning, capability, governance, and project-connection layer underneath Northbridge.

## Information architecture

| Route | Role |
| --- | --- |
| `/` | Marketing homepage + three intent cards + Nordy host |
| `/about` | Who we are |
| `/ventures` | Verified portfolio (Aviation first) |
| `/engineering-ai` | Premium systems / AI services |
| `/digital` | Predictable-scope Digital offerings |
| `/mobile-apps` | Mobile App Launch product |
| `/capabilities` | Capability index |
| `/contact` | Contact / handoff |
| `/portfolio` → `/ventures` | Legacy redirect |
| `/services` → `/capabilities` | Legacy redirect |

Operations routes under `/operations/*` remain product surfaces (`noindex`).

## Suite and product subdomain architecture

Northbridge now has a documented two-level public namespace:

- **Suite/category subdomains** are marketing, discovery, education, and commercial-routing surfaces owned by the corporate website.
- **Product subdomains** are owned by the actual product repository/deployment and run the product experience.

Canonical principle:

> **Suite domain = explain + sell + route. Product domain = run the product.**

The detailed page-by-page plan, suite content structure, CTA taxonomy, SEO model, product routing, and implementation sequencing are defined in:

- `docs/architecture/NVG-SUBDOMAIN-SUITE-MARKETING-ARCHITECTURE.md`

Implementation remains separately authorized.

## Homepage conversion model

1. Hero — “Northbridge builds companies, software, and intelligent systems.”
2. Three primary intent cards:
   - Explore Northbridge
   - Engineering & AI → Nordy `entryPath=ENGINEERING_AI`
   - Northbridge Digital → Nordy `entryPath=DIGITAL`
3. Capability proof, ventures, division sections, process, why Northbridge, final CTA

## Visual system

- Brand tokens: `lib/brand/tokens.ts`
- Illumination hierarchy: L0–L3 via `.illum-l*` in `app/globals.css`
- Components: `IlluminatedButton`, `IntentCard`, `NordyLauncher`, `NordyHost`
- Motion respects `prefers-reduced-motion`
- Typography: Manrope + Source Serif 4 (not Inter)

## Analytics

First-party event adapter in `lib/nordy/analytics.ts` with PostHog passthrough when `window.posthog` exists. Events include homepage/intent/Nordy qualification signals.

Cross-subdomain analytics and source attribution must be normalized before suite subdomains are activated.

## SEO

Root metadata, Open Graph, Twitter cards, `robots.ts`, `sitemap.ts`, Organization JSON-LD.

The current sitemap is single-host. Suite subdomain activation requires an explicit multi-host canonical/sitemap strategy before implementation.

## Related docs

- `docs/architecture/NVG-SUBDOMAIN-SUITE-MARKETING-ARCHITECTURE.md`
- `docs/architecture/NORDY-NEO-INTEGRATION.md`
- `docs/architecture/NORDY-INTAKE-AND-LEARNING.md`
- Canonical NEO doctrine remains owned by the NEOS repository.
