import Enzyme, {shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import SetLanguage from './SetLanguage'
import * as nextRouter from 'next/router'

const mockRouter = (nextRouter) => {
  nextRouter.useRouter = jest.fn()
  nextRouter.useRouter.mockImplementation(() => ({route: '/'}))
  nextRouter.useRouter.mockImplementation(() => ({push: jest.fn()}))
}
mockRouter(nextRouter)

Enzyme.configure({adapter: new Adapter()})

const setUp = () => {
  const wrapper = shallow(<SetLanguage />)
  return wrapper
}

describe('SetLanguage component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setUp()
  })

  it('renders', () => {
    expect(wrapper).not.toBeNull()
  })

  it('should find 2 option en/fi', () => {
    const listItems = [...wrapper.find('button')]
    expect(listItems[0].props.value).toEqual('en')
    expect(listItems[1].props.value).toEqual('fi')
  })

  it('changes language to en', () => {
    wrapper.find('#en').simulate('click', {target: {value: 'en', name: 'en'}})
    expect(wrapper).not.toBeNull()
  })
  it('changes language to fi', () => {
    wrapper.find('#fi').simulate('click', {target: {value: 'fi', name: 'fi'}})
    expect(wrapper).not.toBeNull()
  })
})
