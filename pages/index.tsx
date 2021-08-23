import Head from 'next/head'
import dynamic from 'next/dynamic'
import {InferGetServerSidePropsType} from 'next'
import styles from '../styles/Home.module.scss'
// import About from '../components/about/About'
// import Header from '../components/header/Header'
// import Repositories from '../components/repos/Repos'
// import Profiles from '../components/profiles/Profiles'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Nav from '../components/nav/Nav'

const DynamicFooter = dynamic(() => import('../components/footer/Footer'))
const DynamicHeader = dynamic(() => import('../components/header/Header'))
const DynamicAbout = dynamic(() => import('../components/about/About'))
// eslint-disable-next-line
const DynamicRepositories = dynamic(() => import('../components/repos/Repos'),{loading: () => <p>...</p>})
// eslint-disable-next-line
const DynamicProfiles = dynamic(() => import('../components/profiles/Profiles'),{loading: () => <p>...</p>})

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
      <DynamicHeader />
      <main className={styles.main}>
        <DynamicAbout />
        <DynamicRepositories />
        <DynamicProfiles />
      </main>
      <DynamicFooter />
      <Nav/>
    </div>
  )
}

export async function getServerSideProps({locale}: any) {
  return {props: {...(await serverSideTranslations(locale, ['common', 'footer']))}}
}