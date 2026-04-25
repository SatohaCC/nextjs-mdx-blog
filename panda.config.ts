import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './pages/**/*stories.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],

  conditions: {
    light: '[data-theme=light] &',
    dark: '.dark &, [data-theme=dark] &',
    smDown: '@media (max-width: 639px)',
  },

  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      tokens: {
        // サイズトークン
        sizes: {
          sidebar: { value: '280px' },
          searchBox: { value: '140px' },
          searchBoxExpanded: { value: '160px' },
          accentBar: { value: '4px' },
        },
        // ボーダー幅トークン
        borderWidths: {
          thin: { value: '1px' },
          medium: { value: '2px' },
          thick: { value: '4px' },
        },
        // シャドウトークン
        shadows: {
          sm: { value: '0 1px 2px rgba(0,0,0,0.05)' },
          md: { value: '0 4px 12px rgba(0,0,0,0.1)' },
          lg: { value: '0 10px 25px rgba(0,0,0,0.15)' },
        },
        // フォントウェイトトークン
        fontWeights: {
          thin: { value: '100' },
          light: { value: '300' },
          normal: { value: '400' },
          medium: { value: '500' },
          semibold: { value: '600' },
          bold: { value: '700' },
          extrabold: { value: '800' },
          black: { value: '900' },
        },
        // 行高トークン
        lineHeights: {
          none: { value: '1' },
          tight: { value: '1.25' },
          snug: { value: '1.375' },
          normal: { value: '1.5' },
          relaxed: { value: '1.625' },
          loose: { value: '2' },
        },
        // フォントファミリートークン
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
        // イージングトークン
        easings: {
          standard: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
          spring: { value: 'cubic-bezier(0.34, 0, 0.22, 2.45)' },
        },
        // デュレーショントークン
        durations: {
          medium: { value: '250ms' },
        },
        // フォントサイズトークン
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
        // 字間トークン
        letterSpacings: {
          tighter: { value: '-0.05em' },
          tight: { value: '-0.025em' },
          normal: { value: '0em' },
          wide: { value: '0.025em' },
          wider: { value: '0.05em' },
          widest: { value: '0.1em' },
        },
        // z-indexトークン
        zIndex: {
          hide: { value: -1 },
          base: { value: 0 },
          docked: { value: 10 },
          dropdown: { value: 1000 },
          sticky: { value: 1100 },
          banner: { value: 1200 },
          overlay: { value: 1300 },
          modal: { value: 1400 },
          popover: { value: 1500 },
          skipLink: { value: 1600 },
          toast: { value: 1700 },
        },
        colors: {
          inherit: { value: 'inherit' },
          current: { value: 'currentColor' },
          white: { value: '#ffffff' },
          black: { value: '#000000' },
          // たけのこの里カラーパレット
          takenoko: {
            // チョコレートブラウン
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
            // クリーム（ビスケット）
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
            // 竹の葉グリーン（より深い色を追加）
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
              950: { value: '#051507' }, // 極めて深い緑（AAA背景用）
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
            default: { value: { base: '{colors.white}', _dark: '#09090b' } },
            muted: {
              value: { base: '{colors.takenoko.bamboo.50}', _dark: '#18181b' },
            },
            subtle: {
              value: {
                base: '{colors.takenoko.bamboo.100}',
                _dark: '#27272a',
              },
            },
            active: {
              value: { base: '{colors.takenoko.bamboo.900}', _dark: '#27272a' },
            },
          },
          text: {
            default: {
              value: {
                base: '{colors.takenoko.chocolate.900}',
                _dark: '{colors.white}',
              },
            },
            muted: {
              value: {
                base: '{colors.takenoko.chocolate.700}',
                _dark: '{colors.white}',
              },
            },
            inverted: { value: { base: '{colors.white}', _dark: '{colors.white}' } },
            onAccent: {
              value: {
                base: '{colors.white}',
                _dark: '{colors.white}',
              },
            },
          },
          border: {
            default: {
              value: {
                base: '{colors.takenoko.bamboo.200}',
                _dark: '#27272a',
              },
            },
            muted: {
              value: {
                base: '{colors.takenoko.bamboo.100}',
                _dark: '#18181b',
              },
            },
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
              value: {
                base: '{colors.takenoko.bamboo.900}',
                _dark: '{colors.white}',
              },
            },
            hover: {
              value: {
                base: '{colors.takenoko.bamboo.700}',
                _dark: '{colors.takenoko.bamboo.200}',
              },
            },
          },
          overlay: {
            subtle: {
              value: { base: 'rgba(0, 0, 0, 0.04)', _dark: 'rgba(255, 255, 255, 0.08)' },
            },
            light: {
              value: { base: 'rgba(0, 0, 0, 0.06)', _dark: 'rgba(255, 255, 255, 0.12)' },
            },
          },
          alert: {
            note: {
              fg: { value: { base: '{colors.blue.800}', _dark: '{colors.blue.200}' } },
              bg: {
                value: { base: '{colors.blue.50}', _dark: 'rgba(59, 130, 246, 0.1)' },
              },
              border: {
                value: { base: '{colors.blue.200}', _dark: '{colors.blue.800}' },
              },
            },
            tip: {
              fg: {
                value: {
                  base: '{colors.takenoko.bamboo.950}',
                  _dark: '{colors.takenoko.bamboo.100}',
                },
              },
              bg: {
                value: {
                  base: '{colors.takenoko.bamboo.50}',
                  _dark: 'rgba(76, 175, 80, 0.1)',
                },
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
              bg: {
                value: { base: '{colors.purple.50}', _dark: 'rgba(168, 85, 247, 0.1)' },
              },
              border: {
                value: { base: '{colors.purple.200}', _dark: '{colors.purple.800}' },
              },
            },
            warning: {
              fg: { value: { base: '{colors.amber.900}', _dark: '{colors.amber.200}' } },
              bg: {
                value: { base: '{colors.amber.50}', _dark: 'rgba(245, 158, 11, 0.1)' },
              },
              border: {
                value: { base: '{colors.amber.200}', _dark: '{colors.amber.800}' },
              },
            },
            caution: {
              fg: { value: { base: '{colors.red.800}', _dark: '{colors.red.100}' } },
              bg: {
                value: { base: '{colors.red.50}', _dark: 'rgba(239, 68, 68, 0.1)' },
              },
              border: {
                value: { base: '{colors.red.200}', _dark: '{colors.red.800}' },
              },
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
            gutter: {
              value: { base: '{spacing.6}', lg: '{spacing.8}' },
            },
            pagePadding: { value: '{spacing.layout.gutter}' },
          },
          component: {
            padding: { value: '{spacing.6}' },
          },
          section: {
            gap: { value: { base: '{spacing.10}', lg: '{spacing.14}' } },
          },
          content: {
            sectionGap: { value: '{spacing.12}' },
          },
        },
      },
    },
  },

  outdir: 'styled-system',
  jsxFramework: 'react',
});
