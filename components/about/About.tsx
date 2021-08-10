import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Työpiste from '../../public/tyopiste_logo.webp'
import { useRouter } from 'next/dist/client/router'

import en from './en'
import fi from './fi'


export default function About() {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === 'fi' ? fi : en
  return (
    <div className={styles.about}>
      <div className={styles.abouttext}>
        <h1 className={styles.title}>About us</h1>
        <p>
          {translation.about}
        </p>
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
