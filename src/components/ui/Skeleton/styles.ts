import { css } from '../../../../styled-system/css';

export const skeletonStyles = css({
  bg: 'bg.subtle',
  borderRadius: 'sm',
  backgroundImage:
    'linear-gradient(90deg, token(colors.bg.subtle) 25%, token(colors.bg.muted) 50%, token(colors.bg.subtle) 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite linear',
});
