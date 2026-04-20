import { css } from '../../../../../../styled-system/css';
import { stack } from '../../../../../../styled-system/patterns';

// Card Base Styles
export const articleCardStyles = css({
  py: { base: '4', sm: '6' },
  px: { base: '0', sm: '6' },
  borderRadius: { base: 'none', sm: 'card' },
  borderWidth: { base: '0', sm: '1px' },
  borderStyle: 'solid',
  borderColor: 'border.default',
  bg: { base: 'transparent', sm: 'bg.default' },
  transitionProperty: 'border-color, transform, box-shadow',
  transitionDuration: 'slow',
  boxShadow: { base: 'none', sm: 'card.default' },
  _hover: {
    borderColor: { sm: 'accent.default' },
    transform: { sm: 'translateY(-4px)' },
    boxShadow: { sm: 'card.hover' },
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
