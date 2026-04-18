import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/content/site';
import { getTotalPages } from '@/features/posts/api/posts';
import { PostListContainer as PostList } from '@/features/posts/components/PostList';

export const generateStaticParams = async () => {
  const totalPages = await getTotalPages();
  return Array.from({ length: totalPages }, (_, i) => ({
    num: String(i + 1),
  }));
};

type PageProps = {
  params: Promise<{ num: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { num } = await params;
  return {
    title: `ページ ${num}`,
    alternates: { canonical: `${siteConfig.url}/page/${num}` },
  };
}

const Page = async ({ params }: PageProps) => {
  const { num } = await params;
  const currentPage = parseInt(num, 10);
  const totalPages = await getTotalPages();

  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  return <PostList currentPage={currentPage} title="Latest Posts" />;
};

export default Page;
