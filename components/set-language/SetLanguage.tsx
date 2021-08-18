import {useRouter} from 'next/dist/client/router'
import {useTranslation} from 'next-i18next'
import styles from '../../styles/Home.module.scss'
import Image from 'next/image'

//Dropdown list component for changing language
const SetLanguage = () => {
  const {t} = useTranslation(['common'])
  const router = useRouter()
  const {locale} = router
  const changeLanguage = (e: any) => {
    const locale = e.target.value
    router.push(router.pathname, router.asPath, {locale})
  }

  return (
    <div className={styles.btn_container}>
      <ul defaultValue={locale} className={styles.dropdown}>
        <button value="en" onClick={changeLanguage}>
          {t('en')}
        </button>
        <button value="fi" onClick={changeLanguage}>
          {t('fi')}
        </button>
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
