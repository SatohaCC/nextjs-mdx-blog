import { css } from '../../../../styled-system/css';
import { flex } from '../../../../styled-system/patterns';

export const statusPageWrapperStyles = flex({
  direction: 'column',
  align: 'center',
  justify: 'center',
  gap: '6',
  py: '24',
  textAlign: 'center',
});

export const statusPageStatusStyles = css({
  fontSize: { base: '5xl', sm: '7xl' },
  fontWeight: 'extrabold',
  color: 'accent.default',
  lineHeight: 'none',
});

export const statusPageTitleStyles = css({
  fontSize: { base: 'xl', sm: '2xl' },
  fontWeight: 'bold',
  color: 'text.default',
});

export const statusPageDescStyles = css({
  color: 'text.muted',
  fontSize: 'md',
});

export const statusPageActionsStyles = flex({
  direction: 'column',
  align: 'center',
  gap: '4',
});

export const statusPageLinkStyles = css({
  fontSize: 'sm',
  fontWeight: 'semibold',
  color: 'accent.default',
  _hover: { color: 'accent.hover' },
});
