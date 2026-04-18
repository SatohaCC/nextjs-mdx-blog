import { cacheLife, cacheTag } from 'next/cache';

import fs from 'fs';
import path from 'path';

import { siteConfig } from '@/content/site';
import { readMarkdownFile } from '@/lib/mdx-parser';

import type { Post } from '../types';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export const getAllPosts = async (): Promise<Post[]> => {
  'use cache';
  cacheLife('days');
  cacheTag('posts');

  try {
    await fs.promises.access(postsDirectory);
  } catch {
    return [];
  }

  const fileNames = await fs.promises.readdir(postsDirectory);
  const postsPromises = fileNames
    .filter((fileName) => /\.(md|mdx)$/.test(fileName))
    .map(async (fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const parsed = await readMarkdownFile<Post['frontmatter']>(`posts/${fileName}`);

      return {
        slug,
        frontmatter: parsed?.data || ({} as Post['frontmatter']),
        content: parsed?.content || '',
      };
    });

  return Promise.all(postsPromises);
};

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  'use cache';
  cacheLife('days');
  cacheTag('posts', `post-${slug}`);

  let parsed = await readMarkdownFile<Post['frontmatter']>(`posts/${slug}.mdx`);

  if (!parsed) {
    parsed = await readMarkdownFile<Post['frontmatter']>(`posts/${slug}.md`);
  }

  if (!parsed) {
    return undefined;
  }

  return {
    slug,
    frontmatter: parsed.data,
    content: parsed.content,
  };
};

export const getMarkdownDataByPath = async (relativePath: string): Promise<Post | undefined> => {
  const parsed = await readMarkdownFile<Post['frontmatter']>(relativePath);

  if (!parsed) {
    return undefined;
  }

  const slug = path.basename(relativePath).replace(/\.mdx?$/, '');

  return {
    slug,
    frontmatter: parsed.data,
    content: parsed.content,
  };
};

export const getSortedPostsData = async (): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  return allPosts.toSorted((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getTotalPages = async (): Promise<number> => {
  const allPosts = await getAllPosts();
  return Math.ceil(allPosts.length / siteConfig.postsPerPage);
};

export const getPaginatedPosts = async (page: number): Promise<Post[]> => {
  const allPosts = await getSortedPostsData();
  const startIndex = (page - 1) * siteConfig.postsPerPage;
  return allPosts.slice(startIndex, startIndex + siteConfig.postsPerPage);
};

export const getAllTags = async (): Promise<string[]> => {
  const allPosts = await getAllPosts();
  const tagsSet = new Set<string>();
  allPosts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const allPosts = await getSortedPostsData();
  return allPosts.filter((post) =>
    post.frontmatter.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
};

export const getRelatedPosts = async (
  currentSlug: string,
  tags: string[] = [],
  limit: number = 3
): Promise<Post[]> => {
  if (tags.length === 0) {
    return [];
  }

  const allPosts = await getAllPosts();

  const scoredPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const postTags = post.frontmatter.tags || [];
      const matchCount = tags.filter((tag) =>
        postTags.some((t) => t.toLowerCase() === tag.toLowerCase())
      ).length;
      return { post, matchCount };
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);

  return scoredPosts.slice(0, limit).map(({ post }) => post);
};
