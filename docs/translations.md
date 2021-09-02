# Translations

Internationalization and localization are used to adapt computer software to different languages and the technical requirements of a target locale. In our case this mostly means adapting the website to be usable in Finnish and English.

While Next.js already provides some of the needed features with its [internationalized routing](https://nextjs.org/docs/advanced-features/i18n-routing), this project uses three different packages to reach its localization and internationalization needs:

#### [i18next](https://www.i18next.com/)
i18next is an internationalization-framework. It has multiple plugins to for example:  detect the user language, load the translations and cache the translations.

#### [i18next-http-backend](https://github.com/i18next/i18next-http-backend)
This package is a plugin for i18next, and it can be used to load the translations from a remote server.

#### [next-i18next](https://github.com/isaachinman/next-i18next)
next-i18next is an i18next supported framework. It is used to handle the translation of the content and provides components/hooks for translation purposes.

## Adding and using translations
The steps below are guidlines on how to use translations in this project. For more in-depth information on how to use these features, please refer to the documentation pages linked above.

### Configuration
If more advanced configuration options are needed, they can be passed in the `next-i18next.config.js` file. For more information on what options are available and how to use them, please refer to the [next-i18next github page](https://github.com/isaachinman/next-i18next), and as all of the i18next options can be used as well, you should look in to [their documentation pages as well](https://www.i18next.com/overview/configuration-options).

### Adding a new locale/language
Add the new locale to the configuration file `next-i18next.config.js`:

```js
module.exports = {
  i18n: {
    ...
    // add the locale here. For example we could add the 'sv' locale
    locales: ['fi', 'en', 'sv'],
    ...
  },
  ...
};
```
Add a folder for the new locales translation files / namespaces in `/pages/api/locales/`. For example: `/pages/api/locales/sv/`.
If you already have other locales which have namespaces with translations, you need to add the same namespaces and the translations to this new locales folder as well. You can find more information about that in the [Adding a new translation file / namespace](#adding-a-new-translation-file--namespace) section below.


If you are going to use the `SetLanguage.tsx` component for changing languages, you also need to modify it, and its styles accordingly. For example in `/components/set-language/SetLanguage.tsx`:

```tsx
// you only need to add a new button for the new locale
return (
    <div className={styles.btn_container}>
      <ul className={styles.dropdown}>
        <button value="en" id="en" onClick={changeLanguage}>
          English
        </button>
        <button value="fi" id="fi" onClick={changeLanguage}>
          Suomi
        </button>
        {/* the new buttons value and id should be same as the locale, in this case 'sv'*/}
        <button value="sv" id="sv" onClick={changeLanguage}>
          Svenska
        </button>
```
Change the buttons max-width when hovered in `/styles/Home.module.scss`:

```scss
.header .dropdown:hover {
  background-color: #009bd8;
  // change the max-wight to allow for more buttons. 42px + 72px / button
  max-width: 186px;
  button {
    max-height: 39px;
  }
}
```

### Adding a new translation file / namespace
Namespaces are a feature in i18next internationalization framework which allows you to separate translations that get loaded into multiple files.

Add your translation files / namespaces to every locale folder. For example in:
`/pages/api/locales/en/`
and
`/pages/api/locales/fi/`
folders.

The translations can be fetched from a API endpoint as well. The API endpoint should also follow the same `/locales/{language}/{namespace}` pathing.

The translations are like a `key:translation` pair. The key should be the same in every locales translation file and after it should be the translated text for that locale.

For example `your-namespace.js` in `/pages/api/locales/en/`: 
```js
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      //add the translations here
      hello: 'Hello world!',
      welcome: 'Welcome to our site!',
      language: 'English',
      ...
    })
  )
}
```

Add the namespace to the `ns` section in `next-i18next.config.js`

```js
module.exports = {
  i18n: {
    ...
  },
  ...
  ns: ['namespace1', 'namespace2', 'your-namespace'],
};
```

Add the namespace to `serverSideTranslations` in every page.

```tsx
export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...,
      ...(await serverSideTranslations(locale, ['namespace1', 'namespace2', 'your-namespace'])),
    },
  };
}
```

### Translating content
Translations are done with the `useTranslation` hook. To use it, you need to import it from `next-i18next` and add `const { t } = useTranslation('your-namepsace')` to your component

```tsx
import { useTranslation } from 'next-i18next';

export const Example = () => {
  // destructure the translation function 't' from the useTranslation hook with the namespace you want to use
  const { t } = useTranslation('your-namepsace');
  // If you want to use multiple namespaces, use the following syntax:
  const { t } = useTranslation(['namespace1', 'namespace2', 'your-namespace']);

  return (
    <div>
      {/* to use the translations, first wrap the t function in curly braces 
      and then wrap the key in parentheses and quotes as shown below*/}
      {t('key')}
      {/* if you are using multiple namespaces, use the namespace:key syntax shown below */}
      {t('namespace:key')}
    </div>
  );
};
```

#### Using translations in pages
If you want to use translations in Next.js pages (files that are within the `/pages/` folder), you need to add `serverSideTranslations`  to the props of the rendering method of the page and pass the namespaces you use in it:
```tsx
export const getServerSideProps = async ({locale}: any) => ({
  // add serversideTranslations to the props. Include the namespaces you use in it.
  props: {...(await serverSideTranslations(locale, ['namespace1', 'namespace2', 'your-namespace']))},
})
```
 This should be added to every page that uses, or has a component that uses translations.
 
 #### Default values for translations
 If you want to use a default value for a translation, use the following syntax:
 ```tsx
 <div>
 // add the default value in quotes behind the namespace:key pair
 {t('namespace:key', 'default-value')}
 </div>
 ```
 Default values are used when the specified `key` does not exist in the `namespace` you are using, or when the namespace is not reachable (when using a remote server for translations)
 
 ## Example usage from the project
 
 ### Configuration
 
 The projects configuration can be found in `next-i18next.config.js`:
 
 ```js
 const Backend = require('i18next-http-backend')
 module.exports = {
  i18n: {
    // the default locale to be used
    defaultLocale: 'fi',
    // all locales
    locales: ['fi', 'en'],
    backend: {
      // the api endpoints from which the translations are loaded from
      loadPath: 'http://localhost:3000/api/locales/{{lng}}/{{ns}}',
      // how often in milliseconds are the translations checked for changes
      reloadInterval: 1000 * 60,
    },
  },
  debug: false,
  // all namespaces that are used
  ns: ['common', 'footer'],
  serializeConfig: false,
  // uses the Backend module from 18next-http-backend
  use: [Backend],
}

 ```
 ### Namespaces
 
New translations need to be added in every locales namespace/endpoint. At the moment in this project the translations are local and there are only two of them, so the namespaces can be found in the `/pages/api/locales/en` and `/pages/api/locales/fi` folders.

The translations are fetched from the Next.js API endpoints. When running the server, the English endpoint for the `common` namespace is `http://localhost:3000/api/locales/en/common` and the Finnish endpoint for that namespace is `http://localhost:3000/api/locales/fi/common`. Below are the API endpoint translation files.
 
 English:
  ```js
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      en: 'English',
      fi: 'Finnish',
      members: 'Members',
      projects: 'Projects',
      aboutus: 'About us',
      // more translations can be added below
    })
  )
}
```
Finnish:
```js
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      en: 'Englanti',
      fi: 'Suomi',
      members: 'Jäsenet',
      projects: 'Projektit',
      aboutus: 'Meistä',
      // more translations can be added below
    })
  )
}
```
### Using translations

 To use the translations, import the useTranslation hook with the correct namespace (in this case 'common'). Below you can see the `Repos.tsx` component. Styles and queries have been removed to make the example clearer.
```tsx
// import the useTranslation hook
import {useTranslation} from 'next-i18next'

export default function Repositories() {
  // destructure the translation function 't' from the useTranslation hook with the namespace you want to use
  const {t} = useTranslation(['common'])
  const title = (
    <h1 id="projects">
      <a href="https://github.com/codepointtku" rel="noreferrer" target="_blank">
        {/* to use the translations, first wrap the t function in curly braces
        and then wrap the namespace:key pair in parentheses and quotes as shown below*/}
        {t('common:projects')}
      </a>
    </h1>
  )
  const repositories = repos.map((repos: repoData) => (
    <a key={repos.id} href={repos.url}>
      <div/>
      <h2>{repos.name}</h2>
      <p>{repos.description}</p>
    </a>
  ))
  return (
    <>
      {/*Render the page title that includes a translation */}
      {title}
      <div className={styles.repos_grid}>{repositories}</div>
    </>
  )
}
```
Depending on your locale, the `Repos.tsx` component will now display the page title with the `key` that was used. In this case it would display it either in English: `Projects` or Finnish: `Projektit`.