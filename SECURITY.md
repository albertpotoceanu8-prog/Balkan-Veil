# Security Policy

## Reporting a Vulnerability

Do not open public issues for vulnerabilities or exposed secrets.

Report security concerns privately to:

```text
contact@balkanveil.com
```

Include:

- affected URL or file
- reproduction steps
- impact
- suggested remediation, if known

## Secrets

Never commit real values for:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Vercel tokens
- Supabase service-role keys
- database credentials

Use local `.env.local` files and deployment provider secrets instead.
