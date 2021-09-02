# Testing

Testing is used to make sure the code does what it is supposed to do. This project uses two different utilities, [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) for that purpose. You should definetly follow the links provided to find more in-depth coverage on how the utilities work and how to use them.

#### [Jest](https://jestjs.io/)
Jest is an easy to use JavaScript Testing Framework. It provides you with code coverage, great context to why your test failed, and more.

#### [Enzyme](https://enzymejs.github.io/enzyme/)
With Enzyme you can test your components output. Enzyme's API mimicks jQuery's API for DOM manipulation and traversal.

## Testing with Jest and Enzyme

It is common practice to place the test files in the same folder as the file/component they are testing. They should also be named like the component. For example the component `Header.tsx` should have a test file `Header.test.js` in the same folder.

A typical test flow would look something like this:
1. Import the function or component you want to test
2. Offer some input to the function or component
3. Define what you are expecting as the output from that function
4. Check if the output is what you expected

Testing a function in a component example:
```tsx
// function inside ComponentX
function sum(x, y) {
  return x + y
  }
```
```js
// import the function
import { sum } from './ComponentX.tsx'

// the describe block groups the tests within it together
describe('ComponentX function tests', () => {
  // it is an alias for the test method
  it('tests the sum function', () => {
    // offer test input to your function and tell what you expect it to do
    expect(sum(1,3)).toBe(4)
  })
})
```
Guides and more information on writing your own tests can be found in the Jest [documentation](https://jestjs.io/docs/getting-started) and [API](https://jestjs.io/docs/api) pages.

### Running tests and coverage using command line:
* `npm run test` Runs all of the tests
* `npm run test FileX.test.js` or `npm run test FileX` Runs the tests contained in that test file
* `npm run coverage` Check if all of the code lines in all of the tested files are covered by tests.
* `npm run coverage FileX.test.js` or `npm run coverage FileX` Checks if all of the code lines in the single tested file are covered by tests.
You should always aim to have your code coverage to be at a 100%
Additional commands and options can be found [here.](https://jestjs.io/docs/cli)

### Using Enzyme
To use Enzyme, you need to install it along with an adapter for the corresponding React version. Since our project is currently using React version 17.0.2, but there is not yet an official adapter for it, the project is using [an unofficial adapter version.](https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17)

In the testing file you want to use Enzyme's utilities in, you need to import and cofigure it and the adapter you want to use:
```js
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ComponentX from './ComponentX.tsx'
// when testing if nested components are rendering, for example the Next.js <Link /> or any of your own components, you also need to import them
import Link from 'next/link'

// configure the adapter
Enzyme.configure({ adapter: new Adapter() });
```

Enzyme has three types of rendering methods: [Shallow](https://enzymejs.github.io/enzyme/docs/api/shallow.html), [Full](https://enzymejs.github.io/enzyme/docs/api/mount.html) and [Static](https://enzymejs.github.io/enzyme/docs/api/render.html) rendering. Each have different uses, so you can select the ones that suits your needs the best. To use them, import the ones you want to use with Enzyme:
```js
// shallow = shallow rendering
// mount = full rendering
// render = static rendering
import Enzyme, { shallow, mount, render } from 'enzyme';
```

### Testing multiple DOM elements
If you have multiple elements that need testing, and you need to render the component before each test, you can use Enzyme's rendering methods with Jest's [beforeEach function](https://jestjs.io/docs/setup-teardown):

```js
const setUp = () => {
  // uses the shallow rendering method to wrap the tested component
  const wrapper = shallow(<Header />)
  return wrapper
}

describe('Header component', () => {
  let wrapper
  // renders the component before each test using the setUp function
  beforeEach(() => {
    wrapper = setUp()
  })
  
  it('renders the component', () => {
    expect(wrapper).not.toBeNull()
  })
  
  //...more tests
  }
```

### Testing a single DOM element
If you want to render the component you are testing with different props or just need to render it in one test, you can do it as well. In this example we are rendering component that has an element with a conditional class name:

```tsx
// the Header component has an element that has different styles depending on the route prop
export default function Header({route}) {
  return(
    <ul>
      <li className={route === '/members' ? styles.menu_item_selected : styles.menu_item}>
        Menu Item
      </li>
    </ul>
  )};
```

You can test that element by rendering the component using your chosen rendering method:
```js
describe('Header component', () => {
it('members_selected', () => {
    // render the component. In this case you should also pass the prop value that you want to test
    const wrap = mount(<Header route="/members" />)
    // find the element you want to test
    const element = wrap.find('li').at(0)
    // test the condition
    expect(element.prop('className')).toBe('menu_item_selected')
  })
  };
```
For more information on Enzyme and its usage, visit their [documentation pages](https://enzymejs.github.io/enzyme/).

## Testing with other packages
When installing new packages to the project, you should be aware that some of them change the way things work. 

For example: this project uses GraphQL and Apollo Client for fetching with queries. In the `_app.tsx` file every component is wrapped with the `<ApolloProvider />` component. In tests you can achieve the same by wrapping the tested component with the `<MockedProvider />` component instead. You should do this when testing any component that fetches data using queries. Below is an example of how to wrap the tested component in the `<MockedProvider />` component:

```js
// import the wrapper component from Apollo Client
import {MockedProvider} from '@apollo/client/testing'

// setup the component being tested
const setUp = async () => {
  let wrapper
  await act(async () => {
    /* wrap the component you want to test in MockedProvider 
    and give it the mock data as props and set addTypename to false */
    wrapper = mount(
      <MockedProvider addTypename={false} mocks={mocksReposData}>
        <Repos />
      </MockedProvider>
    )
    // waits for the response
    await new Promise((resolve) => setTimeout(resolve, 20))
    // syncs the enzyme component tree with the react component tree
    wrapper.update()
  })
  return wrapper
}

describe('Repos component', () => {
  let wrapper
  // before each test, render the component using the setup function
  beforeEach(async () => {
    wrapper = await setUp()
  })
  // ... tests
}
```
More information on testing with Apollo Client can be found [here](https://www.apollographql.com/docs/react/v2/development-testing/testing/). 

If you have to test a feature that comes from some package, you should check out if it has its own testing utilitiest.


## Example usage from the project
Below you can see the `Repos.tsx` component and the test file for it. The explanations are commented in the files. Some explanations for the queries or translations are not included. If you are interested in how they work, please refer to the Queries and Translations documentation pages. 

### The Repos component:

```tsx
import {useQuery} from '@apollo/client'
import {useTranslation} from 'next-i18next'
import {GET_PROJECTS} from '../../graphql/graphql'
import {repoData} from '../../graphql/types/ProjectData'
import styles from '../../styles/Home.module.scss'

export default function Repositories() {
  const {t} = useTranslation(['common'])
  const {data, loading, error} = useQuery(GET_PROJECTS)

  if (loading) return <h2 className={styles.loading}>Loading...</h2>
  if (error) return <h2 className={styles.error}>Error: cant load projects</h2>

  const repos = data.projects
  if (repos.length < 1) return <h2 className={styles.error}>projects is empty</h2>

  const title = (
    <h1 className={styles.repos_pagetitle} id="projects">
      <a href="https://github.com/codepointtku" rel="noreferrer" target="_blank">
        {t('projects')}
      </a>
    </h1>
  )
  const repositories = repos.map((repos: repoData) => (
    <a key={repos.id} href={repos.url} className={styles.repos_card}>
      <div className={styles.repos_cornerstyle} />
      <h2 className={styles.repos_heading}>{repos.name}</h2>
      <p className={styles.repos_text}>{repos.description}</p>
    </a>
  ))
  return (
    <>
      {title}
      <div className={styles.repos_grid}>{repositories}</div>
    </>
  )
}

```
### The test file:

```js
// import Enzyme with the mount rendering method and the adapter for Enzyme
import Enzyme, {mount} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

// the MockedProvider makes Apollo Client available for the components testing
// it should be imported in every file that uses queries
import {MockedProvider} from '@apollo/client/testing'

/* the act helper function makes the tests 
run closer to what real users would experience while using the application */
import {act} from 'react-dom/test-utils'

// import the component that is tested
import Repos from './Repos'

// import the query used in the component
import {GET_PROJECTS} from '../../graphql/graphql'


// configure the enzyme adapter
Enzyme.configure({adapter: new Adapter()})

// mocks the data returned by the GET_PROJECTS query
const mocksReposData = [
  {
    request: {query: GET_PROJECTS},
    result: {
      data: {
        projects: [
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx1',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx2',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx3',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx4',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx5',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
          {
            description: 'xxx',
            homePageUrl: '',
            id: 'xxx6',
            name: 'xxx',
            url: 'https://github.com/xxx/xxx',
          },
        ],
      },
    },
  },
]

// setup the component being tested
const setUp = async () => {
  let wrapper
  await act(async () => {
    /* wrap the component you want to test in MockedProvider 
    and give it the mock data as props and set addTypename to false */
    wrapper = mount(
      <MockedProvider addTypename={false} mocks={mocksReposData}>
        <Repos />
      </MockedProvider>
    )
    // waits for the response
    await new Promise((resolve) => setTimeout(resolve, 20))
    // syncs the enzyme component tree with the react component tree
    wrapper.update()
  })
  return wrapper
}

// a test block to test DOM elements
describe('Repos component', () => {
  let wrapper
  // before each test, render the component using the setup function
  beforeEach(async () => {
    wrapper = await setUp()
  })
  it('should render component', () => {
    // test if the component is not null
    expect(wrapper).not.toBeNull()
  })
  it('renders header', () => {
    // find every 'h1' element
    const pagetitle = wrapper.find('h1')
    // test if the element rendered the correct amount of times
    expect(pagetitle.length).toBe(1)
  })

  it('projects should be found', () => {
    // find the elements with the className of 'repos_card'
    const projects = wrapper.find('.repos_card')
    // test if the elements rendered the correct amount of times
    expect(projects.length).toBe(6)
  })

  it('projects names should be found', () => {
    // find the elements with the className of 'repos_card'
    const projects = wrapper.find('.repos_card')
    // find the elements with the className of 'repos_heading' within the 'repos_card' element
    const name = projects.find('.repos_heading')
    // test if the elements rendered the correct amount of times
    expect(name.length).toBe(6)
  })

  it('projects description should be found', () => {
    // find the elements with the className of 'repos_card'
    const projects = wrapper.find('.repos_card')
    // find the elements with the className of 'repos_text' within the 'repos_card' element
    const description = projects.find('.repos_text')
    // test if the elements rendered the correct amount of times
    expect(description.length).toBe(6)
  })

  it('renders corner styling', () => {
    // // find the elements with the className of 'repos_card'
    const projects = wrapper.find('.repos_card')
    // find the elements with the className of 'repos_cornerstyle' within the 'repos_card' element
    const cornerstyle = projects.find('.repos_cornerstyle')
    // test if the elements rendered the correct amount of times
    expect(cornerstyle.length).toBe(6)
  })
})

// a test block to test query errors
describe('projects errors', () => {
  it('should cant load', async () => {
    // mocks a response where the response is an error
    const errorMock = [
      {
        request: {query: GET_PROJECTS},
        error: new Error('An error occurred'),
      },
    ]

    let wrapper
    /* wrap the component you want to test in MockedProvider 
    and give it the mock data as props and set addTypename to false */
    await act(async () => {
      wrapper = mount(
        <MockedProvider addTypename={false} mocks={errorMock}>
          <Repos />
        </MockedProvider>
      )
      // waits for the response
      await new Promise((resolve) => setTimeout(resolve, 20))
      // syncs the enzyme component tree with the react component tree
      wrapper.update()
    })
    // tests if the error condition is true and if the element with the style 'error' is rendered
    const error = wrapper.find('.error')
    // tests if the element renders the text 'Error: cant load projects'
    expect(error.text()).toContain('Error: cant load projects')
  })

  it('should empty', async () => {
    // mocks a response where the returned array is empty
    const emptyMocks = [
      {
        request: {query: GET_PROJECTS},
        result: {data: {projects: []}},
      },
    ]

    let wrapper
    /* wrap the component you want to test in MockedProvider 
    and give it the mock data as props and set addTypename to false */
    await act(async () => {
      wrapper = mount(
        <MockedProvider addTypename={false} mocks={emptyMocks}>
          <Repos />
        </MockedProvider>
      )
      // waits for the response
      await new Promise((resolve) => setTimeout(resolve, 20))
      // syncs the enzyme component tree with the react component tree
      wrapper.update()
    })
    // tests if the error condition is true and if the element with the style 'error' is rendered
    const error = wrapper.find('.error')
    // tests if the element renders the text 'projects is empty'
    expect(error.text()).toContain('projects is empty')
  })
})

```
