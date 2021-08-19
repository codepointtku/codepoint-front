import Enzyme, {mount} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {MockedProvider} from '@apollo/client/testing'
import {act} from 'react-dom/test-utils'
import {GET_PROFILES} from '../../graphql/graphql'
import Profiles from './Profiles'

Enzyme.configure({adapter: new Adapter()})

jest.mock('next/image', () => {
  const img = () => <></>
  return img
})

const mocksProfiles = [
  {
    request: {query: GET_PROFILES},
    result: {
      data: {
        profiles: [
          {
            id: 'xxxx0',
            name: 'first last',
            bio: 'xx',
            url: 'https://url.com/',
            linkedin: 'https://linkedin.com/xx',
            github: 'https://github.com/xxx',
            avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          },
          {
            id: 'xxxx1',
            name: 'first last',
            bio: 'xx',
            url: 'https://url.com/',
            linkedin: 'https://linkedin.com/xx',
            github: 'https://github.com/xxx',
            avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          },
          {
            id: 'xxxx2',
            name: 'first last',
            bio: 'xx',
            url: 'https://url.com/',
            linkedin: 'https://linkedin.com/xx',
            github: 'https://github.com/xxx',
            avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          },
          {
            id: 'xxxx3',
            name: 'first last',
            bio: 'xx',
            url: 'https://url.com/',
            linkedin: 'https://linkedin.com/xx',
            github: 'https://github.com/xxx',
            avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          },
          {
            id: 'xxxx4',
            name: 'first last',
            bio: 'xx',
            url: 'https://url.com/',
            linkedin: 'https://linkedin.com/xx',
            github: 'https://github.com/xxx',
            avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          },
          {
            id: 'xxxx5',
            name: 'first last',
            bio: 'xx',
            url: 'https://url.com/',
            linkedin: 'https://linkedin.com/xx',
            github: 'https://github.com/xxx',
            avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          },
          {
            id: 'xxxx6',
            name: 'first last',
            bio: 'xx',
            url: 'https://url.com/',
            linkedin: 'https://linkedin.com/xx',
            github: 'https://github.com/xxx',
            avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          },
          {
            id: 'xxxx7',
            name: 'first last',
            bio: 'xx',
            url: 'https://url.com/',
            linkedin: 'https://linkedin.com/xx',
            github: 'https://github.com/xxx',
            avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          },
          {
            id: 'xxxx8',
            name: 'first last',
            bio: 'xx',
            url: 'https://url.com/',
            linkedin: 'https://linkedin.com/xx',
            github: 'https://github.com/xxx',
            avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
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
      <MockedProvider addTypename={false} mocks={mocksProfiles}>
        <Profiles />
      </MockedProvider>
    )
    await new Promise((resolve) => setTimeout(resolve, 20))
    wrapper.update()
  })
  return wrapper
}

describe('Profiles component', () => {
  let wrapper
  beforeEach(async () => {
    wrapper = await setUp()
  })

  it('renders', () => {
    expect(wrapper).not.toBeNull()
  })

  it('renders header', () => {
    const pagetitle = wrapper.find('h1')
    expect(pagetitle.length).toBe(1)
  })

  it('renders page image', () => {
    const pageimg = wrapper.find('.pageimg')
    expect(pageimg.length).toBe(1)
  })

  it('renders profiles', () => {
    const profiles = wrapper.find('.profile')
    expect(profiles.length).toBe(9)
  })

  it('renders profiles image', () => {
    const profile = wrapper.find('.profile')
    const image = profile.find('.profilepicture')
    expect(image.length).toBe(9)
  })

  it('renders profiles name', () => {
    const profile = wrapper.find('.profile')
    const name = profile.find('.name')
    expect(name.length).toBe(9)
  })

  it('renders profiles title', () => {
    const profile = wrapper.find('.profile')
    const title = profile.find('.title')
    expect(title.length).toBe(9)
  })
  it('renders profiles text', () => {
    const profile = wrapper.find('.profile')
    const text = profile.find('.text')
    expect(text.length).toBe(9)
  })
  it('renders profiles socials', () => {
    const profile = wrapper.find('.profile')
    const socials = profile.find('.socials')
    expect(socials.length).toBe(9)
  })
})


describe('Profiles errors', () => {
  it('should cant load', async () => {
    const errorMock = [
      {
        request: {query: GET_PROFILES,},
        error: new Error('An error occurred'),
      },
    ]

    let wrapper
    await act(async () => {
      wrapper = mount(
        <MockedProvider addTypename={false} mocks={errorMock}>
          <Profiles />
        </MockedProvider>
      )
      await new Promise((resolve) => setTimeout(resolve, 20))
      wrapper.update()
    })

    const error = wrapper.find('.error')
    expect(error.text()).toContain('Error: cant load profiles')
  })

  it('should empty', async () => {
    const emptyMocks = [
      {
        request: {query: GET_PROFILES},
        result: {data: {profiles: [],},},
      },
    ]

    let wrapper
    await act(async () => {
      wrapper = mount(
        <MockedProvider addTypename={false} mocks={emptyMocks}>
          <Profiles />
        </MockedProvider>
      )
      await new Promise((resolve) => setTimeout(resolve, 20))
      wrapper.update()
    })

    const error = wrapper.find('.error')
    expect(error.text()).toContain('profiles is empty')
  })
})