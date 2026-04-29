import type { Metadata } from 'next';

import { siteConfig } from '@/content/site';
import { getAllTags } from '@/features/posts/api/posts';
import { TagPageContainer as TagPage } from '@/features/posts/components/TagPage/TagPageContainer';

export const generateStaticParams = async () => {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }));
};

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `「${tag}」タグの記事一覧`,
    alternates: { canonical: `${siteConfig.url}/tags/${tag}` },
  };
}

const TagPageWrapper = async ({ params }: TagPageProps) => {
  const { tag } = await params;

  return <TagPage tag={tag} currentPage={1} />;
};

export default TagPageWrapper;
