// import {TranslateCommon, TranslateFooter} from './pages/api/translator/translator'

// const TranslateCommon = require('./pages/api/translator/translator')
const Backend = require('i18next-http-backend')
module.exports = {
  i18n: {
    defaultLocale: 'fi',
    locales: ['fi', 'en', 'fr', 'ko', 'vi'],
    backend: {
      loadPath: 'http://localhost:3000/api/locales/{{lng}}/{{ns}}',
      parsePayload: function(namespace, key, fallbackValue){
        console.log("________________")
        console.log(namespace, key, fallbackValue)
        console.log("________________")

         return(
            { key } 
            )},


      reloadInterval: 1000 * 60,
    },
  },
  debug: true,
  ns: ['common', 'footer'],
  serializeConfig: false,
  use: [Backend],
}
