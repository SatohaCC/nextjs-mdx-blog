import { ViewTransition } from 'react';

import { notFound } from 'next/navigation';

import { getPostBySlug, getRelatedPosts } from '@/features/posts/api/posts';
import { extractToc } from '@/features/posts/api/toc-generator';

import { PostContentPresentational } from './PostContentPresentational';

type PostContentContainerProps = {
  slug: string;
  viewTransitionName: string;
};

export const PostContentContainer = async ({
  slug,
  viewTransitionName,
}: PostContentContainerProps) => {
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.frontmatter.tags || []);
  const toc = extractToc(post.content);

  return (
    <ViewTransition>
      <PostContentPresentational
        post={post}
        viewTransitionName={viewTransitionName}
        relatedPosts={relatedPosts}
        toc={toc}
      />
    </ViewTransition>
  );
};
