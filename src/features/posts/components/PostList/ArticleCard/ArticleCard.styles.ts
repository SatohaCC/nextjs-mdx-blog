import { css, cx } from '../../../../../../styled-system/css';
import { stack } from '../../../../../../styled-system/patterns';
import { bambooHover } from '../../../../../../styled-system/recipes';

// Card Styles
export const articleCardStyles = cx(
  bambooHover(),
  css({
    height: 'full',
    display: 'flex',
    flexDirection: 'column',
    py: { base: '4', sm: '6' },
    px: '6',
    borderRadius: 'card',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border.default',
    transitionProperty: 'border-color, transform, box-shadow',
    transitionDuration: 'slow',
    boxShadow: { base: 'none', sm: 'card.default' },
    position: 'relative',
    bg: 'bg.default',

    _hover: {
      borderColor: 'accent.default',
      boxShadow: 'card.hover',
    },

    // stretched link パターン: a:focus-visible が内側にあるときカード全体にフォーカスリングを表示
    '&:has(a:focus-visible)': {
      outline: '2px solid',
      outlineColor: 'accent.focusRing',
      outlineOffset: '2px',
    },
  })
);

// Typography Styles
export const titleLinkStyles = css({
  // カード全体のフォーカスリングに委譲するため、テキストレベルのリングは非表示
  _focusVisible: { outline: 'none' },
  _after: {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: '0',
  },
});

export const titleStyles = css({
  textStyle: 'h3',
  fontSize: { base: 'lg', sm: 'xl' }, // h3 (xl) をベースに、モバイルでは lg に上書き
  color: 'text.default',
  lineClamp: 2,
});

export const dateStyles = css({
  textStyle: 'bodyS',
  color: 'text.muted',
});

export const excerptStyles = css({
  textStyle: 'body',
  color: 'text.muted',
  lineClamp: 3,
});

export const articleStackStyles = stack({ gap: '2' });
