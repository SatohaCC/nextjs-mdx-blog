---
name: storybook-testing
description: Next.js (Vite) + Storybook でのテスト・AI連携・フレームワーク設定のスキル。「Storybookでテストを書きたい」「play関数でインタラクションテストを書きたい」「a11yテストを設定したい」「アクセシビリティテスト」「userEvent」「canvas.getBy」「axe-core」「next/navigation」「next/router」「Storybookのルーティング」「RSC」「マニフェスト」「MCPサーバー」「AIエージェント」などのキーワードが出たら必ずこのスキルを参照すること。Next.js with Viteのフレームワーク固有設定・AI連携のベストプラクティスも含む。
---

# Storybook テスト & Next.js (Vite) スキル (v10.3)

Next.js (Vite) + Storybookにおけるテスト・フレームワーク設定・AI連携の実践ガイド。

---

## 1. インタラクションテスト

### 概要

ストーリー内の `play` 関数でユーザー操作をシミュレートし、DOMの状態や関数呼び出しをアサートするテスト。Storybook UI の Interactions パネルでデバッグ可能。

### 基本構造

```ts
import type { Meta, StoryObj } from '@storybook/your-framework';
import { expect, fn } from 'storybook/test';

import { LoginForm } from './LoginForm';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');
    await userEvent.type(canvas.getByTestId('password'), 'a-random-password');
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('Everything is perfect...')).toBeInTheDocument();
  },
};
```

---

### `canvas` クエリAPI

`canvas` は Testing Library のクエリメソッドを全て持つ。優先度順（アクセシブルな順）で使うこと：

| クエリ主語             | 説明                               |
| ---------------------- | ---------------------------------- |
| `getByRole`            | アクセシブルロールで取得（最優先） |
| `getByLabelText`       | label のテキストで取得             |
| `getByPlaceholderText` | placeholder 値で取得               |
| `getByText`            | テキスト内容で取得                 |
| `getByDisplayValue`    | input/select の現在値で取得        |
| `getByAltText`         | alt 属性で取得                     |
| `getByTitle`           | title 属性で取得                   |
| `getByTestId`          | `data-testid` で取得（最終手段）   |

**クエリタイプ**（`get`/`query`/`find` × 単数/複数）:

| タイプ      | 0件    | 1件  | 複数   | await |
| ----------- | ------ | ---- | ------ | ----- |
| `getBy`     | エラー | 要素 | エラー | ❌    |
| `queryBy`   | null   | 要素 | エラー | ❌    |
| `findBy`    | エラー | 要素 | エラー | ✅    |
| `getAllBy`  | エラー | 配列 | 配列   | ❌    |
| `findAllBy` | エラー | 配列 | 配列   | ✅    |

```ts
// 例
await canvas.findByRole('button', { name: 'Submit' }); // 非同期要素
canvas.getByText('An example heading');
canvas.getAllByRole('listitem');
```

---

### `userEvent` メソッド

> ⚠️ 必ず `await` すること

| メソッド                     | 説明                                  |
| ---------------------------- | ------------------------------------- |
| `click(el)`                  | クリック                              |
| `dblClick(el)`               | ダブルクリック                        |
| `hover(el)` / `unhover(el)`  | ホバー / アンホバー                   |
| `tab()`                      | Tab キー押下                          |
| `type(el, text)`             | テキスト入力                          |
| `keyboard(key)`              | キーボードイベント（例: `'{Shift}'`） |
| `selectOptions(el, values)`  | selectの選択                          |
| `deselectOptions(el, value)` | selectの選択解除                      |
| `clear(el)`                  | input/textareaをクリア                |

---

### `expect` アサート

`import { expect } from 'storybook/test'` で利用（Vitest + jest-dom の組み合わせ）。

> ⚠️ 必ず `await` すること

