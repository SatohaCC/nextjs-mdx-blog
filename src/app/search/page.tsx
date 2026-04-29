import { Suspense } from 'react';

import type { Metadata } from 'next';

import { siteConfig } from '@/content/site';
import { SearchContainer } from '@/features/posts/components/Search/SearchContainer';
import { SearchSkeleton } from '@/features/posts/components/Search/SearchSkeleton';

type SearchPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q, page } = await searchParams;
  const query = q || '';
  const currentPage = parseInt(page ?? '1', 10) || 1;

  const title = query ? `"${query}" の検索結果` : '検索';

  // Canonical URL の構築
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (currentPage > 1) params.set('page', String(currentPage));
  const queryString = params.toString();
  const canonicalUrl = `${siteConfig.url}/search${queryString ? `?${queryString}` : ''}`;

  return {
    title,
    description: query ? `「${query}」に関する記事の検索結果` : '記事を検索できます',
    alternates: { canonical: canonicalUrl },
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => (
  <Suspense fallback={<SearchSkeleton />}>
    <SearchContainer searchParams={searchParams} />
  </Suspense>
);

export default SearchPage;
