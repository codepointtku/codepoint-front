import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Link from 'next/link'
import SetLanguage from '../set-language/SetLanguage'
import {useTranslation} from 'next-i18next'

interface HeaderProps {
  route: string
}

export default function Header({route}: HeaderProps) {
  const {t} = useTranslation(['common'])
  return (
    <header className={styles.header} id="about">
      <Link href="/" passHref>
        <a data-test="logo">
          <Image
            src="/codepoint_logo_lapinakyva2.svg"
            alt="CodePoint logo"
            width={160}
            height={23}
            layout="intrinsic"
            quality={60}
            priority
          />
        </a>
      </Link>
      <ul className={styles.menu}>
        <li className={route === '/' ? styles.menu_item_selected : styles.menu_item}>
          <Link href="/" passHref>
            <a data-test="home-link">{t('aboutus')}</a>
          </Link>
        </li>
        <li className={route === '/projects' ? styles.menu_item_selected : styles.menu_item}>
          <Link href="/projects" passHref>
            <a data-test="projects-link">{t('projects')}</a>
          </Link>
        </li>
        <li className={route === '/members' ? styles.menu_item_selected : styles.menu_item}>
          <Link href="/members" passHref>
            <a data-test="members-link">{t('members')}</a>
          </Link>
        </li>
      </ul>

      <div className={styles.btn_container}>
        <SetLanguage />
      </div>
    </header>
  )
}
