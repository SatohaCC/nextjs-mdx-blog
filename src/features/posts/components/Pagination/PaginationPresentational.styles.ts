import { css, cva } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';

export const paginationLinkStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: '2',
  borderRadius: 'full',
  bg: 'bg.muted',
  color: 'text.default',
  cursor: 'pointer',
  transitionProperty: 'background-color, border-color, color, box-shadow',
  transitionDuration: 'slow',
  transitionTimingFunction: 'standard',
  textDecoration: 'none',
  border: '1px solid',
  borderColor: 'border.muted',
  _hover: {
    bg: 'bg.default',
    borderColor: 'accent.default',
    color: 'accent.default',
    boxShadow: 'card.default',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'accent.focusRing',
    outlineOffset: '2px',
  },
});

export const pageNumberRecipe = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minW: '10',
    h: '10',
    borderRadius: 'full',
    fontWeight: 'semibold',
    fontSize: 'sm',
    cursor: 'pointer',
    textDecoration: 'none',
    transitionProperty: 'background-color, border-color, color, box-shadow',
    transitionDuration: 'slow',
    border: '1px solid',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'accent.focusRing',
      outlineOffset: '2px',
    },
  },
  variants: {
    active: {
      true: {
        bg: 'accent.default',
        color: 'bg.default',
        borderColor: 'accent.default',
      },
      false: {
        bg: 'transparent',
        color: 'text.muted',
        borderColor: 'transparent',
        _hover: {
          bg: 'bg.muted',
          color: 'text.default',
          borderColor: 'border.muted',
        },
      },
    },
  },
});

export const mobileIndicatorStyles = css({
  display: { base: 'flex', sm: 'none' },
  alignSelf: 'center',
  px: '2',
  fontSize: 'sm',
  color: 'text.default',
});

export const ellipsisStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: '3',
  py: '2',
  color: 'text.muted',
});

export const disabledStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: '3',
  borderRadius: 'full',
  color: 'text.muted',
  bg: 'transparent',
  border: '1px solid',
  borderColor: 'border.muted',
  opacity: 0.4,
  cursor: 'not-allowed',
});

export const paginationNavStyles = flex({
  justify: 'center',
  gap: '2',
  mt: '8',
});

export const pageNumbersStyles = flex({
  gap: '1',
  display: { base: 'none', sm: 'flex' },
});
