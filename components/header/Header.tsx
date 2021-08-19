import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Link from 'next/link'
import {useRouter} from 'next/dist/client/router'
import SetLanguage from '../set-language/SetLanguage'
import {useTranslation} from 'next-i18next'

export default function Header() {
  const router = useRouter()
  const route = router.pathname
  const {t} = useTranslation(['common'])
  return (
    <header className={styles.header} id="about">
      <Link href="/" passHref>
        <a>
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
          <Link href="/">{t('aboutus')}</Link>
        </li>
        <li className={route === '/projects' ? styles.menu_item_selected : styles.menu_item}>
          <Link href="/projects">{t('projects')}</Link>
        </li>
        <li className={route === '/members' ? styles.menu_item_selected : styles.menu_item}>
          <Link href="/members">{t('members')}</Link>
        </li>
      </ul>

      <div className={styles.btn_container}>
        <SetLanguage />
      </div>
    </header>
  )
}
