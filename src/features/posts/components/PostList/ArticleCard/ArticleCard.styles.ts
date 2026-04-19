import { css } from '../../../../../../styled-system/css';
import { stack } from '../../../../../../styled-system/patterns';

// Card Base Styles
export const articleCardStyles = css({
  p: { base: '4', sm: '6' },
  borderRadius: 'card',
  border: '1px solid',
  borderColor: 'border.default',
  bg: 'bg.default',
  transitionProperty: 'border-color, transform, box-shadow',
  transitionDuration: 'slow',
  boxShadow: 'card.default',
  _hover: {
    borderColor: 'accent.default',
    transform: 'translateY(-4px)',
    boxShadow: 'card.hover',
  },
});

// Typography Styles
export const titleStyles = css({
  fontSize: { base: 'xl', sm: '2xl' },
  fontWeight: 'bold',
  color: 'text.default',
});

export const dateStyles = css({
  color: 'text.muted',
  fontSize: 'sm',
});

export const excerptStyles = css({
  color: 'text.muted',
});

export const articleStackStyles = stack({ gap: '2' });
