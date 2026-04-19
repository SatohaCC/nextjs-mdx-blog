import { css } from '../../../../../styled-system/css';

export const searchFormStyles = css({ display: { base: 'none', md: 'flex' }, alignItems: 'center', gap: '2' });

export const searchContainerStyles = css({
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
  _hover: {
    bg: 'overlay.light',
  },
  _focusWithin: {
    bg: 'bg.default',
    borderColor: 'accent.default',
    boxShadow: 'sm',
    w: 'searchBoxExpanded',
  },
  w: 'searchBox',
});

export const searchIconStyles = css({ color: 'text.muted', mr: '2', flexShrink: 0 });

export const searchInputStyles = css({
  bg: 'transparent',
  border: 'none',
  outline: 'none',
  fontSize: 'sm',
  color: 'text.default',
  flex: 1,
  w: 'full',
  _placeholder: { color: 'text.muted' },
});
