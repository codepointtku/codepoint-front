import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Työpiste from '../../public/tyopiste_logo.webp'
import {useTranslation} from 'next-i18next'
import Link from 'next/link'

export default function About() {
  const {t} = useTranslation(['common'])
  return (
    <Link href="/" passHref>
    <div className={styles.about}>
      <div className={styles.abouttext}>
        <h1 className={styles.title} id="about">{t('aboutus')}</h1>
        <p>{t('about')}</p>
      </div>
      <a href="https://www.turku.fi/tyopiste" rel="noreferrer" target="_blank">
        <Image
          src={Työpiste}
          alt="Työpisteen Logo"
          width={231}
          height={163}
          quality={50}
          priority
        />
      </a>
      <Image
        src="/about_us.svg"
        alt="About us picture"
        width={254}
        height={227}
      />
    </div>
    </Link>
  )
}