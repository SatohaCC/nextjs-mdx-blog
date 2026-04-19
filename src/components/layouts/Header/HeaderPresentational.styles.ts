import { css } from '../../../../styled-system/css';
import { flex } from '../../../../styled-system/patterns';

export const headerContainerStyles = css({
  borderBottom: '1px solid',
  borderColor: 'border.muted',
  py: '4',
  px: { base: '6', lg: '8' },
  bg: 'bg.default/95',

  position: 'sticky',
  top: 0,
  zIndex: 'sticky',
});

export const headerInnerStyles = flex({
  justify: 'space-between',
  align: 'center',
  maxW: '6xl',
  mx: 'auto',
});

export const logoStyles = css({
  fontSize: { base: 'lg', sm: 'xl' },
  fontWeight: 'extrabold',
  letterSpacing: 'tighter',
  color: 'text.default',
  outline: 'none',
  _focusVisible: { outline: '2px solid', outlineColor: 'accent.focusRing' },
  _hover: { color: 'accent.default' },
});

export const navContainerStyles = flex({ gap: { base: '2', sm: '4' }, align: 'center' });

export const navLinkStyles = css({
  fontSize: 'sm',
  fontWeight: 'semibold',
  color: 'text.default',
  outline: 'none',
  _focusVisible: { outline: '2px solid', outlineColor: 'accent.focusRing' },
  _hover: { color: 'accent.default' },
});

export const iconButtonStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: '2',
  borderRadius: 'md',
  _hover: { bg: 'bg.muted' },
});
