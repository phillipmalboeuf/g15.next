import { Entry } from 'contentful'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

import styles from '@/styles/Articles.module.scss'
import { Media } from './Media'
import { TypeArticleSkeleton } from '@/clients/content_types'

export const Articles: FunctionComponent<{
  tag: string
  articles: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
}> = ({ tag, articles }) => {
  return  <>
    {articles && <ol className={styles.list}>
      {articles.map((article, i) => <li key={i}>
        <Link href={`/articles/${tag}/${article.fields.id}`}>
          <figure>
            <Media media={article.fields.photo} ar={1} />
          </figure>
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