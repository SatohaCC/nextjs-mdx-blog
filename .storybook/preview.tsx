// PandaCSS styles
// Global styles
import type { Preview } from '@storybook/nextjs-vite';

import '../src/app/globals.css';
import { Box } from '../styled-system/jsx';
import '../styled-system/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'error',
    },

    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1B5E20' },
      ],
    },
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      return (
        <Box
          data-theme={theme}
          color="text.default"
          bg="bg.default"
          transitionProperty="background-color, color"
          transitionDuration="normal"
        >
          <div style={{ padding: '2rem' }}>
            <Story />
          </div>
        </Box>
      );
    },
  ],
};

export default preview;
