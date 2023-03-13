import { Asset, Entry, EntryCollection } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents, Options, RenderNode } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { Links } from './Links'
import { Articles as ArticlesList } from './Articles'
import { Article, NavigationLink } from '@/services/content'

import styles from '@/styles/Contenu.module.scss'
import cardStyles from '@/styles/Cards.module.scss'
import { useRouter } from 'next/router'
import { Media } from './Media'
import TitleCard from './TitleCard'
import Button from './Button'
import { CardPopup, CardsPopup } from './CardsPopup'

export interface Card {
  titre: string
  id: string
  text: Document
  icon?: Asset
}

export interface Cards {
  titre: string
  id: string
  cards?: Entry<Card>[]
}

interface Text {
  titre: string
  id: string
  layout: string
  text: Document
  background?: Asset
  links?: Entry<NavigationLink>[]
}

interface Texts {
  titre: string
  id: string
  texts?: (Entry<Text> | Entry<Cards>)[]
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
          className={[styles[item.sys.contentType.sys.id], 'layout' in item.fields && styles[item.fields.layout], 'background' in item.fields && styles.background].join(' ')}
        >
          {{
            'text': <Text item={item as Entry<Text>} first={i === 0} />,
            'texts': <Texts item={item as Entry<Texts>} />,
            'membres': <Membres item={item as Entry<Membres>} />,
            'articles': <Articles item={item as Entry<Articles>} />,
            'cards': <Cards item={item as Entry<Articles>} />,
          }[item.sys.contentType.sys.id]}
        </section>
      )}
    </div>
  );
}

export const Text: FunctionComponent<{
  item: Entry<Text>
  first?: boolean
}> = ({ item, first }) => {
  return  (
    <div className={styles.content}>
      {item.fields.background && <figure>
        <Media media={item.fields.background} />
      </figure>}

      {item.fields.titre && 
        (first
          ? <h1>{item.fields.titre}</h1>
          : <h2>{item.fields.titre}</h2>)
      }
      {item.fields.text && <div>
        {renderText(item.fields.text)}
      </div>}
      {item.fields.links && 
        <nav>
          <Links links={item.fields.links} buttons />  
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
      {item.fields.titre && <TitleCard label={item.fields.titre} />}
      {item.fields.texts && item.fields.texts.map((text, i) => <article id={text.fields.id} key={i}>
        <hr />
        {text.sys.contentType.sys.id === 'text'
          ? <Text item={text as Entry<Text>} />
          : <Cards item={text} />}
      </article>)}
    </>
  );
}

export const Cards: FunctionComponent<{
  item: Entry<Cards>
}> = ({ item }) => {
  const [visible, setVisible] = useState<string>()
  return  <>
    <div className={styles.content}>
      <h2>{item.fields.titre}</h2>
      <ul className={styles.cards} id={item.fields.id}>
      {item.fields.cards.map(card => <li key={card.fields.id}>
        <a href={`#${item.fields.id}–${card.fields.id}`} onClick={() => setVisible(card.fields.id)}>
          <article className={cardStyles.card}>
            {card.fields.icon && <figure>
              <Media media={card.fields.icon} />
            </figure>}
            <h5>{card.fields.titre}</h5>
          </article>
        </a>
      </li>)}
      </ul>
  </div>
    {visible && <CardPopup card={item.fields.cards.find(c => c.fields.id === visible)} onHide={() => setVisible(undefined)} visible={visible} />}
  </>
}

export const Membres: FunctionComponent<{
  item: Entry<Membres>
}> = ({ item }) => {
  return  <>
    {item.fields.titre && <TitleCard label={item.fields.titre} />}
    {item.fields.membres && <ul>
      {item.fields.membres.map((membre, i) => <li key={i}>
        {membre.fields.photo && <figure>
          <Media media={membre.fields.photo} ar={1} />
        </figure>}
        <h5>{membre.fields.nom}</h5>
        <em>{membre.fields.titre}</em><br /><br />
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
      {item.fields.titre && <TitleCard label={item.fields.titre} />}
      <ArticlesList tag={item.fields.tag} articles={item.fields.articles} />
      <center><Link href={`/articles/${item.fields.tag}`}><Button label='Voir tous' /></Link></center>
    </>
  );
}