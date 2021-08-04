import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import About from './About'

Enzyme.configure({adapter: new Adapter()})

const setUp = (props = {}) => {
  const wrapper = shallow(<About {...props} />)
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
})