| メソッド                     | 説明                   |
| ---------------------------- | ---------------------- |
| `toBeInTheDocument()`        | DOMに存在するか        |
| `toBeVisible()`              | ユーザーから見えるか   |
| `toHaveAttribute(attr, val)` | 属性を持つか           |
| `toHaveBeenCalled()`         | スパイ関数が呼ばれたか |
| `toHaveBeenCalledWith(...)`  | 特定の引数で呼ばれたか |

---

### `fn` でスパイ

```ts
import { expect, fn } from 'storybook/test';

const meta = {
  component: LoginForm,
  args: { onSubmit: fn() }, // argにスパイを仕込む
} satisfies Meta<typeof LoginForm>;

export const FilledForm: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Log in' }));
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};
```

---

### `mount` でレンダリング前にコードを実行

```ts
export const ChristmasUI: Story = {
  async play({ mount }) {
    MockDate.set('2024-12-25');
    await mount(); // ここでレンダリング
    // 以降でアサート
  },
};
```

カスタムpropsを渡す場合：

```ts
export const Basic: Story = {
  play: async ({ mount, args }) => {
    const note = await db.note.create({ data: { title: 'test' } });
    const canvas = await mount(<Page {...args} params={{ id: String(note.id) }} />);
    // canvas を使ったアサート
  },
};
```

> ⚠️ `mount` を使う場合の2つの前提条件:
>
> 1. `play` 関数の引数で `mount` を分割代入すること
> 2. TypeScriptのビルドターゲットが ES2017 以上であること

---

### `beforeEach` / `afterEach` / `beforeAll`

| フック                       | スコープ                         | 用途                       |
| ---------------------------- | -------------------------------- | -------------------------- |
| `beforeAll`（preview.ts）    | プロジェクト全体・1回のみ        | プロジェクト初期化         |
| `beforeEach`（preview.ts）   | プロジェクト全体・各ストーリー前 | 状態リセット               |
| `beforeEach`（meta）         | ファイル内・各ストーリー前       | コンポーネント固有の初期化 |
| `afterEach`（meta or story） | 各ストーリー後                   | アサート・ログ出力         |

```ts
// .storybook/preview.ts
const preview: Preview = {
  async beforeAll() {
    await init();
  },
  async beforeEach() {
    MockDate.reset();
  },
};

// component meta
const meta = {
  async beforeEach() {
    MockDate.set('2024-02-14');
    return () => MockDate.reset(); // クリーンアップ
  },
};
```

> 💡 `fn()` モックは Storybook が自動的にリセットするので手動でリセット不要。

---

### `step` でインタラクションをグループ化

```ts
export const Submitted: Story = {
  play: async ({ canvas, step, userEvent }) => {
    await step('メールとパスワードを入力', async () => {
      await userEvent.type(canvas.getByTestId('email'), 'hi@example.com');
      await userEvent.type(canvas.getByTestId('password'), 'supersecret');
    });
    await step('フォームを送信', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });
  },
};
```

Interactions パネルでネストされたグループとして表示される。

---

### テストの実行

Vitest addonを使用している場合：

- **Storybook UI**: サイドバーのテストウィジェット → 「Run component tests」ボタン
- **エディタ拡張**: VSCode等のエディタから実行
- **CLI**: `vitest` コマンド
- **CI**: Vitest テスト実行に含まれる

---

## 2. アクセシビリティテスト (a11y)

### 概要

`@storybook/addon-a11y` を使い、axe-core ベースでレンダリングされたDOMのWCAGルール違反を自動検出する。

### インストール

```bash
npx storybook add @storybook/addon-a11y
# Vitest addonも使う場合
npx storybook add @storybook/addon-vitest
```

---

### アドオンパネルの見方

- **Violations**: WCAG/ベストプラクティスの既知の違反
- **Passes**: 問題なし
- **Incomplete**: 手動確認が必要な箇所

---

### 設定パラメータ

