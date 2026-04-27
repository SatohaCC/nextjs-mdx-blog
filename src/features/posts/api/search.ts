import { siteConfig } from '@/content/site';
import { getAllPosts } from '@/features/posts/api/posts';
import type { Post } from '@/features/posts/types';

export const searchPosts = async (query: string): Promise<Post[]> => {
  const normalizedQuery = query.slice(0, 100);
  if (!normalizedQuery.trim()) {
    return [];
  }

  const allPosts = await getAllPosts();
  const lowerQuery = normalizedQuery.toLowerCase();

  return allPosts.filter(
    (post) =>
      post.frontmatter.title.toLowerCase().includes(lowerQuery) ||
      post.frontmatter.excerpt.toLowerCase().includes(lowerQuery)
  );
};

export const getSearchTotalCount = async (query: string): Promise<number> => {
  const posts = await searchPosts(query);
  return posts.length;
};

export const getSearchTotalPages = async (query: string): Promise<number> => {
  const posts = await searchPosts(query);
  return Math.max(1, Math.ceil(posts.length / siteConfig.postsPerPage));
};

export const getPaginatedSearchPosts = async (query: string, page: number): Promise<Post[]> => {
  const posts = await searchPosts(query);
  const startIndex = (page - 1) * siteConfig.postsPerPage;
  return posts.slice(startIndex, startIndex + siteConfig.postsPerPage);
};
