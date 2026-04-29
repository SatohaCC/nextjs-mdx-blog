import React from 'react';

import { AppLink } from '@/components/ui/AppLink/AppLink';
import { FormattedDate } from '@/components/ui/FormattedDate/FormattedDate';
import type { PostSummary } from '@/features/posts/types';

import {
  articleCardStyles,
  articleStackStyles,
  dateStyles,
  excerptStyles,
  titleLinkStyles,
  titleStyles,
} from './ArticleCard.styles';

type ArticleCardProps = {
  post: PostSummary;
};

/**
 * 記事の概要を表示するカードコンポーネント。
 * 全体リンク（Stretched Link）をサポートし、説明文は行数制限される。
 */
export const ArticleCard = ({ post }: ArticleCardProps) => {
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
          <AppLink href={`/posts/${post.slug}`} className={titleLinkStyles}>
            {post.frontmatter.title}
          </AppLink>
        </h2>
        <FormattedDate date={post.frontmatter.date} className={dateStyles} />
        <p className={excerptStyles}>{post.frontmatter.excerpt}</p>
        {/* {children} */}
      </div>
    </article>
  );
};
