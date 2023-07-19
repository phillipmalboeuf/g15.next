import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from '@/styles/Page.module.scss'
import { Entry } from 'contentful'
import { ContentService, getPageProps, Navigations } from '@/services/content'
import { Contenu, renderText } from '@/components/Contenu'
import { TypePageSkeleton, TypePilierSkeleton, TypePiliersSkeleton } from '@/clients/content_types'
import { useRouter } from 'next/router'
import { contentful } from '@/clients/contentful'
import { Propositions } from '@/components/Propositions'

interface Props {
  id: string
  title: string
  page: Entry<TypePageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  navigation?: Navigations
  piliers?: Entry<TypePiliersSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}

const Route: FunctionComponent<Props> = ({ title, page, piliers }) => {
  return (
    page && <>
      <Head>
        <title>{page.fields.titre} – {title}</title>
        <meta name="description" content={page.fields.description} />
      </Head>
      <main className={styles.main}>
        <Contenu contenu={page.fields.contenu} />
        <Propositions piliers={piliers} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { props } = await getPageProps(context, 'route')

  return {
    props: {
      ...props,
      piliers: await contentful.getEntry('1lwe6M1hX8QV9Fgraq8lX4', { include: 4 })
    }
  }
}

export default Route