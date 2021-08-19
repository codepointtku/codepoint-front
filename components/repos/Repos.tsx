import {useQuery} from '@apollo/client'
import {useTranslation} from 'next-i18next'
import {GET_PROJECTS} from '../../graphql/graphql'
import {repoData} from '../../graphql/types/ProjectData'
import styles from '../../styles/Repos.module.scss'

export default function Repositories() {
  const {t} = useTranslation(['common'])
  const {data, loading, error} = useQuery(GET_PROJECTS)

  if(loading)
    return (<h2 className={styles.loading} >Loading...</h2>);
  if (error)
    return (<h2 className={styles.error} >Error: cant load projects</h2>);

  const repos = data.projects
  if (repos.length < 1)
    return (<h2 className={styles.error} >projects is empty</h2>);

  const title = (
    <h1 className={styles.pagetitle} id="projects">
      <a href="https://github.com/codepointtku" rel="noreferrer" target="_blank">
        {t('projects')}
      </a>
    </h1>
  )
  const repositories = repos.map((repos: repoData) => (
    <a key={repos.id} href={repos.url} className={styles.card}>
      <div className={styles.cornerstyle} />
      <h2 className={styles.heading}>{repos.name}</h2>
      <p className={styles.text}>{repos.description}</p>
    </a>
  ))
  return (
    <>
      {title}
      <div className={styles.grid}>{repositories}</div>
    </>
  )
}