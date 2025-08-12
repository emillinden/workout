# Workout – Developer Docs

This project is a client-only SPA built with:
- Vite + TypeScript
- Preact (with preact/compat so many React libs work)
- Tailwind CSS (+ tailwindcss-animate)
- shadcn-style primitives (Radix UI + class-variance-authority)

Key choices
- Client-only deploy compatible with subdirectory hosting on a PHP server.
- Vite base set to "./" so assets load from a subfolder.
- ESLint (flat config) + Prettier.

Project scripts
- pnpm dev – start local dev server
- pnpm build – typecheck and build to dist/
- pnpm preview – preview built app
- pnpm lint – run ESLint
- pnpm format – run Prettier

Directories of interest
- src/components/ui – shadcn-style UI primitives (Button, Card, Tabs, Accordion)
- src/lib – utilities (cn)
- src/styles.css – theme tokens used by Tailwind (shadcn-like CSS variables)

TypeScript settings
- Strict mode is enabled in both tsconfig.app.json and tsconfig.node.json.
- Optional stricter flags you can enable in tsconfig.app.json for extra safety:
  - exactOptionalPropertyTypes: true
  - noImplicitOverride: true
  - noPropertyAccessFromIndexSignature: true
  - noImplicitReturns: true
  - noUncheckedIndexedAccess: true

Data model
- You’ll provide the 12-week plan later. See docs/data-format.md for the suggested shape and an example.

Next steps
1) Add your plan file (see docs/data-format.md). Place it under src/data/plan.ts or src/data/plan.json.
2) Wire the UI to render weeks/days using Tabs + Accordion (skeleton already present).
3) Deploy by copying dist/ to your site’s subdirectory. See docs/deployment.md.

