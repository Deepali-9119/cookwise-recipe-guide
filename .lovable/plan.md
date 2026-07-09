# CookWise — Frontend Build Plan

A single-page, frontend-only app that collects recipe inputs, posts them to an n8n webhook, and renders the returned recipe. No AI logic lives in the app.

## Scope
One route (`/`) containing: sticky nav → hero → input form → loading state → recipe output → error state. No other pages.

## Design System (src/styles.css)
Replace default tokens with the CookWise palette in oklch:
- `--background` warm off-white (#FAF7F2)
- `--foreground` charcoal (#2B2B2B)
- `--muted-foreground` warm gray (#6B6B63)
- `--primary` terracotta (#D97A4A) with `--primary-foreground` white
- `--secondary` forest green (#2F4B3C)
- `--card` white, `--border` warm hairline gray
- `--radius` 12px; add `--radius-card: 16px`
- Soft warm-tinted shadow token `--shadow-warm`

Fonts: load Fraunces (serif) + Inter (sans) via `<link>` tags in `src/routes/__root.tsx` head; register `--font-serif` and `--font-sans` in `@theme`. Body uses sans; headings use serif via a `.font-serif` utility already provided by the tokens.

## Files to create/modify
- `src/routes/__root.tsx` — update `head()`: title "CookWise — AI Recipes for Beginner Cooks", matching description/og/twitter, add Google Fonts `<link>` entries (preconnect + Fraunces + Inter).
- `src/styles.css` — swap color tokens, add font tokens, add shadow token.
- `src/routes/index.tsx` — full page composition and state machine (see below).
- `src/components/cookwise/Nav.tsx` — sticky top bar, logo left, "Generate a Recipe" CTA right (scrolls to form).
- `src/components/cookwise/Hero.tsx` — headline, sub, CTA, abstract SVG (steam swirls + plate outline) inline — no stock photos.
- `src/components/cookwise/RecipeForm.tsx` — dish/ingredients input, servings stepper, time chip selector, submit button. Uppercase 12–13px labels above each field.
- `src/components/cookwise/LoadingState.tsx` — pulsing steam SVG + rotating message every 2.5s from a short array.
- `src/components/cookwise/RecipeOutput.tsx` — title, badge row (clock, users), two-column grid (Ingredients checklist / numbered Instruction cards with per-step time badge and left accent border), conditional Tips accordion, "Generate another recipe" button.
- `src/components/cookwise/ErrorState.tsx` — calm message + Retry.
- `src/lib/cookwise-api.ts` — `generateRecipe(payload)` posts JSON to the webhook, returns typed `Recipe`. Zod-parse the response so a malformed payload flows into the error state.

## State flow (in `index.tsx`)
Single `status` union: `idle | loading | success | error`. Mutation via `@tanstack/react-query` `useMutation` calling `cookwise-api`. On success store `Recipe`, render `RecipeOutput`. On "Generate another recipe", reset to `idle` and scroll to form. Missing/null `tips` → accordion not rendered.

## Backend integration
POST JSON `{ query, servings, timeBucket }` to
`https://deepali1automates.app.n8n.cloud/webhook/a3819878-9a6a-4f91-b66e-d2a4500f9ff0`.
Response validated against the documented shape (`dishName`, `servings`, `totalTimeMinutes`, `ingredients[]`, `steps[]`, optional `tips[]`). No hardcoded recipe content anywhere.

## Accessibility & responsive
- Semantic `<header>/<main>/<section>`, single H1 in hero.
- Labeled inputs (real `<label>`, not placeholder-only), visible focus rings using `--ring`.
- Touch targets ≥44px on mobile; two-column output collapses to stacked; nav keeps only logo + CTA on mobile.
- WCAG AA contrast verified against terracotta on off-white for text vs. button use.

## Explicitly out of scope
No auth, no persistence, no extra routes, no chat UI, no additional form fields, no hover-only interactions.
