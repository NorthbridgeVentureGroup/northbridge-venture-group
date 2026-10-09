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

## SEO

Root metadata, Open Graph, Twitter cards, `robots.ts`, `sitemap.ts`, Organization JSON-LD.

The current sitemap is single-host (`northbridgeventuregroup.com` only). Suite subdomain activation requires an explicit multi-host canonical/sitemap strategy before launch — do not list suite origins on the corporate sitemap until that strategy is approved.

## Suite / product domain ownership (routing contract)

Canonical principles:

> **Suite domain = explain + sell + route.**  
> **Product-marketing NVG subdomain = explain the product on the corporate site.**  
> **External product origin = run the product.**

Ownership classes (see `lib/subdomain-routing.ts` `DOMAIN_REGISTRY`):

| Class | Examples | Owner |
| --- | --- | --- |
| `CORPORATE_ROOT` | `northbridgeventuregroup.com`, `www.` | This repo |
| `SUITE_MARKETING` | `aviation.`, `games.`, `logistics.`, `digital.`, `ventures.` | This repo — rewrite `/` → `/suite/*` |
| `PRODUCT_MARKETING` | `aviatornetwork.northbridgeventuregroup.com` | This repo — rewrite `/` → `/products/aviator-network` (not the live app) |
| `DIRECT_PRODUCT` | `naerox.`, `quadrix.`, `npc.` | Product Vercel projects — corporate router **must not claim** |

Aviator funnel: `aviation.` → Aviation Suite → `aviatornetwork.` (marketing detail) → Open Aviator Network → `https://aviatornetwork.com`.

Naerox funnel: `aviation.` → Aviation Suite → **Open Naerox** → `https://naerox.northbridgeventuregroup.com` (direct product; no corporate detail page).

Public aviation-operations product name is **Naerox** only (never NOE / AeroX / aerox in public copy). Historical `aerox.`/`noe.` labels are unclaimed and must not be rewritten.

Implementation: `lib/subdomain-routing.ts` + root `middleware.ts` rewrite. Suite and product-marketing hosts must be normal production domains on the **corporate** Vercel project — not 308 redirects to the apex. Direct-product hosts stay on their product projects.

Header/Footer corporate links use absolute `https://northbridgeventuregroup.com/...` so marketing hosts do not trap corporate IA.

Detailed suite page plans live in PR #29 / `docs/architecture/NVG-SUBDOMAIN-SUITE-MARKETING-ARCHITECTURE.md` when merged.

## Related docs

- `docs/architecture/NVG-SUBDOMAIN-SUITE-MARKETING-ARCHITECTURE.md` (suite marketing architecture; docs PR)
- `docs/architecture/NORDY-NEO-INTEGRATION.md`
- `docs/architecture/NORDY-INTAKE-AND-LEARNING.md`
- Canonical NEO doctrine remains owned by the NEOS repository.
