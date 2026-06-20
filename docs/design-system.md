# Memo Studio Design System

Use this document before adding or changing UI, pages, layouts, or feature placeholders. The goal is a consistent, modern, premium memo app UI inspired by Apple's design system without copying Apple product surfaces directly.

## Product Direction

- Build a calm memo workspace for Markdown writing, categories, tags, SQLite-backed storage, and user authentication.
- Keep the first screen useful and app-like. Do not create marketing-style landing pages unless explicitly requested.
- Do not show UI for features that are not currently planned in `AGENTS.md`.
- Prefer clear, quiet workflows over decorative visual noise.

## Visual Principles

- Use restrained, high-contrast neutrals with selective Apple-like system accents.
- Prioritise clarity, generous whitespace, readable hierarchy, and tactile controls.
- Avoid heavy gradients, decorative blobs, oversized illustrations, and one-note colour themes.
- Keep cards and controls crisp: use `rounded-md` or `rounded-lg`; do not use pill-heavy layouts except where the shape communicates a compact tag or status.
- Use subtle borders and shadows rather than saturated fills.

## Colour Tokens

Use these current project colours unless a feature clearly needs an additional semantic colour:

- App background: `#f5f5f7`
- Primary text: `#1d1d1f`
- Secondary text: `#515154`
- Tertiary text: `#6e6e73`
- Muted text: `#86868b`
- Surface: `white`
- Elevated dark preview surface: `#1d1d1f`
- Primary action: `#1d1d1f`
- Blue accent: `#007aff`
- Green success accent: `#34c759`
- Orange warning/auth accent: `#ff9f0a`

Use black opacity borders such as `border-black/10` and muted white opacity on dark surfaces such as `border-white/10`, `bg-white/10`, and `text-white/65`.

## Layout

- Wrap pages in the shared `AppShell` from `app/components/app-shell.tsx`.
- Keep page content inside the shell's `max-w-7xl` container.
- Use page vertical spacing around `py-8 sm:py-10` and section gaps around `gap-6` to `gap-8`.
- Prefer responsive grids over stacked decorative sections:
  - Hero/content split: `lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]`
  - Feature summaries: `md:grid-cols-2 xl:grid-cols-4`
  - Compact detail groups: `sm:grid-cols-3`
- Do not nest cards inside cards. Use sections, surfaces, and repeated cards only where they represent distinct items.

## Typography

- Use the configured Geist font with Apple system font fallback from `app/globals.css`.
- Keep letter spacing normal. Do not use negative tracking.
- Page H1: `text-4xl sm:text-6xl`, `font-semibold`, primary text.
- Section heading: `text-xl font-semibold`.
- Card heading: `text-base font-semibold`.
- Body copy: `text-sm` to `text-lg`, `leading-6` to `leading-8`.
- Metadata and labels: `text-xs font-medium`, muted colour.

## Components

### Header

- Use the shared `AppHeader`.
- Keep navigation compact, bordered, and translucent: `border-black/10 bg-white/70`.
- Header buttons should use `min-h-9`, `rounded-md`, and concise labels.
- Only include controls for planned features. Remove placeholder controls for unplanned features.

### Cards And Surfaces

- Standard card: `rounded-lg border border-black/10 bg-white p-5 shadow-sm`.
- Hero card: `rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8`.
- Muted inset surface: `rounded-lg border border-black/10 bg-[#f5f5f7] p-4`.
- Dark preview surface: `rounded-lg border border-black/10 bg-[#1d1d1f] text-white shadow-sm`.

### Buttons And Links

- Primary action: `rounded-md bg-[#1d1d1f] px-3 text-sm font-semibold text-white shadow-sm`.
- Secondary action/link: `rounded-md border border-black/10 bg-white/75 px-3 text-sm font-medium text-[#1d1d1f] shadow-sm`.
- Include Lucide icons only when they clarify the action.
- Icon sizes should usually be `16` to `19`, with `strokeWidth` around `1.8`.
- Use `aria-label` for icon-only controls.

### Tags And Status

- Tags should be compact, quiet chips: `rounded-md border ... px-3 py-2 text-sm`.
- Status labels should reflect implemented or clearly planned state only. Avoid fake real-time states such as "Synced" until sync exists.

## Iconography

- Use `lucide-react`.
- Import individual icons from `lucide-react`; do not use dynamic icon loaders.
- Set decorative icons to `aria-hidden="true"`.
- Prefer consistent stroke widths:
  - Navigation/action icons: `1.8`
  - Confirmation check icons: `2`

## Content Rules

- Use product language that matches planned features: memo, Markdown, categories, tags, SQLite, authentication.
- Avoid promising unplanned capabilities such as notifications, AI suggestions, collaboration, offline sync, publishing, or cross-device sync unless the user adds them to the plan.
- UI copy should be concise and functional. Do not explain how to use the UI inside the UI unless it is essential.

## Adding New UI

Before implementing new UI:

1. Confirm the feature is in `AGENTS.md` Product Plan or has been explicitly requested.
2. Reuse `AppShell`, `AppHeader`, colours, spacing, card styles, and typography from this document.
3. Add or update tests for the expected page structure and visible planned features.
4. Remove placeholders for features outside the current plan.
5. Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` for rendering or layout changes.

When changing the design direction, update this document in the same change.
