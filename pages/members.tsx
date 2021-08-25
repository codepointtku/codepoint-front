import Profiles from '../components/profiles/Profiles'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GET_PROFILES} from '../graphql/graphql'
import {initializeApollo, addApolloState} from '../lib/apolloClient'
import Layout from '../components/layouts/layout'

export default function Members() {
  return (
    <Layout>
      <Profiles />
    </Layout>
  )
}

export async function getStaticProps({locale}: any) {
  const apolloClient = initializeApollo()

  await apolloClient.query({query: GET_PROFILES})

  return addApolloState(apolloClient, {
    props: {...(await serverSideTranslations(locale, ['common', 'footer']))},
    revalidate: 60,
  })
}
