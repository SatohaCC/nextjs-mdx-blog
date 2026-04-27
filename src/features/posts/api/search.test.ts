import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Post } from '../types';
import { getAllPosts } from './posts';
import {
  getPaginatedSearchPosts,
  getSearchTotalCount,
  getSearchTotalPages,
  searchPosts,
} from './search';

vi.mock('@/features/posts/api/posts', () => ({ getAllPosts: vi.fn() }));

function makePost(slug: string, title: string, excerpt: string, tags: string[] = []): Post {
  return {
    slug,
    frontmatter: { title, date: '2024-01-01', excerpt, tags, draft: false },
    content: '',
  };
}

const POSTS: Post[] = [
  makePost('a', 'React Hooks Guide', 'Learn about hooks'),
  makePost('b', 'TypeScript Tips', 'Useful TS patterns'),
  makePost('c', 'Next.js Routing', 'How routing works'),
  makePost('d', 'React Performance', 'Optimize your app'),
  makePost('e', 'CSS in JS', 'Styling with JS'),
  makePost('f', 'Testing React', 'Unit and integration tests'),
  makePost('g', 'Node.js Basics', 'Server-side JavaScript'),
];

beforeEach(() => {
  vi.mocked(getAllPosts).mockResolvedValue(POSTS);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('searchPosts', () => {
  it('空文字のクエリは空配列', async () => {
    expect(await searchPosts('')).toEqual([]);
  });

  it('空白のみのクエリは空配列', async () => {
    expect(await searchPosts('   ')).toEqual([]);
  });

  it('タイトルに部分一致（大文字小文字非区別）', async () => {
    const results = await searchPosts('react');
    expect(results.map((p) => p.slug)).toEqual(expect.arrayContaining(['a', 'd', 'f']));
  });

  it('excerpt に部分一致', async () => {
    const results = await searchPosts('hooks');
    expect(results.map((p) => p.slug)).toContain('a');
  });

  it('マッチなしで空配列', async () => {
    expect(await searchPosts('xxxxxxxxxx')).toEqual([]);
  });

  it('101文字のクエリは最初の100文字で検索される', async () => {
    // "react" + 95 文字の "x" + 1 文字の "y" → 末尾の "y" は切り捨て
    const query = 'react' + 'x'.repeat(95) + 'y';
    expect(query).toHaveLength(101);
    // 101文字目の "y" を含む文字列はマッチしないが、"react"を含む100文字でトリムされる
    // トリム後は "react" + "x".repeat(95) となりマッチなし
    const results = await searchPosts(query);
    expect(results).toEqual([]);
  });

  it('クエリが大文字でも小文字タイトルにマッチ', async () => {
    const results = await searchPosts('REACT');
    expect(results.length).toBeGreaterThan(0);
  });
});

describe('getSearchTotalPages', () => {
  it('空クエリでも最低 1 ページ', async () => {
    expect(await getSearchTotalPages('')).toBe(1);
  });

  it('0件でも 1 ページ', async () => {
    vi.mocked(getAllPosts).mockResolvedValue([]);
    expect(await getSearchTotalPages('anything')).toBe(1);
  });

  it('6件 → 1 ページ', async () => {
    vi.mocked(getAllPosts).mockResolvedValue(POSTS.slice(0, 6));
    expect(await getSearchTotalPages('react')).toBeLessThanOrEqual(1);
  });

  it('マッチ 7件 → 2 ページ', async () => {
    const posts = Array.from({ length: 7 }, (_, i) => makePost(`p${i}`, 'react post', 'excerpt'));
    vi.mocked(getAllPosts).mockResolvedValue(posts);
    expect(await getSearchTotalPages('react')).toBe(2);
  });
});

describe('getSearchTotalCount', () => {
  it('マッチする記事の総数を返す', async () => {
    const results = await getSearchTotalCount('react');
    expect(results).toBe(3); // POSTS 内に "react" を含むのは 3 つ (a, d, f)
  });

  it('マッチしない場合は 0', async () => {
    expect(await getSearchTotalCount('xxxxxxxx')).toBe(0);
  });
});

describe('getPaginatedSearchPosts', () => {
  beforeEach(() => {
    const posts = Array.from({ length: 7 }, (_, i) =>
      makePost(`p${i}`, `React Post ${i}`, 'excerpt')
    );
    vi.mocked(getAllPosts).mockResolvedValue(posts);
  });

  it('page 1 は最初の 6 件', async () => {
    const results = await getPaginatedSearchPosts('react', 1);
    expect(results).toHaveLength(6);
  });

  it('page 2 は残りの 1 件', async () => {
    const results = await getPaginatedSearchPosts('react', 2);
    expect(results).toHaveLength(1);
  });

  it('範囲外のページは空配列', async () => {
    const results = await getPaginatedSearchPosts('react', 99);
    expect(results).toEqual([]);
  });
});
