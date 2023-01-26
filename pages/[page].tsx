import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from '@/styles/Page.module.scss'
import { Entry } from 'contentful'
import { ContentService, Navigations, Page } from '@/services/content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

interface Props {
  id: string
  title: string
  page: Entry<Page>
  navigation?: Navigations
}

const Page: FunctionComponent<Props> = ({ title, page, navigation }) => {
  return (
    <>
      <Head>
        <title>{page.fields.titre} – {title}</title>
        <meta name="description" content={page.fields.description} />
      </Head>
      <Header nav={navigation.header} />
      <main className={styles.main}>
        <h1>{page.fields.titre}</h1>
      </main>
      <Footer footer={navigation.footer} social={navigation.social} legal={navigation.legal} />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, { page: string }> = async (context) => {
  const [page, navigation] = await Promise.all([
    ContentService.page(context.params.page, context.locale),
    ContentService.navigation(context.locale),
  ])

  if (!page) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      id: context.params.page,
      title: 'g15plus.quebec',
      page,
      navigation,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/notre-vision'],
    fallback: true
  }
}

export default Page