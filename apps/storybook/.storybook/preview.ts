import type { Preview } from '@storybook/react';
import '@fredpatch/design-tokens/styles.css';
import '@fredpatch/design-themes/themes.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Application theme',
      defaultValue: 'neutral',
      toolbar: {
        icon: 'paintbrush',
        items: ['neutral', 'prestix', 'anac-institutional'],
      },
    },
    mode: {
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: ['light', 'dark'],
      },
    },
    density: {
      description: 'Interface density',
      defaultValue: 'comfortable',
      toolbar: {
        icon: 'component',
        items: ['comfortable', 'compact', 'dense'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme;
      document.documentElement.dataset.mode = context.globals.mode;
      document.documentElement.dataset.density = context.globals.density;
      return Story();
    },
  ],
};

export default preview;
