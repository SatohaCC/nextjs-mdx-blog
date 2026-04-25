import { cacheLife, cacheTag } from 'next/cache';

import fs from 'fs';
import path from 'path';

import { readMarkdownFile } from '@/lib/mdx-parser';

import type { Tag } from '../types';

type PostFrontmatterWithTags = {
  tags?: string[];
};

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export const getAllTags = async (): Promise<Tag[]> => {
  'use cache';
  cacheLife('days');
  cacheTag('tags');

  try {
    await fs.promises.access(postsDirectory);
  } catch {
    return [];
  }

  const fileNames = await fs.promises.readdir(postsDirectory);

  const tagCountsMap = new Map<string, number>();

  const tagArrays = await Promise.all(
    fileNames
      .filter((fileName) => /\.(md|mdx)$/.test(fileName))
      .map(async (fileName) => {
        const parsed = await readMarkdownFile<PostFrontmatterWithTags>(`posts/${fileName}`);
        return parsed?.data.tags ?? [];
      })
  );

  for (const tags of tagArrays) {
    for (const tag of tags) {
      tagCountsMap.set(tag, (tagCountsMap.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagCountsMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};
