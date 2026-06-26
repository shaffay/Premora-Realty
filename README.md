# Premora Realty

**Real Estate with Clarity & Care.** A production-grade marketing + listings website for
Premora Realty, a luxury Dubai real estate consultancy.

Built with the dark emerald + gold + burgundy luxury aesthetic — a faithful rebuild of the
approved HTML prototype, elevated to an agency-quality, fully interactive site.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 14 (App Router) + TypeScript (strict) |
| Styling | Tailwind CSS with custom design tokens |
| Animation | Framer Motion (route transitions, scroll reveal, count-ups, parallax) |
| Fonts | `next/font` self-hosted — Cormorant Garamond + Mulish |
| UI primitives | Radix UI (dialog, select, slider) |
| Forms | react-hook-form + zod |
| Icons | lucide-react |
| Map | MapLibre GL (with a branded static fallback when no token) |
| i18n | next-intl — English + Arabic (full RTL) |
| State | URL search params (filters) · Zustand (favorites, compare, recently-viewed — persisted) |
| Data | Typed, zod-validated content in `/data` (CMS-ready) |
| Tests | Vitest (unit) + Playwright (e2e) |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — site works without any env vars
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (type-checked) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest unit tests (calculator, filters) |
| `npm run test:e2e` | Playwright happy-path (search → detail → book) |

## Environment variables

All are optional — the site is fully functional with none set.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, OG images, sitemap |
| `NEXT_PUBLIC_MAPTILER_KEY` | Enables the live MapLibre map. Without it, a branded static map is shown |
| `ENABLE_EMAIL` | `true` to send lead emails via Resend; otherwise leads are logged server-side |
| `RESEND_API_KEY` | Resend API key (required when `ENABLE_EMAIL=true`) |
| `LEAD_NOTIFY_EMAIL` | Recipient for lead notifications |

## Routes

```
/                       Home — hero, search, featured, numbers, why, communities, testimonials, CTA
/properties             Listings — URL-synced filters, sort, save search, grid ⇄ map, favorites, compare
/properties/[slug]      Detail — gallery, specs, advisor card, mortgage estimate, similar
/communities            Community index
/communities/[slug]     Community detail + its listings
/services               Service offering
/investment             Live mortgage & ROI calculator (shareable via URL)
/about                  Story, values, stats, team
/contact                Validated contact form + details + map
/saved                  Favorites, saved searches, recently viewed (per-device)
```

All routes are also available under `/ar` with full right-to-left layout.

## Architecture

```
app/                       App Router routes (locale-segmented under [locale])
  api/lead, api/newsletter Route Handlers — zod validation, honeypot, rate limiting
components/
  layout/                  Header, footer, modal, WhatsApp, mobile bar, locale switcher
  sections/                Page sections (hero, calculator, stats, etc.)
  property/                Cards, filters, map, gallery, advisor, compare
  forms/                   Consultation, contact, newsletter
  ui/                      Design-system primitives (button, dialog, select, toast, …)
data/                      Typed, zod-validated content (properties, communities, agents, …)
lib/                       calculator, filters, format, seo, i18n, rate-limit, email
store/                     Zustand stores (favorites, compare, recently-viewed, ui)
messages/                  en.json · ar.json (next-intl)
```

The data layer is intentionally decoupled — swapping `/data/*.ts` for a CMS (e.g. Sanity)
requires no component changes.

## Highlights

- **URL-as-state filters** — every filter, sort and view is shareable and bookmarkable
- **Live calculator** — real amortization math, shareable via URL, downloadable summary
- **Branded placeholders** — skyline-gradient + night-light texture; never a plain box
- **Accessibility** — semantic landmarks, focus traps, keyboard nav, `prefers-reduced-motion`
- **SEO** — per-route metadata, JSON-LD (`RealEstateListing`, `RealEstateAgent`, `BreadcrumbList`),
  dynamic OG images via `next/og`, `sitemap.xml`, `robots.txt`
- **Lead capture** — consultation modal, contact, request-viewing and newsletter all post to a
  validated, rate-limited Route Handler with honeypot protection (Resend behind an env flag)

## Deployment

Optimised for Vercel. `npm run build` passes with no type or lint errors.

> Note: this project pins `next@14.2.21`. For production, bump to the latest patched 14.2.x
> release (`npm i next@^14.2`) to pick up security fixes.
