import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export type ParsedContent<T = { [key: string]: unknown }> = {
  data: T;
  content: string;
};

/**
 * Markdown/MDX ファイルの内容をパースしてフロントマターと本文を分離します。
 * (gray-matter への依存をここに隠蔽します)
 */
export const parseMarkdown = <T = { [key: string]: unknown }>(
  fileContents: string
): ParsedContent<T> => {
  const { data, content } = matter(fileContents);
  return {
    data: data as T,
    content,
  };
};

/**
 * src/content/ 以下の相対パス（例: "posts/foo.mdx"）を指定してMarkdown/MDXファイルを読み込み、パースします。
 * path.join に 'src', 'content' を静的に含めることで Turbopack のトレース範囲を src/content/ に限定します。
 */
export const readMarkdownFile = async <T = { [key: string]: unknown }>(
  relativePath: string
): Promise<ParsedContent<T> | undefined> => {
  try {
    const fullPath = path.join(process.cwd(), 'src', 'content', relativePath);
    const fileContents = await fs.promises.readFile(fullPath, 'utf8');
    return parseMarkdown<T>(fileContents);
  } catch {
    return undefined;
  }
};
