# Balkan Veil

Public website and internal admin interface for Balkan Veil.

The project is a React + Vite + TypeScript application stored in `website/`. It includes the public bilingual site, Supabase-backed admin modules, static SEO route generation, and Remotion source files for teaser video assets.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Supabase
- Remotion

## Local Development

```bash
cd website
npm ci
npm run dev
```

Create `website/.env.local` from `website/.env.example` when Supabase-backed features are needed:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_APP_MODE=full
```

Do not commit real environment values.

## Quality Checks

```bash
cd website
npm run typecheck
npm run lint
npm run build
```

The production build runs TypeScript checks, builds the Vite app, then generates static route HTML files for the public pages.

## Deployment

Vercel is configured with `website/vercel.json`.

Recommended Vercel settings:

- Root directory: `website`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_APP_MODE`

## Repository Hygiene

Generated assets, local tooling, build outputs, logs, dependencies, Vercel metadata, and real env files are intentionally ignored.

Important ignored paths include:

- `website/node_modules/`
- `website/dist/`
- `website/.tools/`
- `website/.vercel/`
- `website/.env.local`
- `website/out/`
- `website/outputs/`
