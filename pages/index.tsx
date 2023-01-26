import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from '@/styles/Page.module.scss'
import { Entry } from 'contentful'
import { ContentService, getPageProps, Navigations, Page } from '@/services/content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Contenu } from '@/components/Contenu'

interface Props {
  title: string
  page: Entry<Page>
  navigation?: Navigations
}

const Home: FunctionComponent<Props> = ({ title, page, navigation }) => {
  return (
    page && <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={page.fields.description} />
      </Head>
      <Header nav={navigation.header} />
      <main className={styles.main}>
        <Contenu contenu={page.fields.contenu} />
      </main>
      <Footer footer={navigation.footer} social={navigation.social} legal={navigation.legal} />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return await getPageProps(context, 'accueil')
}


export default Home