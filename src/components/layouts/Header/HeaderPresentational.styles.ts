import { css, cx } from '../../../../styled-system/css';
import { container, flex } from '../../../../styled-system/patterns';
import { focusRing, glassmorphism } from '../../../../styled-system/recipes';

export const headerContainerStyles = cx(
  glassmorphism(),
  css({
    borderBottom: '1px solid',
    borderColor: 'border.muted',
    py: '4',
    px: { base: '6', lg: '8' },
    position: 'sticky',
    top: 0,
    zIndex: 'sticky',
  })
);

export const headerInnerStyles = cx(
  container(),
  flex({
    justify: 'space-between',
    align: 'center',
    // すでに container パターンで px が設定されているため、
    // ヘッダー内部ではそれ以上の px 指定を解除（または上書き）して、
    // レイアウトの一貫性を保つ。
    px: 0,
  })
);

export const logoStyles = cx(
  focusRing(),
  css({
    fontSize: { base: 'lg', sm: 'xl' },
    fontWeight: 'extrabold',
    letterSpacing: 'tighter',
    color: 'text.default',
    _hover: { color: 'accent.default' },
  })
);

export const navContainerStyles = flex({ gap: { base: '2', sm: '4' }, align: 'center' });

export const navLinkStyles = cx(
  focusRing(),
  css({
    fontSize: 'sm',
    fontWeight: 'semibold',
    color: 'text.default',
    _hover: { color: 'accent.default' },
  })
);

export const iconButtonStyles = cx(
  focusRing(),
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: '2',
    borderRadius: 'md',
    _hover: { bg: 'bg.muted' },
  })
);
