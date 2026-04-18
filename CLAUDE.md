# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (runs PandaCSS codegen first)
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format
npm run format:check # Prettier check
npm run storybook    # UI component catalog (port 6006)
npm run test         # Vitest browser tests via Storybook (requires storybook running)
npm run prepare      # PandaCSS codegen (re-run after editing panda.config.ts)
```

Node.js >=24.14.1 required.

## Architecture

**Stack**: Next.js App Router + PandaCSS + React Aria Components + MDX (`next-mdx-remote-client`) + Vitest/Storybook

**Content source**: Static MDX files in `src/content/posts/`. All routes are statically generated at build time via `generateStaticParams()`. No database.

**Data layer** (`src/features/posts/api/posts.ts`): File-system repository wrapped with React `cache()` for request deduplication. Functions: `getAllPosts`, `getPostBySlug`, `getSortedPostsData`, `getPaginatedPosts`, `getAllTags`, `getPostsByTag`, `getRelatedPosts`.

**Feature slice layout** (`src/features/`): Business logic is grouped by feature (posts, about), not technical layer. Each feature owns its own `api/`, `components/`, `types.ts`, and `domain/`.

**Component pattern**: Container/Presentational split. `*Container.tsx` is a Server Component that fetches data; `*Presentational.tsx` is the pure-UI half. Styles live in a co-located `styles.ts` using PandaCSS `css()`.

**Styling**: PandaCSS with a custom "たけのこの里" (Takenoko) theme — chocolate brown, cream, bamboo green palettes. Semantic tokens handle dark mode via `_dark` conditions. After any change to `panda.config.ts`, run `npm run prepare` to regenerate `styled-system/`.

**MDX rendering**: `rehype-pretty-code` (Shiki syntax highlighting) + `rehype-slug` + `remark-gfm`. GitHub-style alert blockquotes (NOTE/TIP/WARNING/etc.) are styled in PandaCSS config.

**Site config** (`src/content/site.ts`): `postsPerPage`, site URL, author, and nav links.

**Path aliases**: `@/*` → `src/*` (also `@/components/*`, `@/features/*`).

## Coding Convention Exceptions

**`src/app/global-error.tsx`**: Intentionally uses inline styles and hardcoded values instead of PandaCSS tokens. This file renders when the app crashes catastrophically — at that point, PandaCSS-generated stylesheets may not have loaded, so inline styles are the only reliable option. ESLint does not enforce the no-inline-styles convention here, and that is by design.
