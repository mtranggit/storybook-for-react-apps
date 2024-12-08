import { ComponentMeta, ComponentStory } from '@storybook/react'
import { delay, http, HttpResponse } from 'msw'

// import url used to make request
import { BASE_URL } from '../../../../api'
// import stub data
import { restaurants } from '../../../../stub/restaurants'

// import { RestaurantsSectionComponent as RestaurantsSection } from './RestaurantsSection.container'
import { RestaurantsSection } from './RestaurantsSection'

export default {
  title: 'Pages/HomePage/Components/RestaurantsSection',
  component: RestaurantsSection,
  args: {
    title: 'Our favourite picks',
  },
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=135-311&t=6CnEafC6KekFwMcg-4',
    },
  },
} as ComponentMeta<typeof RestaurantsSection>

const Template: ComponentStory<typeof RestaurantsSection> = (args) => (
  <RestaurantsSection {...args} />
)

export const Default = Template.bind({})
// Default.args = {
//   restaurants,
// }

// export const Loading = Template.bind({})
// Loading.args = {
//   isLoading: true,
// }

// Add MSW addon parameters with mocks
Default.parameters = {
  msw: {
    handlers: [
      http.get(BASE_URL, () => {
        return HttpResponse.json(restaurants)
      }),
    ],
  },
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: {
    handlers: [
      http.get(BASE_URL, async () => {
        await delay('infinite')
      }),
    ],
  },
}