| パラメータ                | デフォルト       | 説明                                                 |
| ------------------------- | ---------------- | ---------------------------------------------------- |
| `parameters.a11y.context` | `'body'`         | axe.run のコンテキスト（チェック対象のCSS selector） |
| `parameters.a11y.config`  | regionルール無効 | axe.configure() への設定                             |
| `parameters.a11y.options` | `{}`             | axe.run へのオプション（ルールセット変更など）       |
| `parameters.a11y.test`    | `undefined`      | テスト動作（`'off'` / `'todo'` / `'error'`）         |
| `globals.a11y.manual`     | `undefined`      | `true` で自動チェックを無効化                        |

---

### `parameters.a11y.test` の値

| 値        | 説明                                                     |
| --------- | -------------------------------------------------------- |
| `'off'`   | a11yテストを実行しない（パネルでの手動確認は可能）       |
| `'todo'`  | 実行するが違反は警告（UI表示のみ、CIでエラーにならない） |
| `'error'` | 実行し、違反は**テスト失敗**（UI + CLI/CI でエラー）     |

```ts
// プロジェクト全体に適用（.storybook/preview.ts）
const preview: Preview = {
  parameters: { a11y: { test: 'error' } },
};

// ファイル単位・個別ストーリー単位でオーバーライド可能
export const NoA11yFail: Story = {
  parameters: { a11y: { test: 'todo' } },
};
```

---

### ルールセットの変更

デフォルト: WCAG 2.0 A/AA + WCAG 2.1 A/AA + Best Practices

```ts
// WCAG 2.x AAA を追加する例
parameters: {
  a11y: {
    options: {
      runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice', 'wcag2aaa'],
    },
  },
},
```

---

### 個別ルールの設定

```ts
parameters: {
  a11y: {
    config: {
      rules: [
        {
          id: 'autocomplete-valid',
          selector: '*:not([autocomplete="nope"])', // 特定セレクタのみ適用
        },
        {
          id: 'image-alt',
          enabled: false, // このルールを無効化
        },
      ],
    },
  },
},
```

---

### 特定要素の除外

```ts
parameters: {
  a11y: {
    context: {
      include: ['body'],
      exclude: ['.no-a11y-check'], // このクラスの要素をチェック対象外に
    },
  },
},
```

---

### 自動チェックの無効化

```ts
export const NonA11yStory: Story = {
  globals: {
    a11y: { manual: true }, // 自動チェック無効（手動実行は可能）
  },
};
```

---

### 推奨ワークフロー（段階的に改善）

1. **全体に `'error'` を設定**して新規ストーリーが違反を出さないようにする
2. 既存の違反コンポーネントには一時的に **`'todo'`** を設定して警告に降格
3. 一つずつ修正してパラメータを削除していく

```ts
// ステップ1: preview.ts
parameters: {
  a11y: {
    test: 'error';
  }
}

// ステップ2: 既存コンポーネント
parameters: {
  a11y: {
    test: 'todo';
  }
} // TODO扱いで警告のみ

// ステップ3: 修正完了後
// パラメータを削除（'error' が継承される）
```

---

### CI での注意点

- `'error'` を設定したストーリーのみCI でエラーとなる
- `'todo'` はCIでは無視される（UIでは警告として表示）
- Vitest addonを使用する場合、CIでの実行は通常のVitestテスト実行に含まれる

---

### 非同期コンポーネント（React Suspense/RSC）でa11yが正しく動かない場合

`.storybook/main.ts` に以下を追加：

```ts
const config: StorybookConfig = {
  features: {
    developmentModeForBuild: true, // Reactのact()を有効にする
  },
};
```

---

## 3. Next.js with Vite フレームワーク設定

### インストール・要件

```bash
# 既存Next.jsプロジェクトにStorybookを追加
npm create storybook@latest

# Webpack版からの自動移行
npx storybook automigrate nextjs-to-nextjs-vite
```

**要件**: Next.js ≥ 14.1, Vite ≥ 5

`.storybook/main.ts` のフレームワーク指定：

```ts
import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  framework: '@storybook/nextjs-vite',
};
```

---

### Next.js ルーティング

#### pages ディレクトリ（`next/router`）

ルーターは自動でスタブ化される。ストーリーごとのオーバーライドは `parameters.nextjs.router` で行う：

