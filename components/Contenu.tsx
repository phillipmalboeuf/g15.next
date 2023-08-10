import { Asset, Entry, EntryCollection } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents, Options, RenderNode } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { Links } from './Links'
import { Articles as ArticlesList } from './Articles'

import styles from '@/styles/Contenu.module.scss'
import cardStyles from '@/styles/Cards.module.scss'
import { useRouter } from 'next/router'
import { Media } from './Media'
import TitleCard from './TitleCard'
import Button from './Button'
import { CardPopup, CardsPopup } from './CardsPopup'
import { TypeArticlesSkeleton, TypeCardsSkeleton, TypeHeroSkeleton, TypeMembresSkeleton, TypePiliersSkeleton, TypeTextSkeleton, TypeTextsSkeleton } from '@/clients/content_types'
import { Membres } from './Membres'
import { Piliers } from './Piliers'

export function renderText(text: Document) {
  return documentToReactComponents(text, options)
}

export const Contenu: FunctionComponent<{
  contenu: Entry<TypeArticlesSkeleton | TypeCardsSkeleton | TypeMembresSkeleton | TypePiliersSkeleton | TypeTextSkeleton | TypeTextsSkeleton | TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
}> = ({ contenu }) => {

  const { pathname } = useRouter()

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {contenu?.map((item, i) =>
        <section 
          id={item.fields.id}
          key={i}
          className={[styles[item.sys.contentType.sys.id], 'layout' in item.fields && styles[item.fields.layout], 'background' in item.fields && styles.background, item.fields.dark && styles.dark].filter(s => s).join(' ')}
        >
          {{
            'hero': <Hero item={item as Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} first={i === 0} />,
            'text': <Text item={item as Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} first={i === 0} card />,
            'texts': <Texts item={item as Entry<TypeTextsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} />,
            'membres': <Membres item={item as Entry<TypeMembresSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} logo={pathname === '/'} />,
            'piliers': <Piliers item={item as Entry<TypePiliersSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} />,
            'articles': <Articles item={item as Entry<TypeArticlesSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} />,
            'cards': <Cards item={item as Entry<TypeCardsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} />,
          }[item.sys.contentType.sys.id]}
        </section>
      )}
    </div>
  );
}

export const Hero: FunctionComponent<{
  item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  first?: boolean
}> = ({ item }) => {
  return  (
    <div className={styles.content}>
      <figure>
        {item.fields.media && <Media media={item.fields.media} eager />}
        {item.fields.caption && <figcaption>
            {renderText(item.fields.caption)}
        </figcaption>}
      </figure>
    </div>
  );
}

export const Text: FunctionComponent<{
  item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  first?: boolean
  card?: boolean
}> = ({ item, first, card }) => {
  return  (
    <div className={styles.content}>
      {item.fields.background && <figure>
        <Media media={item.fields.background} />
      </figure>}

      {item.fields.titre && 
        (first
          ? <h1 className='h3'>{item.fields.titre}</h1>
          : <h3>{item.fields.titre}</h3>)
      }
      {item.fields.text && <div>
        {renderText(item.fields.text)}

        {item.fields.links && 
          <nav>
            <Links links={item.fields.links} buttons />  
          </nav>
        }
      </div>}
    </div>
  );
}

export const Texts: FunctionComponent<{
  item: Entry<TypeTextsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}> = ({ item }) => {
  return (
    <>
      {item.fields.titre && <TitleCard label={item.fields.titre} />}
      {item.fields.intro && <div className={styles.intro}>
        {renderText(item.fields.intro)}
      </div>}
      {item.fields.texts && item.fields.texts.map((text, i) => <article id={text.fields.id} key={i} style={{
        '--color': ('couleur' in text.fields && text.fields.couleur) || 'var(--highlight-color)'
      } as React.CSSProperties}>
        <hr />
        {text.sys.contentType.sys.id === 'text'
          ? <Text item={text as Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} />
          : <Cards item={text as Entry<TypeCardsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} />}
      </article>)}
    </>
  );
}

export const Cards: FunctionComponent<{
  item: Entry<TypeCardsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
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

export const Articles: FunctionComponent<{
  item: Entry<TypeArticlesSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}> = ({ item }) => {
  const { locale } = useRouter()

  return (
    <>
      {item.fields.titre && <><h3>{item.fields.titre}</h3> <br /></>}
      <ArticlesList tag={item.fields.tag} articles={item.fields.articles} />
      <br />
      <center><Link href={`/articles/${item.fields.tag}`}><Button label='Voir tous' /></Link></center>
    </>
  );
}

const options: Options = {
  renderMark: {
    [MARKS.CODE]: (text) => {
      return <span dangerouslySetInnerHTML={{ __html: text.toString() }} />
    }
  },
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: (node) => {
      return <a href={node.data.target.fields.file.url} className='underline' target='_blank'>{node.content[0].value}</a>
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return <figure>
        <Media media={node.data.target} />
      </figure>
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      return {
        // embeddedInfo: <EmbeddedInfo key={node.data.target.sys.id} {...node.data.target.fields} />
      }[node.data.target.sys.contentType.sys.id]
    },
  }
}