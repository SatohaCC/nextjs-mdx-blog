# Design System & UI Guidelines

このブログプロジェクトのデザインシステム、スタイリング手法、およびコンポーネント設計に関するリファレンスです。

## 1. デザイン原則

- **アクセシビリティ第一**: WCAG 2.2 AA 準拠を目標とし、特にコントラスト比とキーボードナビゲーションを重視します。
- **機能別設計 (Vertical Slice)**: デザイン変更の影響範囲を最小限にするため、UI部品は機能（スライス）ごとに閉じ込めます。
- **ダークモード対応**: システム設定および手動切り替えに対応し、どちらのモードでも最適な視認性を提供します。

## 2. スタイリング (Panda CSS)

スタイリングには [Panda CSS](https://panda-css.com/) を使用しています。インラインでのスタイル指定は避け、可能な限りトークンとレシピを使用します。

### カラーシステム (Takenoko Theme)

このブログは「たけのこの里」をイメージした独自のカラーパレットを採用しています。

| カテゴリ | トークン名 | 説明 |
| :--- | :--- | :--- |
| **Main** | `takenoko.bamboo` | 緑色（竹の葉・幹）。アクセントカラー、成功、リンク。 |
| **Sub** | `takenoko.chocolate` | 茶色（チョコ）。メインテキスト、見出し、ボーダー。 |
| **Base** | `takenoko.cream` | クリーム色（クッキー）。背景、強調、アラート。 |

#### セマンティックトークン
具体的な色（`colors.dark.100` など）を直接使うのではなく、意味に基づいたトークンを使用してください。

- `bg.default`: メイン背景
- `text.default`: メインテキスト
- `text.muted`: 控えめなテキスト（日付、タグ、メタ情報など）
- `accent.default`: アクセントカラー（竹の緑）

> [!IMPORTANT]
> **コントラスト比の維持**: ダークモードにおいて `text.muted` は `{colors.dark.200}` (#d4d4d8) を使用し、背景に対して十分なコントラスト（約 14:1）を確保しています。

### タイポグラフィ

- **Sans**: Geist Sans, Inter, Noto Sans JP
- **Mono**: Geist Mono, SFMono-Regular
- **Serif**: Noto Serif JP

見出し（H1-H6）は `textStyles` として定義されており、`typography` コンポーネントまたは `markdownContentStyles` を通じて適用されます。

## 3. コンポーネント設計

### Container / Presentational パターン

ロジックとUIを分離し、Storybook での表示を容易にするために以下のパターンを採用しています。

1. **Container (`*Container.tsx`)**:
   - Server Component。
   - データ取得 (`api/posts.ts` など) や外部 API との通信を担当。
   - Presentational コンポーネントに Props を渡す。
2. **Presentational (`*Presentational.tsx`)**:
   - Client Component (必要に応じて)。
   - UIの表示のみを担当。
   - `*.styles.ts` で定義されたスタイルを適用。
3. **Styles (`*.styles.ts`)**:
   - `css()` や `cva()` (Recipe) を使用したスタイル定義。

### 共通UIプリミティブ (`src/components/ui/`)

再利用性の高い部品（Button, Tag, AppLink等）はここに配置されます。これらは機能に依存せず、どこからでもインポート可能です。

## 4. MDX コンポーネント

Markdown 内で特別な表示を行うコンポーネントのガイドラインです。

### アラート (Blockquote)
GitHub 形式のアラートをサポートしています。

- `[!NOTE]`: 補足・情報（青）
- `[!TIP]`: ヒント・コツ（緑）
- `[!IMPORTANT]`: 重要事項（紫）
- `[!WARNING]`: 注意（琥珀色）
- `[!CAUTION]`: 警告・回避すべき事項（赤）

文字色はブログ全体の統一感を出すため、標準のテキストカラー（`text.muted`）を維持し、ボーダーと背景で種類を判別します。
