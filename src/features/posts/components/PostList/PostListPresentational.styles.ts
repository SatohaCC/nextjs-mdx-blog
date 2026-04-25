import { css } from '../../../../../styled-system/css';

export const articleListStyles = css({
  display: 'grid',
  gridTemplateColumns: {
    base: '1fr',
    md: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
  gap: '6',
});
