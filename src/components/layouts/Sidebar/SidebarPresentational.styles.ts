import { css, cx } from '../../../../styled-system/css';
import { stack } from '../../../../styled-system/patterns';
import { HoverStyle } from '../../../styles/animations.styles';
import { sectionHeadingBaseStyles } from '../../../styles/common.styles';

export const sidebarContainerStyles = stack({ gap: '10', position: 'sticky', top: '24' });

export const sectionHeadingStyles = cx(sectionHeadingBaseStyles, css({ fontSize: 'md', mb: '4' }));

export const postListStyles = stack({ gap: '2', listStyle: 'none', p: 0 });

export const postItemStyles = cx(
  HoverStyle(),
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
      bg: 'bg.default',
    },
  })
);

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
