import { describe, expect, it } from 'vitest';

import { generateMetadata } from './page';

describe('Search Page generateMetadata', () => {
  it('クエリがある場合、検索結果を含むタイトルを返す', async () => {
    const searchParams = Promise.resolve({ q: 'Vitest' });
    const metadata = await generateMetadata({ searchParams });
    expect(metadata.title).toBe('"Vitest" の検索結果');
  });

  it('クエリがない場合、デフォルトの検索タイトルを返す', async () => {
    const searchParams = Promise.resolve({});
    const metadata = await generateMetadata({ searchParams });
    expect(metadata.title).toBe('検索');
  });
});
