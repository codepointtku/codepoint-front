import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Profiles from './Profiles'

Enzyme.configure({adapter: new Adapter()})

const setUp = (
  props = {
    team: [
      {
        node: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          bio: 'xx',
          id: 'xxxx',
          name: 'first last',
          url: 'https://github.com/',
        },
      },
      {
        node: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          bio: 'xx',
          id: 'xxxx',
          name: 'first last',
          url: 'https://github.com/',
        },
      },
      {
        node: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          bio: 'xx',
          id: 'xxxx',
          name: 'first last',
          url: 'https://github.com/',
        },
      },
      {
        node: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          bio: 'xx',
          id: 'xxxx',
          name: 'first last',
          url: 'https://github.com/',
        },
      },
      {
        node: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          bio: 'xx',
          id: 'xxxx',
          name: 'first last',
          url: 'https://github.com/',
        },
      },
      {
        node: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          bio: 'xx',
          id: 'xxxx',
          name: 'first last',
          url: 'https://github.com/',
        },
      },
      {
        node: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          bio: 'xx',
          id: 'xxxx',
          name: 'first last',
          url: 'https://github.com/',
        },
      },
      {
        node: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          bio: 'xx',
          id: 'xxxx',
          name: 'first last',
          url: 'https://github.com/',
        },
      },
      {
        node: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/xxx',
          bio: 'xx',
          id: 'xxxx',
          name: 'first last',
          url: 'https://github.com/',
        },
      },
    ],
  }
) => {
  const wrapper = shallow(<Profiles {...props} />)
  return wrapper
}

describe('Profiles component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setUp()
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
