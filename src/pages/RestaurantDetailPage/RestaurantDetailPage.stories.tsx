import { ComponentMeta, ComponentStory } from '@storybook/react'
import { delay, http, HttpResponse } from 'msw'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { BASE_URL } from '../../api'
import { restaurants } from '../../stub/restaurants'

import { RestaurantDetailPage } from './RestaurantDetailPage'

export default {
  title: 'Pages/RestaurantDetailPage',
  component: RestaurantDetailPage,
  parameters: {
    layout: 'fullscreen',
    deeplink: {
      path: '/restaurants/:id',
      route: '/restaurants/1',
    },
  },
} as ComponentMeta<typeof RestaurantDetailPage>

const Template: ComponentStory<typeof RestaurantDetailPage> = () => (
  <>
    <RestaurantDetailPage />
    <div id="modal" />
  </>
)

export const Success = Template.bind({})
Success.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/proto/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=169%3A510&scaling=scale-down-width&page-id=135%3A257&starting-point-node-id=135%3A258',
  },
  msw: {
    handlers: [
      http.get(BASE_URL, () => {
        return HttpResponse.json(restaurants[0])
      }),
    ],
  },
}

export const WithModalOpen = Template.bind({})
// reuse parameters from Success story
WithModalOpen.parameters = {
  ...Success.parameters,
}
WithModalOpen.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const item = await canvas.findByText(/Cheeseburger/i)
  await userEvent.click(item)
  await expect(canvas.getByTestId('modal')).toBeInTheDocument()
}

export const Loading = Template.bind({})
Loading.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=2152%3A3158',
  },
  msw: {
    handlers: [
      http.get(BASE_URL, () => {
        return delay('infinite')
      }),
    ],
  },
}

export const NotFound = Template.bind({})
NotFound.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1097%3A3785',
  },
  msw: {
    handlers: [
      http.get(BASE_URL, () => {
        return new Response(null, { status: 404 })
      }),
    ],
  },
}

export const Error = Template.bind({})
Error.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1091%3A4537',
  },
  msw: {
    handlers: [
      http.get(BASE_URL, () => {
        return new Response(null, { status: 500 })
      }),
    ],
  },
}
