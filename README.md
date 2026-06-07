# Balkan Veil

## Project Scope

Balkan Veil is a React + Vite + TypeScript application in `website/`. The same Vite app contains the public bilingual website and the CMS/admin code, but deployment exposure is separated through `VITE_APP_MODE`.

The admin/CMS must not be exposed on the public website deployment.

## App Modes

- `site`: public website only. Recommended for the public Vercel deployment. `/admin` falls through to the public 404/noindex route.
- `admin`: CMS/admin only. Recommended for a separate CMS deployment. Non-admin paths are normalized to `/admin`.
- `full`: local development only. Allows both the public site and `/admin`.

Missing or invalid `VITE_APP_MODE` values behave like `site`.

## Vercel Deployment Examples

Public website:

- Root directory: `website`
- Build command: `npm run build`
- Output directory: `dist`
- `VITE_APP_MODE=site`
- `VITE_SITE_ORIGIN=https://your-public-domain.example`
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_ANON_KEY=...`

CMS:

- Root directory: `website`
- Build command: `npm run build`
- Output directory: `dist`
- `VITE_APP_MODE=admin`
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_ANON_KEY=...`

Deploy modes should be configured with Vercel environment variables.

## Local Development

```bash
cd website
npm ci
npm run dev
```

Create `website/.env.local` from `website/.env.example` for local Supabase-backed features. Do not commit real environment values.

## Quality Checks

```bash
cd website
npm run typecheck
npm run lint
npm run test
npm run build
```

## Supabase Security

The Supabase anon key is public by design in browser applications. Security must be enforced with Supabase Row Level Security policies, not by hiding the anon key.

See [website/supabase/PUBLIC_SITE_CONTRACT.md](website/supabase/PUBLIC_SITE_CONTRACT.md).

## Post-Deploy SEO Verification

After deploying the public website, verify that static route HTML contains the expected canonical, Open Graph, Twitter, and hreflang metadata:

```text
view-source:https://balkanveil.com/ro
view-source:https://balkanveil.com/en
view-source:https://balkanveil.com/ro/servicii
view-source:https://balkanveil.com/en/services
```

Also confirm that the public deployment uses `VITE_APP_MODE=site`.
