import GithubSlugger from 'github-slugger';

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

/**
 * MDXコンテンツから見出しを抽出して目次データを生成します。
 * (github-slugger への依存をここに隠蔽します)
 */
export const extractToc = (content: string): TocItem[] => {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  const slugger = new GithubSlugger();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // 見出しテキストからIDを生成（日本語対応）
    const id = slugger.slug(text);

    toc.push({ id, text, level });
  }

  return toc;
};
