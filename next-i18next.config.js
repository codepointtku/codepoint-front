const Backend = require('i18next-http-backend')
module.exports = {
  i18n: {
    defaultLocale: 'fi',
    locales: ['fi', 'en'],
    backend: {
      loadPath: 'http://localhost:3000/api/locales/{{lng}}/{{ns}}',
      reloadInterval: 1000 * 60,
    },
  },
  debug: false,
  ns: ['common', 'footer'],
  serializeConfig: false,
  use: [Backend],
}
