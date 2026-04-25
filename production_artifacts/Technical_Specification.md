# Technical Specification: Panda CSS 効率化とダークテーマの改善（最終版）

## Executive Summary
Panda CSS の使用法を最適化し、同時にダークテーマの色設計を再構築します。汎用コンポーネントの **Config Recipe** 化による軽量化と、`semanticTokens` の整理による洗練されたダークモード体験を提供します。

## Requirements
### Functional Requirements
- なし（デザインと機能の維持・向上）

### Non-Functional Requirements
- **保守性**: ダークテーマの色指定をトークン化し、一括管理を可能にする。
- **一貫性**: テキストスタイルとカラーパレットのルールを徹底し、プロジェクト全体のデザイン品質を向上させる。
- **視認性**: ダークモードにおけるコントラスト比を最適化し、アクセシビリティを向上させる。

## Proposed Changes

### 1. 汎用 UI コンポーネントの Config Recipe 化
- [MODIFY] [panda.config.ts](file:///c:/Users/kanon/Desktop/MyProjects/Blog/panda.config.ts):
    - `Button`, `Tag` 等を `theme.recipes` に定義。
- [MODIFY] [Button/styles.ts](file:///c:/Users/kanon/Desktop/MyProjects/Blog/src/components/ui/Button/styles.ts) 等:
    - `styled-system/recipes` からのインポートに移行。

### 2. タイポグラフィとパターンの整理
- [MODIFY] [ArticleCard.styles.ts](file:///c:/Users/kanon/Desktop/MyProjects/Blog/src/features/posts/components/PostList/ArticleCard/ArticleCard.styles.ts):
    - `textStyles` を適用し、各所の個別フォント指定を排除。

### 3. ダークテーマとセマンティックトークンの最適化
- [MODIFY] [panda.config.ts](file:///c:/Users/kanon/Desktop/MyProjects/Blog/panda.config.ts):
    - **トークンの構造化**: ダークモード用のカラーセット（例: ニュートラルグレーのスケール）を `tokens.colors` に定義。
    - **セマンティックトークンの修正**: 直接の色指定（`#18181b` 等）を定義したトークンへの参照（`{colors.dark.gray.900}` 等）に変更。
    - **コントラスト調整**: `text.muted` や `border.default` のダークモード時の値を、より視認性の高いものへ微調整。
    - **アクセントカラーの最適化**: ダークモード下でのアクセントカラーの彩度・明度を調整し、目に優しく、かつ埋もれないバランスにする。

## Verification Plan

### Automated Tests
- `npm run prepare`: トークンとレシピの生成確認。
- `npm run build`: プロダクションビルドでの不具合がないか確認。

### Manual Verification
- **ダークテーマの品質確認**: ブラウザでテーマを切り替え、背景、テキスト、アクセントカラー、境界線のバランスが改善されていることを目視で確認。
- **アクセシビリティ確認**: ダークモードでのコントラスト比が十分であることを確認。

---
この改善案を含めた仕様で承認いただけますか？承認いただけましたら、**Full-Stack Engineer** として実装を開始します。
