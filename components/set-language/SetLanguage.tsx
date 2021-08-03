import {useRouter} from 'next/dist/client/router'
import {useTranslation} from 'next-i18next'

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
    <select onChange={changeLanguage} defaultValue={locale}>
      <option value="en">{t('en')}</option>
      <option value="fi">{t('fi')}</option>
    </select>
  )
}

export default SetLanguage
