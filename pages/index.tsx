import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.scss'
import About from '../components/about/About'
import Header from '../components/header/Header'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Nav from '../components/nav/Nav'

const DynamicFooter = dynamic(() => import('../components/footer/Footer'))

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CodepointTKU</title>
        <meta
          name="description"
          content="List of projects, current events and achievements of Codepoint Turku"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <About />
      </main>
      <DynamicFooter />
      <Nav />
    </div>
  )
}

export async function getServerSideProps({locale}: any) {
  return {props: {...(await serverSideTranslations(locale, ['common', 'footer']))}}
}
