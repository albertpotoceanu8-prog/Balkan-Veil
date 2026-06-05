# Public Website / CMS Supabase Contract

This repository contains both the public Balkan Veil website and the CMS/admin code in the same Vite application. Deployment separation is controlled by `VITE_APP_MODE`.

## App Modes

- `VITE_APP_MODE=site`: public website only. Use this for the public Vercel deployment.
- `VITE_APP_MODE=admin`: CMS/admin only. Use this for a separate CMS deployment.
- `VITE_APP_MODE=full`: local development only, allowing both the public site and `/admin`.

Missing or invalid app mode values must behave like `site`.

## Supabase Keys

The Supabase anon key is public in browser applications. It is not a secret and must not be treated as one.

Never put a Supabase service role key in frontend code, Vite env vars, or public deployments.

Real security must be enforced through Supabase Row Level Security policies.

## Public Website Supabase Usage

The public website may read public content from:

- `site_settings`
- `service_protocols`
- `retainer_packages`
- `protocol_steps`

The public website may insert requests into:

- `access_requests`

## RLS Recommendations

- Allow public `select` only for public content that is intended to be visible.
- For active content tables, restrict public reads to active rows where applicable.
- Allow public `insert` into `access_requests` with a narrow `with check` policy.
- Do not allow public `select`, `update`, or `delete` on `access_requests`.
- Restrict CMS/admin reads and writes with dedicated policies.
- Prefer an `admin_users` table or custom auth claims for admin access.
- Keep RLS enabled on every table exposed through the anon key.

This file is documentation only. It does not create or apply migrations.
