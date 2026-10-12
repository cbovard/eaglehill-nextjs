# Eagle Hill Equine

The Eagle Hill Equine website frontend — a headless Drupal site built with [Next.js](https://nextjs.org) and [next-drupal](https://next-drupal.org). Content (pages, news, livestock listings, menus, slideshows) is authored in a separate Drupal backend and fetched here via JSON:API.

## Requirements

- Node v18.17.1 (see `.nvmrc` — run `nvm use`)
- A running Drupal backend exposing JSON:API, reachable at the URL you set below

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Description |
   | --- | --- |
   | `NEXT_PUBLIC_DRUPAL_BASE_URL` | Base URL of the Drupal backend |
   | `NEXT_IMAGE_DOMAIN` | Domain allowed for Next.js image optimization (usually the Drupal host) |
   | `DRUPAL_REVALIDATE_SECRET` | Shared secret Drupal uses to trigger on-demand revalidation (`/api/revalidate`) |
   | `DRUPAL_PREVIEW_SECRET` | Shared secret used for Drupal preview mode (`/api/preview`) |

3. Run the dev server:

   ```bash
   npm run dev
   ```

   The site will be available at http://localhost:3000.

## Scripts

```bash
npm run dev       # start the dev server
npm run build     # production build
npm run start     # serve a production build
npm run preview   # build + start, to check a production build locally
npm run lint       # next lint
```

## Project structure

- `pages/[[...slug]].tsx` — catch-all route that resolves any Drupal path alias to a node (pages, news, livestock)
- `pages/home.tsx` — the front page
- `pages/{news,stallions,mares,show-horses,for-sale,horses,donkeys,livestock}/page/[page].tsx` — paginated listing pages, backed by Drupal Views
- `pages/api/` — preview, exit-preview, and on-demand revalidation webhooks
- `components/node*.tsx` — per-content-type rendering (full and teaser views)
- `components/` — shared layout, navigation, forms, and media components
- `lib/drupal.ts` — the `next-drupal` client
- `lib/get-params.ts` — JSON:API field/include params per resource type
- `lib/get-global-elements.ts` — shared menu/block data fetched on every page

See `CLAUDE.md` for a more detailed architecture overview.

## Content updates

Drupal should call `/api/revalidate?slug=<path>&secret=<DRUPAL_REVALIDATE_SECRET>` on content save to trigger on-demand ISR for the affected page.
