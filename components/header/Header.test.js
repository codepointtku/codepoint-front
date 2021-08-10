import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Header from './Header'
import Image from 'next/image'

Enzyme.configure({adapter: new Adapter()})

const setUp = () => {
  const wrapper = shallow(<Header />)
  return wrapper
}

describe('Header component', () => {
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