```ts
export const Example: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/profile/[id]',
        asPath: '/profile/1',
        query: { id: '1' },
      },
    },
  },
};
```

モック操作（`beforeEach`で）：

```ts
import { getRouter } from '@storybook/nextjs-vite/router';
async beforeEach() {
  getRouter().push.mockImplementation(() => { /* ... */ });
}
```

#### app ディレクトリ（`next/navigation`）

`next/navigation` を使うコンポーネントのストーリーには `nextjs.appDirectory: true` が必要：

```ts
// 全ストーリーに適用する場合 .storybook/preview.ts
const preview: Preview = {
  parameters: { nextjs: { appDirectory: true } },
};

// ストーリーごと
export const Example: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/profile',
        query: { user: '1' },
      },
    },
  },
};
```

`useParams` / `useSelectedLayoutSegment` のモック（segmentsの形式）：

```ts
// 文字列配列: segments[0]がuseSelectedLayoutSegment()の戻り値
navigation: {
  segments: ['dashboard', 'analytics'];
}
// → useSelectedLayoutSegment() = 'dashboard'
// → useSelectedLayoutSegments() = ['dashboard', 'analytics']

// タプル配列: useParams()のキー/値ペア
navigation: {
  segments: [
    ['slug', 'hello'],
    ['framework', 'nextjs'],
  ];
}
// → useParams() = { slug: 'hello', framework: 'nextjs' }
```

---

### Built-in モックモジュール

| モジュール                               | 用途                                                   |
| ---------------------------------------- | ------------------------------------------------------ |
| `@storybook/nextjs-vite/cache.mock`      | `next/cache`（`revalidatePath`等）のモック             |
| `@storybook/nextjs-vite/headers.mock`    | `cookies`, `headers`, `draftMode`のモック              |
| `@storybook/nextjs-vite/navigation.mock` | `next/navigation`（`redirect`, `getRouter`等）のモック |
| `@storybook/nextjs-vite/router.mock`     | `next/router`（`getRouter`等）のモック                 |

**使用例（headers.mock）:**

```ts
import { cookies, headers } from '@storybook/nextjs-vite/headers.mock';

export const LoggedIn: Story = {
  async beforeEach() {
    cookies().set('username', 'Sol');
    headers().set('timezone', 'JST');
  },
  async play() {
    await expect(cookies().get).toHaveBeenCalledWith('username');
  },
};
```

**使用例（navigation.mock）:**

```ts
import { getRouter, redirect } from '@storybook/nextjs-vite/navigation.mock';

export const Unauthenticated: Story = {
  async play() {
    await expect(redirect).toHaveBeenCalledWith('/login', 'replace');
  },
};
```

---

### スタイリング

```ts
// .storybook/preview.ts
// Tailwind CSS
import '../app/globals.css';
// Sass/SCSS
import '../styles/globals.scss';
```

CSS Modules・Styled JSX・PostCSS は設定不要で動作する。

---

### RSC（React Server Components）

```ts
// .storybook/main.ts（実験的）
features: {
  experimentalRSC: true;
}

// 特定ストーリーで無効化
parameters: {
  react: {
    rsc: false;
  }
}
```

> ⚠️ ファイルシステムやNode専用ライブラリにアクセスするRSCは別途モックが必要。ネットワークリクエストは MSW Storybook Addon を推奨。

---

### Google Fonts のモック（CI向け）

```yaml
# .github/workflows/ci.yml
env:
  NEXT_FONT_GOOGLE_MOCKED_RESPONSES: ${{ github.workspace }}/mocked-google-fonts.js
```

---

## 4. AI連携（Storybook AI / MCP サーバー）

> 🧪 現時点ではReactプロジェクトのみ対応。APIは将来変更される可能性あり。

### マニフェストとは

Storybookが自動生成する2種類のJSONファイル。AIエージェントがコンポーネントを理解・活用するために使われる：

- **components manifest** (`/manifests/components.json`): CSFファイルの静的解析 + Prop型情報
- **docs manifest** (`/manifests/docs.json`): MDXファイルの内容

