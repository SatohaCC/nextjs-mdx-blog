import { AppLink } from '@/components/ui/AppLink';
import type { Post } from '@/features/posts/types';

import {
  relatedPostCardStyles,
  relatedPostDateStyles,
  relatedPostTitleStyles,
  relatedPostsContainerStyles,
  relatedPostsGridStyles,
  relatedPostsHeadingStyles,
} from './RelatedPosts.styles';

type RelatedPostsProps = {
  posts: Post[];
};

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <aside className={relatedPostsContainerStyles}>
      <h2 className={relatedPostsHeadingStyles}>関連記事</h2>
      <div className={relatedPostsGridStyles}>
        {posts.map((post) => (
          <AppLink key={post.slug} href={`/posts/${post.slug}`} className={relatedPostCardStyles}>
            <h3 className={relatedPostTitleStyles}>{post.frontmatter.title}</h3>
            <span className={relatedPostDateStyles}>{post.frontmatter.date}</span>
          </AppLink>
        ))}
      </div>
    </aside>
  );
};
