import { notFound } from 'next/navigation';

import { describe, expect, it, vi } from 'vitest';

import { getPostBySlug } from '@/features/posts/api/posts';
import type { Post } from '@/features/posts/types';

import { generateMetadata } from './page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/features/posts/api/posts', () => ({
  getPostBySlug: vi.fn(),
  getSortedPostsData: vi.fn(),
}));

describe('Post Page generateMetadata', () => {
  it('存在する記事のスラッグが渡された場合、正しいメタデータを返す', async () => {
    const mockPost: Post = {
      slug: 'test-post',
      frontmatter: {
        title: 'Test Post Title',
        excerpt: 'Test Post Excerpt',
        date: '2024-01-01',
        tags: ['react', 'testing'],
      },
      content: '',
    };
    vi.mocked(getPostBySlug).mockResolvedValue(mockPost);

    const params = Promise.resolve({ slug: 'test-post' });
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe('Test Post Title');
    expect(metadata.description).toBe('Test Post Excerpt');
    expect(metadata.openGraph?.title).toBe('Test Post Title');
    // tags is an article-specific property, casting to satisfy TypeScript
    expect((metadata.openGraph as { tags?: string[] }).tags).toEqual(['react', 'testing']);
  });

  it('記事が見つからない場合、notFound を呼び出す', async () => {
    vi.mocked(getPostBySlug).mockResolvedValue(undefined);

    const params = Promise.resolve({ slug: 'non-existent' });
    // notFound() usually throws in Next.js
    await expect(generateMetadata({ params })).rejects.toThrow();

    expect(notFound).toHaveBeenCalled();
  });
});
