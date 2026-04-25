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
      },
      tip: {
        bg: 'alert.tip.bg',
        borderColor: 'alert.tip.border',
      },
      important: {
        bg: 'alert.important.bg',
        borderColor: 'alert.important.border',
      },
      warning: {
        bg: 'alert.warning.bg',
        borderColor: 'alert.warning.border',
      },
      caution: {
        bg: 'alert.caution.bg',
        borderColor: 'alert.caution.border',
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
