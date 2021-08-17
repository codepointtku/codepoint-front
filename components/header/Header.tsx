import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Link from 'next/link'
import SetLanguage from '../set-language/SetLanguage'
import languageimg from '../../public/icons8-language-60-white.png'
import {useRouter} from 'next/dist/client/router'

export default function Header() {
  const router = useRouter()
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
        <li className={router.pathname === '/' ? styles.menu_item_selected : styles.menu_item}>
          <Link href="/">About Us</Link>
        </li>
        <li
          className={
            router.pathname === '/projects' ? styles.menu_item_selected : styles.menu_item
          }>
          <Link href="/projects">Projects</Link>
        </li>
        <li
          className={router.pathname === '/members' ? styles.menu_item_selected : styles.menu_item}>
          <Link href="/members">Members</Link>
        </li>
      </ul>
      <div className={styles.btn_container}>
        <ul className={styles.dropdown}>
          <Image src={languageimg} alt="Language selection" width={25} height={25} />
          <li className={styles.language}>
            <a href="#">English</a>
          </li>
          <li className={styles.language}>
            <a href="#">Suomi</a>
          </li>
        </ul>
      </div>
      <div>
        <SetLanguage />
      </div>
    </header>
  )
}
