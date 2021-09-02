# Queries

To display people and the latest projects of the CodePoint team, the project gets the data from GitHub's API. To fetch exactly what we need, we have implemented [GraphQL](https://graphql.org/) and [Apollo Client](https://www.apollographql.com/docs/react/) to the project. While the Apollo Client package provides you with virtually everything you need to start using these two packages, the graphql package is needed to provide logic parsing for the GraphQL queries.

#### [GraphQL](https://graphql.org/)
GraphQL is a query language for APIs. One of its best features is that with GraphQL you can query for exactly what you need, which solves the issues of over and under-fetching.

#### [Apollo Client](https://www.apollographql.com/docs/react/)
Apollo Client lets you manage local and remote data with GraphQL. It provides you many features which help you to do so with ease.

## Using GraphQL and Apollo Client to fetch data
Here you can see how to add more queries, types and Next.js pages that use queries. There is also an example of how to use the returned data. For more in-depth information on those subjects and much more, please refer to the [Apollo Client documentation pages](https://www.apollographql.com/docs/react/).

### Configuration
Apollo Client can be configured in the `/lib/apolloClient.js` file. The `_app.tsx` page needs to be configured as well. To see how this project was configured, please refer to the [Example usage from the project](#example-usage-from-the-project) section.

### Adding new queries
New queries should be added to the `/graphql/graphql.ts` file. You need to wrap the query in strings in the `gql` function to parse them correctly.

```ts
import {gql} from '@apollo/client'

// wrap the query witihn the gql function with `strings`
export const GET_PROJECTS = gql`
  query projects {
    projects {
      id
      url
      name
      description
      homePageUrl
      example {
        text
        value
        statement
    }
  }
`
```

### Adding new types
Queries should also have their own types. Types allow you to describe what type of data is required. Types for each query should be seperated in to their own `.ts` files within the `/graphql/types/` folder.

```ts
export type repoData = {
  id: string
  url: string
  name: string
  description: string
  homepageUrl: string
  example: {
        text: string
        value: number
        statement: boolean
    }
}
```

### Adding functionality to a page
This section is only for pages that have components that fetch data using queries.
```tsx
import Repositories from '../components/repos/Repos'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Layout from '../components/layouts/layout'

// import the query you want to execute
import {GET_PROJECTS} from '../graphql/graphql'
/* import the Apollo initialization and state adding functions from
the apollo configuration file /lib/apolloClient.js */
import {initializeApollo, addApolloState} from '../lib/apolloClient'

// example page
export default function Projects() {
  return (
    <Layout>
      <Repositories />
    </Layout>
  )
}

// export the data fetching function you want to use
export async function getStaticProps({locale}: any) {
  // initialize the Apollo Client
  const apolloClient = initializeApollo()
  // Execute your query
  await apolloClient.query({query: GET_PROJECTS})

  // addApolloState adds the new state to pageProps so that it can be checked for differences
  return addApolloState(apolloClient, {
    /* the line below adds translations to the page. 
    For more information on that, please refer to the Translations documentation page */
    props: {...(await serverSideTranslations(locale, ['common', 'footer']))},
    // Amount in seconds after which the page regeneration can occur
    revalidate: 60,
  })
}
```

### Using the returned data

Apollo Client's `useQuery` hook returns an object that contains `loading`, `error` and `data` properties. Their values change depending on the state of the query. You can use the changing values to conditionally render your content.

```tsx
// import the hook
import {useQuery} from '@apollo/client'
// import the query you want to execute
import {GET_PROJECTS} from '../../graphql/graphql'
//import the types for the query
import {repoData} from '../../graphql/types/ProjectData'


export default function Repositories() {
  // destructure the properties for use
  const {data, loading, error} = useQuery(GET_PROJECTS)
  // conditionally render a message based on the state of the query
  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>Error: Can't load repositories</h2>
  const repos = data.projects
  // when the query is done and if there are no errors, handle the data and check the types
  const repositories = repos.map((repos: repoData) => (
    <a key={repos.id} href={repos.url}>
      <h2>{repos.name}</h2>
      <p>{repos.description}</p>
    </a>
  return (
    <h2>
      {/* Render the handled data */}
      {repositories}
    </h2>
  )
}
```


## Example usage from the project
Below you can find how the Apollo Client has been initialized in this project, how to add more queries and how to use them, as well as what is needed to add new components and pages. For more options, guides and general information on configuring Apollo, please visit their [documentation site.](https://www.apollographql.com/docs/)

### Configuring the Apollo Client

The Apollo Client can be configured in the `/lib/apolloClient.js` file. The configurations used in this project are shown below.
```js
import {useMemo} from 'react'
import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {concatPagination} from '@apollo/client/utilities'
import {setContext} from '@apollo/client/link/context';
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

// gets the servers url from your .env.local file
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

const authLink = setContext((_, {headers}) => {
  // gets the access token from your .env.local file if it exists
  const token = process.env.NEXT_PUBLIC_TOKEN
  // returns the headers to the context so that createHttpLink can read them
  return {
    headers: {
      ...headers,
      // if the access token exists, it is added to your heeaders
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

/*when using createHttpLink instead of the uri option
you can specify additional options when sending requests to the server */
const httpLink = createHttpLink({uri: GRAPHQL_URL,});


function createApolloClient() {
  return new ApolloClient({
    // when ssrMode is true, it prevents Apollo Client from reteching queries unnecessarily
    ssrMode: typeof window === 'undefined',
    // concats the authorization header with the http link with its options
    link: authLink.concat(httpLink),
    // InMemoryCache is used to cahce the query results after fetching them
    cache: new InMemoryCache({
    // typePolicies can be included in caches to customize their behaviors on type-by-type basis
      typePolicies: {
        Query: {
          fields: {
            /* concatPagination is a very basic pagination field policy that always concatenates new 
            results onto the existing array */
            profiles: concatPagination(),
            projects: concatPagination(),
          },
        },
      },
    }),
  })
}


export function initializeApollo(initialState = null) {
  // if the Apollo Client does not exist, creates the client
  const _apolloClient = apolloClient ?? createApolloClient()

  /* If your page has Next.js data fetching methods that use Apollo Client, the initial state
  gets hydrated here */
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

// adds the Apollo Client state to pageProps so that you can check if it has changed
export function addApolloState(client, pageProps) {
  if (pageProps?.props)
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  return pageProps
}

// used in pages/_app.js to pass the Apollo Client instance to different pages
export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  // the useMemo hook is used to update the Apollo Client instance only when the cache value has changed
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
```

The `_app.tsx` page also needs configuring, since is different from other pages.
```tsx
import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {appWithTranslation} from 'next-i18next'
import NextI18nextConfig from '../next-i18next.config'

// import the ApolloProvider that wraps the component
import {ApolloProvider} from '@apollo/client'
// import the useApollo function
import {useApollo} from '../lib/apolloClient'

function MyApp({Component, pageProps}: AppProps) {
  // useApollo is called to check if the pages state has changed
  const apolloClient = useApollo(pageProps)
  return (
    // the Apollo client is passed to different pages
    <ApolloProvider client={apolloClient}>
      {/* pageProps is an object with the initial props that were 
      preloaded for your page by the used data fething method (SSR or SSG) */}
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default appWithTranslation(MyApp, NextI18nextConfig)
```


### Setting up Apollo in pages

Apollo configuration in the `/projects` page that has a component (`Repos.tsx`) that fetches data using queries. The query imported is the same as the one in the [Adding new queries](#adding-new-queries) section without the example value. Same goes for the querys types.
```tsx
import Repos from '../components/repos/Repos'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Layout from '../components/layouts/layout'

// import the query you want
import {GET_PROJECTS} from '../graphql/graphql'
// import the Apollo initialization and state adding functions
import {initializeApollo, addApolloState} from '../lib/apolloClient'

export default function Projects() {
  return (
    <Layout>
      <Repos />
    </Layout>
  )
}

// export the data fetching function you want to use
export async function getStaticProps({locale}: any) {
  // initialize the Apollo Client
  const apolloClient = initializeApollo()
  /* Execute your query. Since this example is from the projects page, 
  the query being used is the same as shown before: GET_PROJECTS */
  await apolloClient.query({query: GET_PROJECTS})

  // addApolloState adds the new state to pageProps so that it can be checked for differences
  return addApolloState(apolloClient, {
    props: {...(await serverSideTranslations(locale, ['common', 'footer']))},
    // Amount in seconds after which the page regeneration can occur
    revalidate: 60,
  })
}
```

### Fetching and using the data in a component
To make the example a bit clearer, the styles and translations were removed. The query imported is the same as the one in the [Adding new queries](#adding-new-queries) section without the example value. Same goes for the querys types.
```tsx
// import the useQuery hook from apollo
import {useQuery} from '@apollo/client'
// import the query to be used with the hook
import {GET_PROJECTS} from '../../graphql/graphql'
// import the types for the query
import {repoData} from '../../graphql/types/ProjectData'

export default function Repositories() {
  // pass the query in to the useQuery function, and destructure its properties
  const {data, loading, error} = useQuery(GET_PROJECTS)
  // if the query is still loading, display a loading message on the page
  if (loading) return <h2>Loading...</h2>
  // if the query returns an error, display an error message on the page
  if (error) return <h2>Error: cant load projects</h2>
  const repos = data.projects
  // if there are no projects, display a message that informs the user of it
  if (repos.length < 1) return <h2>Projects is empty</h2>
  
  // handle the returned data and check the types
  const repositories = repos.map((repos: repoData) => (
    <a key={repos.id} href={repos.url}>
      <h2>{repos.name}</h2>
      <p>{repos.description}</p>
    </a>
  ))
  // Display the data
  return (
      <div>{repositories}</div>
  )
}
```