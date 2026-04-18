import { css, cva } from '../../../../../../styled-system/css';

export const tocContainerStyles = css({
  mb: '12',
  py: '4',
});

export const tocHeadingStyles = css({
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
