import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Repos from './Repos'

Enzyme.configure({adapter: new Adapter()})

const setUp = (
  props = {
    repos: [
      {
        node: {
          description: 'xxx',
          homepageUrl: '',
          id: 'xxx',
          name: 'xxx',
          url: 'https://github.com/xxx/xxx',
        },
      },
      {
        node: {
          description: 'xxx',
          homepageUrl: '',
          id: 'xxx',
          name: 'xxx',
          url: 'https://github.com/xxx/xxx',
        },
      },
      {
        node: {
          description: 'xxx',
          homepageUrl: '',
          id: 'xxx',
          name: 'xxx',
          url: 'https://github.com/xxx/xxx',
        },
      },
      {
        node: {
          description: 'xxx',
          homepageUrl: '',
          id: 'xxx',
          name: 'xxx',
          url: 'https://github.com/xxx/xxx',
        },
      },
      {
        node: {
          description: 'xxx',
          homepageUrl: '',
          id: 'xxx',
          name: 'xxx',
          url: 'https://github.com/xxx/xxx',
        },
      },
      {
        node: {
          description: 'xxx',
          homepageUrl: '',
          id: 'xxx',
          name: 'xxx',
          url: 'https://github.com/xxx/xxx',
        },
      },
    ],
  }
) => {
  const wrapper = shallow(<Repos {...props} />)
  return wrapper
}

describe('Repos component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setUp()
  })

  it('should render component', () => {
    expect(wrapper).not.toBeNull()
  })

  it('renders header', () => {
    const pagetitle = wrapper.find('h1')
    expect(pagetitle.length).toBe(1)
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

  it('renders corner styling', () => {
    const projects = wrapper.find('.card')
    const cornerstyle = projects.find('.cornerstyle')
    expect(cornerstyle.length).toBe(6)
  })
})
