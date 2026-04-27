import { css } from '../../../../../styled-system/css';

export const articleListStyles = css({
  display: 'grid',
  gap: '6',
  gridTemplateColumns: {
    base: '1fr',
    md: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
});

export const hitCountStyles = css({
  color: 'text.muted',
  fontSize: 'sm',
  fontWeight: 'medium',
  mb: '6',
});

export const emptyStateStyles = css({
  bg: 'bg.muted',
  borderRadius: 'xl',
  color: 'text.muted',
  py: '12',
  textAlign: 'center',
});
