import { css, cva } from '../../../../styled-system/css';

export const alertContainerRecipe = cva({
  base: {
    my: '10',
    p: '6',
    borderRadius: 'md',
    borderLeftWidth: 'thick',
    borderStyle: 'solid',
  },
  variants: {
    type: {
      note: {
        bg: 'alert.note.bg',
        borderColor: 'alert.note.border',
        color: 'alert.note.fg',
      },
      tip: {
        bg: 'alert.tip.bg',
        borderColor: 'alert.tip.border',
        color: 'alert.tip.fg',
      },
      important: {
        bg: 'alert.important.bg',
        borderColor: 'alert.important.border',
        color: 'alert.important.fg',
      },
      warning: {
        bg: 'alert.warning.bg',
        borderColor: 'alert.warning.border',
        color: 'alert.warning.fg',
      },
      caution: {
        bg: 'alert.caution.bg',
        borderColor: 'alert.caution.border',
        color: 'alert.caution.fg',
      },
    },
  },
});

export const alertHeaderStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  mb: '2',
  fontSize: 'md',
  fontWeight: 'bold',
  textTransform: 'uppercase',
});

export const alertContentStyles = css({
  '& p': {
    mb: '0!',
    color: 'inherit',
    fontSize: 'inherit',
  },
});

export type AlertType = 'note' | 'tip' | 'important' | 'warning' | 'caution';
