import { css } from '../../../../styled-system/css';
import { flex } from '../../../../styled-system/patterns';

export const footerContainerStyles = css({
  py: '6',
  fontSize: 'xs',
  color: 'text.muted',
  borderTop: '1px solid',
  borderColor: 'border.muted',
  mt: '12',
});

export const footerInnerStyles = flex({ direction: 'column', align: 'center', gap: '4' });

export const footerNavStyles = flex({ gap: '6' });

export const footerLinkStyles = css({
  color: 'text.muted',
  _hover: { color: 'text.default' },
});
