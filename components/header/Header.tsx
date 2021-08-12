import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Link from 'next/link'
import SetLanguage from '../set-language/SetLanguage'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <a>
          <Image
            src="/codepoint_logo_transparent.webp"
            alt="City of Turku logo"
            width={195}
            height={118}
            layout="intrinsic"
            quality={60}
            priority
          />
        </a>
      </Link>
      <SetLanguage />
    </header>
  )
}
