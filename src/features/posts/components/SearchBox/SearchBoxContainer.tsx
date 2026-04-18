'use client';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { SearchBoxPresentational } from './SearchBoxPresentational';

export const SearchBoxContainer = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, router]
  );

  return <SearchBoxPresentational query={query} onQueryChange={setQuery} onSubmit={handleSubmit} />;
};
