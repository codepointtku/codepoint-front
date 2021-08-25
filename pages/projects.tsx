import Repos from '../components/repos/Repos'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GET_PROJECTS} from '../graphql/graphql'
import {initializeApollo, addApolloState} from '../lib/apolloClient'
import Layout from '../components/layouts/layout'

export default function Projects() {
  return (
    <Layout>
      <Repos />
    </Layout>
  )
}

export async function getStaticProps({locale}: any) {
  const apolloClient = initializeApollo()

  await apolloClient.query({query: GET_PROJECTS})

  return addApolloState(apolloClient, {
    props: {...(await serverSideTranslations(locale, ['common', 'footer']))},
    revalidate: 60,
  })
}
