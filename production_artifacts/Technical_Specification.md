# Technical Specification: Panda CSS Common Patterns and Typography Abstraction

## Executive Summary
This project aims to refactor the styling layer of the blog using Panda CSS's advanced features (Patterns, Recipes, TextStyles, and Semantic Tokens). The goal is to eliminate code duplication, enforce design consistency, and simplify maintenance by moving shared style logic from individual `.styles.ts` files into the central `panda.config.ts`.

## Requirements
### Functional Requirements
- **Container Pattern**: Centralize the common layout pattern used for content centering and padding.
- **Typography Tokens**: Abstract MDX and site-wide typography (headings, body text) into reusable `textStyles`.
- **Focus Ring Utility**: Standardize the visual indicator for focused interactive elements across the site.
- **Shared Recipes**: Extract repeated component patterns (like glassmorphism for headers/navigation) into reusable recipes.

### Non-functional Requirements
- **Performance**: Maintain or slightly improve CSS bundle size by reducing duplicate rule definitions.
- **Maintainability**: Ensure styles can be updated globally from `panda.config.ts`.
- **Developer Experience**: Provide clear, semantic names for patterns and styles (e.g., `<div className={container()}>`).

## Architecture & Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Panda CSS
- **Design Tokens**: `panda.config.ts` (Existing)

### Proposed Architectural Changes
1.  **Patterns**: Add a `container` pattern to `panda.config.ts`.
2.  **Text Styles**: Add a `textStyles` object to `panda.config.ts` covering `h1` through `h6`, `body`, and `code`.
3.  **Conditions/Utilities**: Define a `focusRing` condition or utility to handle `_focusVisible` consistently.
4.  **Recipes**: Define a `glassmorphism` recipe.

## Data Schema / State Management (Style Mapping)
Existing styles will be mapped to new tokens as follows:

| Component | Current Style | New Abstraction |
| :--- | :--- | :--- |
| **Main Layout** | `maxW: '6xl', mx: 'auto', px: { base: '6', lg: '8' }` | `container()` pattern |
| **Header Inner** | `maxW: '6xl', mx: 'auto'` | `container()` pattern |
| **MDX H1** | `fontSize: { base: '2xl', sm: '3xl' }, fontWeight: 'bold'` | `textStyle: 'h1'` |
| **Buttons/Links** | `_focusVisible: { outline: '2px solid', ... }` | `focusRing` utility/style |

## Implementation Plan
1.  **Panda Config Update**: Modify `panda.config.ts` to include the new definitions.
2.  **Codegen**: Run `panda codegen` to update the `styled-system`.
3.  **Style Migration**:
    - Update `src/app/layout.styles.ts`
    - Update `src/components/layouts/Header/HeaderPresentational.styles.ts`
    - Update `src/components/mdx/MarkdownRenderer/MarkdownRenderer.styles.ts`
    - Update other components using the focus ring pattern (Button, AppLink, etc.).
4.  **Cleanup**: Remove redundant style definitions from local `.styles.ts` files.

## Risk Assessment
- **Breaking Changes**: Minimal, as we are mainly consolidating existing styles. Visual regression testing via Storybook is required.
- **Panda CSS Codegen**: Ensure the `styled-system` is correctly regenerated.
