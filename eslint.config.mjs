import panda from '@pandacss/eslint-plugin';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import prettierPlugin from 'eslint-plugin-prettier';
import storybook from 'eslint-plugin-storybook';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      '@pandacss': panda,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
    },
    rules: {
      ...panda.configs.recommended.rules,
      '@pandacss/no-debug': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': 'error',
    },
    settings: {
      '@pandacss/configPath': 'panda.config.ts',
    },
  },

  // Override default ignores of eslint-config-next.

  globalIgnores([
    '.next/**',
    '.agent/**',
    '.claude/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'styled-system/**',
  ]),
  {
    rules: {
      // TypeScript strict rules
      '@typescript-eslint/no-unused-vars': 'off', // unused-imports/no-unused-vars を使用するためオフ
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // General rules
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      curly: ['error', 'all'],
      'no-implicit-coercion': 'error',
    },
  },
  {
    files: ['src/**/*.tsx'],
    ignores: ['src/app/global-error.tsx'],
    rules: {
      'react/forbid-component-props': ['error', { forbid: ['style'] }],
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', '.storybook/**/*.ts', '.storybook/**/*.tsx'],
    ignores: [
      'src/**/*.styles.ts',
      'src/**/styles.ts',
      'src/app/layout.styles.ts',
      '.storybook/**/*.tsx',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/styled-system/css'],
              importNames: ['css', 'cva', 'sva'],
              message:
                "Panda CSS functions (except 'cx') should only be used in *.styles.ts files.",
            },
            {
              group: [
                '**/styled-system/patterns',
                '**/styled-system/recipes',
                '**/styled-system/jsx',
              ],
              message: 'Panda CSS patterns and recipes should only be used in *.styles.ts files.',
            },
          ],
        },
      ],
    },
  },
  // --- Cross-feature import restrictions ---
  {
    plugins: { boundaries },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          type: 'feature',
          pattern: 'src/features/*',
          capture: ['featureName'],
        },
        {
          type: 'app',
          pattern: 'src/app/**/*',
        },
        {
          type: 'layout',
          pattern: 'src/components/layouts/**/*',
        },
        {
          type: 'ui',
          pattern: 'src/components/ui/**/*',
        },
        {
          type: 'mdx',
          pattern: 'src/components/mdx/**/*',
        },
        {
          type: 'lib',
          pattern: 'src/lib/**/*',
        },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          message: '{{file.type}} -> {{dependency.type}} のインポートは許可されていません。',
          rules: [
            {
              from: { type: 'feature' },
              disallow: [{ to: { type: 'feature' } }, { to: { type: 'app' } }],
              message:
                'Feature間の直接インポート、および上位レイヤー(app)へのインポートは禁止です。',
            },
            {
              from: { type: 'feature' },
              allow: [
                { to: { type: 'feature', captured: { featureName: '{{from.featureName}}' } } },
              ],
            },
            {
              from: { type: 'layout' },
              disallow: [{ to: { type: 'app' } }],
              message: 'Layout から上位レイヤー(app)へのインポートは禁止です。',
            },
            {
              from: { type: 'ui' },
              disallow: [
                { to: { type: 'feature' } },
                { to: { type: 'app' } },
                { to: { type: 'layout' } },
              ],
              message: 'UI プリミティブコンポーネントから上位レイヤーへのインポートは禁止です。',
            },
            {
              from: { type: 'mdx' },
              disallow: [{ to: { type: 'feature' } }, { to: { type: 'app' } }],
              message: 'MDX コンポーネントからフィーチャーや app へのインポートは禁止です。',
            },
          ],
        },
      ],
    },
  },
  ...storybook.configs['flat/recommended'],
  prettierConfig,
]);

export default eslintConfig;
