# NVG Subdomain Suite & Product Marketing Architecture

Status: **ARCHITECTURE / DOCUMENTATION ONLY**  
Implementation status: **NOT AUTHORIZED**  
Canonical repository: `NorthbridgeVentureGroup/northbridge-venture-group`

## 1. Purpose

Northbridge will use a two-level public web namespace:

1. **Suite / category subdomains** — marketing, discovery, education, commercial routing, product-family presentation.
2. **Product subdomains** — the actual product experience, app, product-specific marketing surface, or login entry, deployed from the product's canonical repository/Vercel project.

Canonical principle:

> **Suite domain = explain + sell + route. Product domain = run the product.**

Suite pages belong to the Northbridge corporate website architecture. Product subdomains belong to their product repositories and deployment projects.

This document defines page purpose, content structure, routing, SEO intent, and ownership. It does not authorize code changes, DNS changes, deployments, or product-repo mutations.

---

## 2. Domain hierarchy

### Corporate root

`northbridgeventuregroup.com`

Role:
- Northbridge corporate authority
- company positioning
- portfolio discovery
- division discovery
- trust/proof
- routing into suites, products, Digital, and Engineering
- Nordy entry point

### Suite/category subdomains

| Domain | Role | Repo owner |
| --- | --- | --- |
| `ventures.northbridgeventuregroup.com` | Portfolio / venture discovery hub | Corporate website |
| `aviation.northbridgeventuregroup.com` | Aviation Suite marketing hub | Corporate website |
| `games.northbridgeventuregroup.com` | Games portfolio / product-family hub | Corporate website |
| `logistics.northbridgeventuregroup.com` | Logistics Suite marketing hub | Corporate website |
| `digital.northbridgeventuregroup.com` | Northbridge Digital commercial hub | Corporate website |

### Product subdomains

| Domain | Product | Suite | Repo/deployment owner |
| --- | --- | --- | --- |
| `aviatornetwork.northbridgeventuregroup.com` | Aviator Network | Aviation | Aviator Network product repo |
| `noe.northbridgeventuregroup.com` or verified public alias | NOE / aviation operations product | Aviation | NOE product repo |
| `quadrix.northbridgeventuregroup.com` | Quadrix | Games | Quadrix product repo |
| `npc.northbridgeventuregroup.com` | Northbridge Purchase Control | Logistics | NPC product repo |

Current DNS may contain an `aerox` label. Before implementation, confirm whether the public product name/domain is NOE, AeroX, or whether one is an alias. Do not create duplicate canonical product identities.

---

## 3. Ownership rules

### Corporate website owns

- root corporate pages
- suite/category landing pages
- cross-suite navigation
- venture portfolio presentation
- public service positioning
- SEO guides that belong to Northbridge Digital
- corporate trust / clients / case studies / contact
- product-family discovery cards
- outbound links to product applications

### Product repositories own

- authentication
- dashboards
- user workflows
- product pricing where product-owned
- product-specific onboarding
- app functionality
- product-specific support
- product release state
- product legal/compliance surfaces
- product-specific analytics

### Do not duplicate

Suite pages must not recreate product application functionality.

Product repos must not recreate corporate suite marketing architecture unless product-specific acquisition requires it.

Apply:

`KEEP -> CONNECT -> EXTEND -> CONSOLIDATE -> BUILD_NEW`

---

# 4. Corporate root page plan

## 4.1 Homepage — `northbridgeventuregroup.com/`

### Primary objective
Explain Northbridge in under 10 seconds and route visitors to the correct commercial/product family.

### Recommended structure

1. **Hero**
   - Northbridge builds companies, software, and intelligent systems.
   - Short proof-oriented subhead.
   - Primary CTA: Explore Northbridge / Talk to Nordy.
   - Secondary CTA: View ventures.

2. **Choose your path**
   - Ventures
   - Engineering & AI
   - Northbridge Digital
   - optionally Product Suites as a second row or compact navigator

3. **Suite navigator**
   - Aviation Suite
   - Logistics Suite
   - Games
   - Digital
   - each card explains the family and routes to its subdomain

4. **Capability proof**
   - web
   - mobile
   - AI
   - payments
   - marketplaces
   - operational systems
   - automation
   - analytics

5. **Selected ventures/products**
   - only publicly credible products
   - each card must distinguish:
     - Learn More
     - Open Product/App where appropriate

6. **Engineering & AI**
   - custom systems / complex requirements
   - CTA to Engineering

7. **Northbridge Digital**
   - standardized digital services
   - CTA to Digital

