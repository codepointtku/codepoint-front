import {useQuery} from '@apollo/client'
import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import {GET_PROFILES} from '../../graphql/graphql'
import {teamData} from '../../graphql/types/ProfileData'
import styles from '../../styles/Home.module.scss'

export default function Profiles() {
  const {t} = useTranslation(['common'])
  const {data, loading, error} = useQuery(GET_PROFILES)

  if(loading)
    return (<h2 className={styles.loading} >Loading...</h2>);
  if (error)
    return (<h2 className={styles.error} >Error: cant load profiles</h2>);

  const team = data.profiles
  if (team.length < 1)
    return (<h2 className={styles.error} >profiles is empty</h2>);

  const title = <h1 className={styles.title}>{t('members')}</h1>
  const profile = team.map((team: teamData) => (
    <a key={team.id} href={team.github} className={styles.profile}>
      <Image
        src={team.avatarUrl}
        alt="A profile picture"
        width={128}
        height={128}
        quality={50}
      />
      <div className={styles.memberinfo}>
        <h2 className={styles.heading}>{team.name}</h2>
      </div>
      <p className={styles.text}>{team.description}</p>
    </a>
  ))
  return (
    <>
      {title}
      <div className={styles.grid}>{profile}</div>
    </>
  )
}