<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Guidance

## Project Overview

- This is a Next.js 16 application created with `create-next-app`.
- The app source lives under `app/`.
- Static assets live under `public/`.
- Use the existing TypeScript, React, Tailwind CSS, and ESLint setup unless the user asks for a larger migration.

## Development Rules

- In Chat conversations, respond to the user in Japanese unless they explicitly request another language.
- Before changing Next.js-specific APIs, routing, metadata, server/client component behaviour, or config, read the relevant documentation in `node_modules/next/dist/docs/`.
- Prefer small, focused changes that match the existing file structure.
- Do not introduce new package managers. This project currently uses `npm` and `package-lock.json`.
- Do not add dependencies unless the task clearly needs them.
- Keep generated build output, caches, and local environment files out of source control.

## Commands

- Install dependencies: `npm install`
- Run the development server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Verification

- For code changes, run `npm run lint` when relevant.
- For changes that affect rendering, routing, or Next.js configuration, run `npm run build` when feasible.
- If a command cannot be run, mention that clearly in the final response.
