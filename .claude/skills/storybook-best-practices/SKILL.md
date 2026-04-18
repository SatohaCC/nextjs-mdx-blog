---
name: storybook-best-practices
description: Storybook best practices - Use Storybook together with an AI agent effectively by following these best practices.
---

> **Version 10.3** — **React** / **TypeScript**
> Also available:

- `?language=js` for JavaScript
- `?codeOnly=true` for code snippets only
- other versions: Version 9 (`/docs/9/ai/best-practices.md`), Version 8 (`/docs/8/ai/best-practices.md`)

# Best practices for using Storybook with AI

The best practices here relate to the [generated manifests](https://storybook.js.org/docs/ai/manifests.md), which are currently only supported for [React](https://storybook.js.org/docs/ai/?renderer=react.md) projects.

Additionally, the API may change in future releases. We welcome feedback and contributions to help improve this feature.

Use Storybook together with an AI agent effectively by following these best practices.

## Writing effective stories

Stories are referenced by the [MCP server](https://storybook.js.org/docs/ai/mcp/overview.md) to provide examples of how your components are used. They are also tested to ensure your components work as expected. Whenever possible, they should demonstrate one concept or use case, and be as descriptive about the "why" behind the story, not just the "what". This will help agents understand when and why to use certain components or patterns.

```ts
// Button.stories.ts|tsx — CSF 3
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// ✅ Good to show the default state
export const Basic: Story = {};

// ✅ Good to demonstrate a specific use case
export const Primary: Story = {
  args: { primary: true },
};

// ✅ Good - even though this story renders more than one button,
// they both demonstrate the same concept of a disabled button
export const Disabled: Story = {
  args: { disabled: true },
    render: (args) => (
      <>
      Disabled Button

        Disabled Primary Button

    </>
  ),
};

// ❌ Bad - demonstrates too many concepts at once, making
// it less clear and less useful as a reference for agents
export const SizesAndVariants: Story = {
  render: () => (
    <>
      Small Button
      Medium Button
      Large Button
      Outline Button
      Text Button
    </>
  ),
};
```

```ts
// Button.stories.ts|tsx — CSF Next 🧪

const meta = preview.meta({
  component: Button,
});

// ✅ Good to show the default state
export const Basic = meta.story();

// ✅ Good to demonstrate a specific use case
export const Primary = meta.story({
  args: { primary: true },
});

// ✅ Good - even though this story renders more than one button,
// they both demonstrate the same concept of a disabled button
export const Disabled = meta.story({
  args: { disabled: true },
  render: (args) => (
    <>
      Disabled Button

        Disabled Primary Button

    </>
  ),
});

// ❌ Bad - demonstrates too many concepts at once, making
// it less clear and less useful as a reference for agents
export const SizesAndVariants = meta.story({
  render: () => (
    <>
      Small Button
      Medium Button
      Large Button
      Outline Button
      Text Button
    </>
  ),
});
```

You might be wondering how well an agent handles abstractions like [`args`](https://storybook.js.org/docs/writing-stories/args.md) or [decorators](https://storybook.js.org/docs/writing-stories/decorators.md). The manifest generation process evaluates the final rendered story with all args, decorators, etc. applied, so it can focus on the concept being demonstrated, rather than the specifics of how it's implemented.

## Documenting your components

To reuse your components effectively, agents depend on how well you document their purpose, usage, and APIs. There are a few key aspects that are well worth taking the time to document (ask your agent to help!). To provide these details, you can use [JSDoc comments](https://jsdoc.app/about-getting-started) in your code, which Storybook will automatically extract and include in the generated [manifest](https://storybook.js.org/docs/ai/manifests.md) for the agent.

Of course, with [Autodocs](https://storybook.js.org/docs/writing-docs/autodocs.md), any documentation efforts you make will help human developers, too!

### Component summary and description

Help the agent understand what a component should be used for by providing a description (and optional summary) as a JSDoc comment above the export of the component.

The agent will receive the summary, if present, or a truncated version of the description.

```ts title="Button.tsx"
/**
 * Button is used for user interactions that do not navigate to another route.
 * For navigation, use [Link](https://storybook.js.org/docs/ai/?path=/docs/link--default.md) instead.
 *
 * @summary for user interactions that do not navigate to another route
 */
export const Button = // ...
```

You can use Markdown syntax in your description to add formatting or links.

### Story summary and descriptions

Similarly, you can provide descriptions (and summaries) for each story, which serve as usage examples for the agent. Don't just repeat what the story is demonstrating; describe _why_ you would use whatever is demonstrated.

The agent will receive the summary, if present, or the first 60 characters of the description.

```ts
// Button.stories.ts|tsx — CSF 3
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Primary buttons are used for the main action in a view.
 * There should not be more than one primary button per view.
 *
 * @summary for the main action in a view
 */
export const Primary: Story = {
  args: { primary: true },
};
```

```ts
// Button.stories.ts|tsx — CSF Next 🧪

const meta = preview.meta({
  component: Button,
});

/**
 * Primary buttons are used for the main action in a view.
 * There should not be more than one primary button per view.
 *
 * @summary for the main action in a view
 */
export const Primary = meta.story({
  args: { primary: true },
});
```

### Prop type extraction

We highly recommend using `react-docgen-typescript` for prop type extraction (set with the [`reactDocgen`](https://storybook.js.org/docs/api/main-config/main-config-typescript.md#reactdocgen) config option), because it provides more accurate and comprehensive information about your components' props, which will help agents use them more effectively. If manifest generation seems too slow, you can switch to `react-docgen`, which is faster but less detailed.

### Prop descriptions

It's also helpful to provide descriptions for your component's props in the JSDoc comments in your component code, as agents will use these to understand how to use the component effectively.

```ts title="Button.tsx"
export interface ButtonProps {
  /** The icon to render before the button text */
  icon?: ReactNode;
}
```

## Docs summaries

For unattached MDX docs pages (such as documentation for design tokens, guidelines, etc.), you can provide a summary in the `Meta` tag, which will be included in the manifest and provided to the agent.

```jsx title="Colors.mdx"

```

## Docs content

Storybook generates this docs manifest through static analysis of your MDX files, which means it is limited to the information that is explicitly present in those files. For example, the manifest will _not_ include the color tokens in the document below, because their values are not explicitly in the source:

```jsx title="Colors.mdx"

# Colors

  {colors.map((color) => (

  ))}

```

To ensure that your agents have access to all the necessary information, it's important to include any relevant details directly in your MDX files, rather than referencing external sources.

We hope to improve this in the future, possibly by evaluating the MDX files and including the result in the manifest.

## Manifest curation

It's possible to provide too little _or_ too much context to your agent. If your manifest is missing key information about your components, the agent may not be able to use them effectively. On the other hand, if your manifest includes information irrelevant to the task at hand, it may be overwhelming for the agent and lead to worse performance.

For stories or docs which the agent does not need to reference (e.g. a story demonstrating an anti-pattern or a docs page about deprecated components), you can exclude them from the manifest by removing the `manifest` [tag](https://storybook.js.org/docs/writing-stories/tags.md):

```ts
// MyComponent.stories.ts|tsx — CSF 3
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.

const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

// 👇 This story will be included in the manifest because it has the implicit 'manifest' tag
export const Basic = {};

export const ForInstructionOnly = {
  tags: ['!manifest'], // 👈 Remove the 'manifest' tag to exclude this story from the manifests
};
```

```ts
// MyComponent.stories.ts|tsx — CSF Next 🧪

const meta = preview.meta({
  component: MyComponent,
});

// 👇 This story will be included in the manifest because it has the implicit 'manifest' tag
export const Basic = meta.story();

export const ForInstructionOnly = meta.story({
  tags: ['!manifest'], // 👈 Remove the 'manifest' tag to exclude this story from the manifests
});
```

You can also remove an entire component from the manifest, by removing the tag in the meta (or default export) of the file, which will exclude all stories in that file from the manifests.

Similarly, to exclude an entire MDX docs page from the manifests, you can remove the `manifest` tag from the page's metadata:

```jsx title="DocForHumansOnly.mdx"

```

**More AI resources**

- [MCP server overview](https://storybook.js.org/docs/ai/mcp/overview.md)
- [MCP server API](https://storybook.js.org/docs/ai/mcp/api.md)
- [Sharing your MCP server](https://storybook.js.org/docs/ai/mcp/sharing.md)
- [Manifests](https://storybook.js.org/docs/ai/manifests.md)
