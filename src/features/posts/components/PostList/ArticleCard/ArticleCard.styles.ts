import { css, cx } from '../../../../../../styled-system/css';
import { stack } from '../../../../../../styled-system/patterns';
import { HoverStyle } from '../../../../../styles/animations.styles';

// Card Base Styles
export const articleCardStyles = cx(
  HoverStyle(),
  css({
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

    _hover: {
      borderColor: { sm: 'accent.default' },
      transform: { sm: 'none' },
      boxShadow: { sm: 'card.hover' },
    },
  })
);

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
  fontSize: { base: 'lg', sm: 'xl' },
  fontWeight: 'bold',
  color: 'text.default',
  lineClamp: 2,
});

export const dateStyles = css({
  color: 'text.muted',
  fontSize: 'sm',
});

export const excerptStyles = css({
  color: 'text.muted',
  lineClamp: 3,
});

export const articleStackStyles = stack({ gap: '2' });
