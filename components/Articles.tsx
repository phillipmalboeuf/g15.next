import { Entry } from 'contentful'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

import styles from '@/styles/Articles.module.scss'
import { Media } from './Media'
import { TypeArticleSkeleton } from '@/clients/content_types'

export const tags = {
  presse: {
    title: 'Nos publications',
    color: '#1D1F27'
  },
  communiqués: {
    title: 'Nos communiqués',
    color: '#3A795E'
  },
  mémoire: {
    title: 'Nos mémoires',
    color: '#67778A'
  },
  nouvelle: {
    title: 'Nos nouvelles',
    color: '#968A84'
  },
  tweet: {
    title: 'Nos Tweets',
    color: '#55ACEE'
  },
  linkedin: {
    title: 'LinkedIn',
    color: '#0077B5'
  }
}

export const Articles: FunctionComponent<{
  tag: string
  articles: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
}> = ({ tag, articles }) => {
  return  <>
    {articles && <ol className={styles.list}>
      {articles.map((article, i) => <li key={i}>
        <nav style={{
          background: tags[article.fields.tags?.filter(t => t !== 'presse')[0]]?.color
        }}>{[...new Set(article.fields.tags)].filter(t => t !== 'presse' && tags[t]).map(t => <Link key={t} href={`/articles/${t}`}>{t}</Link>)}</nav>
        <Link target={article.fields.id.startsWith('http') ? '_blank' : null} href={article.fields.id.startsWith('http') ? article.fields.id : `/articles/${tag}/${article.fields.id}`}>
          {article.fields.photo && <figure>
            <Media media={article.fields.photo} ar={1} />
          </figure>}
          <h5>{article.fields.titre}</h5>
          <ArticleDate article={article} />
        </Link>
      </li>)}
    </ol>}
  </>
}

export const ArticleDate: FunctionComponent<{
  article: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}> = ({ article }) => {
  const { locale } = useRouter()
  return article.fields.publishedAt && <small>{new Date(article.fields.publishedAt).toLocaleDateString(locale, { dateStyle: 'long' })}</small>
}