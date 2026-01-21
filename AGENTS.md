# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes (`page.tsx`, `layout.tsx`, `template.tsx`).
- `components/`: React components (`ui/` primitives, `experiments/` playgrounds).
- `lib/`: Utilities and data (e.g., `lib/data.ts`, `lib/utils.ts`).
- `public/`: Static assets; `styles/`: global styles.
- `__tests__/`: Jest/RTL tests; `e2e/`: Playwright specs.
- Path aliases: import via `@/components/...`, `@/lib/...`, `@/app/...`.

## Build, Test, and Development Commands
```bash
npm run dev        # Start local dev server
npm run build      # Production build (Next.js 16)
npm start          # Start production server
npm run lint       # ESLint check
npm test           # Jest unit/integration tests
npm run test:watch # Jest in watch mode
npm run test:e2e   # Playwright end‑to‑end tests
npm run test:e2e:ui# Playwright UI runner
```

## Coding Style & Naming Conventions
- **TypeScript** + **ESLint** enforced; hooks linting on (rules-of-hooks), `no-explicit-any` and `no-unused-vars` warn.
- **Components**: `PascalCase` filenames (e.g., `components/Hero.tsx`).
- **Routes**: lower‑case `kebab-case` under `app/` (e.g., `app/work/[slug]/page.tsx`).
- **Imports**: use aliases (e.g., `import { cn } from "@/lib/utils"`).
- **Styling**: Tailwind CSS utilities; prefer composition over ad‑hoc inline styles; keep Neo‑Brutalist look (bold borders, hard shadows).

## Testing Guidelines
- **Unit/Integration**: Jest + React Testing Library. Place files under `__tests__/` mirroring features (e.g., `__tests__/components/nav.test.tsx`).
- **E2E**: Playwright specs in `e2e/*.spec.ts` (dev server auto‑started via config).
- **Conventions**: Name tests `*.test.ts`/`*.test.tsx`; assert by role/text over testids.
- **Expectation**: New features include unit/integration tests; critical flows get E2E.

## Commit & Pull Request Guidelines
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`.
  - Examples: `feat: add chaos mode toggle`, `fix: nav active state on /lab`.
- **PRs**: Clear description, linked issues, screenshots/GIFs for UI changes, tests updated, docs touched when relevant, and CI green.
- Keep changesets focused and incremental.

## Security & Configuration Tips
- Copy `.env.example` to `.env.local`; never commit secrets. Use `NEXT_PUBLIC_*` only for client‑safe values; keep server‑only keys private.
- Node.js ≥ 20. Install Playwright browsers if needed: `npx playwright install`.
- Validate config via `npm run build` before submitting PRs.

