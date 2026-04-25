'use client';

import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';

import { cx } from '../../../../styled-system/css';
import { buttonStyles, sizeStyles, variantStyles } from './styles';

export interface ButtonProps extends AriaButtonProps {
  /** 視覚スタイルのバリアント。デフォルトは `primary` */
  variant?: keyof typeof variantStyles;
  /** ボタンのサイズ。デフォルトは `md` */
  size?: keyof typeof sizeStyles;
  /** 追加のCSSクラス名 */
  className?: string;
  /** フォーカス順序を制御するタブインデックス */
  tabIndex?: number;
}

/**
 * インタラクション用の汎用ボタンコンポーネント。
 * ページ遷移には使用せず、ナビゲーションには AppLink を使用してください。
 *
 * @summary ページ遷移を伴わないユーザー操作に使用する
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  tabIndex,
  ...props
}: ButtonProps) => {
  const excludeFromTabOrder = props.excludeFromTabOrder || tabIndex === -1;

  return (
    <AriaButton
      {...props}
      excludeFromTabOrder={excludeFromTabOrder}
      className={cx(buttonStyles, variantStyles[variant], sizeStyles[size], className)}
    />
  );
};
