import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
      </Head>
      <body>
        <Main />

        <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script> 
        <noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerPolicy="no-referrer-when-downgrade" /></noscript>
        <NextScript />
      </body>
    </Html>
  )
}
