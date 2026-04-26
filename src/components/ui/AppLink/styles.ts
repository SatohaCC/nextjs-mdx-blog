import { css, cx } from '../../../../styled-system/css';
import { focusRing } from '../../../../styled-system/recipes';

export const appLinkStyles = cx(
  focusRing(),
  css({
    textDecoration: 'none',
    color: 'inherit',
    transitionProperty: 'color',
    transitionDuration: 'normal',
    _hover: {
      color: 'accent.default',
    },
  })
);
