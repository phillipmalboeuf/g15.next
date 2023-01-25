import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Entry } from 'contentful'
import { ContentService, Page } from '@/services/content'

interface Props {
  title: string
  page: Entry<Page>
}

const Home: FunctionComponent<Props> = ({ title, page }) => {
  return (
    <>
      <Head>
        <title>g15plus.quebec</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main className={styles.main}>
        <h1>{page.fields.titre}</h1>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const page = await ContentService.page('accueil', context.locale)

  if (!page) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      title: 'g15plus.quebec',
      page,
    }
  }
}


export default Home