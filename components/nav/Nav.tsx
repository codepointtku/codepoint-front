import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.scss'

interface NavProps {
  route: string
}

export default function Nav({route}: NavProps) {
  const {t} = useTranslation(['common'])
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={route === '/' ? styles.tabBtn_selected : styles.tabBtn} id="about_image">
          <Image
            src={route === '/' ? '/info-solid-orange.svg' : '/info-solid.svg'}
            alt="About us"
            id="about_icon"
            width={30}
            height={30}
          />
          <p>{t('aboutus')}</p>
        </a>
      </Link>
      <Link href="/projects">
        <a
          className={route === '/projects' ? styles.tabBtn_selected : styles.tabBtn}
          id="projects_image">
          <Image
            src={route === '/projects' ? '/project-orange.svg' : '/project.svg'}
            alt="Projects"
            id="projects-icon"
            width={30}
            height={30}
          />
          <p>{t('projects')}</p>
        </a>
      </Link>
      <Link href="/members">
        <a
          className={route === '/members' ? styles.tabBtn_selected : styles.tabBtn}
          id="members_image">
          <Image
            src={route === '/members' ? '/users-solid-orange.svg' : '/users-solid.svg'}
            alt="Members"
            id="members-icon"
            width={30}
            height={30}
          />
          <p>{t('members')}</p>
        </a>
      </Link>
    </nav>
  )
}
