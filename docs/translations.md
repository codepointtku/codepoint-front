# Translations

Internationalization and localization are used to adapt computer software to different languages and the technical requirements of a target locale. In our case this mostly means adapting the website to be usable in Finnish and English.

While Next.js already provides some of the needed features with its [internationalized routing](https://nextjs.org/docs/advanced-features/i18n-routing), this project uses three different packages to reach its localization and internationalization needs:

#### [i18next](https://www.i18next.com/)
i18next is an internationalization-framework. It has multiple plugins to for example:  detect the user language, load the translations and cache the translations.

#### [i18next-http-backend](https://github.com/i18next/i18next-http-backend)
This package is a plugin for i18next, and in our case it used to load the translations from a remote server.

#### [next-i18next](https://github.com/isaachinman/next-i18next)
next-i18next is an i18next supported framework. It is used to handle the translation of the content and provides components/hooks for translation purposes.

## Using translations
The steps below are guidlines on how to use translations in this project. For more in-depth information on how to use these features, please refer to the documentation pages linked above.

### Configuration
If more advanced configuration options are needed, they can be passed in the `next-i18next.config.js` file. For more information on what options are available and how to use them, please refer to the [next-i18next github page](https://github.com/isaachinman/next-i18next), and as all of the i18next options can be used as well, you should look in to [their documentation pages as well](https://www.i18next.com/overview/configuration-options).

### Adding a new translation file / namespace

Add your `.js` file (namespace) in both
`\pages\api\locales\en\`
and
`\pages\api\locales\fi\`
folders.

These files are only used for testing purposes, since the translations will be fetched from a remote server in the future. The remote api endpoint should also follow the `\locales\{language}\{namespace}` pathing.

Example file: 
```js
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      key: 'Hello world!',
      key2: 'content',
      key3: 'more content',
      ...
    })
  )
}
```

##### Add the namespace to `ns` in `next-i18next.config.js`

```js
module.exports = {
  i18n: {
    ...
  },
  ...
  ns: ['namespace1', 'namespace2', 'your-namespace'],
};
```

##### Add the namespace to `serverSideTranslations` at the end of `getServerSideProps` in `pages\index.tsx`

```tsx
export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...,
      ...(await serverSideTranslations(locale, ['file1', 'file2', 'your-namespace'])),
    },
  };
}
```

### Translating content
Translations are done with the `useTranslation` hook. To use it, you need to import it from `next-i18next` and add `const { t } = useTranslation('your-namepsace')` to your component

```tsx
import { useTranslation } from 'next-i18next';

export const Example = () => {
  // Add the namespace from which you want the translations from in to useTranslation
  const { t } = useTranslation('your-namepsace');
  // If you want to use multiple namespaces, use the following syntax:
  const { t } = useTranslation(['namespace1', 'namespace2', 'your-namespace']);

  return (
    <div>
      {t('key')}
      // If you are using multiple namespaces, use the following syntax:
      {t('namespace:key')}
    </div>
  );
};
```

#### Using translations in pages
If you want to use translations in Next.js pages (files that are within the `\pages\` folder), you need to add the following code to the bottom of the page and pass the namespaces you want to use in to `serverSideTranslations`:
```tsx
export const getServerSideProps = async ({locale}: any) => ({
  props: {...(await serverSideTranslations(locale, ['namespace1', 'namespace2', 'your-namespace']))},
})
```
 This should be added to every page that uses, or has a component that uses translations. You must also pass the namespaces the component uses in to `serverSideTranslations` for the page to work properly.
 
 #### Default values for translations
 If you want to use a default value for a translation, use the following syntax:
 ```tsx
 <div>
 {t('namespace:key', 'default-value')}
 </div>
 ```
 Default values are used when the specified `key` does not exist in the `namespace` you are using, or when the namespace is not reachable (when using a remote server for translations)