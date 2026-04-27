import { css, cx } from '../../../../../../styled-system/css';
import { grid } from '../../../../../../styled-system/patterns';
import { bambooHover, sectionHeading } from '../../../../../../styled-system/recipes';

export const relatedPostsContainerStyles = css({
  mt: '12',
  pt: '8',
  borderTop: '1px solid',
  borderColor: 'border.default',
});

export const relatedPostsHeadingStyles = cx(sectionHeading(), css({ fontSize: 'lg', mb: '6' }));

export const relatedPostsGridStyles = grid({ columns: { base: 1, sm: 3 }, gap: '4' });

export const relatedPostCardStyles = cx(
  bambooHover(),
  css({
    display: 'block',
    p: '4',
    borderRadius: 'md',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border.default',

    bg: 'bg.default',
    transitionProperty: 'border-color, transform, box-shadow',
    transitionDuration: 'slow',
    boxShadow: { base: 'none', sm: 'card.default' },
    _hover: {
      borderColor: 'accent.default',
      transform: { sm: 'none' },
      boxShadow: { sm: 'card.hover' },
    },
  })
);

export const relatedPostTitleStyles = css({
  fontSize: 'sm',
  fontWeight: 'semibold',
  color: 'text.default',
  lineHeight: 'snug',
  mb: '2',
  lineClamp: 2,
});

export const relatedPostDateStyles = css({
  fontSize: 'xs',
  color: 'text.muted',
});
