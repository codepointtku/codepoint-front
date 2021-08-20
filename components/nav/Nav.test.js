import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Nav from './Nav'
import Image from 'next/image'
import * as nextRouter from 'next/router'
import Link from 'next/link'

const mockRouter = (nextRouter) => {
  nextRouter.useRouter = jest.fn()
  nextRouter.useRouter.mockImplementation(() => ({route: '/'}))
}
mockRouter(nextRouter)

Enzyme.configure({adapter: new Adapter()})

const setUp = () => {
  const wrapper = shallow(<Nav />)
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

  it('renders images', () => {
    const lists = wrapper.find('a')
    expect(lists.length).toBe(3)
  })

  it('renders image', () => {
    const image = wrapper.find(Image)
    expect(image.length).toBe(3)
  })

  it('renders links', () => {
    const link = wrapper.find(Link)
    expect(link.length).toBe(3)
  })

  it('renders texts', () => {
    const language = wrapper.find('p')
    expect(language.length).toBe(3)
  })

  it('redners about style', () => {
    const element = wrapper.find('a').at(0)
    expect(element.prop('className')).toBe('tabBtn')
  })

  it('redners projects style', () => {
    const element = wrapper.find('a').at(1)
    expect(element.prop('className')).toBe('tabBtn')
  })

  it('redners members style', () => {
    const element = wrapper.find('a').at(2)
    expect(element.prop('className')).toBe('tabBtn')
  })

  it('redners about selected style', () => {
    const wrap = mount(<Nav route="/" />)
    const element = wrap.find('a').at(0)
    expect(element.prop('className')).toBe('tabBtn_selected')
  })

  it('redners projects selected style', () => {
    const wrap = mount(<Nav route="/projects" />)
    const element = wrap.find('a').at(1)
    expect(element.prop('className')).toBe('tabBtn_selected')
  })

  it('redners members selected style', () => {
    const wrap = mount(<Nav route="/members" />)
    const element = wrap.find('a').at(2)
    expect(element.prop('className')).toBe('tabBtn_selected')
  })

  it('redners about image', () => {
    const element = wrapper.find(Image).at(0)
    expect(element.prop('src')).toBe('/info-solid.svg')
  })

  it('redners projects image', () => {
    const element = wrapper.find(Image).at(1)
    expect(element.prop('src')).toBe('/project.svg')
  })

  it('redners members image', () => {
    const element = wrapper.find(Image).at(2)
    expect(element.prop('src')).toBe('/users-solid.svg')
  })

  it('redners about selected image', () => {
    const wrap = mount(<Nav route="/" />)
    const element = wrap.find(Image).at(0)
    expect(element.prop('src')).toBe('/info-solid-orange.svg')
  })

  it('redners projects selected image', () => {
    const wrap = mount(<Nav route="/projects" />)
    const element = wrap.find(Image).at(1)
    expect(element.prop('src')).toBe('/project-orange.svg')
  })

  it('redners members selected image', () => {
    const wrap = mount(<Nav route="/members" />)
    const element = wrap.find(Image).at(2)
    expect(element.prop('src')).toBe('/users-solid-orange.svg')
  })
})
