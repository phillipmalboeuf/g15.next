import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Articles.module.scss'
import { Entry, EntryCollection } from 'contentful'
import { ContentService, getPageProps, Navigations } from '@/services/content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Contenu, renderText } from '@/components/Contenu'
import { ArticleDate } from '@/components/Articles'
import { TypeArticleSkeleton } from '@/clients/content_types'
import { Media, cdn } from '@/components/Media'

interface Props {
  tag: string
  title: string
  article: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  navigation: Navigations
}

const Article: FunctionComponent<Props> = ({ title, tag, article, navigation }) => {
  return (
    article && <>
      <Head>
        <title>{article.fields.titre} – {tag} – {title}</title>
        <meta name="description" content={article.fields.excerpt} />
        <meta name="og:title" content={article.fields.titre} />
        <meta name="og:description" content={article.fields.excerpt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@G15Plus " />
        <meta name="twitter:title" content={article.fields.titre} />
        <meta name="twitter:description" content={article.fields.excerpt} />
        {article.fields.photo?.fields.file && <>
          <meta name="og:image" content={"https:" + cdn(article.fields.photo.fields.file.url) + "?auto=compress,format&w=1200&h=630&fit=crop"} />
          <meta name="twitter:image" content={"https:" + cdn(article.fields.photo.fields.file.url) + "?auto=compress,format&w=1200&h=630&fit=crop"} />
        </>}
      </Head>
      <main className={styles.article}>
        <center><Link href={`/articles/${tag}`}><u>Retour</u></Link></center>
        <h1 className='h2'>{article.fields.titre}<br /><ArticleDate article={article} /></h1>
        {article.fields.photo && <figure>
          <Media media={article.fields.photo} ar={0.33} />
        </figure>}
        <nav>{article.fields.tags?.map(tag => <Link key={tag} href={`/articles/${tag}`}>#{tag}</Link>)}</nav>
        <article>{article.fields.text
          ? renderText(article.fields.text)
          : article.fields.html && <div dangerouslySetInnerHTML={{__html: article.fields.html}} />}</article>
      </main>
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
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default Article