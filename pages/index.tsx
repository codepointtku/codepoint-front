import Head from 'next/head'
import dynamic from 'next/dynamic'
import {InferGetServerSidePropsType} from 'next'
import styles from '../styles/Home.module.scss'

import {gql} from '@apollo/client'
import client from '../apollo-client'

import About from '../components/about/About'
import Header from '../components/header/Header'
import Repositories from '../components/repos/Repos'
import Profiles from '../components/profiles/Profiles'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Nav from '../components/nav/Nav'

const DynamicFooter = dynamic(() => import('../components/footer/Footer'))

export default function Home({
  repos,
  team,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        <Repositories repos={repos} />
        <Profiles team={team} />
      </main>
      <DynamicFooter />
      <Nav/>
    </div>
  )
}

export async function getServerSideProps({locale}: any) {
  const {data} = await client.query({
    query: gql`
      query Codepoint {
        organization(login: "codepointtku") {
          name
          description
          repositories(first: 6, orderBy: {field: PUSHED_AT, direction: DESC}) {
            edges {
              node {
                id
                homepageUrl
                description
                name
                url
              }
            }
          }
          team(slug: "Developers") {
            members(orderBy: {field: LOGIN, direction: ASC}) {
              edges {
                node {
                  id
                  name
                  bio
                  url
                  avatarUrl(size: 512)
                }
              }
            }
          }
        }
      }
    `,
  })

  return {
    props: {
      org: data.organization,
      repos: data.organization.repositories.edges,
      team: data.organization.team.members.edges,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}