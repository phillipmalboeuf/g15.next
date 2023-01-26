import { Article } from '@/services/content'
import { Entry } from 'contentful'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

import styles from '@/styles/Articles.module.scss'
import { Media } from './Media'

export const Articles: FunctionComponent<{
  tag: string
  articles: Entry<Article>[]
}> = ({ tag, articles }) => {
  const { locale } = useRouter()

  return  <>
    {articles && <ol className={styles.list}>
      {articles.map((article, i) => <li key={i}>
        <Link href={`/articles/${tag}/${article.fields.id}`}>
          <figure>
            <Media media={article.fields.photo} ar={1} />
          </figure>
          <strong>{article.fields.titre}</strong><br />
          {article.fields.publishedAt && <small>{new Date(article.fields.publishedAt).toLocaleDateString(locale)}</small>}
        </Link>
      </li>)}
    </ol>}
  </>
}