デバッガー: `http://localhost:6006/manifests/components.html`

---

### AIのためのストーリーの書き方

**良い例（1つのコンセプトに集中）:**

```ts
// ✅ デフォルト状態を示す
export const Basic: Story = {};

// ✅ 特定のユースケースを示す
export const Primary: Story = { args: { primary: true } };

// ✅ 同じコンセプト（disabled）を示す複数レンダリングはOK
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (<><Button {...args}>Disabled</Button><Button {...args} primary>Disabled Primary</Button></>),
};
```

**悪い例（複数コンセプトを一度に詰め込む）:**

```ts
// ❌ サイズと見た目の両方を一つのストーリーで見せている
export const SizesAndVariants: Story = { render: () => <>{/* ... */}</> };
```

---

### JSDocコメントでドキュメントを充実させる

**コンポーネントの説明:**

```tsx
/**
 * Buttonはページ遷移を伴わないユーザー操作に使用します。
 * 遷移が必要な場合は [Link](?path=/docs/link--default) を使用してください。
 *
 * @summary ページ遷移を伴わないユーザー操作用
 */
export const Button = // ...
```

**Propの説明:**

```tsx
export interface ButtonProps {
  /** ボタンテキストの前に表示するアイコン */
  icon?: ReactNode;
}
```

**ストーリーの説明（JSDocコメント）:**

```ts
/**
 * Primaryボタンはビュー内のメインアクションに使用します。
 * 1つのビューにPrimaryボタンは1つのみにしてください。
 *
 * @summary ビュー内のメインアクション用
 */
export const Primary: Story = { args: { primary: true } };
```

> 💡 Prop type extractionは `react-docgen-typescript`（`reactDocgen` オプションで設定）を推奨。より詳細な情報が取得できる。

---

### マニフェストからの除外

エージェントに参照させたくないストーリー・ページは `!manifest` タグで除外：

```ts
// ストーリー単位で除外
export const ForInstructionOnly = {
  tags: ['!manifest'],
};

// ファイル全体を除外（meta に指定）
const meta = {
  component: MyComponent,
  tags: ['!manifest'],
};
```

```mdx
{/* MDXページを除外 */}

<Meta title="Doc for Humans Only" tags={['!manifest']} />
```

---

### MDXドキュメントのAI向けベストプラクティス

- `summary` を `Meta` タグに指定するとエージェントに届く：
  ```mdx
  <Meta title="Design Tokens/Colors" summary="カラートークン一覧と使用ガイドライン" />
  ```
- 動的に生成された値（`{colors.map(...)}` など）はマニフェストに**含まれない**。エージェントに渡したい情報は静的に直接記述すること。

---

## 5. よくある判断

| 状況                                             | 対応                                                       |
| ------------------------------------------------ | ---------------------------------------------------------- |
| 要素が非同期でレンダリングされる                 | `findBy`（await可）を使う                                  |
| 関数が呼ばれたかテストしたい                     | `fn()` + `toHaveBeenCalled()`                              |
| テスト前に日時をモックしたい                     | `mount` + MockDate                                         |
| 特定コンポーネントだけa11yを後回し               | `parameters.a11y.test: 'todo'`                             |
| アクセシビリティテストを完全スキップ             | `globals.a11y.manual: true`                                |
| CIでa11yをエラーにしたい                         | `parameters.a11y.test: 'error'`                            |
| app routerを使うコンポーネントのストーリー       | `parameters.nextjs.appDirectory: true`                     |
| `next/navigation` の `redirect` をアサートしたい | `@storybook/nextjs-vite/navigation.mock` の `redirect`     |
| Cookieやヘッダーを事前設定したい                 | `@storybook/nextjs-vite/headers.mock` の `cookies().set()` |
| RSCをストーリーで使いたい                        | `features.experimentalRSC: true`（実験的）                 |
| AIエージェントに不要なストーリーを見せたくない   | `tags: ['!manifest']` で除外                               |
