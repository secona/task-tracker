import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/theme';
import GlobalStyles from '../src/GlobalStyles';

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'Elevation 0',
    values: Object.entries(theme.elevation).map(([k, v]) => ({
      name: 'Elevation ' + k,
      value: v,
    })),
  },
};
