import Image from 'next/image'
import styles from '../../styles/Home.module.css'

export default function Footer() {
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
        <p>© City of Turku</p>
        <p>PO 355, 20101 Turku</p>
        <p>Phone (02) 330 000</p>
        <a href="https://turku.fi">Turku.fi</a>
      </section>
      <div className={styles.footerinfo}>
        <a href="">Accessiblity Statement</a>
        <a href="">Report a Problem</a>
      </div>
    </footer>
  )
}
