'use client';

/**
 * 現在の年をレンダリングするクライアントコンポーネント。
 * Next.js 15 のプリレンダリング時の `new Date()` 制約に対応するため、
 * 使用場所では Suspense で囲む必要があります。
 */
export const CopyrightYear = () => {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
};
