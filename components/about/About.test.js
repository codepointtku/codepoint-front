import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import About from './About'
import Image from 'next/image'

Enzyme.configure({adapter: new Adapter()})

const setUp = () => {
  const wrapper = shallow(<About />)
  return wrapper
}

describe('About component', () => {
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

  it('renders paragraph', () => {
    const title = wrapper.find('p')
    expect(title.length).toBe(1)
  })

  it('renders image', () => {
    const image = wrapper.find(Image)
    expect(image.length).toBe(1)
  })
})
