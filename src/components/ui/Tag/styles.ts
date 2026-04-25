import { css } from '../../../../styled-system/css';

// Tag Base Styles
export const tagStyles = css({
  display: 'inline-flex',
  alignItems: 'center',
  px: '3',
  py: '1',
  borderRadius: 'full',
  fontSize: 'xs',
  fontWeight: 'semibold',
  bg: 'bg.muted',
  border: '1px solid',
  borderColor: 'border.muted',
  color: 'text.muted',
  position: 'relative',
  zIndex: '1',

  transitionProperty: 'all',
  transitionDuration: 'medium',
  transitionTimingFunction: 'standard',
  textDecoration: 'none',
  cursor: 'pointer',
  _hover: {
    borderColor: 'accent.default',
    color: 'accent.default',
    bg: 'bg.default',
    transform: 'translateY(-1px)',
    boxShadow: 'sm',
  },
  '&[data-clickable="false"]': {
    cursor: 'default',
    _hover: {
      borderColor: 'border.muted',
      color: 'text.muted',
      bg: 'bg.muted',
      transform: 'none',
      boxShadow: 'none',
    },
  },
});

// Tag List Styles
export const tagListStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
});
