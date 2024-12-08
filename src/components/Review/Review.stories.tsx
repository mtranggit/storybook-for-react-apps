import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Review } from './Review'

export default {
  title: 'Components/Review',
  component: Review,
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1906-3468&t=6CnEafC6KekFwMcg-4',
    },
  },
  argTypes: {
    // set the arg name you want to overwrite
    rating: {
      // add custom control slider
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 0.1,
      },
    },
  },
} as ComponentMeta<typeof Review>

const Template: ComponentStory<typeof Review> = (args) => <Review {...args} />

export const Default = Template.bind({})

export const Excellent = Template.bind({})
Excellent.args = {
  rating: 5,
}

export const VeryGood = Template.bind({})
VeryGood.args = {
  rating: 4.5,
}

export const Adequate = Template.bind({})
Adequate.args = {
  rating: 2.5,
}

export const VeryPoor = Template.bind({})
VeryPoor.args = {
  rating: 1,
}
