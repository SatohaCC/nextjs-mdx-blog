import { MarkdownRenderer } from '@/components/mdx/MarkdownRenderer/MarkdownRenderer';
import { BackButtonContainer as BackButton } from '@/components/ui/BackButton/BackButtonContainer';
import { FormattedDate } from '@/components/ui/FormattedDate/FormattedDate';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { TagLink, TagList } from '@/components/ui/Tag/Tag';
import { type TocItem } from '@/features/posts/api/toc-generator';
import type { Post } from '@/features/posts/types';

import {
  articleDateStyles,
  articleTagsContainerStyles,
  backButtonContainerStyles,
} from './PostContentPresentational.styles';
import { RelatedPosts } from './RelatedPosts/RelatedPosts';
import { TableOfContents } from './TableOfContents/TableOfContents';

type PostContentPresentationalProps = {
  post: Post;
  viewTransitionName: string;
  relatedPosts: Post[];
  toc: TocItem[];
};

export const PostContentPresentational = ({
  post,
  viewTransitionName,
  relatedPosts,
  toc,
}: PostContentPresentationalProps) => {
  return (
    <article>
      <PageTitle viewTransitionName={viewTransitionName}>{post.frontmatter.title}</PageTitle>
      <FormattedDate date={post.frontmatter.date} className={articleDateStyles} />
      {post.frontmatter.tags && (
        <div className={articleTagsContainerStyles}>
          <TagList>
            {post.frontmatter.tags.map((tag) => (
              <TagLink key={tag} tag={tag} />
            ))}
          </TagList>
        </div>
      )}
      <TableOfContents toc={toc} />
      <MarkdownRenderer content={post.content} />

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />

      {/* Back Button */}
      <div className={backButtonContainerStyles}>
        <BackButton />
      </div>
    </article>
  );
};
