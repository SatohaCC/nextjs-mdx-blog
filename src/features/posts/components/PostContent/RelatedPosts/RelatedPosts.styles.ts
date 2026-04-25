import { css, cx } from '../../../../../../styled-system/css';
import { grid } from '../../../../../../styled-system/patterns';
import { sectionHeadingBaseStyles } from '../../../../../styles/common.styles';

export const relatedPostsContainerStyles = css({
  mt: '12',
  pt: '8',
  borderTop: '1px solid',
  borderColor: 'border.default',
});

export const relatedPostsHeadingStyles = cx(
  sectionHeadingBaseStyles,
  css({ fontSize: 'lg', mb: '6' })
);

export const relatedPostsGridStyles = grid({ columns: { base: 1, sm: 3 }, gap: '4' });

export const relatedPostCardStyles = css({
  display: 'block',
  p: '4',
  borderRadius: 'lg',
  border: '1px solid',
  borderColor: 'border.default',
  textDecoration: 'none',
  transitionProperty: 'border-color, transform, box-shadow',
  transitionDuration: 'slow',
  _hover: {
    borderColor: 'accent.default',
    transform: 'translateY(-2px)',
    boxShadow: 'md',
  },
});

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
