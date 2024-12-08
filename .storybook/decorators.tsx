import { DecoratorFn } from '@storybook/react'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../src/styles/theme'
import { withDesign } from 'storybook-addon-designs'
import { BrowserRouter as Router } from 'react-router-dom'
import { initialize, mswDecorator } from 'msw-storybook-addon'


initialize()

const withRouter: DecoratorFn = (StoryFn) => (
	<Router>
		<StoryFn />
	</Router>
)

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
]