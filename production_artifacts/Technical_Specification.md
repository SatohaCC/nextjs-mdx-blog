# テスト強化計画 (Technical Specification)

## Executive Summary
このプロジェクトのテストスイートをさらに充実させ、品質保証の自動化範囲を拡大します。現在はAPIのユニットテストとStorybookによるコンポーネント操作テストが主軸ですが、これに加えて **E2Eテストの導入**、**視覚的回帰テスト（スナップショット）の拡充**、および **アクセシビリティチェックの自動化** を行います。

## Requirements

### 機能要件
- **E2Eテスト (Playwright)**:
  - トップページからの記事遷移が正しく行われること。
  - 検索機能が期待通りに動作し、結果ページに遷移すること。
  - ページネーションが正しく動作し、記事リストが切り替わること。
  - テーマ切り替えが動作し、UIのスタイルが変更されること。
- **コンポーネントテスト (Storybook + Vitest)**:
  - すべての Story に対してスナップショットテストを実行し、意図しないUI変更を検知する。
  - `ThemeToggle` や `SearchBox` などの重要コンポーネントのインタラクションテストを強化する。
- **ページレベルテスト (Unit)**:
  - 各ページの `generateMetadata` が正しく SEO タグを生成すること。
  - `generateStaticParams` が正しいスラッグの一覧を返すこと。

### 非機能要件
- **アクセシビリティ (a11y)**:
  - Storybook の a11y アドオンが WCAG 2.1 AA 違反を検知した場合、テストを失敗させる。
- **保守性**:
  - テストコードは各機能ディレクトリ（`src/features/*/api/*.test.ts` 等）または `e2e/` ディレクトリに整理する。

## Architecture & Tech Stack

### 既存スタックの活用
- **Vitest**: ユニットテストおよびコンポーネントテストのランナー。
- **Storybook**: コンポーネントのカタログおよびインタラクションテストの基盤。
- **Playwright**: `vitest-browser` のプロバイダーとして既に使用されているが、これをフルスタックの E2E テストにも活用する。

### 新規導入・設定変更
- **Playwright (E2E)**: `e2e/*.spec.ts` ファイルを作成し、Next.js サーバーに対してテストを実行する。
- **Vitest Snapshots**: `storybookTest` プラグインと組み合わせて、自動的に全 Story のスナップショットを取得する。
- **Storybook a11y**: `.storybook/preview.ts` のパラメータを変更し、違反時にエラーを投げるようにする。

## Data Schema / State Management
既存の型定義に変更はありませんが、テストデータ（Mock Posts）を共通化するためのユーティリティを `src/testing/` または `src/features/posts/api/testing-utils.ts` に抽出することを検討します。

## Proposed Changes

### 1. E2E テストの導入
- [NEW] `playwright.config.ts`: E2Eテスト用の設定ファイル。
- [NEW] `e2e/basic-flows.spec.ts`: 基本的なユーザー導線のテスト。

### 2. アクセシビリティチェックの厳格化
- [MODIFY] `.storybook/preview.ts`: `parameters.a11y.test: 'error'` を追加。

### 3. スナップショットテストの拡充
- [MODIFY] `vitest.config.ts`: スナップショット取得のための設定を確認/追加。

### 4. ページメタデータのテスト
- [NEW] `src/app/posts/[slug]/page.test.ts`: `generateMetadata` 等のテスト。

## Verification Plan

### Automated Tests
- `npm run test`: 全ユニットテスト、コンポーネントテスト（スナップショット含む）、および a11y チェックを実行。
- `npx playwright test`: 新規導入する E2E テストを実行。

### Manual Verification
- Storybook UI を開き、Interactions パネルで新しいテストステップが緑色になっていることを確認。
- a11y パネルで違反がないことを確認。

---
この技術スタックと仕様で承認いただけますか？ `Technical_Specification.md` を直接編集してコメントを残していただくことも可能です。修正が必要な場合は指示してください。
