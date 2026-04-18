import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/content/site';
import { getPostBySlug, getSortedPostsData } from '@/features/posts/api/posts';
import { PostContentContainer as PostContent } from '@/features/posts/components/PostContent';
import type { Post } from '@/features/posts/types';

export const generateStaticParams = async () => {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

type PostProps = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `${siteConfig.url}/posts/${slug}`;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    authors: [{ name: siteConfig.author }],
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.title,
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    },
    alternates: {
      canonical: url,
    },
  };
};

const Post = async ({ params }: PostProps) => {
  const { slug } = await params;

  return <PostContent slug={slug} viewTransitionName={`post-title-${slug}`} />;
};

export default Post;
