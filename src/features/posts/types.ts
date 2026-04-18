export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  draft?: boolean;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

export type SearchParams = {
  q?: string;
};
