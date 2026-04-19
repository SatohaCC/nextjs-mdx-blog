import { describe, expect, it } from 'vitest';

import { extractToc } from './toc-generator';

describe('extractToc', () => {
  it('見出しなし → 空配列', () => {
    expect(extractToc('No headings here.')).toEqual([]);
  });

  it('## を level 2 として抽出', () => {
    const result = extractToc('## Hello World');
    expect(result).toEqual([{ id: 'hello-world', text: 'Hello World', level: 2 }]);
  });

  it('### を level 3 として抽出', () => {
    const result = extractToc('### Sub Section');
    expect(result).toEqual([{ id: 'sub-section', text: 'Sub Section', level: 3 }]);
  });

  it('# (h1) は無視する', () => {
    expect(extractToc('# Title\n## Section')).toHaveLength(1);
    expect(extractToc('# Title\n## Section')[0].level).toBe(2);
  });

  it('#### (h4) は無視する', () => {
    expect(extractToc('#### Deep')).toEqual([]);
  });

  it('日本語の見出しテキストはそのまま id になる', () => {
    const result = extractToc('## 日本語の見出し');
    expect(result).toEqual([{ id: '日本語の見出し', text: '日本語の見出し', level: 2 }]);
  });

  it('重複する見出しは連番で dedup される', () => {
    const result = extractToc('## Intro\n## Intro');
    expect(result[0].id).toBe('intro');
    expect(result[1].id).toBe('intro-1');
  });

  it('複数の見出しを順序通りに返す', () => {
    const content = '## First\n### Sub\n## Second';
    const result = extractToc(content);
    expect(result).toHaveLength(3);
    expect(result.map((t) => t.text)).toEqual(['First', 'Sub', 'Second']);
    expect(result.map((t) => t.level)).toEqual([2, 3, 2]);
  });
});
