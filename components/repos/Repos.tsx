import {useTranslation} from 'next-i18next'
import styles from '../../styles/Home.module.scss'
import Link from 'next/link'

export default function Repositories({repos}: any) {
  const {t} = useTranslation(['common'])
  const title = (
    <h1 className={styles.title} id='projects'>
      <a href="https://github.com/codepointtku" rel="noreferrer" target="_blank">
        {t('projects')}
      </a>
    </h1>
  )
  const repositories = repos.map((repos: repoData) => (
    <a key={repos.node.id} href={repos.node.url} className={styles.card}>
      <h2 className={styles.heading}>{repos.node.name}</h2>
      <p className={styles.text}>{repos.node.description}</p>
    </a>
  ))
  return (
    <>
      
      {title}
      <div className={styles.grid}>{repositories}</div>
      
    </>
  )
}

type repoData = {
  node: {
    id: string
    homepageUrl: string
    description: string
    name: string
    url: string
  }
}
