import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Footer from './Footer'
import Image from 'next/image'

Enzyme.configure({adapter: new Adapter()})

const setUp = () => {
  const wrapper = shallow(<Footer />)
  return wrapper
}

describe('Footer component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setUp()
  })

  it('renders', () => {
    expect(wrapper).not.toBeNull()
  })

  it('renders image', () => {
    const image = wrapper.find(Image)
    expect(image.length).toBe(1)
  })
})
