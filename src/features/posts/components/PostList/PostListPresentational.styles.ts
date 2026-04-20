import { css } from '../../../../../styled-system/css';

export const articleListStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: { base: '0', sm: '6' },
  '& > article:not(:first-child)': {
    borderTop: { base: '1px solid', sm: 'none' },
    borderTopColor: 'border.muted',
  },
});
