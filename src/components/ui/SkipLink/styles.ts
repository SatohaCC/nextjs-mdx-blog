import { css, cx } from '../../../../styled-system/css';
import { focusRing } from '../../../../styled-system/recipes';

export const skipLinkStyles = cx(
  focusRing(),
  css({
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
    },
  })
);
