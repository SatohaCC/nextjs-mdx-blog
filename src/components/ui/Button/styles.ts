import { css } from '../../../../styled-system/css';

// Button Base Styles
export const buttonStyles = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2',
  borderRadius: 'button',
  fontWeight: 'medium',
  cursor: 'pointer',
  transitionProperty: 'background-color, color, border-color, opacity',
  transitionDuration: 'normal',
  border: 'none',
  outline: 'none',
  '&[data-focus-visible]': {
    outline: '2px solid',
    outlineColor: 'accent.focusRing',
    outlineOffset: '2px',
  },
  '&[data-disabled]': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

// Button Variant Styles
export const variantStyles = {
  primary: css({
    bg: 'accent.solid',
    color: 'text.onAccent',
    _hover: { opacity: 0.9 },
  }),
  outline: css({
    bg: 'transparent',
    border: '1px solid',
    borderColor: 'border.default',
    color: 'text.default',
    _hover: { bg: 'bg.subtle' },
  }),
  ghost: css({
    bg: 'transparent',
    color: 'text.default',
    _hover: { bg: 'bg.subtle' },
  }),
  'ghost-accent': css({
    bg: 'transparent',
    color: 'accent.default',
    _hover: { bg: 'bg.subtle' },
  }),
} satisfies Record<string, string>;

// Button Size Styles
export const sizeStyles = {
  sm: css({ px: '3', py: '2', fontSize: 'sm' }),
  md: css({ px: '4', py: '2', fontSize: 'md' }),
  lg: css({ px: '6', py: '3', fontSize: 'lg' }),
} satisfies Record<string, string>;
