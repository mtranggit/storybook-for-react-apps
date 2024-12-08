import { ComponentMeta, ComponentStory } from '@storybook/react'
import { http, HttpResponse, delay } from 'msw'

import { BASE_URL } from '../../api'
import { restaurants } from '../../stub/restaurants'

import { HomePage } from './HomePage'

export default {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    // remove padding around stories
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=135%3A258',
    },
    msw: {
      handlers: [
        http.get(BASE_URL, () => {
          return HttpResponse.json(restaurants)
        }),
      ],
    },
  },
} as ComponentMeta<typeof HomePage>

const Template: ComponentStory<typeof HomePage> = () => <HomePage />

export const Default = Template.bind({})
