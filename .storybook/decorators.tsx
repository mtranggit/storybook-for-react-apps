import { DecoratorFn } from '@storybook/react'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../src/styles/theme'
import { withDesign } from 'storybook-addon-designs'

import { BrowserRouter as Router, MemoryRouter, Route, Routes } from 'react-router-dom'
/**
 *
 * Provide components support for routing support and simulated deeplinking
 * it renders the component with a mocked history based on the route passed
 *
 * @example`
 * export const MyComponent = () => Template.bind({})
 * MyComponent.parameters = {
 *   deeplink: {
 *     path = '/restaurant/:id',
 *     route = '/restaurant/12',
 *   }
 * };
 */

import { initialize, mswDecorator } from 'msw-storybook-addon'
import { Provider as StoreProvider} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '../src/app-state'
// import { store } from '../src/app-state'

initialize()

export const withStore: DecoratorFn = (StoryFn, { parameters }) => {
  // Create a store by merging optional custom initialState coming from story parameters
  const store = configureStore({
    reducer: rootReducer,
    // if undefined, it will use default state from reducers
    preloadedState: parameters.store?.initialState, 
  });
  return (
    <StoreProvider store={store}>
      <StoryFn />
    </StoreProvider>
  )
}

const withRouter: DecoratorFn = (StoryFn, { parameters: { deeplink }}) => { 
	// if there is no deeplink parameter, just return the story in a BrowserRouter
	if (!deeplink) {
		return (
			<Router>
				<StoryFn />
			</Router>
		)
	}

	// if there is a deeplink paramter, wrap the story with a simulated route in MemoryRouter
	const { path, route } = deeplink

	return (
		<MemoryRouter initialEntries={[encodeURI(route)]}>
			<Routes>
				<Route path={path} element={<StoryFn />} />
			</Routes>
		</MemoryRouter>
	)
}

const withTheme: DecoratorFn = (StoryFn, context) => {
	const theme = context.parameters.theme || context.globals.theme
	const storyTheme = theme === 'light' ? lightTheme : darkTheme
	return (
		<ThemeProvider theme={storyTheme}>
			<GlobalStyle />	
			<StoryFn />
		</ThemeProvider>
	)
}

// export all decorators that can be applied globally in an array
export const globalDecorators = [
	mswDecorator,
	withTheme,
	withDesign,
	withRouter,
	withStore,
]