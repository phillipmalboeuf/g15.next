import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from '@/styles/Page.module.scss'
import { Entry } from 'contentful'
import { ContentService, getPageProps, Navigations } from '@/services/content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Contenu } from '@/components/Contenu'
import { TypePageSkeleton } from '@/clients/content_types'

interface Props {
  id: string
  title: string
  page: Entry<TypePageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  navigation?: Navigations
}

const Page: FunctionComponent<Props> = ({ title, page, navigation }) => {
  return (
    page && <>
      <Head>
        <title>{page.fields.titre} – {title}</title>
        <meta name="description" content={page.fields.description} />
      </Head>
      <main className={styles.main}>
        <Contenu contenu={page.fields.contenu} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, { page: string }> = async (context) => {
  return await getPageProps(context, context.params.page)
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/notre-vision'],
    fallback: true
  }
}

export default Page