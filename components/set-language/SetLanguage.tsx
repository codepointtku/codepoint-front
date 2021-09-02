import {useRouter} from 'next/router'
import {useTranslation} from 'next-i18next'
import styles from '../../styles/Home.module.scss'
import Image from 'next/image'

//Component for changing language
const SetLanguage = () => {
  const {t} = useTranslation(['common'])
  const router = useRouter()
  const changeLanguage = (e: any) => {
    const locale = e.target.value
    router.push(router.pathname, router.asPath, {locale})
  }

  return (
    <div className={styles.btn_container}>
      <ul className={styles.dropdown}>
        {/* <button value="en" id="en" onClick={changeLanguage}>
          {t('en')}
        </button>
        <button value="fi" id="fi" onClick={changeLanguage}>
          {t('fi')}
        </button> */}
        {langs.map((lang) => 
          <button key={langs.indexOf(lang)} value={lang} id={lang} onClick={changeLanguage}>
            {t(lang)}
          </button>)}
        <div className={styles.languageimg}>
          <Image
            className={styles.image}
            src="/icons8-language-60-white.webp"
            alt="Language selection"
            width={60}
            height={60}
          />
        </div>
      </ul>
    </div>
  )
}

export default SetLanguage


const langs = [
  'fi', 'en', 'fr', 'ko', 'ar', 'vi'
]