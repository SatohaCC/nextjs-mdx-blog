import { css, cx } from '../../../../styled-system/css';
import { stack } from '../../../../styled-system/patterns';
import { bambooHover, focusRing, sectionHeading } from '../../../../styled-system/recipes';

export const sidebarContainerStyles = stack({ gap: '10', position: 'sticky', top: '24' });

export const sectionHeadingStyles = cx(sectionHeading(), css({ fontSize: 'md', mb: '4' }));

export const postListStyles = stack({ gap: '2', listStyle: 'none', p: 0 });

export const postItemStyles = cx(
  bambooHover(),
  css({
    borderRadius: 'md',
    p: '2',
    transitionProperty: 'background-color',
    transitionDuration: 'normal',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    _hover: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'border.default',
      boxShadow: 'card.hover',
      bg: 'bg.default',
    },
  })
);

export const postLinkStyles = cx(
  focusRing(),
  css({
    display: 'block',
    fontSize: 'sm',
    color: 'text.default',
    fontWeight: 'medium',
    lineHeight: 'tight',
    transitionProperty: 'color',
    transitionDuration: 'normal',
    _hover: { color: 'accent.default' },
    _after: {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: '0',
    },
  })
);

export const postDateStyles = css({ fontSize: 'xs', color: 'text.muted' });

export const tagContainerStyles = css({ pt: '1' });
