import { Asset, Entry, EntryCollection } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents, Options, RenderNode } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Links } from './Links'
import { Articles as ArticlesList } from './Articles'
import { Article, NavigationLink } from '@/services/content'

import styles from '@/styles/Contenu.module.scss'
import { useRouter } from 'next/router'
import { Media } from './Media'

interface Text {
  titre: string
  id: string
  layout: string
  text: Document
  links?: Entry<NavigationLink>[]
}

interface Texts {
  titre: string
  id: string
  texts?: Entry<Text>[]
}

interface Membres {
  titre: string
  id: string
  membres?: Entry<{
    nom: string
    titre: string
    entreprise: string
    entrepriseLink: string
    photo: Asset
  }>[]
}

interface Articles {
  titre: string
  id: string
  tag?: string
  articles: Entry<Article>[]
}

export function renderText(text: Document) {
  return documentToReactComponents(text)
}

export const Contenu: FunctionComponent<{
  contenu: Entry<any>[]
}> = ({ contenu }) => {

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {contenu?.map((item, i) =>
        <section 
          id={item.fields.id}
          key={i}
          className={[styles[item.sys.contentType.sys.id], 'layout' in item.fields && styles[item.fields.layout]].join(' ')}
        >
          {{
            'text': <Text item={item as Entry<Text>} />,
            'texts': <Texts item={item as Entry<Texts>} />,
            'membres': <Membres item={item as Entry<Membres>} />,
            'articles': <Articles item={item as Entry<Articles>} />,
          }[item.sys.contentType.sys.id]}
        </section>
      )}
    </div>
  );
}

export const Text: FunctionComponent<{
  item: Entry<Text>
}> = ({ item }) => {
  return  (
    <div className={styles.content}>
      {item.fields.titre && 
        <h2>{item.fields.titre}</h2>
      }
      {item.fields.text && 
        renderText(item.fields.text)
      }
      {item.fields.links && 
        <nav>
          <Links links={item.fields.links} />  
        </nav>
      }
    </div>
  );
}

export const Texts: FunctionComponent<{
  item: Entry<Texts>
}> = ({ item }) => {
  return (
    <>
      {item.fields.titre && <h2>{item.fields.titre}</h2>}
      {item.fields.texts && item.fields.texts.map((text, i) => <article id={text.fields.id} key={i}>
        <hr />
        <Text item={text} />
      </article>)}
    </>
  );
}

export const Membres: FunctionComponent<{
  item: Entry<Membres>
}> = ({ item }) => {
  return  <>
    {item.fields.titre && <h2>{item.fields.titre}</h2>}
    {item.fields.membres && <ul>
      {item.fields.membres.map((membre, i) => <li key={i}>
        {membre.fields.photo && <figure>
          <Media media={membre.fields.photo} ar={1} />
        </figure>}
        <strong>{membre.fields.nom}</strong><br />
        <em>{membre.fields.titre}</em><br />
        <Link href={membre.fields.entrepriseLink}
          target="_blank"
          rel="noopener noreferrer"
        >{membre.fields.entreprise}</Link>
      </li>)}
    </ul>}
  </>
}

export const Articles: FunctionComponent<{
  item: Entry<Articles>
}> = ({ item }) => {
  const { locale } = useRouter()

  return (
    <>
      {item.fields.titre && <h2>{item.fields.titre}</h2>}
      <ArticlesList tag={item.fields.tag} articles={item.fields.articles} />
      <Link href={`/articles/${item.fields.tag}`}>Voir tous</Link>
    </>
  );
}