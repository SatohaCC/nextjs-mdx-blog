import { css } from '../../../../styled-system/css';

export const skipLinkStyles = css({
  position: 'absolute',
  top: '-100px',
  left: '4',
  zIndex: 'skipLink',
  bg: 'accent.solid',
  color: 'text.onAccent',
  px: '4',
  py: '2',
  borderRadius: 'md',
  fontWeight: 'bold',
  textDecoration: 'none',
  transitionProperty: 'top',
  transitionDuration: 'medium',

  _focusVisible: {
    top: '4',
    outline: '2px solid',
    outlineColor: 'accent.focusRing',
    outlineOffset: '2px',
  },
});
