import { css, cx } from '../../../../../styled-system/css';
import { focusRing } from '../../../../../styled-system/recipes';

export const searchFormStyles = css({
  display: { base: 'none', md: 'flex' },
  alignItems: 'center',
});

export const searchContainerStyles = cx(
  focusRing(),
  css({
    display: 'flex',
    alignItems: 'center',
    bg: 'overlay.subtle',
    borderRadius: 'full',
    px: '4',
    py: '2',
    border: '1px solid',
    borderColor: 'transparent',
    transitionProperty: 'all',
    transitionDuration: 'medium',
    transitionTimingFunction: 'standard',
    w: 'searchBox',
    _hover: {
      bg: 'overlay.light',
    },
    _focusWithin: {
      bg: 'bg.default',
      borderColor: 'accent.default',
      boxShadow: 'sm',
      w: 'searchBoxExpanded',
      outline: '2px solid',
      outlineColor: 'accent.focusRing',
      outlineOffset: '2px',
    },
  })
);

export const searchIconStyles = css({ color: 'text.muted', mr: '2', flexShrink: 0 });

export const searchInputStyles = css({
  bg: 'transparent',
  border: 'none',
  outline: 'none !important',
  fontSize: 'sm',
  color: 'text.default',
  flex: 1,
  w: 'full',
  _placeholder: { color: 'text.muted' },
  _focus: { outline: 'none !important', boxShadow: 'none' },
  _focusVisible: { outline: 'none !important', boxShadow: 'none' },
});

export const searchClearButtonStyles = css({
  color: 'text.muted',
  cursor: 'pointer',
  p: '1',
  borderRadius: 'full',
  transition: 'all',
  _hover: {
    color: 'text.default',
    bg: 'bg.muted',
  },
  _pressed: {
    transform: 'scale(0.9)',
  },
});
