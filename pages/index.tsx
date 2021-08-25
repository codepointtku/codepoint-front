import About from '../components/about/About'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Layout from '../components/layouts/layout'

export default function Home() {
  return (
    <Layout>
      <About />
    </Layout>
  )
}

export async function getStaticProps({locale}: any) {
  return {
    props: {...(await serverSideTranslations(locale, ['common', 'footer']))},
    revalidate: 60,
  }
}
