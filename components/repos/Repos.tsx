import styles from '../../styles/Home.module.scss'

export default function Repositories({repos}: any) {
  const title = (
    <h1 className={styles.title}>
      <a href="https://github.com/codepointtku" rel="noreferrer" target="_blank">
        Projects
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