8. **How Northbridge works**
   - understand
   - design
   - reuse
   - build
   - test
   - deliver/operate

9. **Proof / clients / operating experience**
   - selected clients or venture evidence
   - avoid invented metrics

10. **Final CTA**
    - Talk to Nordy
    - Contact

### SEO intent
Corporate brand, venture group, software company, AI engineering, digital services.

---

## 4.2 About — `/about`

### Objective
Explain what Northbridge is, who it serves, how the operating model works, and why the company is credible.

### Structure
1. Hero / company definition
2. Parent-company model
3. Ventures vs Engineering vs Digital
4. NEO as internal shared intelligence/engineering layer — not a commercial division
5. Founder section
6. Operating principles
7. Central Florida / U.S. market presence
8. CTA: Ventures / Engineering / Digital / Contact

---

## 4.3 Ventures — root route `/ventures`

### Objective
Remain a corporate portfolio index and route to the dedicated `ventures.` subdomain when activated.

### Structure
1. Portfolio intro
2. Public suite categories
3. Active ventures
4. Incubation policy
5. Evidence/status labels
6. CTA to dedicated Ventures hub

Future rule:
- root `/ventures` may remain a concise corporate overview
- `ventures.northbridgeventuregroup.com` becomes the richer discovery hub

---

## 4.4 Engineering & AI — `/engineering-ai`

### Objective
Sell high-complexity custom work.

### Positioning
Northbridge Engineering handles work that exceeds productized Digital scope.

### Structure
1. Hero: custom systems for operational problems
2. Problems we solve
3. Services:
   - systems audit
   - automation / AI audit
   - custom software / SaaS
   - operational platform
   - AI copilot / agent systems
   - integrations
   - modernization
   - managed engineering
4. When Digital is the better fit
5. Engagement model
6. Proof / systems experience
7. Request discovery / contact
8. Cross-route to Digital for standardized work

Do not position Engineering as generic body-shop development.

---

## 4.5 Northbridge Digital — root route `/digital`

### Objective
Serve as a concise corporate entry path until `digital.` becomes the canonical commercial hub.

### Structure
1. Digital positioning
2. Core service families
3. Typical project range guidance where approved
4. Business Tools teaser
5. Guides / knowledge teaser
6. Request quote
7. Need custom software? Route to Engineering

Canonical future:
`digital.northbridgeventuregroup.com` becomes the full Digital commercial property.

---

## 4.6 Capabilities — `/capabilities`

### Objective
Index what Northbridge can deliver and classify the visitor into Digital vs Engineering.

### Structure
1. Capability summary
2. Engineering capabilities
3. Digital capabilities
4. Suite/product capabilities as evidence, not services
5. Decision guide:
   - standardized implementation -> Digital
   - custom architecture/software -> Engineering
6. CTA

---

## 4.7 Mobile Apps — `/mobile-apps`

### Objective
Productized Digital offer.

### Structure
1. Fast-path mobile positioning
2. Included scope
3. What is not included
4. Complexity triggers
5. App Store / Play Store caveats
6. Digital vs Engineering boundary
7. Request quote

---

## 4.8 Clients — `/clients`

### Objective
Public proof, not logo decoration.

### Structure
1. Client philosophy
2. Selected clients with verified relationship
3. What Northbridge delivered
4. Outcome evidence only when verifiable
5. Link to public work where appropriate
6. CTA

---

## 4.9 Partner — `/partner`

### Objective
Founder / venture partnership inquiries.

### Structure
1. What partnership means
2. What Northbridge may contribute
3. What Northbridge expects
4. What is not a fit
5. Partnership review process
6. Contact CTA

Keep separate from Digital and Engineering sales.

---

## 4.10 Contact — `/contact`

### Objective
Route requests intelligently.

### Structure
1. Choose path
2. Talk to Nordy
3. Request Digital quote
4. Request Engineering discovery
5. Partnership inquiry
6. General inquiry
7. Contact details

Future intake should classify to:
- DIGITAL
- ENGINEERING
- PARTNERSHIPS
- PRODUCT_SUPPORT
- GENERAL

---

## 4.11 Help — `/help`

### Objective
Corporate/Nordy help only.

Do not use this page as product support for Aviator Network, Quadrix, NPC, or NOE.

Structure:
1. Nordy usage
2. privacy
3. saved conversations
4. requesting human support
5. contact
6. links to product-specific support destinations

---

## 4.12 Privacy — `/privacy` + `/privacy/settings`

### Objective
Corporate privacy and Nordy controls.

