import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

export default function Footer() {
  const {t} = useTranslation(['footer'])
  return (
    <footer className={styles.footer}>
      <section className={styles.footerlogo}>
        <Image
          src="/turku-abo-logo-black.webp"
          alt="City of Turku logo"
          width={155}
          height={110}
          layout="intrinsic"
          quality={70}
        />
        <p>{t('city')}</p>
        <p>{t('post')}</p>
        <p>{t('phone')}</p>
        <a href="https://turku.fi">Turku.fi</a>
      </section>
      <div className={styles.footerinfo}>
        <a href="">{t('accessibility')}</a>
        <a href="">{t('report')}</a>
      </div>
    </footer>
  )
}
