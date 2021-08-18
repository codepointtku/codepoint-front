import {useQuery} from '@apollo/client'
import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import {GET_PROFILES} from '../../graphql/graphql'
import {teamData} from '../../graphql/types/ProfileData'
import styles from '../../styles/Profiles.module.scss'
import pageimg from '../../public/members.webp'
import github from '../../public/github.svg'
import linkedin from '../../public/linkedin.svg'
import earth from '../../public/earth.svg'

export default function Profiles() {
  const {t} = useTranslation(['common'])
  const {data, loading, error} = useQuery(GET_PROFILES)

  if (loading)
    return (<h2 className={styles.loading} >Loading...</h2>);
  if (error)
    return (<h2 className={styles.error} >Error: cant load profiles</h2>);

  const team = data.profiles
  if (team.length < 1)
    return (<h2 className={styles.error} >profiles is empty</h2>);

  const title = <h1 className={styles.pagetitle} id="profiles">{t('members')}</h1>
  const profile = team.map((team: teamData) => (
    <div className={styles.profile} key={team.node.id}>
      <div className={styles.profilepicture}>
        <Image src={team.node.avatarUrl} alt="A profile picture" layout="fill" />
      </div>
      <h2 className={styles.name}>{team.node.name}</h2>
      <p className={styles.title}>{team.node.bio}</p>
      <p className={styles.text}>
        {t('about')} + {t('about')}
      </p>
      <div className={styles.socials}>
        <a href={team.node.url}>
          <Image src={github} alt="github" />
        </a>
        <a href={'https://www.linkedin.com'}>
          <Image src={linkedin} alt="linkedin" />
        </a>
        <a href={team.node.url}>
          <Image src={earth} alt="earth" />
        </a>
      </div>
    </div>
  ))
  return (
    <>
      {title}
      <div className={styles.pageimg}>
        <Image src={pageimg} alt="members" />
      </div>
      <div className={styles.grid}>{profile}</div>
    </>
  )
}