Product-specific privacy remains product-owned when necessary.

---

# 5. Suite subdomain page plans

## 5.1 Ventures — `ventures.northbridgeventuregroup.com`

### Role
Portfolio discovery and venture storytelling.

### Audience
- prospective customers
- partners
- investors
- recruits
- industry operators
- people discovering Northbridge products

### Structure

1. **Hero**
   - "Companies built by Northbridge."
   - explain that ventures are operated products, not concept pages

2. **Portfolio by suite**
   - Aviation
   - Games
   - Logistics
   - other public suites when ready

3. **Individual venture cards**
   Every card:
   - venture name
   - problem addressed
   - current status
   - target users
   - suite
   - Learn More
   - Open Product / Visit Product where live

4. **Operating model**
   - Northbridge builds reusable capability
   - ventures keep customer/product ownership
   - reusable improvements flow upstream where appropriate

5. **Selected proof**
   - live products
   - app-store status
   - public deployments
   - verified operational proof

6. **Future ventures**
   - explain selective incubation without publishing unapproved concepts

7. **Partnership CTA**
   - Partner with Northbridge

8. **Cross-suite navigation**

### Do not
- expose internal project candidates
- list empty categories
- present prototype concepts as operating ventures

---

## 5.2 Aviation Suite — `aviation.northbridgeventuregroup.com`

### Role
Marketing hub for Northbridge aviation systems.

### Core message
Northbridge builds connected software for aviation training and operations.

### Current product family
- Aviator Network
- NOE / verified public aviation operations product
- supporting aviation ventures only if appropriate

### Structure

1. **Hero**
   - Aviation software built around real operators
   - CTA: Explore products
   - secondary CTA: Talk to Northbridge

2. **Who the suite serves**
   - pilots
   - independent CFIs
   - flight schools
   - aircraft owners/lessors
   - aviation operations teams where applicable

3. **Product cards**
   ### Aviator Network
   - training ecosystem
   - instructor/student discovery
   - logbook
   - CAT
   - learning/training tools
   - CTA: Learn More
   - CTA: Open Aviator Network

   ### NOE / aviation operations product
   - workforce / operations scope based on verified public product state
   - CTA: Learn More
   - CTA: Open App / Request Demo

4. **Connected ecosystem**
   Explain how products solve different aviation workflows without implying they share data unless verified.

5. **Use cases**
   - training
   - instructor discovery
   - operational coordination
   - scheduling/workforce where product-ready
   - digital aviation workflows

6. **Why Northbridge Aviation**
   - built by aviation operators
   - real operational context
   - mobile/web
   - AI where governed

7. **Product status / availability**
   - transparent labels:
     - Live
     - Early Access
     - Preview
     - Coming Later only when approved

8. **FAQ**
   - Are these one app?
   - Which product do I need?
   - Do products share accounts/data?
   - Is CAT part of Aviator Network?
   Answers must use verified product truth.

9. **Final CTA**
   - Choose a product
   - Contact aviation team

### SEO intent
aviation software, pilot training software, flight instructor platform, aviation operations software, aviation workforce software.

---

## 5.3 Games — `games.northbridgeventuregroup.com`

### Role
Northbridge games portfolio / studio hub.

### Initial flagship
Quadrix.

### Structure

1. **Hero**
   - Games built by Northbridge
   - focus on polished digital experiences, not generic "gaming company" claims

2. **Featured game**
   ### Quadrix
   - concise game concept
   - platforms
   - live/preview status
   - screenshots/trailer only when approved
   - CTA: Learn More
   - CTA: Play/Open Quadrix

3. **How Northbridge builds games**
   - reusable game architecture
   - analytics/economy/quality principles only where public-safe

4. **Player-first philosophy**
   - fairness
   - usability
   - performance
   - safety / age considerations as applicable

5. **Future games**
   - no empty teaser wall
   - only approved public projects

6. **FAQ**
   - where can I play?
   - mobile availability?
   - support?
   - purchases?

7. **Final CTA**
   - Open Quadrix
   - Product support

### Product routing
`quadrix.northbridgeventuregroup.com` must resolve to the Quadrix product deployment, not the corporate repo.

---

## 5.4 Logistics Suite — `logistics.northbridgeventuregroup.com`

### Role
Marketing hub for logistics and operational control software.

### Initial product
Northbridge Purchase Control (NPC).

### Structure

1. **Hero**
   - Operational software for logistics teams
   - emphasize control, visibility, accountability

