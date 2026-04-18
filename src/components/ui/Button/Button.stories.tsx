import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
  args: {
    children: 'ボタン',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── ダークモード a11y 検証 ────────────────────────────────────────────────────

/**
 * ダークモード時の primary ボタン。
 * accent.default (dark) = bamboo.400 (#66BB6A) に白テキストを乗せると
 * コントラスト比が 2.4:1 で WCAG AA 基準 (4.5:1) を満たさない。
 *
 * @summary ダークモードのコントラスト検証
 */
export const PrimaryDark: Story = {
  globals: { theme: 'dark' },
  args: { variant: 'primary' },
};

// ── スモークテスト（各バリアント） ───────────────────────────────────────────

/**
 * ページ内の主要アクションに使用する強調スタイルのボタン。
 * 1画面に1つだけ配置することを推奨する。
 *
 * @summary メインCTAに使用する
 */
export const Primary: Story = {
  args: { variant: 'primary' },
};

/**
 * 枠線のみで背景色を持たないボタン。Primary の次に重要なアクションに使用する。
 *
 * @summary 二次的なアクションに使用する
 */
export const Outline: Story = {
  args: { variant: 'outline' },
};

/**
 * 背景・枠線なしの最小スタイルのボタン。UIを圧迫せずアクションを提供したい場合に使用する。
 *
 * @summary 低優先度のアクションや補助的な操作に使用する
 */
export const Ghost: Story = {
  args: { variant: 'ghost' },
};

/**
 * アクセントカラーを使ったゴーストボタン。テーマ色を活かした強調に使用する。
 *
 * @summary アクセントカラーで目立たせたい補助アクションに使用する
 */
export const GhostAccent: Story = {
  args: { variant: 'ghost-accent' },
};

/**
 * コンパクトな配置が必要な場所向けの小サイズボタン。
 *
 * @summary スペースが限られたUIや密度の高いレイアウトに使用する
 */
export const Small: Story = {
  args: { size: 'sm' },
};

/**
 * 視認性を高めたい主要CTAに使用する大サイズボタン。
 *
 * @summary ヒーローエリアや重要なアクションを強調する場面に使用する
 */
export const Large: Story = {
  args: { size: 'lg' },
};

// ── インタラクションテスト ───────────────────────────────────────────────────

/**
 * クリック時に `onPress` コールバックが呼ばれることを検証する。
 *
 * @summary クリックイベントの発火確認
 */
export const ClickCallbackFires: Story = {
  args: {
    children: 'クリック',
    onPress: fn(),
  },
  play: async ({ canvasElement, args }) => {
    // Arrange: クリック可能なボタン
    const button = within(canvasElement).getByRole('button', { name: 'クリック' });

    // Act
    await userEvent.click(button);

    // Assert
    await expect(args.onPress).toHaveBeenCalledOnce();
  },
};

/**
 * Enterキーでボタンが発火することを検証する（キーボードアクセシビリティ）。
 *
 * @summary Enterキーによるキーボード操作の確認
 */
export const KeyboardActivationEnter: Story = {
  args: {
    children: 'Enterキー',
    onPress: fn(),
  },
  play: async ({ canvasElement, args }) => {
    // Arrange: フォーカス可能なボタン
    within(canvasElement).getByRole('button', { name: 'Enterキー' });

    // Act: タブでフォーカス → Enterで実行
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    // Assert
    await expect(args.onPress).toHaveBeenCalledOnce();
  },
};

/**
 * スペースキーでボタンが発火することを検証する（ARIAボタン仕様準拠）。
 *
 * @summary スペースキーによるキーボード操作の確認
 */
export const KeyboardActivationSpace: Story = {
  args: {
    children: 'スペースキー',
    onPress: fn(),
  },
  play: async ({ canvasElement, args }) => {
    // Arrange: フォーカス可能なボタン
    within(canvasElement).getByRole('button', { name: 'スペースキー' });

    // Act: タブでフォーカス → Spaceで実行（ARIAボタン仕様）
    await userEvent.tab();
    await userEvent.keyboard(' ');

    // Assert
    await expect(args.onPress).toHaveBeenCalledOnce();
  },
};

/**
 * 操作不可状態のボタン。フォームバリデーション未通過時など、アクションが実行できない場面に使用する。
 *
 * @summary 操作を一時的に無効化する場合に使用する
 */
export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: '無効なボタン',
  },
  play: async ({ canvasElement }) => {
    // Arrange: disabled状態のボタン
    const button = within(canvasElement).getByRole('button', { name: '無効なボタン' });

    // Assert: react-aria-components は data-disabled と native disabled の両方を付与する
    await expect(button).toHaveAttribute('data-disabled');
    await expect(button).toHaveAttribute('disabled');
  },
};

/**
 * 無効状態ではクリックしても `onPress` が呼ばれないことを検証する。
 *
 * @summary 無効ボタンでのイベント非発火確認
 */
export const DisabledDoesNotFire: Story = {
  args: {
    isDisabled: true,
    children: '押せないボタン',
    onPress: fn(),
  },
  play: async ({ canvasElement, args }) => {
    // Arrange: disabled状態のボタン
    const button = within(canvasElement).getByRole('button', { name: '押せないボタン' });

    // Act: クリックを試みる
    await userEvent.click(button);

    // Assert: コールバックは呼ばれない
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};

/**
 * キーボードフォーカス時にフォーカスリングが表示されることを検証する（WCAG 2.4.7）。
 *
 * @summary キーボードフォーカス時の視覚フィードバック確認
 */
export const FocusVisible: Story = {
  args: {
    children: 'フォーカス確認',
  },
  play: async ({ canvasElement }) => {
    // Arrange: フォーカス可能なボタン
    const button = within(canvasElement).getByRole('button', { name: 'フォーカス確認' });

    // Act: キーボードでフォーカス
    await userEvent.tab();

    // Assert: キーボードフォーカス時に data-focus-visible が付与される
    await expect(button).toHaveAttribute('data-focus-visible');
  },
};
