import { globalVariables } from '../src/styles/global';

import '../src/styles/global.scss';

/** @type { import('@storybook/react').Preview } */
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
    values: Object.entries(globalVariables.elevation).map(([k, v]) => ({
      name: 'Elevation ' + k,
      value: v,
    })),
  },
};
