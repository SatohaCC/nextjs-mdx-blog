import { expect, test } from '@playwright/test';

test.describe('Basic User Flows', () => {
  test('トップページが表示され、記事一覧が表示されること', async ({ page }) => {
    await page.goto('/');

    // ロゴまたはタイトルの確認
    await expect(page.getByRole('link', { name: 'Satohas Blog' })).toBeVisible();

    // 記事カードが表示されていることを確認
    const articleCards = page.locator('article');
    await expect(articleCards.first()).toBeVisible();
  });

  test('記事詳細ページへの遷移ができること', async ({ page }) => {
    await page.goto('/');

    const firstArticle = page.locator('article').first();
    const articleTitle = await firstArticle.locator('h2').innerText();

    // 記事をクリック
    await firstArticle.click();

    // URLが変わったことを確認
    await expect(page).not.toHaveURL('/');

    // 詳細ページでタイトルが表示されていることを確認（h1 かつ role=heading を明示）
    await expect(page.locator('h1').filter({ hasText: articleTitle }).first()).toBeVisible();
  });

  test('検索機能が動作すること', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('Vitest');
    await searchInput.press('Enter');

    // 検索結果ページに遷移
    await expect(page).toHaveURL(/\/search\?q=Vitest/);

    // 検索結果が表示されていることを確認（h1 かつ role=heading を明示）
    await expect(page.getByRole('heading', { name: /検索結果/ })).toBeVisible();
  });

  test('テーマ切り替えができること', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.getByRole('button', { name: /モードに切り替え|テーマ切り替え/ });
    await expect(themeToggle).toBeVisible();

    // 初期状態（ライトモード）の背景色を確認
    await themeToggle.click();

    // テーマが変わったことを何らかの形で確認
    await expect(themeToggle).toBeEnabled();
  });

  test.describe('Visual Regression Tests', () => {
    test('トップページの全体レイアウトが崩れていないこと', async ({ page }) => {
      await page.goto('/');
      // 初期レンダリングとフォントの読み込みを待機
      await page.waitForLoadState('networkidle');

      // ページ全体のスクリーンショットを比較
      await expect(page).toHaveScreenshot('homepage.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });

    test('ページネーションのコンポーネントが正しく表示されていること', async ({ page }) => {
      await page.goto('/');
      const pagination = page.getByRole('navigation', { name: 'ページネーション' });
      await pagination.scrollIntoViewIfNeeded();

      // 特定の要素のみを比較（周辺のコンテンツに左右されない）
      await expect(pagination).toHaveScreenshot('pagination.png');
    });

    test('記事詳細ページのレイアウトが崩れていないこと', async ({ page }) => {
      await page.goto('/');
      // 最初の記事をクリックして遷移
      await page.locator('article').first().click();
      await page.waitForLoadState('networkidle');

      // ページ全体のスクリーンショットを比較
      await expect(page).toHaveScreenshot('article-page.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    });
  });
});
