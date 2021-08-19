import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {appWithTranslation} from 'next-i18next'
import NextI18nextConfig from '../next-i18next.config'
import {ApolloProvider} from '@apollo/client'
import client from '../apollo-client'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default appWithTranslation(MyApp, NextI18nextConfig)
