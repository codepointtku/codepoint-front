import Repos from '../components/repos/Repos'
import dynamic from 'next/dynamic'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Header from '../components/header/Header'
import Nav from '../components/nav/Nav'

const DynamicFooter = dynamic(() => import('../components/footer/Footer'))

export default function Projects() {
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
      <Header />
      <Repos />
      <DynamicFooter />
      <Nav />
    </>
  )
}

export async function getServerSideProps({locale}: any) {
  return {props: {...(await serverSideTranslations(locale, ['common', 'footer']))}}
}
