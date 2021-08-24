import Repos from '../components/repos/Repos'
import dynamic from 'next/dynamic'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Header from '../components/header/Header'
import Nav from '../components/nav/Nav'
import {useRouter} from 'next/dist/client/router'

const DynamicFooter = dynamic(() => import('../components/footer/Footer'))

export default function Projects() {
  const route = useRouter().pathname
  return (
    <>
      <Head>
        <title>CodepointTKU Projects</title>
        <meta
          name="description"
          content="List of projects, current events and achievements of Codepoint Turku"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header route={route} />
      <Repos />
      <DynamicFooter />
      <Nav route={route} />
    </>
  )
}

export async function getServerSideProps({locale}: any) {
  return {props: {...(await serverSideTranslations(locale, ['common', 'footer']))}}
}
