import Profiles from '../components/profiles/Profiles'
import dynamic from 'next/dynamic'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Header from '../components/header/Header'
import Nav from '../components/nav/Nav'
import {useRouter} from 'next/router'
import {GET_PROFILES} from '../graphql/graphql'
import {initializeApollo, addApolloState} from '../lib/apolloClient'

const DynamicFooter = dynamic(() => import('../components/footer/Footer'))

export default function Members() {
  const route = useRouter().pathname
  return (
    <>
      <Head>
        <title>CodepointTKU Members</title>
        <meta
          name="description"
          content="List of projects, current events and achievements of Codepoint Turku"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header route={route} />
      <Profiles />
      <DynamicFooter />
      <Nav route={route} />
    </>
  )
}

export async function getStaticProps({locale}: any) {
  const apolloClient = initializeApollo()

  await apolloClient.query({query: GET_PROFILES,})

  return addApolloState(apolloClient, {
    props: {...(await serverSideTranslations(locale, ['common', 'footer']))},
    revalidate: 60,
  })
}
