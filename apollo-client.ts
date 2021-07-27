import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

const link = createHttpLink({uri: 'https://api.github.com/graphql'})

const authLink = setContext((_, {headers}) => {
  const token = process.env.TOKEN
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
})

export default client
