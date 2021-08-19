import Head from 'next/head'
import dynamic from 'next/dynamic'
import {InferGetServerSidePropsType} from 'next'
import styles from '../styles/Home.module.scss'

import About from '../components/about/About'
import Header from '../components/header/Header'
import Repositories from '../components/repos/Repos'
import Profiles from '../components/profiles/Profiles'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Nav from '../components/nav/Nav'

const DynamicFooter = dynamic(() => import('../components/footer/Footer'))

// eslint-disable-next-line no-unused-vars
export default function Home({_nextI18Next}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>CodepointTKU Projects</title>
        <meta
          name="description"
          content="List of projects, current events and achievements of Codepoint Turku"
        />
        <link rel="icon" href="/favicon.webp" />
      </Head>
      <Header />
      <main className={styles.main}>
        <About />
        <Repositories />
        <Profiles />
      </main>
      <DynamicFooter />
      <Nav/>
    </div>
  )
}

export async function getServerSideProps({locale}: any) {
  return {props: {...(await serverSideTranslations(locale, ['common', 'footer']))}}
}
