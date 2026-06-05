# Contributing

## Development Flow

1. Create a branch from `main`.
2. Make focused changes.
3. Run the website checks locally.
4. Open a pull request with a concise summary and verification notes.

```bash
cd website
npm ci
npm run typecheck
npm run lint
npm run build
```

## Code Standards

- Keep changes small and scoped.
- Do not commit generated build output or local environment files.
- Prefer existing components and data structures before adding new abstractions.
- Keep Supabase changes explicit and review RLS policies carefully.
