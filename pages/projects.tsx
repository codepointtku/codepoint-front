// import styles from '../styles/Home.module.scss'
import Repos from '../components/repos/Repos'
import dynamic from 'next/dynamic'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import {gql} from '@apollo/client'
import client from '../apollo-client'
import Header from '../components/header/Header'
import Nav from '../components/nav/Nav'
import {InferGetServerSidePropsType} from 'next'

const DynamicFooter = dynamic(() => import('../components/footer/Footer'))

export default function Projects({repos}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {/* <div className={styles.container}> */}
      <Head>
        <title>CodepointTKU Projects</title>
        <meta
          name="description"
          content="List of projects, current events and achievements of Codepoint Turku"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <main className={styles.main}> */}
      <Repos repos={repos} />
      {/* </main> */}
      <DynamicFooter />
      <Nav />
      {/* </div> */}
    </>
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
