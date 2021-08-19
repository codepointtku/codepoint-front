import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="white"/>
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black"/>
          <link rel="apple-touch-icon" href="/icons/pwa-192x192.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
