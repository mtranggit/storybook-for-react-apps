import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { viewports as breakpoints } from '../src/styles/breakpoints'
import { globalDecorators } from './decorators'

// Create custom viewports using widths defined in design tokens
const breakpointViewports = Object.keys(breakpoints).reduce((acc, key) => {
  acc[`breakpoint${key}`] = {
    name: `Breakpoint - ${key}`,
    styles: {
      width: `${breakpoints[key as keyof typeof breakpoints]}px`,
      // Account for padding and border around viewport preview
      height: 'calc(100% - 20px)',
    },
    type: 'other',
  }
  return acc
}, {} as typeof INITIAL_VIEWPORTS)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      ...breakpointViewports,
      ...INITIAL_VIEWPORTS,
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  theme: {
    // The label to show for this toolbar item
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
      // Specifies if the name of the item to be displayed
      showName: true,
    },
  },
}

export const decorators = globalDecorators