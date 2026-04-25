import { cva } from '../../../../styled-system/css';

export const typographyStyles = cva({
  base: {
    color: 'text.default',
    fontFamily: 'sans',
  },
  variants: {
    variant: {
      h1: { textStyle: 'h1' },
      h2: { textStyle: 'h2' },
      h3: { textStyle: 'h3' },
      h4: { textStyle: 'h4' },
      h5: { textStyle: 'h5' },
      h6: { textStyle: 'h6' },
      bodyL: { textStyle: 'bodyL' },
      body: { textStyle: 'body' },
      bodyS: { textStyle: 'bodyS' },
      bodyXS: { textStyle: 'bodyXS' },
      code: {
        textStyle: 'code',
        backgroundColor: 'bg.muted',
        px: '1',
        py: '0.5',
        borderRadius: 'sm',
      },
    },
    textColor: {
      primary: { color: 'text.default' },
      muted: { color: 'text.muted' },
      inverted: { color: 'text.inverted' },
      accent: { color: 'accent.default' },
    },
  },
  defaultVariants: {
    variant: 'body',
    textColor: 'primary',
  },
});
