import Enzyme, {mount} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {MockedProvider} from '@apollo/client/testing'
import {act} from 'react-dom/test-utils'
import 'jsdom-global/register'
import Repos from './Repos'
import {GET_PROJECTS} from '../../graphql/graphql'

Enzyme.configure({adapter: new Adapter()})

const mocksRepos = [
  {
    request: {query: GET_PROJECTS},
    result: {
      data: {
        projects: [
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx1',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx2',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx3',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx4',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx5',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx6',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
        ],
      },
    },
  },
]

const setUp = async () => {
  let wrapper
  await act(async () => {
    wrapper = mount(
      <MockedProvider addTypename={false} mocks={mocksRepos}>
        <Repos />
      </MockedProvider>
    )
    await new Promise((resolve) => setTimeout(resolve, 20))
    wrapper.update()
  })
  return wrapper
}

describe('Repos component', () => {
  let wrapper
  beforeEach(async () => {
    wrapper = await setUp()
  })

  it('should render component', () => {
    expect(wrapper).not.toBeNull()
  })

  it('projects should be found', () => {
    const projects = wrapper.find('.card')
    expect(projects.length).toBe(6)
  })

  it('projects names should be found', () => {
    const projects = wrapper.find('.card')
    const name = projects.find('.heading')
    expect(name.length).toBe(6)
  })

  it('projects description should be found', () => {
    const projects = wrapper.find('.card')
    const description = projects.find('.text')
    expect(description.length).toBe(6)
  })
})

describe('projects errors', () => {
  it('should cant load', async () => {
    const errorMock = [
      {
        request: {query: GET_PROJECTS,},
        error: new Error('An error occurred'),
      },
    ]

    let wrapper
    await act(async () => {
      wrapper = mount(
        <MockedProvider addTypename={false} mocks={errorMock}>
          <Repos />
        </MockedProvider>
      )
      await new Promise((resolve) => setTimeout(resolve, 20))
      wrapper.update()
    })

    const error = wrapper.find('.error')
    expect(error.text()).toContain('Error: cant load projects')
  })

  it('should empty', async () => {
    const emptyMocks = [
      {
        request: {query: GET_PROJECTS},
        result: {data: {projects: [],},},
      },
    ]

    let wrapper
    await act(async () => {
      wrapper = mount(
        <MockedProvider addTypename={false} mocks={emptyMocks}>
          <Repos />
        </MockedProvider>
      )
      await new Promise((resolve) => setTimeout(resolve, 20))
      wrapper.update()
    })

    const error = wrapper.find('.error')
    expect(error.text()).toContain('projects is empty')
  })
})
