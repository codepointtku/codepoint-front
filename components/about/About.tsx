import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Työpiste from '../../public/tyopiste_logo.webp'

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.abouttext}>
        <h1 className={styles.title}>About us</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus blanditiis odit
          necessitatibus, rerum voluptates modi recusandae maiores doloribus. Itaque, ex!
          Aspernatur, recusandae voluptate. Quas similique, vero neque deserunt officiis in!
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
