---
name: cleanwatersupply
description: Project context for the Clean Water Supply Danish e-commerce site. Use when user asks to edit content, add products, update pages, deploy, or work with anything in the cleanwatersupply project. Captures architecture, conventions, deployment workflow, and "do not break" rules.
---

# Clean Water Supply project context

This is the project knowledge base. Read it once, then act on it directly — don't re-discover from the codebase.

## What this is

**Clean Water Supply** is a Danish e-commerce site for water hygiene products: Legionella filters, water softeners, ECA-water systems. Built for the Danish market.

- **Live URL:** `https://cleanwatersupply-rose.vercel.app` (custom domain `cleanwatersupply.dk` is migrating)
- **Repo:** `github.com/ywagenvoord/cleanwatersupply`
- **Hosting:** Vercel (project: `readymarketings-projects/cleanwatersupply`)
- **Payments:** Stripe (incl. MobilePay for DK market)
- **Form submissions:** FormSubmit (no API key, sends to `caj@cleanwatersupply.dk`)
- **Language:** Danish only (`da-DK`). Currency: DKK.

## Tech stack

- **Next.js 14.2** App Router
- **React 18** (NOT 19 — no `fetchPriority` attribute, no `use()` hook)
- **TypeScript** (loose — `as any` is acceptable for Stripe types)
- **Tailwind CSS** with brand colors:
  - Navy `#0a2540` (primary)
  - Green `#3aad4a` (CTAs, hover: `#2e9a3d`)
- **Stripe SDK** v22.x (server-side, in API route only)
- **lucide-react** for icons

## Architecture — read this first

### Pages: server + client wrapper pattern

Pages that need metadata (SEO) are **server components**. Interactive parts live in a client wrapper:

```
src/app/legionella/page.tsx        ← Server component, exports metadata + JSON-LD
src/app/legionella/LegionellaClient.tsx  ← 'use client', has interactivity
```

**RULE:** When asked to add metadata to a page that's marked `'use client'`, refactor to this pattern. Never add `'use client'` to a page that already has `export const metadata`.

### Product data flow (Stripe is the source of truth)

```
Stripe Dashboard (products + prices)
       ↓
src/lib/stripe-fetch.ts (server-side fetch with ISR cache)
       ↓
src/lib/products.ts (hardcoded enrichment: FAQs, specs, longDescription)
       ↓
src/app/shop/page.tsx (server component, merges live Stripe + hardcoded)
       ↓
src/app/shop/ShopClient.tsx (client UI for filtering)
```

**Key behavior:**
- Adding a product in Stripe → auto-appears on `/shop` within 60s (ISR `revalidate = 60`)
- Stripe products with `metadata.cws_id` matching a `PRODUCTS[].id` get enriched (FAQs, specs, longDescription)
- Stripe-only products (no `cws_id`) show with minimal info
- Detail page `/shop/[productId]` accepts BOTH the cws-id slug AND the `prod_xxx` Stripe ID
- Test products (name = "test product" or starts with "test ") are filtered out in `stripe-fetch.ts`

**To add a real product:** instruct the user to add it in Stripe Dashboard with `metadata.cws_id = "some-slug"`, then optionally edit `src/lib/products.ts` to add rich content matching that slug.

### Cart system

- `src/contexts/CartContext.tsx` — localStorage-backed cart, key `cws-cart-v1`
- `src/components/CartDrawer.tsx` — slide-in drawer
- `src/app/cart/page.tsx` — full cart page (noindex)
- `src/app/api/checkout/route.ts` — server route creating Stripe Checkout Session
  - Uses `STRIPE_SECRET_KEY` env var on Vercel
  - `adaptive_pricing: { enabled: false }` (forces DKK so MobilePay shows)
  - No `payment_method_types` — Stripe shows everything enabled in dashboard
  - Resolves prices via `default_price` first, falls back to `prices.list()`

### SEO infrastructure

Already implemented site-wide. Components live in `src/components/seo/`:

- `OrganizationJsonLd.tsx` — site-wide Org + LocalBusiness + WebSite (rendered in root layout)
- `ProductJsonLd.tsx` — Product schema (NO fake aggregateRating — removed permanently)
- `BreadcrumbJsonLd.tsx`
- `FaqJsonLd.tsx`
- `ArticleJsonLd.tsx` — used on `/legionella` and `/eca-vand`

