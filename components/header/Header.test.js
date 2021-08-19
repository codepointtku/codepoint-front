import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Header from './Header'
import Image from 'next/image'
import * as nextRouter from 'next/router'
import Link from 'next/link'
import SetLanguage from '../set-language/SetLanguage'

const mockRouter = (nextRouter) => {
  nextRouter.useRouter = jest.fn()
  nextRouter.useRouter.mockImplementation(() => ({route: '/'}))
}
mockRouter(nextRouter)

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
  it('renders navigation list', () => {
    const link = wrapper.find(Link)
    expect(link.length).toBe(4)
  })
  it('renders list', () => {
    const lists = wrapper.find('li')
    expect(lists.length).toBe(3)
  })
  it('renders language bar', () => {
    const language = wrapper.find(SetLanguage)
    expect(language.length).toBe(1)
  })
})
