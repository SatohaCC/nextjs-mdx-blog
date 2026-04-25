# Technical Specification: プロジェクト全体の整理とメンテナンス

## Executive Summary
本プロジェクトのコードベースを整理し、メンテナンス性を向上させるためのタスク群です。不要なファイルの削除、スクリプトの追加、ドキュメントの更新、およびコンポーネント設計の整合性確認を行います。

## Requirements
### Functional Requirements
- なし（リファクタリング・整理を主目的とする）

### Non-Functional Requirements
- **保守性**: 不要なコードや空ディレクトリを排除し、プロジェクト構造を簡潔に保つ。
- **開発体験 (DX)**: Playwright 等の新しいツールの実行コマンドを整備し、ドキュメントを最新化する。
- **一貫性**: すべてのコンポーネントが定義された設計パターン（Container/Presentational）に従っていることを確認する。

## Architecture & Tech Stack
既存の Next.js 16, Panda CSS, Vitest, Playwright, Storybook のスタックを維持します。

## Proposed Changes

### 1. ディレクトリとファイルのクリーンアップ
以下の未使用または不完全なディレクトリを削除します。
- `src/test`: 空ディレクトリ
- `src/testing`: 空ディレクトリ
- `src/components/ui/ReadingProgressBar`: 使用されていないコンポーネント
- `src/components/ui/Typography`: 実装ファイル (`.tsx`) が存在せず、スタイルのみが残っている不完全なディレクトリ

### 2. `package.json` のスクリプト整備
Playwright による E2E テストを簡単に実行できるよう、以下のスクリプトを追加します。
- `"test:e2e": "playwright test"`
- `"test:ui": "playwright test --ui"`

### 3. ドキュメントの更新 (`README.md`)
最近導入した Playwright についての記述を追加し、最新のディレクトリ構成を反映させます。
- 技術スタックに Playwright を追加。
- npm scripts 一覧に E2E テスト用コマンドを追加。

### 4. コンポーネント設計の一貫性確認
以下の項目を監査し、不整合があれば修正します。
- `src/components/ui/` 内の各コンポーネントに Storybook (`.stories.tsx`) が存在すること。
- `src/features/` 内のコンポーネントが Container/Presentational パターン（または定義されたシンプルパターン）に従っていること。

## Verification Plan

### Automated Tests
- `npm run lint`: 削除後のインポートエラーなどがないか確認。
- `npm run test`: 既存のユニットテストがすべてパスすることを確認。
- `npm run build`: プロジェクトが正常にビルドできることを確認。

### Manual Verification
- `npm run storybook`: 削除したコンポーネントが Storybook から消え、他のストーリーが正常に動作することを確認。

---
この技術スタックと仕様で承認いただけますか？ `Technical_Specification.md` を直接編集してコメントを残していただくことも可能です。修正が必要な場合は指示してください。
