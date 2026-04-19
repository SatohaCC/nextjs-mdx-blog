import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/cache', () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));
vi.mock('fs', () => ({
  default: {
    promises: {
      access: vi.fn(),
      readdir: vi.fn(),
    },
  },
}));
vi.mock('@/lib/mdx-parser');

import fs from 'fs';
import { readMarkdownFile } from '@/lib/mdx-parser';
import type { Post, PostFrontmatter } from '../types';
import {
  getAllPosts,
  getAllTags,
  getPaginatedPosts,
  getPostsByTag,
  getRelatedPosts,
  getSortedPostsData,
  getTotalPages,
} from './posts';

function makePost(slug: string, overrides: Partial<PostFrontmatter> & { content?: string } = {}): Post {
  const { content = '', ...frontmatterOverrides } = overrides;
  return {
    slug,
    frontmatter: {
      title: `Post ${slug}`,
      date: '2024-01-01',
      excerpt: `Excerpt for ${slug}`,
      tags: ['react'],
      draft: false,
      ...frontmatterOverrides,
    },
    content,
  };
}

function setupAllPosts(posts: Post[]) {
  const fileNames = posts.map((p) => `${p.slug}.mdx`);
  vi.mocked(fs.promises.access).mockResolvedValue(undefined);
  vi.mocked(fs.promises.readdir).mockResolvedValue(fileNames as any);
  vi.mocked(readMarkdownFile).mockImplementation(async (relativePath: string) => {
    const slug = relativePath.replace(/^posts\//, '').replace(/\.mdx?$/, '');
    const post = posts.find((p) => p.slug === slug);
    if (!post) return undefined;
    return { data: post.frontmatter, content: post.content };
  });
}

describe('getAllPosts', () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  it('ディレクトリが存在しない場合、空配列を返す', async () => {
    vi.mocked(fs.promises.access).mockRejectedValue(new Error('ENOENT'));
    expect(await getAllPosts()).toEqual([]);
  });

  it('.md/.mdx 以外のファイルを無視する', async () => {
    vi.mocked(fs.promises.access).mockResolvedValue(undefined);
    vi.mocked(fs.promises.readdir).mockResolvedValue(['.DS_Store', 'post-a.mdx'] as any);
    vi.mocked(readMarkdownFile).mockResolvedValue({
      data: { title: 'A', date: '2024-01-01', excerpt: 'e', tags: [], draft: false },
      content: '',
    });
    const posts = await getAllPosts();
    expect(posts).toHaveLength(1);
  });

  it('本番環境では draft:true の投稿を除外する', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    setupAllPosts([
      makePost('published', { draft: false }),
      makePost('draft-post', { draft: true }),
    ]);
    const posts = await getAllPosts();
    expect(posts.map((p) => p.slug)).toEqual(['published']);
  });

  it('開発環境では draft:true の投稿を含む', async () => {
    setupAllPosts([makePost('published'), makePost('draft-post', { draft: true })]);
    const posts = await getAllPosts();
    expect(posts).toHaveLength(2);
  });
});

describe('getSortedPostsData', () => {
  afterEach(() => vi.resetAllMocks());

  it('日付降順にソートされる', async () => {
    setupAllPosts([
      makePost('old', { date: '2023-01-01' }),
      makePost('new', { date: '2024-06-01' }),
      makePost('mid', { date: '2024-01-01' }),
    ]);
    const posts = await getSortedPostsData();
    expect(posts.map((p) => p.slug)).toEqual(['new', 'mid', 'old']);
  });
});

describe('getTotalPages', () => {
  afterEach(() => vi.resetAllMocks());

  it.each([
    [0, 0],
    [6, 1],
    [7, 2],
    [12, 2],
    [13, 3],
  ])('%i 件 → %i ページ', async (count, expected) => {
    setupAllPosts(Array.from({ length: count }, (_, i) => makePost(`post-${i}`)));
    expect(await getTotalPages()).toBe(expected);
  });
});

