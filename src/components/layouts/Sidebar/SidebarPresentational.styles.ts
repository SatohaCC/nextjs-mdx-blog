import { css } from '../../../../styled-system/css';
import { stack } from '../../../../styled-system/patterns';

export const sidebarContainerStyles = stack({ gap: '10', position: 'sticky', top: '24' });

export const sectionHeadingStyles = css({
  fontSize: 'md',
  fontWeight: 'bold',
  mb: '4',
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

export const postListStyles = stack({ gap: '4', listStyle: 'none', p: 0 });

export const postLinkStyles = css({
  display: 'block',
  fontSize: 'sm',
  color: 'text.default',
  fontWeight: 'medium',
  lineHeight: 'tight',
  transitionProperty: 'color',
  transitionDuration: 'normal',
  _hover: { color: 'accent.default' },
});

export const postDateStyles = css({ fontSize: 'xs', color: 'text.muted' });

export const tagContainerStyles = css({ pt: '1' });
