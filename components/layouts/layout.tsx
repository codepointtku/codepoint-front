import dynamic from 'next/dynamic'
import Nav from '../nav/Nav'
import Header from '../header/Header'
import Head from 'next/head'
import {useRouter} from 'next/router'
import styles from '../../styles/Home.module.scss'

const DynamicFooter = dynamic(() => import('../footer/Footer'))

export default function Layout({children}: any) {
  const route = useRouter().pathname

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
      <Header route={route} />
      <main className={styles.main}>{children}</main>
      <DynamicFooter />
      <Nav route={route} />
    </div>
  )
}
