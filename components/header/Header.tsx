import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Link from 'next/link'
import SetLanguage from '../set-language/SetLanguage'
import { useRouter } from 'next/router'

export default function Header() {

  const router = useRouter()
  
  return (
    <header className={styles.header} id='about'>
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
      <SetLanguage />
      
      <ul className={styles.menu}>
        <li className={styles.menu_item}>
          <a href='#about'>
            About Us
          </a>
        </li>
        <li className={styles.menu_item}>
          <a href='#projects' id='projects-text'>
            Projects
          </a>
        </li>
        <li className={styles.menu_item}>
          <a href='#members' id='members-text'>
            Members
          </a>
        </li>
      </ul>
      
      <div className={styles.btn_container}>
        <ul className={styles.dropdown}>
          <img 
            src="/icons8-language-60-white.png"
            alt="Language selection"
            width={25}
            height={25}
          />
          <li className={styles.language}><a href="#">English</a></li>
          <li className={styles.language}><a href="#">Suomi</a></li>
        </ul>
      </div>
    </header>
  )
}