describe('getPaginatedPosts', () => {
  afterEach(() => vi.resetAllMocks());

  it('page 1 は最初の 6 件', async () => {
    setupAllPosts(
      Array.from({ length: 7 }, (_, i) =>
        makePost(`post-${String(i).padStart(2, '0')}`, { date: `2024-01-${String(i + 1).padStart(2, '0')}` })
      )
    );
    const posts = await getPaginatedPosts(1);
    expect(posts).toHaveLength(6);
  });

  it('page 2 は残りの 1 件', async () => {
    setupAllPosts(
      Array.from({ length: 7 }, (_, i) =>
        makePost(`post-${String(i).padStart(2, '0')}`, { date: `2024-01-${String(i + 1).padStart(2, '0')}` })
      )
    );
    const posts = await getPaginatedPosts(2);
    expect(posts).toHaveLength(1);
  });

  it('範囲外のページは空配列', async () => {
    setupAllPosts([makePost('a')]);
    expect(await getPaginatedPosts(99)).toEqual([]);
  });
});

describe('getAllTags', () => {
  afterEach(() => vi.resetAllMocks());

  it('投稿がない場合、空配列', async () => {
    setupAllPosts([]);
    expect(await getAllTags()).toEqual([]);
  });

  it('タグを重複排除してアルファベット順で返す', async () => {
    setupAllPosts([
      makePost('a', { tags: ['react', 'typescript'] }),
      makePost('b', { tags: ['react', 'nextjs'] }),
    ]);
    expect(await getAllTags()).toEqual(['nextjs', 'react', 'typescript']);
  });

  it('tags が undefined の投稿でもクラッシュしない', async () => {
    setupAllPosts([makePost('a', { tags: undefined })]);
    expect(await getAllTags()).toEqual([]);
  });
});

describe('getPostsByTag', () => {
  afterEach(() => vi.resetAllMocks());

  it('マッチするタグの投稿のみ返す', async () => {
    setupAllPosts([
      makePost('a', { tags: ['react'] }),
      makePost('b', { tags: ['typescript'] }),
    ]);
    const posts = await getPostsByTag('react');
    expect(posts.map((p) => p.slug)).toEqual(['a']);
  });

  it('タグ名の大文字小文字を無視する', async () => {
    setupAllPosts([makePost('a', { tags: ['React'] })]);
    expect(await getPostsByTag('react')).toHaveLength(1);
    expect(await getPostsByTag('REACT')).toHaveLength(1);
  });

  it('マッチなしで空配列', async () => {
    setupAllPosts([makePost('a', { tags: ['typescript'] })]);
    expect(await getPostsByTag('react')).toEqual([]);
  });
});

describe('getRelatedPosts', () => {
  afterEach(() => vi.resetAllMocks());

  it('tags が空の場合、空配列', async () => {
    setupAllPosts([makePost('a', { tags: ['react'] })]);
    expect(await getRelatedPosts('current', [])).toEqual([]);
  });

  it('currentSlug の投稿を除外する', async () => {
    setupAllPosts([makePost('current', { tags: ['react'] }), makePost('other', { tags: ['react'] })]);
    const posts = await getRelatedPosts('current', ['react']);
    expect(posts.map((p) => p.slug)).not.toContain('current');
  });

  it('タグの一致数が多い投稿が先に来る', async () => {
    setupAllPosts([
      makePost('one-match', { tags: ['react'] }),
      makePost('two-match', { tags: ['react', 'typescript'] }),
    ]);
    const posts = await getRelatedPosts('current', ['react', 'typescript']);
    expect(posts[0].slug).toBe('two-match');
  });

  it('limit を超えない件数を返す', async () => {
    setupAllPosts(Array.from({ length: 5 }, (_, i) => makePost(`post-${i}`, { tags: ['react'] })));
    const posts = await getRelatedPosts('current', ['react'], 3);
    expect(posts).toHaveLength(3);
  });

  it('タグが一致しない投稿は除外される', async () => {
    setupAllPosts([makePost('no-match', { tags: ['vue'] })]);
    expect(await getRelatedPosts('current', ['react'])).toEqual([]);
  });

  it('タグマッチが大文字小文字非区別', async () => {
    setupAllPosts([makePost('a', { tags: ['React'] })]);
    const posts = await getRelatedPosts('current', ['react']);
    expect(posts).toHaveLength(1);
  });
});
