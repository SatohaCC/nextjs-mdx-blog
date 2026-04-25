import { css, cva } from '../../../../../../styled-system/css';
import { stack } from '../../../../../../styled-system/patterns';

// Card Recipe
export const articleCardRecipe = cva({
  base: {
    height: 'full',
    display: 'flex',
    flexDirection: 'column',
    py: { base: '4', sm: '6' },
    px: '6',
    borderRadius: 'card',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border.default',
    bg: 'bg.default',
    transitionProperty: 'border-color, transform, box-shadow',
    transitionDuration: 'slow',
    boxShadow: { base: 'none', sm: 'card.default' },
    position: 'relative',

    _before: {
      content: '""',
      position: 'absolute',
      inset: 0,
      bg: 'takenoko.bamboo.400',
      opacity: 0,
      zIndex: 'hide',
      transformOrigin: 'center',
      transitionProperty: 'transform, opacity',
      transitionDuration: 'normal',
      transitionTimingFunction: 'spring',
      borderRadius: 'inherit',
      pointerEvents: 'none',
    },

    _hover: {
      borderColor: { sm: 'accent.default' },
      boxShadow: { sm: 'card.hover' },
      _before: {
        opacity: 0.4,
        transform: 'rotate(-10deg) scale(1.05)',
      },
    },
  },
});

// Typography Styles
export const titleLinkStyles = css({
  _after: {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: '0',
  },
});

export const titleStyles = css({
  textStyle: 'h3',
  fontSize: { base: 'lg', sm: 'xl' }, // h3 (xl) をベースに、モバイルでは lg に上書き
  color: 'text.default',
  lineClamp: 2,
});

export const dateStyles = css({
  textStyle: 'bodyS',
  color: 'text.muted',
});

export const excerptStyles = css({
  textStyle: 'body',
  color: 'text.muted',
  lineClamp: 3,
});

export const articleStackStyles = stack({ gap: '2' });
