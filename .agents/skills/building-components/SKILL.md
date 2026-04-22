---
name: building-components
description: Guide for building modern, accessible, and composable UI components. Use when building new components, implementing accessibility, creating composable APIs, setting up design tokens, publishing to npm/registry, or writing component documentation.
---

# Building Components

## When to use this skill

Use when the user is:

- Building new UI components (primitives, components, blocks, templates)
- Implementing accessibility features (ARIA, keyboard navigation, focus management)
- Creating composable component APIs (slots, render props, controlled/uncontrolled state)
- Setting up design tokens and theming systems
- Publishing components to npm or a registry
- Writing component documentation
- Implementing polymorphism or as-child patterns
- Working with data attributes for styling/state
- Ensuring components are discoverable and usable by AI agents (e.g., via Storybook MCP)

## Rules for AI-Friendly Components

To ensure that AI agents (like Storybook MCP) can effectively understand, utilize, and test your components, follow these documentation standards:

### 1. Intentional Documentation (JSDoc)
Don't just describe the type. Explain the **intent**.
- **Component**: Document the "Why" and "When". Provide a high-level summary of the architectural role.
- **Props**: Explain the effect of each prop, valid ranges, and how it interacts with other props.

### 2. Comprehensive Story Coverage
AI relies on stories as living documentation and test cases.
- **State Coverage**: Always include stories for all UI states: `Default`, `Loading`, `Error`, `Disabled`, and empty states.
- **Interaction Testing**: Implement `play` functions for all interactive components. Use descriptive `step` labels.

### 3. Accessibility as First-Class Citizen
AI can catch a11y regressions if stories are set up correctly.
- Ensure all samples in Storybook are accessible.
- Use `parameters.a11y.test = 'error'` to enforce a11y checks during automated testing.


## References

- [definitions.mdx](./references/definitions.mdx) - Artifact taxonomy (primitives, components, blocks, templates)
- [principles.mdx](./references/principles.mdx) - Core principles for component design
- [accessibility.mdx](./references/accessibility.mdx) - ARIA, keyboard navigation, WCAG compliance
- [composition.mdx](./references/composition.mdx) - Composable component patterns
- [as-child.mdx](./references/as-child.mdx) - The as-child pattern for element polymorphism
- [polymorphism.mdx](./references/polymorphism.mdx) - Polymorphic component patterns
- [types.mdx](./references/types.mdx) - TypeScript typing patterns for components
- [state.mdx](./references/state.mdx) - Controlled vs uncontrolled state management
- [data-attributes.mdx](./references/data-attributes.mdx) - Using data attributes for styling and state
- [design-tokens.mdx](./references/design-tokens.mdx) - Design token systems and theming
- [styling.mdx](./references/styling.mdx) - Component styling approaches
- [registry.mdx](./references/registry.mdx) - shadcn-style registry distribution
- [npm.mdx](./references/npm.mdx) - Publishing components to npm
- [marketplaces.mdx](./references/marketplaces.mdx) - Component marketplace distribution
- [docs.mdx](./references/docs.mdx) - Writing component documentation
