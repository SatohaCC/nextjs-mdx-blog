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
  /** スクリーンリーダーからボタンを隠す場合に使用 */
  'aria-hidden'?: boolean | 'true' | 'false';
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
  'aria-hidden': ariaHidden,
  ...props
}: ButtonProps) => {
  const isHidden = ariaHidden === 'true' || ariaHidden === true;

  // react-aria-components の Button は tabIndex を直接プロパティとして取らないため、
  // 代わりに excludeFromTabOrder を使用してフォーカス順序を制御します。
  const excludeFromTabOrder = props.excludeFromTabOrder || isHidden || tabIndex === -1;

  const button = (
    <AriaButton
      {...props}
      excludeFromTabOrder={excludeFromTabOrder}
      className={cx(buttonStyles, variantStyles[variant], sizeStyles[size], className)}
    />
  );

  // RACはaria-hiddenをDOMに伝播しないため、trueの場合はspanでラップするワークアラウンドを適用
  if (isHidden) {
    return (
      <span aria-hidden="true" style={{ display: 'contents' }}>
        {button}
      </span>
    );
  }

  return button;
};
