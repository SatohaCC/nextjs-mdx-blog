import { Suspense } from 'react';

import type { Metadata } from 'next';

import { siteConfig } from '@/content/site';
import { SearchContainer, SearchSkeleton } from '@/features/posts/components/Search';

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ? `"${q}" の検索結果` : '検索';
  return {
    title,
    description: q ? `「${q}」に関する記事の検索結果` : '記事を検索できます',
    alternates: { canonical: `${siteConfig.url}/search` },
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => (
  <Suspense fallback={<SearchSkeleton />}>
    <SearchContainer searchParams={searchParams} />
  </Suspense>
);

export default SearchPage;
