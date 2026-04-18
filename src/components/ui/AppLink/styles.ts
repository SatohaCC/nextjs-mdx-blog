import { css } from '../../../../styled-system/css';

export const appLinkStyles = css({
  textDecoration: 'none',
  color: 'inherit',
  transitionProperty: 'color',
  transitionDuration: 'normal',
  outline: 'none',
  _hover: {
    color: 'accent.default',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'accent.focusRing',
    outlineOffset: '2px',
  },
});
