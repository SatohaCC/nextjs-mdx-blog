import { css } from '../../styled-system/css';
import { container } from '../../styled-system/patterns';

export const bodyStyles = css({
  bg: 'bg.default',
  color: 'text.default',
  transitionProperty: 'background-color, color',
  transitionDuration: 'normal',
});

export const pageWrapperStyles = css({
  minH: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

export const mainContentLayoutStyles = container({
  flex: 1,
  w: 'full',
  py: { base: '6', lg: '8' },
  display: 'flex',
  flexDirection: { base: 'column', lg: 'row' },
  gap: '12',
});

export const mainStyles = css({
  flex: 1,
  minW: 0,

  w: 'full',
});

export const sidebarWrapperStyles = css({
  w: { lg: 'sidebar' },
  display: { base: 'none', lg: 'block' },
});
