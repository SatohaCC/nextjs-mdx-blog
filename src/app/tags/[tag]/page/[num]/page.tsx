import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/content/site';
import { getAllTags, getPostsByTag } from '@/features/posts/api/posts';
import { TagPageContainer as TagPage } from '@/features/posts/components/TagPage';

export const generateStaticParams = async () => {
  const tags = await getAllTags();
  const params = [];

  for (const tag of tags) {
    const posts = await getPostsByTag(tag);
    const totalPages = Math.ceil(posts.length / siteConfig.postsPerPage);
    // 1ページ目も含めて生成
    for (let i = 1; i <= totalPages; i++) {
      params.push({
        tag: tag.toLowerCase().replace(/\s+/g, '-'),
        num: String(i),
      });
    }
  }

  return params;
};

type TagPageProps = {
  params: Promise<{ tag: string; num: string }>;
};

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag, num } = await params;
  return {
    title: `#${tag} (ページ ${num})`,
    description: `「${tag}」タグの記事一覧 - ページ ${num}`,
    alternates: { canonical: `${siteConfig.url}/tags/${tag}/page/${num}` },
  };
}

const TagPagePagination = async ({ params }: TagPageProps) => {
  const { tag, num } = await params;
  const currentPage = parseInt(num, 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return <TagPage tag={tag} currentPage={currentPage} />;
};

export default TagPagePagination;
