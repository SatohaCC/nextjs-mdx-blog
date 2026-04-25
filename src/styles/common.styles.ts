import { css } from '../../styled-system/css';

export const sectionHeadingBaseStyles = css({
  fontWeight: 'bold',
  color: 'text.default',
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  _before: {
    content: '""',
    w: 'accentBar',
    h: '1em',
    bg: 'accent.default',
    borderRadius: 'full',
  },
});
