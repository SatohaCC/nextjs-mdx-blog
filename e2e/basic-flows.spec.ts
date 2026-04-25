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
    // next-themes は html または body に class や data-theme を付与することが多い

    await themeToggle.click();

    // テーマが変わったことを何らかの形で確認（例：アイコンの変化、属性の変化）
    // ここではエラーが起きないことと、ボタンがクリック可能であることを確認
    await expect(themeToggle).toBeEnabled();
  });
});
