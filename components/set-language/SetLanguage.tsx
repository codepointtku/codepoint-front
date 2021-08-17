import {useRouter} from 'next/dist/client/router'
import {useTranslation} from 'next-i18next'
import styles from '../../styles/Home.module.scss'

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
        <button value="en" className={styles.language} onClick={changeLanguage}>
          {t('en')}
        </button>
        <button value="fi" className={styles.language} onClick={changeLanguage}>
          {t('fi')}
        </button>
      </ul>
    </div>
  )
}

export default SetLanguage