2. **Problems**
   - purchase-order visibility
   - scattered approvals
   - vendor communication
   - spend tracking
   - receiving/status gaps
   - operational handoffs

3. **Featured product: Northbridge Purchase Control**
   - what it does
   - who it is for
   - core workflow
   - verified capabilities only
   - CTA: Learn More
   - CTA: Open NPC / Request Demo

4. **Who it serves**
   - logistics operators
   - fleets
   - maintenance/purchasing teams
   - operations managers
   - other verified target users

5. **Operational outcomes**
   - visibility
   - fewer missed orders
   - approval discipline
   - auditability
   - status tracking

6. **Future Logistics Suite**
   - explain suite can expand without publishing unapproved product names

7. **FAQ**
   - Is NPC an ERP?
   - Does it replace accounting?
   - Can it integrate with existing systems?
   - Who owns purchasing data?
   Exact claims require product verification.

8. **CTA**
   - Open NPC
   - Request demo
   - Need custom logistics software? Engineering

### SEO intent
purchase order control software, logistics operations software, purchasing workflow software, fleet purchase order tracking.

---

## 5.5 Northbridge Digital — `digital.northbridgeventuregroup.com`

### Role
Primary commercial acquisition site for productized digital services.

### Positioning
Websites, business systems, integrations, automation, digital operations, and selected AI-enabled workflows.

### Structure

1. **Hero**
   - practical digital systems for growing businesses
   - CTA: Request Quote
   - secondary CTA: Browse Business Tools

2. **Service families**
   - Websites & Digital Presence
   - Ecommerce
   - Business Systems & Integrations
   - Payments
   - Automation & AI
   - Analytics / SEO
   - Creative / Digital Production where approved

3. **Typical fit**
   - standardized/repeatable implementation
   - approximate project band when approved
   - not micro-task marketplace work

4. **Business Tools**
   canonical hub:
   `/business-tools`

   categories:
   - productivity
   - email/collaboration
   - ecommerce
   - payments
   - payroll/HR
   - CRM
   - automation
   - analytics
   - project management

5. **Tool pages**
   examples:
   - Google Workspace
   - Microsoft 365
   - Shopify
   - Square
   - Stripe
   - ADP
   - Gusto
   - Make
   - Airtable
   - monday.com
   - HubSpot when appropriate

   standard CTAs:
   - Learn More About Product
   - Request Integration Quote

6. **Guides**
   - Starting a Business
   - Business Technology Checklist
   - Professional Email
   - Accepting Payments
   - Starting an Online Store
   - Payroll / Hiring
   - Automation
   - Analytics

7. **Utility / comparison content**
   - tool comparisons
   - migration guides
   - how-to articles
   These may generate traffic/referral revenue even when Northbridge does not sell the task as a service.

8. **Trust / disclosure**
   - referral disclosure
   - independent implementation-service language
   - no unverified "partner" claims

9. **Digital vs Engineering**
   - "Need something more customized?"
   - route complex custom software to Engineering & AI

10. **Quote intake**
   minimum:
   - business
   - problem
   - desired outcome
   - systems already used
   - budget range
   - timeline

11. **Managed support**
   future only, documented candidate until separately approved

### SEO model
Informational -> problem-aware -> comparison -> product -> service -> quote.

---

# 6. Product subdomain behavior

Product domains are not suite pages.

## Standard product-domain expectations

1. Product identity
2. Product-specific navigation
3. Login / signup / app entry
4. Product-specific marketing where needed
5. Pricing owned by product
6. Support owned by product
7. Product legal/privacy
8. Product analytics
9. Link back to parent suite
10. Link to Northbridge corporate identity where appropriate

## Cross-link standard

Every product should expose:
- "Part of Northbridge [Suite]"
- link to suite page

Every suite product card should expose:
- Learn More
- Open Product / App / Request Demo

---

# 7. Navigation architecture

## Corporate header

Recommended top-level:
- Ventures
- Engineering & AI
- Digital
- Capabilities
- About
- Contact

Optional "Products" or "Suites" mega-nav when suite pages are implemented:
- Aviation
- Logistics
- Games

Do not overload the primary nav with every individual product.

## Suite header

Suite identity +:
- Overview
- Products
- Use Cases
- FAQ
- Contact / Demo

## Product header

Product-owned.

---

# 8. CTA taxonomy

Use consistent meanings.

