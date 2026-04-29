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

export type PostSummary = Omit<Post, 'content'>;

export type SearchParams = {
  q?: string;
};
