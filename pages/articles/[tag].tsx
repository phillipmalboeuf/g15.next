import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from '@/styles/Articles.module.scss'
import { Entry, EntryCollection } from 'contentful'
import { ContentService, Navigations } from '@/services/content'
import { Articles as ArticlesList, tags } from '@/components/Articles'
import Link from 'next/link'
import { TypeArticleSkeleton } from '@/clients/content_types'

interface Props {
  tag: string
  title: string
  articles: EntryCollection<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  navigation: Navigations
}

const Articles: FunctionComponent<Props> = ({ title, tag, articles, navigation }) => {
  console.log(tag)
  return (
    articles && <>
      <Head>
        <title>{tags[tag].title || tag} – {title}</title>
        <meta name="description" content={tags[tag].title || tag} />
      </Head>
      <main className={styles.articles}>
        <h1 className='h3'>{tags[tag].title || `#${tag}`}</h1>
        <ArticlesList tag={tag} articles={articles.items} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, { tag: string }> = async (context) => {
  const [articles, navigation] = await Promise.all([
    ContentService.articles(context.params.tag, 0, 'newest', context.locale),
    ContentService.navigation(context.locale),
  ])
  
  return {
    props: {
      tag: context.params.tag,
      title: 'g15plus.quebec',
      articles,
      navigation,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/articles/presse'],
    fallback: true
  }
}

export default Articles