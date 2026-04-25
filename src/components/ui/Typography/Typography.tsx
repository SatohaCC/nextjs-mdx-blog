import React from 'react';

import { cx } from '../../../../styled-system/css';
import { type RecipeVariantProps } from '../../../../styled-system/types';
import { typographyStyles } from './Typography.styles';

type TypographyVariants = RecipeVariantProps<typeof typographyStyles>;

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
} & TypographyVariants &
  Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

const TAG_MAP: Record<string, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  code: 'code',
};

/**
 * デザインシステムのタイポグラフィルールを適用するためのポリモーフィックコンポーネント。
 * variant によって見た目を制御し、as によって HTML タグを制御します。
 */
export const Typography = <T extends React.ElementType = 'p'>({
  as,
  variant,
  textColor,
  className,
  children,
  ...props
}: TypographyProps<T>) => {
  const Component = as || (variant && TAG_MAP[variant as string]) || 'p';

  return (
    <Component className={cx(typographyStyles({ variant, textColor }), className)} {...props}>
      {children}
    </Component>
  );
};
