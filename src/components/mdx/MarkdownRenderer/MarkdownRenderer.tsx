import { cacheLife, cacheTag } from 'next/cache';

import { MDXRemote } from 'next-mdx-remote-client/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { MarkdownBlockquote } from '@/components/mdx/MarkdownBlockquote/MarkdownBlockquote';
import { AppLink } from '@/components/ui/AppLink';

import { markdownContentStyles } from './MarkdownRenderer.styles';

const defaultComponents = {
  a: AppLink,
  blockquote: MarkdownBlockquote,
};

type MarkdownRendererProps = {
  content: string;
};

export const MarkdownRenderer = async ({ content }: MarkdownRendererProps) => {
  // rehype-pretty-code 内部のシンタックスハイライターが Date.now() を呼ぶため 'use cache' が必要
  'use cache';
  cacheLife('days');
  cacheTag('posts');
  return (
    <div className={markdownContentStyles}>
      <MDXRemote
        source={content}
        components={defaultComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypeSlug], [rehypePrettyCode, { theme: 'github-dark' }]],
          },
        }}
      />
    </div>
  );
};
