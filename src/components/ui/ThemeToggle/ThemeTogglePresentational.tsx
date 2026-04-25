import { Moon, Sun } from 'lucide-react';

import { Button } from '../Button';

type ThemeTogglePresentationalProps = {
  /** 現在のテーマ（`"light"` | `"dark"`）。`next-themes` の `resolvedTheme` を渡す */
  resolvedTheme: string | undefined;
  /** ハイドレーション完了フラグ。`false` の間はフォーカス順序から除外する */
  mounted: boolean;
  /** テーマ切り替えボタンが押されたときのコールバック */
  onToggle: () => void;
};

/**
 * ライト/ダークモードを切り替えるトグルボタン。
 * ハイドレーション前（`mounted=false`）はCLSを防ぐためフォーカス順序から除外する。
 *
 * @summary テーマ切り替えUIに使用する
 */
export const ThemeTogglePresentational = ({
  resolvedTheme,
  mounted,
  onToggle,
}: ThemeTogglePresentationalProps) => {
  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="sm"
      onPress={onToggle}
      aria-label={
        mounted ? (isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え') : 'テーマ切り替え'
      }
      excludeFromTabOrder={!mounted}
    >
      {!mounted || isDark ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};
