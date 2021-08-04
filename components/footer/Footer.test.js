import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Footer from './Footer'

Enzyme.configure({adapter: new Adapter()})

const setUp = (props = {}) => {
  const wrapper = shallow(<Footer {...props} />)
  return wrapper
}

describe('Footer', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setUp()
  })
  it('renders', () => {
    expect(wrapper).not.toBeNull()
  })
})