| CTA | Meaning |
| --- | --- |
| Learn More | Navigate to informational page or third-party product |
| Open App | Enter live product |
| Get Started | Begin product-owned onboarding |
| Request Demo | Lead for product sales/demo |
| Request Quote | Digital commercial inquiry |
| Discuss a Custom Solution | Engineering discovery |
| Talk to Nordy | conversational Northbridge intake |
| View Suite | navigate to category hub |
| View Venture | venture detail/discovery |

Do not use one CTA label for multiple different actions.

---

# 9. SEO and canonical-domain rules

1. Each suite subdomain must have one clear topic cluster.
2. Avoid duplicating root corporate copy on suite pages.
3. Product pages should canonicalize to product-owned domains.
4. Suite pages should canonicalize to suite subdomains once live.
5. Root routes may remain concise indexes and should not compete with subdomains for identical intent.
6. Sitemap strategy must support multiple hostnames separately where appropriate.
7. Cross-domain analytics must preserve source/referrer where permitted.
8. Structured data:
   - Organization on corporate root
   - SoftwareApplication / Product only when claims are verified
   - Service for Digital/Engineering pages where appropriate
9. No mass-generated thin SEO pages.

---

# 10. Existing-state findings from repo scan

Verified from `main` during architecture review:

- Homepage already uses a three-path model: Explore / Engineering & AI / Digital.
- Current marketing routes include:
  - `/about`
  - `/ventures`
  - `/engineering-ai`
  - `/digital`
  - `/mobile-apps`
  - `/capabilities`
  - `/clients`
  - `/partner`
  - `/contact`
  - `/help`
  - `/privacy`
- `/portfolio` and `/services` are legacy redirect concepts in the current architecture.
- Current `/digital` is shallow relative to the planned Digital business-tools/content architecture.
- Current `/ventures` only exposes a narrow aviation-first portfolio set.
- Current capability registry has a clear Digital vs Engineering split but does not yet encode suite/category marketing ownership.
- Current sitemap is single-host and root-domain only.
- Nordy is used heavily as a primary CTA across marketing pages.
- Product/suite subdomain architecture is not yet represented in the current site architecture document.
- Current product evidence registry includes Northbridge Digital, Aviator Network, AirTax Financial, and a generic future-ventures placeholder.
- Product domains must not be pointed at the corporate app if the actual product lives in a separate repo.

---

# 11. Conflicts / normalization required before implementation

## A. Digital route ownership
Current `/digital` exists on corporate root. Future `digital.` becomes the full commercial property.

Decision needed before implementation:
- retain root `/digital` as summary and canonicalize commercial depth to subdomain
- or redirect root `/digital` to subdomain

Recommended: retain a concise corporate summary at `/digital`; use `digital.` as canonical commercial hub.

## B. Ventures route ownership
Same pattern:
- `/ventures` = corporate summary
- `ventures.` = richer portfolio hub

## C. Product naming
Resolve NOE vs AeroX public-domain identity before canonicalization.

## D. Product vs suite deployment
`quadrix.`, `npc.`, `aviatornetwork.`, and NOE/AeroX product domains must be attached to their actual product Vercel projects.

## E. Sitemap / robots
Multi-host strategy required before launch.

## F. Analytics
Cross-subdomain attribution must be designed before launch.

---

# 12. Implementation waves — NOT AUTHORIZED

These waves are architectural sequencing only.

## Wave 0 — normalization
- confirm canonical suite names
- confirm product names/subdomains
- confirm product repos/Vercel projects
- confirm analytics/canonical rules

## Wave 1 — corporate routing
- suite navigator on root
- root summary-page updates
- cross-links

## Wave 2 — suite landing pages
- Ventures
- Aviation
- Games
- Logistics
- Digital

## Wave 3 — product linking
- Open App / Learn More / Demo contracts
- backlinks to suites

## Wave 4 — Digital content architecture
- services
- business tools
- guides
- comparison/utility content
- quote routing

## Wave 5 — SEO/analytics
- per-host sitemap
- canonical metadata
- structured data
- cross-subdomain attribution

No wave is authorized by this document.

---

# 13. Acceptance criteria for future implementation

A suite page is ready only when:

- purpose is distinct from root and product pages
- product list is verified
- each CTA has one semantic meaning
- product status is accurate
- no unapproved claims
- canonical domain is set
- analytics source attribution works
- mobile layout passes review
- SEO metadata is unique
- suite -> product links work
- product -> suite backlink exists where applicable

---

# 14. Architecture classification

`NVG_SUBDOMAIN_SUITE_MARKETING_ARCHITECTURE_DOCUMENTED`

Implementation:
`NOT_AUTHORIZED`

DNS configuration is operational infrastructure and remains separate from this architecture document.
