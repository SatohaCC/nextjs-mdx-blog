export type MarkdownData = {
  frontmatter: { title: string; [key: string]: unknown };
  content: string;
};
