'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

/**
 * ページ遷移（pathnameの変更）を検知してスクロール位置をトップにリセットするコンポーネント。
 */
export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // ページ遷移時にスクロール位置をトップに移動
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};
