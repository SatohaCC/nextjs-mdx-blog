import { css } from '../../../../../styled-system/css';
import { stack } from '../../../../../styled-system/patterns';

export const tagPageContainerStyles = stack({ gap: '8' });

export const backToHomeLinkStyles = css({
  display: 'inline-block',
  color: 'link.default',
  _hover: { color: 'link.hover' },
});
