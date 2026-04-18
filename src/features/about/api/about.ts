import { cacheLife } from 'next/cache';

import { readMarkdownFile } from '@/lib/mdx-parser';

import type { MarkdownData } from '../types';

export const getMarkdownDataByPath = async (
  relativePath: string
): Promise<MarkdownData | undefined> => {
  'use cache';
  cacheLife('weeks');

  const parsed = await readMarkdownFile<MarkdownData['frontmatter']>(relativePath);

  if (!parsed) {
    return undefined;
  }

  return {
    frontmatter: parsed.data,
    content: parsed.content,
  };
};
