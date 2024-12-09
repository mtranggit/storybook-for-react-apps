import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { restaurants } from '../../stub/restaurants'

// import { RestaurantCard } from './progress/RestaurantCard.unstyled'
// import { RestaurantCard } from './progress/RestaurantCard.basic'

import { RestaurantCard } from './RestaurantCard'

export default {
  title: 'Components/RestaurantCard',
  component: RestaurantCard,
  argTypes: {
    rating: {
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 0.1,
      },
    },
  },
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1126%3A3893',
    },
  },
} as ComponentMeta<typeof RestaurantCard>

const Template: ComponentStory<typeof RestaurantCard> = (args) => <RestaurantCard {...args} />

export const Default = Template.bind({})
Default.args = {
  ...restaurants[0],
}
Default.play = async ({ canvasElement, args }) => {
  // console.log({ canvasElement, args })
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('restaurant-card'))
  // assert that the onClick spy was called
  await expect(args.onClick).toHaveBeenCalled()
}

export const New = Template.bind({})
New.args = {
  ...Default.args,
  isNew: true,
}

export const Closed = Template.bind({})
Closed.args = {
  ...Default.args,
  isClosed: true,
}
Closed.play = async ({ canvasElement, args }) => {
  // console.log({ canvasElement, args })
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('restaurant-card'))
  // assert that the onClick spy was not called
  await expect(args.onClick).not.toHaveBeenCalled()
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  isLoading: true,
}
