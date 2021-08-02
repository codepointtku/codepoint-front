import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Työpiste from '../../public/tyopiste_logo.webp'
import {useTranslation} from 'next-i18next'

export default function About() {
  const {t} = useTranslation(['common'])
  return (
    <div className={styles.about}>
      <div className={styles.abouttext}>
        <h1 className={styles.title}>{t('aboutus')}</h1>
        <p>{t('about')}</p>
      </div>
      <a href="https://www.turku.fi/tyopiste" rel="noreferrer" target="_blank">
        <Image
          src={Työpiste}
          alt="Työpisteen Logo"
          width={320}
          height={226}
          quality={50}
          priority
        />
      </a>
    </div>
  )
}
