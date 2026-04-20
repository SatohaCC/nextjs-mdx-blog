import { css } from '../../../../../styled-system/css';

export const articleListStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: { base: '0', sm: '6' },
  '& > article:not(:first-child)': {
    _smDown: {
      borderTop: '1px solid',
      borderTopColor: 'border.muted',
    },
  },
});