OG/favicon assets via Next.js conventions (don't manually configure `metadata.icons`):
- `src/app/icon.tsx` (favicon, water drop)
- `src/app/apple-icon.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/twitter-image.tsx`
- `src/app/shop/[productId]/opengraph-image.tsx` (dynamic per product)
- `src/app/legionella/opengraph-image.tsx`

`robots.ts` and `sitemap.ts` are dynamic — sitemap auto-includes products + sectors.

### Sector pages

7 sector pages at `/omraader/[sektor]`. Data in `src/lib/sektorer.ts`. Adding a new sector = add object to that array, rebuild.

## Deployment workflow

### Build first, deploy second
```bash
cd "C:/Users/ClaraYouri/Downloads/Youri - Claude/cleanwatersupply"
npm run build              # MUST pass before deploying
vercel --prod --yes
```

### Git author email matters
The Vercel team only allows deployments from `youri.wagenvoord@ziggo.nl` (NOT `youri@cleanwatersupply.dk`). If a deploy fails with "Git author X must have access to the team":

```bash
git config user.email "youri.wagenvoord@ziggo.nl"
git commit --allow-empty -m "fix: git author email"
vercel --prod --yes
```

### Environment variables on Vercel
- `STRIPE_SECRET_KEY` (sensitive, Production + Preview) — required for cart checkout

## Common tasks — patterns to follow

### Add metadata to a page that's currently 'use client'

1. Rename `page.tsx` → `XxxClient.tsx` (keep `'use client'`)
2. Create new `page.tsx` as server component:
   ```tsx
   import type { Metadata } from 'next'
   import XxxClient from './XxxClient'

   export const metadata: Metadata = {
     title: 'Short title under 55 chars',
     description: 'Description under 155 chars',
     alternates: { canonical: `${SITE_URL}/path` },
     openGraph: { /* ... */ },
   }

   export default function Page() { return <XxxClient /> }
   ```

### Add a new sector

Edit `src/lib/sektorer.ts`. Match existing object shape (id, title, tagline, heroImage, intro, values[], problemHeading, problemBody, benefits[], contactPerson). Sitemap and routes auto-update.

### Update a product price

Best path: change in Stripe Dashboard. Auto-syncs within 60s. No code change needed unless price displayed in hardcoded copy.

### Add a payment method (besides MobilePay/cards)

Just enable in Stripe Dashboard → Payment methods. No code change required (we don't pass `payment_method_types`).

## ⚠️ Things that will break

- **Don't** add fake `AggregateRating` to ProductJsonLd — Google policy violation, removed for a reason
- **Don't** wrap Navigation in a `<header>` element — caused SWC parse errors before
- **Don't** use `fetchPriority` JSX attribute — React 18, breaks build
- **Don't** set `payment_method_types` on Checkout Sessions — restricts methods, hides MobilePay
- **Don't** set `automatic_payment_methods` on Checkout Sessions — Stripe rejects it
- **Don't** set `adaptive_pricing.enabled = true` — converts DKK to EUR for non-DK visitors and hides MobilePay
- **Don't** add `'use client'` directive to a server component that has `export const metadata`
- **Don't** commit secrets. `STRIPE_SECRET_KEY` belongs only on Vercel env vars

## ⚠️ Security rules

- The git author email MUST be `youri.wagenvoord@ziggo.nl` for Vercel deploys to work
- Never paste Stripe secret keys into commits, chats, or files (use Vercel env)
- Never add binary assets > 100MB (Github limit). `.gitignore` excludes `node_modules/`, `.next/`

## File map (quick reference)

| Need | File |
|------|------|
| Root layout + metadata | `src/app/layout.tsx` |
| Robots / sitemap | `src/app/robots.ts`, `sitemap.ts` |
| Homepage | `src/app/page.tsx` + `HomeClient.tsx` |
| Shop list | `src/app/shop/page.tsx` (server) + `ShopClient.tsx` |
| Product detail | `src/app/shop/[productId]/page.tsx` + `BuyBox.tsx` |
| Sector pages | `src/app/omraader/[sektor]/page.tsx` |
| Cart | `src/app/cart/page.tsx` + `CartDrawer.tsx` + `CartContext.tsx` |
| Checkout API | `src/app/api/checkout/route.ts` |
| Products data | `src/lib/products.ts` (enrichment), `stripe-products.ts` (Stripe IDs), `stripe-fetch.ts` (live fetch) |
| Sectors data | `src/lib/sektorer.ts` |
| Recommendations | `src/lib/recommendations.ts` |
| SEO components | `src/components/seo/` |
| Navigation | `src/components/Navigation.tsx` |
| Footer | `src/components/Footer.tsx` |
| Cart drawer | `src/components/CartDrawer.tsx` |
| Recommended products | `src/components/RecommendedProducts.tsx` |
| Translations | `src/contexts/LanguageContext.tsx` |
| Stripe import script (one-shot) | `stripe-import.js` |
| Markdown → PDF helpers | `convert-to-pdf.js`, `html-to-pdf.js` |

## Project-specific quirks

- The shop page uses ISR (`revalidate = 60`). After a Stripe change, full propagation takes up to a minute
- The detail page has `dynamicParams = true` so Stripe-only products (with `prod_xxx` IDs) get rendered on-demand
- The cart page wraps in `<Suspense>` because it uses `useSearchParams()` for the success state
- The Stripe import script lives in `.vscode/cleanwatersupply/` AND in this project root — keep them in sync if used again
- FormSubmit requires the recipient (`caj@cleanwatersupply.dk`) to confirm a one-time activation email after the first submission

## When in doubt

- Build fails → check the SWC error first; usually a JSX or attribute issue
- Deploy fails at 0ms → git author email mismatch, see above
- Stripe checkout fails → verify `STRIPE_SECRET_KEY` env var on Vercel + that adaptive_pricing is `false`
- Page doesn't update → ISR cache, wait 60s or trigger a redeploy
- Product page 404 → check that product has a valid Stripe price; products without prices are filtered out
