import { describe, expect, it, vi } from 'vitest';

import { siteConfig } from '@/content/site';

// モックの後にインポート
import { metadata } from './layout';

// next/font/google をモック
vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'font-geist-sans' }),
  Geist_Mono: () => ({ variable: 'font-geist-mono' }),
}));

describe('Root Layout Metadata', () => {
  it('デフォルトのタイトルと説明が正しいこと', () => {
    expect(metadata.title).toEqual({
      default: siteConfig.title,
      template: `%s | ${siteConfig.title}`,
    });
    expect(metadata.description).toBe(siteConfig.description);
  });

  it('OGP設定が正しいこと', () => {
    expect(metadata.openGraph?.title).toBe(siteConfig.title);
    expect(metadata.openGraph?.siteName).toBe(siteConfig.title);
  });
});
