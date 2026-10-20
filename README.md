# portfolio-v3 — public portfolio site

The public portfolio website: homepage (hero, about, experience, tech stack, projects,
testimonials, blog, contact), `/projects`, `/tech-stack`, `/blog` and `/blog/[slug]`, plus the
client-facing testimonial form at `/testimonial/[token]`.

All content is edited in the admin app ([`../portfolio-cms`](../portfolio-cms)) and read from
the shared Supabase database. Anything left empty in the admin falls back to built-in defaults.

## Features

- Content from Supabase: profile, social links, portfolio versions, experience, tech stack,
  projects, blog posts and approved testimonials.
- **Hire Me form** (`POST /api/hire-me`) — stores the lead, emails a copy to the address set in
  the admin (Leads → "Send new leads to"), and sends the visitor the auto-reply written in the
  admin. Emails go through Resend.
- **Blog likes** (`/api/blog/[postId]/like`) — one like per visitor, using a salted IP hash.
- **Instant updates from the admin** (`POST /api/revalidate`) — the admin calls this after every
  save (with `Authorization: Bearer $REVALIDATE_SECRET`); the site then refreshes all pages.
  Pages also re-render on their own every 60 seconds as a fallback.
- SEO: metadata, Open Graph image, `sitemap.xml`, `robots.txt`, `llms.txt`.
- Extras: GitHub contribution activity, a Mapbox location map.

Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4, Supabase, Resend.

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

Run the admin alongside it on port 3001 (`npm run dev -- -p 3001` in `portfolio-cms`). To
test instant updates locally, use the same `REVALIDATE_SECRET` in both apps and set the
admin's `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local`. Never commit real values.

| Variable | Required | Purpose |
| --- | --- | --- |
| **Database (Supabase)** | | |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase project URL (same project as the admin). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | Public anon key for read-only queries. |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Server-only key for writes (leads, testimonials, likes). Keep secret. |
| **Site** | | |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical origin, e.g. `https://example.com`. Falls back to Vercel's URL if unset. |
| **Instant updates from the admin** | | |
| `REVALIDATE_SECRET` | recommended | Shared secret for `/api/revalidate`. **Must match** the admin's `REVALIDATE_SECRET`. If unset, the endpoint is disabled and edits appear after ~60 s. |
| **Email (Resend)** | | |
| `RESEND_API_KEY` | for Hire Me | Sends the lead notification and the visitor's auto-reply. |
| `RESEND_FROM_EMAIL` | for Hire Me | Verified sender address. |
| **Likes** | | |
| `LIKE_IP_SALT` | yes | Random string mixed into visitor IP hashes for blog likes. |
| **Extras (optional)** | | |
| `GITHUB_USERNAME` | optional | GitHub user whose contribution activity is shown. |
| `GITHUB_TOKEN` | optional | GitHub token (read-only) for the contributions query. |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | optional | Mapbox public token for the location map. |

## Database

The schema and migrations live in the admin app: see
[`../portfolio-cms/supabase`](../portfolio-cms/supabase) and the "Database" section of
[`../portfolio-cms/README.md`](../portfolio-cms/README.md). Apply migrations (latest:
`010_site_content.sql`) before deploying either app.

## Deploying (Vercel)

1. Import the repo into Vercel with **Root Directory** set to `portfolio-v3`.
2. Add the environment variables above. `REVALIDATE_SECRET` must be identical to the admin
   project's value; set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. Deploy, then set the admin's `NEXT_PUBLIC_SITE_URL` to this site's URL and use
   **Settings → Test site sync** in the admin to confirm instant updates work.

Images must be hosted on Cloudinary (`res.cloudinary.com`) — that's the only remote image host
allowed in [`next.config.ts`](next.config.ts), and the admin only accepts Cloudinary links.
