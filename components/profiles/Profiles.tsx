import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'

export default function Profiles({team}: any) {
  const {t} = useTranslation(["common"])
  const title = <h1 className={styles.title}>{t("members")}</h1>
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Profiles({team}: any) {
  const title = <h1 className={styles.title} id="members">Members</h1>
  const profile = team.map((team: teamData) => (
    <a key={team.node.id} href={team.node.url} className={styles.profile}>
      <Image
        src={team.node.avatarUrl}
        alt="A profile picture"
        width={128}
        height={128}
        quality={50}
      />
      <div className={styles.memberinfo}>
        <h2 className={styles.heading}>{team.node.name}</h2>
      </div>
      <p className={styles.text}>{team.node.bio}</p>
    </a>
  ))
  return (
    <>
      {title}
      <div className={styles.grid}>{profile}</div>
    </>
  )
}
}

type teamData = {
  node: {
    id: string
    name: string
    bio: string
    url: string
    avatarUrl: string
  }
}
