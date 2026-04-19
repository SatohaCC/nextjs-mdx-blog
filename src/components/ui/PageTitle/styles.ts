import { css } from '../../../../styled-system/css';

// Page Title Styles
export const pageTitleStyles = css({
  fontSize: { base: '2xl', sm: '3xl' },
  fontWeight: '800',
  letterSpacing: 'tight',
  color: 'text.default',
  lineHeight: '1.2',
  mb: '6',
});

export const pageTitleWithSubtitleStyles = css({
  mb: '4',
});

// Subtitle Styles
export const subtitleStyles = css({
  color: 'text.muted',
  fontSize: { base: 'sm', sm: 'lg' },
  fontWeight: 'medium',
  mt: '-4',
});
