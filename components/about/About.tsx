import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Työpiste from '../../public/tyopiste_logo.webp'

import en from './en'
import fi from './fi'
import { useRouter } from 'next/dist/client/router'

export default function About() {

  const router = useRouter();
  const { locale } = router;
  const trans = locale === 'fi' ? fi : en;

  return (
    <div className={styles.about}>
      <div className={styles.abouttext}>
        <h1 className={styles.title}>About us</h1>
        <p>
          {trans.about}
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
