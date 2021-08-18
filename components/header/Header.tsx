import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Link from 'next/link'
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
          <li>
            <a href="#">English</a>
          </li>
          <li>
            <a href="#">Suomi</a>
          </li>
          <div className={styles.test}>
            <Image
              className={styles.image}
              src="/icons8-language-60-white.webp"
              alt="Language selection"
              width={60}
              height={60}
            />
          </div>
        </ul>
      </div>
    </header>
  )
}
