import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from '@/styles/Page.module.scss'
import { Entry } from 'contentful'
import { ContentService, getPageProps, Navigations } from '@/services/content'
import { Contenu } from '@/components/Contenu'
import { TypePageSkeleton } from '@/clients/content_types'

interface Props {
  title: string
  page: Entry<TypePageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  navigation?: Navigations
}

const Home: FunctionComponent<Props> = ({ title, page, navigation }) => {
  return (
    page && <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={page.fields.description} />
      </Head>
      <main className={styles.main}>
        <Contenu contenu={page.fields.contenu} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return await getPageProps(context, 'accueil')
}


export default Home
