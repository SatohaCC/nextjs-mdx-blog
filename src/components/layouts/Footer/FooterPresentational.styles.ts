import { css } from '../../../../styled-system/css';
import { flex } from '../../../../styled-system/patterns';

export const footerContainerStyles = css({
  py: { base: '4', sm: '6' },
  fontSize: 'xs',
  color: 'text.muted',
  borderTop: '1px solid',
  borderColor: 'border.muted',
  mt: { base: '8', sm: '12' },
});

export const footerInnerStyles = flex({ direction: 'column', align: 'center', gap: '4' });

export const footerNavStyles = flex({ gap: '6', display: { base: 'none', sm: 'flex' } });

export const footerLinkStyles = css({
  color: 'text.muted',
  _hover: { color: 'text.default' },
});
