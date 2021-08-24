import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {appWithTranslation} from 'next-i18next'
import NextI18nextConfig from '../next-i18next.config'
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../lib/apolloClient'

function MyApp({Component, pageProps}: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default appWithTranslation(MyApp, NextI18nextConfig)
