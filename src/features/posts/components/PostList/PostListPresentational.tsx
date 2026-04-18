import { ViewTransition } from 'react';

import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { TagLink, TagList } from '@/components/ui/Tag';
import { PaginationContainer as Pagination } from '@/features/posts/components/Pagination';
import type { Post } from '@/features/posts/types';

import { ArticleCard } from './ArticleCard/ArticleCard';
import { articleListStyles } from './PostListPresentational.styles';

type PostListPresentationalProps = {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  title?: string;
  subtitle?: string;
  baseUrl?: string;
  getPageUrl?: (page: number) => string;
};

export const PostListPresentational = ({
  posts,
  totalPages,
  currentPage,
  title = 'Latest Posts',
  subtitle,
  baseUrl,
  getPageUrl,
}: PostListPresentationalProps) => {
  return (
    <ViewTransition>
      <PageTitle subtitle={subtitle}>{title}</PageTitle>

      <div className={articleListStyles}>
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post}>
            {post.frontmatter.tags && (
              <TagList>
                {post.frontmatter.tags.map((tag) => (
                  <TagLink key={tag} tag={tag} />
                ))}
              </TagList>
            )}
          </ArticleCard>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
          getPageUrl={getPageUrl}
        />
      )}
    </ViewTransition>
  );
};
