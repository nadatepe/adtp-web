# Yeni Adatepe Nakliyat

Turkish logistics landing site and lightweight admin for open shipment listings.

**Brand:** Yeni Adatepe Nakliyat · sister company **Adatepe Global Lojistik**

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- Postgres when `DATABASE_URL` is set (publish-app); local PGlite otherwise
- Single-password admin session (`ADMIN_PASSWORD`)

## Run locally

```bash
npm install
env -u DATABASE_URL ADMIN_PASSWORD=adatepe-admin WHATSAPP_NUMBER=905551112233 npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000)

- Landing: `/`
- Open jobs: `/acik-sevkiyatlar`
- Admin: `/admin` (password from `ADMIN_PASSWORD`, default `adatepe-admin`)

Unset `DATABASE_URL` on this VM so local runs use PGlite, not another shared database.

## Environment

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Admin login secret |
| `ADMIN_SESSION_SECRET` | Optional cookie HMAC secret |
| `WHATSAPP_NUMBER` | Digits-only intl. number for `wa.me` links |
| `DATABASE_URL` | Postgres (set by publish-app) |

## Imagery

Hero and services use **free Unsplash stock** URLs (highway truck + warehouse). Comments in `src/app/page.tsx` mark them. Optional **400×400** brand photo placeholders can replace the services image block.

## Publish

`cursor-app.json` declares Postgres. Build runs migrations via `scripts/migrate.mjs`. Bind secrets `ADMIN_PASSWORD` and `WHATSAPP_NUMBER` before or after publish.
