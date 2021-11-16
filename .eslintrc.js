module.exports = {
  extends: [
    '@codepointtku/jsx-eslint',
    'next',
    'next/core-web-vitals',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
  ],
  plugins: ['cypress'],
  env: {es6: true},
}
