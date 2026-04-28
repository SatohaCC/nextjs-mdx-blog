import { css } from '../../../../styled-system/css';

export const imageContainerStyles = css({
  my: '8',
  position: 'relative',
  display: 'block',
  mx: 'auto', // 中央寄せ
  w: 'fit-content', // 画像の幅に合わせる
  maxW: 'full',
  overflow: 'hidden',
  borderRadius: 'card',
  transition: 'transform 0.2s ease-in-out',
  _hover: {
    transform: 'scale(1.01)',
  },
});

export const imageStyles = css({
  maxW: 'full',
  h: 'auto',
  display: 'block',
});

export const captionStyles = css({
  mt: '3',
  display: 'block',
  fontSize: 'xs',
  color: 'text.muted',
  textAlign: 'center',
  fontStyle: 'italic',
});
