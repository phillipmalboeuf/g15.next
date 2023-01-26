import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Articles.module.scss'
import { Entry, EntryCollection } from 'contentful'
import { Article, ContentService, getPageProps, Navigations } from '@/services/content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Contenu, renderText } from '@/components/Contenu'

interface Props {
  tag: string
  title: string
  article: Entry<Article>
  navigation: Navigations
}

const Article: FunctionComponent<Props> = ({ title, tag, article, navigation }) => {
  return (
    article && <>
      <Head>
        <title>{tag} – {title}</title>
        <meta name="description" content={article.fields.excerpt} />
      </Head>
      <Header nav={navigation.header} />
      <main className={styles.article}>
        <h1>{article.fields.titre}</h1>
        <nav>{article.fields.tags?.map(tag => <Link key={tag} href={`/articles/${tag}`}>#{tag}</Link>)}</nav>
        {article.fields.text && renderText(article.fields.text)}
      </main>
      <Footer footer={navigation.footer} social={navigation.social} legal={navigation.legal} />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, { tag: string, article: string }> = async (context) => {
  const [article, navigation] = await Promise.all([
    ContentService.article(context.params.article, context.locale),
    ContentService.navigation(context.locale),
  ])
  
  return {
    props: {
      tag: context.params.tag,
      title: 'g15plus.quebec',
      article,
      navigation,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default Article