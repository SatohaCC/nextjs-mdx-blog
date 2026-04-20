import fs from 'fs';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { parseMarkdown, readMarkdownFile } from './mdx-parser';

vi.mock('fs', () => ({
  default: {
    promises: {
      readFile: vi.fn<() => Promise<string>>(),
    },
  },
}));

describe('parseMarkdown', () => {
  it('front matter と本文を分離して返す', () => {
    // 日付を引用符で囲むことで gray-matter による Date 変換を防ぐ
    const result = parseMarkdown("---\ntitle: Hello\ndate: '2024-01-01'\n---\nBody text");
    expect(result.data).toEqual({ title: 'Hello', date: '2024-01-01' });
    expect(result.content).toBe('Body text');
  });

  it('front matter がない場合、data は空オブジェクト', () => {
    const result = parseMarkdown('Just content');
    expect(result.data).toEqual({});
    expect(result.content).toBe('Just content');
  });

  it('複数行 YAML を正しくパースする', () => {
    const input = '---\ntitle: Test\ntags:\n  - react\n  - typescript\n---\n# Heading';
    const result = parseMarkdown(input);
    expect(result.data).toEqual({ title: 'Test', tags: ['react', 'typescript'] });
    expect(result.content).toBe('# Heading');
  });
});

describe('readMarkdownFile', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('ファイルが存在する場合、パース結果を返す', async () => {
    vi.mocked(fs.promises.readFile).mockResolvedValue('---\ntitle: Test Post\n---\nContent here');
    const result = await readMarkdownFile<{ title: string }>('posts/test.mdx');
    expect(result).toEqual({ data: { title: 'Test Post' }, content: 'Content here' });
  });

  it('ファイルが存在しない場合、undefined を返す', async () => {
    vi.mocked(fs.promises.readFile).mockRejectedValue(new Error('ENOENT'));
    const result = await readMarkdownFile('posts/not-found.mdx');
    expect(result).toBeUndefined();
  });
});
