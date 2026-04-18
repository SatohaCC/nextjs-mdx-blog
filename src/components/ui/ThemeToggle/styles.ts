import { css } from '../../../../styled-system/css';

export const themeToggleStyles = css({
  position: 'relative',
  w: '10',
  h: '10',
  p: '0',
  borderRadius: 'full',
  cursor: 'pointer',
  transitionProperty: 'background-color, transform',
  transitionDuration: 'slow',
  transitionTimingFunction: 'standard',
  _hover: {
    bg: 'bg.subtle',
    scale: '1.05',
  },
  '& svg': {
    transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, transform',
    transitionDuration: 'slowest',
    transitionTimingFunction: 'standard',
  },
  '&:hover svg': {
    transform: 'rotate(15deg)',
  },
});
