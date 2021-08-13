import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export default function Nav() {
    const router = useRouter()

    return (
        <nav className={styles.nav}>
            <Link href='#about'>
                <a className={styles.tabBtn} id='about_image'>
                    <Image 
                        src="/info-solid.svg"
                        alt="About us"
                        id="about_icon"
                        width={30}
                        height={30}
                    />
                    <p>About Us</p>
                </a>
            </Link>
            <Link href='#projects'>
                <a className={styles.tabBtn} id='projects_image'>
                    
                    <Image 
                        src="/icons8-project.svg"
                        alt="Projects"
                        id="projects-icon"
                        width={30}
                        height={30}
                    />
                    <p>Projects</p>
                </a>
            </Link>
            <Link href='#members'>
                <a className={styles.tabBtn} id='members_image'>
                
                    <Image
                        src="/users-solid.svg"
                        alt="Members"
                        id="members-icon"
                        width={30}
                        height={30}
                    />
                    <p className={styles.nav_text}>Members</p>
                </a>
            </Link>
        </nav>
    )
}