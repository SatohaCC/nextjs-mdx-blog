import { css, cva, cx } from '../../../../../../styled-system/css';
import { sectionHeadingBaseStyles } from '../../../../../styles/common.styles';

export const tocContainerStyles = css({
  mb: '12',
  py: '4',
});

export const tocHeadingStyles = cx(sectionHeadingBaseStyles, css({ fontSize: 'md', mb: '4' }));

export const tocListStyles = css({ listStyle: 'none', p: 0, m: 0 });

export const tocItemRecipe = cva({
  base: {
    py: '1',
  },
  variants: {
    level: {
      2: { pl: '0' },
      3: { pl: '4' },
    },
  },
});

export const tocLinkRecipe = cva({
  base: {
    color: 'text.muted',
    textDecoration: 'none',
    transitionProperty: 'color',
    transitionDuration: 'normal',
    _hover: { color: 'accent.default' },
  },
  variants: {
    level: {
      2: { fontSize: 'md' },
      3: { fontSize: 'sm' },
    },
  },
});
