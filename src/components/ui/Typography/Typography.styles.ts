import { css } from '../../../../styled-system/css';
import { stack } from '../../../../styled-system/patterns';

export const containerStyles = css({ maxW: '4xl', color: 'text.default' });
export const pageTitleStyles = css({ fontSize: '4xl', fontWeight: 'black', mb: '8' });

export const sectionTitleStyles = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  mb: '4',
  mt: '12',
  pb: '2',
  borderBottom: '1px solid',
  borderColor: 'border.default',
  color: 'text.default',
});

export const labelStyles = css({
  display: 'inline-block',
  minW: '160px',
  fontSize: 'xs',
  color: 'text.muted',
  fontFamily: 'mono',
  flexShrink: 0,
});

// 静的に定義することで Lint エラーを回避
export const headingStyles = {
  h1: css({ fontSize: 'heading.h1', lineHeight: 'heading', fontWeight: 'bold' }),
  h2: css({ fontSize: 'heading.h2', lineHeight: 'heading', fontWeight: 'bold' }),
  h3: css({ fontSize: 'heading.h3', lineHeight: 'heading', fontWeight: 'bold' }),
  h4: css({ fontSize: 'heading.h4', lineHeight: 'heading', fontWeight: 'bold' }),
  h5: css({ fontSize: 'heading.h5', lineHeight: 'heading', fontWeight: 'bold' }),
  h6: css({ fontSize: 'heading.h6', lineHeight: 'heading', fontWeight: 'bold' }),
} as const;

export const bodyStyles = {
  large: css({ fontSize: 'body.large', lineHeight: 'body' }),
  base: css({ fontSize: 'body.base', lineHeight: 'body' }),
  small: css({ fontSize: 'body.small', lineHeight: 'body' }),
  xs: css({ fontSize: 'body.xs', lineHeight: 'body' }),
} as const;

export const fontFamilyStyles = {
  sans: css({ fontFamily: 'sans', fontSize: 'xl' }),
  mono: css({ fontFamily: 'mono', fontSize: 'xl' }),
  serif: css({ fontFamily: 'serif', fontSize: 'xl' }),
} as const;

export const fontWeightStyles = {
  thin: css({ fontWeight: 'thin', fontSize: 'xl' }),
  light: css({ fontWeight: 'light', fontSize: 'xl' }),
  normal: css({ fontWeight: 'normal', fontSize: 'xl' }),
  medium: css({ fontWeight: 'medium', fontSize: 'xl' }),
  semibold: css({ fontWeight: 'semibold', fontSize: 'xl' }),
  bold: css({ fontWeight: 'bold', fontSize: 'xl' }),
  extrabold: css({ fontWeight: 'extrabold', fontSize: 'xl' }),
  black: css({ fontWeight: 'black', fontSize: 'xl' }),
} as const;

export const letterSpacingStyles = {
  tighter: css({ letterSpacing: 'tighter', fontSize: 'xl', fontWeight: 'medium' }),
  tight: css({ letterSpacing: 'tight', fontSize: 'xl', fontWeight: 'medium' }),
  normal: css({ letterSpacing: 'normal', fontSize: 'xl', fontWeight: 'medium' }),
  wide: css({ letterSpacing: 'wide', fontSize: 'xl', fontWeight: 'medium' }),
  wider: css({ letterSpacing: 'wider', fontSize: 'xl', fontWeight: 'medium' }),
  widest: css({ letterSpacing: 'widest', fontSize: 'xl', fontWeight: 'medium' }),
} as const;

export const rowStyles = stack({
  direction: { base: 'column', md: 'row' },
  align: { md: 'baseline' },
  gap: '2',
});

export const itemStackStyles = stack({ gap: '6' });
export const weightStackStyles = stack({ gap: '4' });
