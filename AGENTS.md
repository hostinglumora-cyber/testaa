# AGENTS.md

## Project Context

This is a Base44 app repository ("Siren" — an ER:LC asset marketplace). It is a
React 18 + Vite 6 frontend that talks to a Base44 backend at runtime. Treat it
as user-owned application code; keep changes focused on the user's request and
preserve existing project conventions.

## Important: this repo was a flattened export

The original `src/` tree was exported flattened to the repo root and would not
build. The directory structure has been reconstructed:

- `src/main.jsx`, `src/App.jsx`, `src/index.css` — app entry
- `src/pages/*.jsx` — route pages
- `src/components/*.jsx` — app components
- `src/components/ui/*.jsx` — shadcn/ui primitives
- `src/lib/*.js(x)` — `utils.js` (`cn`), `AuthContext`, `app-params`, `query-client`, etc.
- `src/api/base44Client.js` — SDK client stub
- `src/hooks/*.js` — `use-mobile`, `use-size`

A few standard shadcn files were missing from the export and were recreated:
`src/lib/utils.js`, `src/components/ui/toaster.jsx`, `src/components/ui/tooltip.jsx`,
`src/components/ui/use-toast.js`, `src/hooks/use-mobile.js`, `src/hooks/use-size.js`,
and `src/components/UserNotRegisteredError.jsx`.

`vite.config.js` was also missing its `import base44 from '@base44/vite-plugin'`
line, the `@` → `./src` alias, and dev-server host config — all added.

## Running locally (Base44 dev environment)

```bash
docker compose -f docker-compose.base44.yml up -d
```

This runs `node:22-bookworm-slim`, bind-mounts the repo, runs `npm install` then
`npm run dev` (Vite) on host port 3000 with live reload (file-watch polling
enabled for the bind mount). Logs: `docker compose -f docker-compose.base44.yml logs -f web`.

## Backend / credentials

The app is designed to run against a Base44 backend. Each file that uses `db`
has an inlined fallback stub (`globalThis.__B44_DB__ || {...}`) that returns
empty data and an unauthenticated user, so the **public pages (Home,
Marketplace, login, etc.) render without any backend or credentials**. That is
how the preview runs today.

For full functionality (real listings, auth, purchases) the frontend needs the
hosted Base44 backend, configured via Vite env vars:
- `VITE_BASE44_APP_ID`
- `VITE_BASE44_APP_BASE_URL`

When unset, the `@base44/vite-plugin` logs "Proxy not enabled" and the app runs
on the offline stubs. To wire a real backend, provide those vars (e.g. via the
Base44 dashboard / `base44 dev`, or a `.env.local`).

No external-service secrets are required to boot.

## Verifying it works

- `curl -sf -H "Host: 3000-<preview-suffix>" http://localhost:3000/` returns the app HTML.
- `/src/main.jsx` is served as transformed dev source (live, not a prebuilt bundle).
- The landing page (`/`) renders the Siren hero and (empty) listings grid.

## Checks

- `npm run lint` / `npm run lint:fix`
- `npm run typecheck` (jsconfig-based)
- `npm run build`
