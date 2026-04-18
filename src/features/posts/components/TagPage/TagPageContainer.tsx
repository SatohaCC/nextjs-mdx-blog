import { notFound } from 'next/navigation';

import { siteConfig } from '@/content/site';
import { getPostsByTag } from '@/features/posts/api/posts';

import { TagPagePresentational } from './TagPagePresentational';

type TagPageContainerProps = {
  tag: string;
  currentPage?: number;
};

export const TagPageContainer = async ({ tag, currentPage = 1 }: TagPageContainerProps) => {
  const allPosts = await getPostsByTag(tag);

  if (allPosts.length === 0) {
    notFound();
  }

  const totalPages = Math.ceil(allPosts.length / siteConfig.postsPerPage);
  const startIndex = (currentPage - 1) * siteConfig.postsPerPage;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + siteConfig.postsPerPage);

  const displayTag =
    allPosts[0]?.frontmatter.tags?.find(
      (t) => t.toLowerCase().replace(/\s+/g, '-') === tag.toLowerCase()
    ) || tag;

  return (
    <TagPagePresentational
      posts={paginatedPosts}
      displayTag={displayTag}
      currentPage={currentPage}
      totalPages={totalPages}
      totalCount={allPosts.length}
      tag={tag}
    />
  );
};
