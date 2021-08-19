const {i18n} = require('./next-i18next.config')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  images: {domains: ['avatars.githubusercontent.com']},
  i18n,
  pwa: {
    dest: 'public',
    runtimeCaching
  },
})
