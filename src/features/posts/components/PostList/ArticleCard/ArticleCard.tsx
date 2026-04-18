import React, { type ReactNode } from 'react';

import { AppLink } from '@/components/ui/AppLink';
import { FormattedDate } from '@/components/ui/FormattedDate';
import type { Post } from '@/features/posts/types';

import {
  articleCardStyles,
  articleStackStyles,
  dateStyles,
  excerptStyles,
  titleStyles,
} from './ArticleCard.styles';

type ArticleCardProps = {
  post: Post;
  children?: ReactNode;
};

/**
 * 記事の概要を表示するカードコンポーネント。
 * メタデータやタグリストは children を通じて合成（Composition）する。
 */
export const ArticleCard = ({ post, children }: ArticleCardProps) => {
  return (
    <article className={articleCardStyles}>
      <div className={articleStackStyles}>
        <h2
          className={titleStyles}
          style={
            {
              viewTransitionName: `post-title-${post.slug}`,
            } as React.CSSProperties & { viewTransitionName?: string }
          }
        >
          <AppLink href={`/posts/${post.slug}`}>{post.frontmatter.title}</AppLink>
        </h2>
        <FormattedDate date={post.frontmatter.date} className={dateStyles} />
        {/* メタデータやタグなどの追加要素を合成 */}
        {children}
        <p className={excerptStyles}>{post.frontmatter.excerpt}</p>
      </div>
    </article>
  );
};
