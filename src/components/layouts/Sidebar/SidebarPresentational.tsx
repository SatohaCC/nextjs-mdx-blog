import { AppLink } from '@/components/ui/AppLink/AppLink';
import { FormattedDate } from '@/components/ui/FormattedDate/FormattedDate';
import { TagLink, TagList } from '@/components/ui/Tag/Tag';
import type { Post } from '@/features/posts/types';

import {
  postDateStyles,
  postItemStyles,
  postLinkStyles,
  postListStyles,
  sectionHeadingStyles,
  sidebarContainerStyles,
  tagContainerStyles,
} from './SidebarPresentational.styles';

type SidebarPresentationalProps = {
  allTags: string[];
  latestPosts: Post[];
};

export const SidebarPresentational = ({ allTags, latestPosts }: SidebarPresentationalProps) => {
  return (
    <div className={sidebarContainerStyles}>
      {/* Recent Posts Section */}
      <section aria-label="最新の記事">
        <h2 className={sectionHeadingStyles}>最新の記事</h2>
        <ul className={postListStyles}>
          {latestPosts.map((post) => (
            <li key={post.slug} className={postItemStyles}>
              <AppLink href={`/posts/${post.slug}`} className={postLinkStyles}>
                {post.frontmatter.title}
              </AppLink>
              <FormattedDate date={post.frontmatter.date} className={postDateStyles} />
            </li>
          ))}
        </ul>
      </section>

      {/* Tags Section */}
      <section aria-label="タグ一覧">
        <h2 className={sectionHeadingStyles}>タグ一覧</h2>
        <div className={tagContainerStyles}>
          <TagList>
            {allTags.map((tag) => (
              <TagLink key={tag} tag={tag} />
            ))}
          </TagList>
        </div>
      </section>
    </div>
  );
};
