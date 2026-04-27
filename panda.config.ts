import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  outdir: 'styled-system',
  jsxFramework: 'react',
  include: ['./src/**/*.{js,jsx,ts,tsx}', './.storybook/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  //   optimize: true,
  minify: process.env.NODE_ENV === 'production',
  patterns: {
    extend: {
      container: {
        description: 'A centered container with responsive padding',
        transform(props) {
          return {
            maxW: '6xl',
            mx: 'auto',
            px: { base: '6', lg: '8' },
            ...props,
          };
        },
      },
    },
  },

  conditions: {
    light: '[data-theme=light] &',
    dark: '.dark &, [data-theme=dark] &',
    smDown: '@media (max-width: 639px)',
  },

  theme: {
    keyframes: {
      shimmer: {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' },
      },
    },
    tokens: {
      spacing: {
        '0': { value: '0rem' },
        '0.5': { value: '0.125rem' },
        '1': { value: '0.25rem' },
        '1.5': { value: '0.375rem' },
        '2': { value: '0.5rem' },
        '2.5': { value: '0.625rem' },
        '3': { value: '0.75rem' },
        '3.5': { value: '0.875rem' },
        '4': { value: '1rem' },
        '5': { value: '1.25rem' },
        '6': { value: '1.5rem' },
        '7': { value: '1.75rem' },
        '8': { value: '2rem' },
        '9': { value: '2.25rem' },
        '10': { value: '2.5rem' },
        '12': { value: '3rem' },
        '14': { value: '3.5rem' },
        '16': { value: '4rem' },
        '20': { value: '5rem' },
        '24': { value: '6rem' },
        '32': { value: '8rem' },
        '40': { value: '10rem' },
        '48': { value: '12rem' },
        '56': { value: '14rem' },
        '64': { value: '16rem' },
      },
      sizes: {
        '10': { value: '{spacing.10}' },
        '12': { value: '{spacing.12}' },
        sidebar: { value: '280px' },
        searchBox: { value: '140px' },
        searchBoxExpanded: { value: '160px' },
        accentBar: { value: '4px' },
        full: { value: '100%' },
        screen: { value: '100vh' },
      },
      borderWidths: {
        none: { value: '0px' },
        thin: { value: '1px' },
        medium: { value: '2px' },
        thick: { value: '4px' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '0.125rem' },
        base: { value: '0.25rem' },
        md: { value: '0.375rem' },
        lg: { value: '0.5rem' },
        xl: { value: '0.75rem' },
        '2xl': { value: '1rem' },
        '3xl': { value: '1.5rem' },
        full: { value: '9999px' },
      },
      shadows: {
        sm: { value: '0 1px 2px rgba(0,0,0,0.05)' },
        md: { value: '0 4px 12px rgba(0,0,0,0.1)' },
        lg: { value: '0 10px 25px rgba(0,0,0,0.15)' },
      },
      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        semibold: { value: '600' },
        bold: { value: '700' },
        extrabold: { value: '800' },
      },
      lineHeights: {
        tight: { value: '1.25' },
        normal: { value: '1.5' },
        relaxed: { value: '1.625' },
      },
      fonts: {
        sans: {
          value:
            'var(--font-geist-sans), "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
        },
        mono: {
          value:
            'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
        serif: {
          value: '"Noto Serif JP", "Hiragino Mincho ProN", "MS Mincho", serif',
        },
      },
      easings: {
        standard: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
        spring: { value: 'cubic-bezier(0.34, 0, 0.22, 2.45)' },
      },
      durations: {
        normal: { value: '200ms' },
        medium: { value: '250ms' },
      },
      fontSizes: {
        xs: { value: '0.75rem' },
        sm: { value: '0.875rem' },
        base: { value: '1rem' },
        lg: { value: '1.125rem' },
        xl: { value: '1.25rem' },
        '2xl': { value: '1.5rem' },
        '3xl': { value: '1.875rem' },
        '4xl': { value: '2.25rem' },
        '5xl': { value: '3rem' },
        '6xl': { value: '3.75rem' },
        '7xl': { value: '4.5rem' },
        code: { value: '0.875em' },
      },
      letterSpacings: {
        tighter: { value: '-0.05em' },
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
      },
      zIndex: {
        hide: { value: -1 },
        base: { value: 0 },
        sticky: { value: 1100 },
        skipLink: { value: 1600 },
      },
      colors: {
        inherit: { value: 'inherit' },
        current: { value: 'currentColor' },
        transparent: { value: 'transparent' },
        white: { value: '#ffffff' },
        black: { value: '#000000' },
        neutral: {
          50: { value: '#f8f9fa' },
          100: { value: '#f1f3f5' },
          200: { value: '#e9ecef' },
          300: { value: '#dee2e6' },
          400: { value: '#ced4da' },
          500: { value: '#adb5bd' },
          600: { value: '#868e96' },
          700: { value: '#495057' },
          800: { value: '#343a40' },
          900: { value: '#212529' },
          950: { value: '#121417' },
        },
        dark: {
          50: { value: '#f4f4f5' },
          100: { value: '#e4e4e7' },
          200: { value: '#d4d4d8' },
          300: { value: '#a1a1aa' },
          400: { value: '#71717a' },
          500: { value: '#52525b' },
          600: { value: '#3f3f46' },
          700: { value: '#27272a' },
          800: { value: '#18181b' },
          900: { value: '#09090b' },
          950: { value: '#050507' },
        },
        blue: {
          50: { value: '#eff6ff' },
          100: { value: '#dbeafe' },
          200: { value: '#bfdbfe' },
          800: { value: '#1e40af' },
        },
        purple: {
          50: { value: '#f5f3ff' },
          100: { value: '#ede9fe' },
          200: { value: '#ddd6fe' },
          800: { value: '#5b21b6' },
        },
        amber: {
          50: { value: '#fffbeb' },
          100: { value: '#fef3c7' },
          200: { value: '#fde68a' },
          800: { value: '#92400e' },
          900: { value: '#78350f' },
        },
        red: {
          50: { value: '#fef2f2' },
          100: { value: '#fee2e2' },
          200: { value: '#fecaca' },
          800: { value: '#991b1b' },
        },
        takenoko: {
          chocolate: {
            50: { value: '#EFEBE9' },
            100: { value: '#D7CCC8' },
            200: { value: '#BCAAA4' },
            300: { value: '#A1887F' },
            400: { value: '#8D6E63' },
            500: { value: '#795548' },
            600: { value: '#6D4C41' },
            700: { value: '#5D4037' },
            800: { value: '#4E342E' },
            900: { value: '#3E2723' },
          },
          cream: {
            50: { value: '#FFFDE7' },
            100: { value: '#FFF9C4' },
            200: { value: '#FFF59D' },
            300: { value: '#FFF176' },
            400: { value: '#FFEE58' },
            500: { value: '#FDD835' },
            600: { value: '#FBC02D' },
            700: { value: '#F9A825' },
            800: { value: '#F57F17' },
            900: { value: '#FF6F00' },
          },
          bamboo: {
            50: { value: '#E8F5E9' },
            100: { value: '#C8E6C9' },
            200: { value: '#A5D6A7' },
            300: { value: '#81C784' },
            400: { value: '#66BB6A' },
            500: { value: '#4CAF50' },
            600: { value: '#43A047' },
            700: { value: '#388E3C' },
            800: { value: '#2E7D32' },
            900: { value: '#1B5E20' },
            950: { value: '#051507' },
          },
        },
      },
    },
    semanticTokens: {
      fontSizes: {
        heading: {
          h1: { value: { base: '{fontSizes.3xl}', md: '{fontSizes.4xl}' } },
          h2: { value: { base: '{fontSizes.2xl}', md: '{fontSizes.3xl}' } },
          h3: { value: { base: '{fontSizes.xl}', md: '{fontSizes.2xl}' } },
          h4: { value: { base: '{fontSizes.lg}', md: '{fontSizes.xl}' } },
          h5: { value: { base: '{fontSizes.base}', md: '{fontSizes.lg}' } },
          h6: { value: { base: '{fontSizes.sm}', md: '{fontSizes.base}' } },
        },
        body: {
          large: { value: '{fontSizes.lg}' },
          base: { value: '{fontSizes.base}' },
          small: { value: '{fontSizes.sm}' },
          xs: { value: '{fontSizes.xs}' },
        },
      },
      lineHeights: {
        heading: { value: '{lineHeights.tight}' },
        body: { value: '{lineHeights.relaxed}' },
      },
      colors: {
        bg: {
          default: { value: { base: '{colors.white}', _dark: '{colors.dark.900}' } },
          muted: { value: { base: '{colors.takenoko.bamboo.50}', _dark: '{colors.dark.800}' } },
          subtle: { value: { base: '{colors.takenoko.bamboo.100}', _dark: '{colors.dark.700}' } },
          active: { value: { base: '{colors.takenoko.bamboo.900}', _dark: '{colors.dark.700}' } },
        },
        text: {
          default: {
            value: { base: '{colors.takenoko.chocolate.900}', _dark: '{colors.dark.100}' },
          },
          muted: {
            value: { base: '{colors.takenoko.chocolate.700}', _dark: '{colors.dark.200}' },
          },
          inverted: { value: { base: '{colors.white}', _dark: '{colors.dark.100}' } },
          onAccent: { value: { base: '{colors.white}', _dark: '{colors.white}' } },
        },
        border: {
          default: {
            value: { base: '{colors.takenoko.bamboo.200}', _dark: '{colors.dark.700}' },
          },
          muted: { value: { base: '{colors.takenoko.bamboo.100}', _dark: '{colors.dark.800}' } },
        },
        accent: {
          default: {
            value: {
              base: '{colors.takenoko.bamboo.900}',
              _dark: '{colors.takenoko.bamboo.300}',
            },
          },
          solid: {
            value: {
              base: '{colors.takenoko.bamboo.900}',
              _dark: '{colors.takenoko.bamboo.800}',
            },
          },
          hover: {
            value: {
              base: '{colors.takenoko.bamboo.700}',
              _dark: '{colors.takenoko.bamboo.200}',
            },
          },
          focusRing: {
            value: {
              base: '{colors.takenoko.bamboo.900}',
              _dark: '{colors.takenoko.bamboo.300}',
            },
          },
        },
        link: {
          default: {
            value: { base: '{colors.takenoko.bamboo.900}', _dark: '{colors.dark.100}' },
          },
          hover: {
            value: {
              base: '{colors.takenoko.bamboo.700}',
              _dark: '{colors.takenoko.bamboo.200}',
            },
          },
        },
        overlay: {
          subtle: { value: { base: 'rgba(0, 0, 0, 0.04)', _dark: 'rgba(255, 255, 255, 0.08)' } },
          light: { value: { base: 'rgba(0, 0, 0, 0.06)', _dark: 'rgba(255, 255, 255, 0.12)' } },
        },
        alert: {
          note: {
            fg: { value: { base: '{colors.blue.800}', _dark: '{colors.blue.200}' } },
            bg: { value: { base: '{colors.blue.50}', _dark: 'rgba(59, 130, 246, 0.1)' } },
            border: { value: { base: '{colors.blue.200}', _dark: '{colors.blue.800}' } },
          },
          tip: {
            fg: {
              value: {
                base: '{colors.takenoko.bamboo.950}',
                _dark: '{colors.takenoko.bamboo.100}',
              },
            },
            bg: {
              value: { base: '{colors.takenoko.bamboo.50}', _dark: 'rgba(76, 175, 80, 0.1)' },
            },
            border: {
              value: {
                base: '{colors.takenoko.bamboo.200}',
                _dark: '{colors.takenoko.bamboo.800}',
              },
            },
          },
          important: {
            fg: { value: { base: '{colors.purple.800}', _dark: '{colors.purple.200}' } },
            bg: { value: { base: '{colors.purple.50}', _dark: 'rgba(168, 85, 247, 0.1)' } },
            border: { value: { base: '{colors.purple.200}', _dark: '{colors.purple.800}' } },
          },
          warning: {
            fg: { value: { base: '{colors.amber.900}', _dark: '{colors.amber.200}' } },
            bg: { value: { base: '{colors.amber.50}', _dark: 'rgba(245, 158, 11, 0.1)' } },
            border: { value: { base: '{colors.amber.200}', _dark: '{colors.amber.800}' } },
          },
          caution: {
            fg: { value: { base: '{colors.red.800}', _dark: '{colors.red.100}' } },
            bg: { value: { base: '{colors.red.50}', _dark: 'rgba(239, 68, 68, 0.1)' } },
            border: { value: { base: '{colors.red.200}', _dark: '{colors.red.800}' } },
          },
        },
      },
      radii: {
        card: { value: '{radii.2xl}' },
        button: { value: '{radii.md}' },
      },
      shadows: {
        card: {
          default: { value: '{shadows.sm}' },
          hover: { value: '{shadows.md}' },
        },
      },
      spacing: {
        layout: {
          gutter: { value: { base: '{spacing.6}', lg: '{spacing.8}' } },
          pagePadding: { value: '{spacing.layout.gutter}' },
        },
        component: { padding: { value: '{spacing.6}' } },
        section: { gap: { value: { base: '{spacing.10}', lg: '{spacing.14}' } } },
        content: { sectionGap: { value: '{spacing.12}' } },
      },
    },
    textStyles: {
      h1: {
        value: {
          fontSize: 'heading.h1',
          lineHeight: 'heading',
          fontWeight: 'bold',
          letterSpacing: 'tight',
        },
      },
      h2: {
        value: {
          fontSize: 'heading.h2',
          lineHeight: 'heading',
          fontWeight: 'bold',
          letterSpacing: 'tight',
        },
      },
      h3: {
        value: {
          fontSize: 'heading.h3',
          lineHeight: 'heading',
          fontWeight: 'bold',
        },
      },
      h4: {
        value: {
          fontSize: 'heading.h4',
          lineHeight: 'heading',
          fontWeight: 'semibold',
        },
      },
      h5: {
        value: {
          fontSize: 'heading.h5',
          lineHeight: 'heading',
          fontWeight: 'semibold',
        },
      },
      h6: {
        value: {
          fontSize: 'heading.h6',
          lineHeight: 'heading',
          fontWeight: 'semibold',
        },
      },
      bodyL: { value: { fontSize: 'body.large', lineHeight: 'body' } },
      body: { value: { fontSize: 'body.base', lineHeight: 'body' } },
      bodyS: { value: { fontSize: 'body.small', lineHeight: 'body' } },
      bodyXS: { value: { fontSize: 'body.xs', lineHeight: 'body' } },
      code: { value: { fontFamily: 'mono', fontSize: 'code' } },
    },
    recipes: {
      button: {
        className: 'button',
        description: 'The styles for the Button component',
        jsx: ['Button', 'AppLink'],
        base: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2',
          borderRadius: 'button',
          fontWeight: 'medium',
          cursor: 'pointer',
          transitionProperty: 'background-color, color, border-color, opacity',
          transitionDuration: 'normal',
          border: 'none',
          outline: 'none',
          _focusVisible: {
            outline: '2px solid',
            outlineColor: 'accent.focusRing',
            outlineOffset: '2px',
          },
          _disabled: {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
        },
        variants: {
          variant: {
            primary: {
              bg: 'accent.solid',
              color: 'text.onAccent',
              _hover: { opacity: 0.9 },
            },
            outline: {
              bg: 'transparent',
              border: '1px solid',
              borderColor: 'border.default',
              color: 'text.default',
              _hover: { bg: 'bg.subtle' },
            },
            ghost: {
              bg: 'transparent',
              color: 'text.default',
              _hover: { bg: 'bg.subtle' },
            },
            'ghost-accent': {
              bg: 'transparent',
              color: 'accent.default',
              _hover: { bg: 'bg.subtle' },
            },
          },
          size: {
            sm: { px: '3', py: '2', fontSize: 'sm' },
            md: { px: '4', py: '2', fontSize: 'md' },
            lg: { px: '6', py: '3', fontSize: 'lg' },
          },
        },
        defaultVariants: {
          variant: 'primary',
          size: 'md',
        },
      },
      tag: {
        className: 'tag',
        description: 'The styles for the Tag component',
        jsx: ['TagLink'],
        base: {
          display: 'inline-flex',
          alignItems: 'center',
          px: '3',
          py: '1',
          borderRadius: 'full',
          fontSize: 'xs',
          fontWeight: 'semibold',
          bg: 'bg.muted',
          border: '1px solid',
          borderColor: 'border.muted',
          color: 'text.muted',
          position: 'relative',
          zIndex: '1',
          transitionProperty: 'all',
          transitionDuration: 'medium',
          transitionTimingFunction: 'standard',
          textDecoration: 'none',
          cursor: 'pointer',
          _hover: {
            borderColor: 'accent.default',
            color: 'accent.default',
            bg: 'bg.default',
            transform: 'translateY(-1px)',
            boxShadow: 'sm',
          },
        },
        variants: {
          clickable: {
            false: {
              cursor: 'default',
              _hover: {
                borderColor: 'border.muted',
                color: 'text.muted',
                bg: 'bg.muted',
                transform: 'none',
                boxShadow: 'none',
              },
            },
          },
        },
        defaultVariants: {
          clickable: true,
        },
      },
      glassmorphism: {
        className: 'glassmorphism',
        description: 'Glassmorphism effect for headers and overlays',
        base: {
          backdropFilter: 'blur(8px)',
          bg: 'bg.default/80',
        },
      },
      focusRing: {
        className: 'focus-ring',
        description: 'Shared focus ring styles for interactive elements',
        base: {
          outline: 'none',
          _focusVisible: {
            outline: '2px solid',
            outlineColor: 'accent.focusRing',
            outlineOffset: '2px',
          },
        },
      },
      sectionHeading: {
        className: 'section-heading',
        description: 'Style for section headings with an accent bar',
        base: {
          fontWeight: 'bold',
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
        },
      },
      bambooHover: {
        className: 'bamboo-hover',
        description: 'Bamboo hover effect with rotating background',
        base: {
          position: 'relative',
          _before: {
            content: '""',
            position: 'absolute',
            inset: 0,
            bg: 'takenoko.bamboo.400',
            opacity: 0,
            zIndex: 'hide',
            transformOrigin: 'center',
            transitionProperty: 'transform, opacity',
            transitionDuration: 'normal',
            transitionTimingFunction: 'spring',
            borderRadius: 'inherit',
            pointerEvents: 'none',
          },
          _hover: {
            _before: {
              opacity: 0.4,
              transform: 'rotate(-10deg) scale(1.05)',
            },
          },
        },
      },
    },
  },
});
