import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Profiles from './Profiles'
import Image from 'next/image'

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
    const title = wrapper.find('h1')
    expect(title.length).toBe(1)
  })

  it('renders profiles', () => {
    const profiles = wrapper.find('.profile')
    expect(profiles.length).toBe(9)
  })

  it('renders profiles image', () => {
    const profile = wrapper.find('.profile')
    const image = profile.find(Image)
    expect(image.length).toBe(9)
  })

  it('renders profiles name', () => {
    const profile = wrapper.find('.profile')
    const name = profile.find('.memberinfo')
    expect(name.length).toBe(9)
  })

  it('renders profiles bio', () => {
    const profile = wrapper.find('.profile')
    const profileBio = profile.find('.text')
    expect(profileBio.length).toBe(9)
  })
})
