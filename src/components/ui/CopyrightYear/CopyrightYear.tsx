'use client';

/**
 * 現在の西暦年を動的に取得してレンダリングするコンポーネント。
 * 主にフッターの著作権表示（Copyright © 2024 ...）などで使用します。
 *
 * Next.js 15 のプリレンダリング時の `new Date()` 制約に対応するため、
 * 使用場所では `Suspense` で囲む必要があります。また、サーバーとクライアントでの
 * 時間差によるミスマッチを防ぐため `suppressHydrationWarning` を使用しています。
 *
 * @summary 現在の西暦年の表示に使用する
 */
export const CopyrightYear = () => {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
};
