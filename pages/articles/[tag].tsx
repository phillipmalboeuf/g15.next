import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from '@/styles/Articles.module.scss'
import { Entry, EntryCollection } from 'contentful'
import { Article, ContentService, Navigations } from '@/services/content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Contenu } from '@/components/Contenu'
import { Articles as ArticlesList } from '@/components/Articles'
import Link from 'next/link'

interface Props {
  tag: string
  title: string
  articles: EntryCollection<Article>
  navigation: Navigations
}

const tags = {
  presse: 'Salle de presse'
}

const Articles: FunctionComponent<Props> = ({ title, tag, articles, navigation }) => {
  return (
    articles && <>
      <Head>
        <title>{tags[tag] || tag} – {title}</title>
        <meta name="description" content={tags[tag] || tag} />
      </Head>
      <main className={styles.articles}>
        <h1>{tags[tag] || tag}</h1>
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
    paths: ['/articles/press'],
    fallback: true
  }
}

export default Articles