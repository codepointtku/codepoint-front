import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

const authLink = setContext((_, {headers}) => {
  const token = process.env.NEXT_PUBLIC_TOKEN
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({uri: GRAPHQL_URL});

const link = ApolloLink.from([authLink, httpLink]);


const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

export default client
