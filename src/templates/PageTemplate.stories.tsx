import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { cartItems } from '../stub/cart-items'

import { PageTemplate } from './PageTemplate'

export default {
  title: 'Templates/PageTemplate',
  component: PageTemplate,
  parameters: {
    // remove padding around stories
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PageTemplate>

// just to make the story a bit more understandable for the users
const DummyComponent: React.FC = ({ children }) => <div style={{ padding: 60 }}>{children}</div>

const Template: ComponentStory<typeof PageTemplate> = (args) => <PageTemplate {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <DummyComponent>
      Default template with scrollable header and navigation items and footer
    </DummyComponent>
  ),
}

export const WithItemsInCart = Template.bind({})
WithItemsInCart.parameters = {
  store: {
    initialState: {
      cart: {
        items: cartItems,
      },
    },
  },
}
WithItemsInCart.args = {
  children: (
    <DummyComponent>
      Default template with Items in the cart page will have cart button on top right corner showing
      the order total, clicking on it with should show a sidebar with list of items in the cart.
    </DummyComponent>
  ),
}

export const StickyHeader = Template.bind({})
StickyHeader.args = {
  type: 'sticky-header',
  children: (
    <DummyComponent>
      Template with sticky header on desktop and navigation items. Try scrolling!
    </DummyComponent>
  ),
}

export const Basic = Template.bind({})
Basic.args = {
  type: 'basic',
  children: (
    <DummyComponent>
      Basic template with scrollable Header and no navigation items and footer
    </DummyComponent>
  ),
}
