import { Asset, Entry, EntryCollection } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents, Options, RenderNode } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Links } from './Links'
import { NavigationLink } from '@/services/content'

import styles from '@/styles/Contenu.module.scss'

interface Text {
  titre: string
  id: string
  layout: string
  text: Document
  links?: Entry<NavigationLink>[]
}

interface Membres {
  titre: string
  id: string
  layout: string
  membres?: Entry<{
    nom: string
    titre: string
    entreprise: string
    entrepriseLink: string
    photo: Asset
  }>[]
}

export function renderText(text: Document) {
  return documentToReactComponents(text)
}

export const Contenu: FunctionComponent<{
  contenu: Entry<Text | Membres>[]
}> = ({ contenu }) => {

  return <>
    {contenu?.map((item, i) => <section id={item.fields.id} key={i}
      className={[styles[item.sys.contentType.sys.id], styles[item.fields.layout]].join(' ')}>
      {{
        'text': <Text item={item as Entry<Text>} />,
        'membres': <Membres item={item as Entry<Membres>} />,
      }[item.sys.contentType.sys.id]}
    </section>)}
  </>
}

export const Text: FunctionComponent<{
  item: Entry<Text>
}> = ({ item }) => {
  return  <>
    {item.fields.titre && <h2>{item.fields.titre}</h2>}
    {item.fields.text && renderText(item.fields.text)}
    {item.fields.links && <nav>
      <Links links={item.fields.links} />  
    </nav>}
  </>
}

export const Membres: FunctionComponent<{
  item: Entry<Membres>
}> = ({ item }) => {
  return  <>
    {item.fields.titre && <h2>{item.fields.titre}</h2>}
    {item.fields.membres && <ul>
      {item.fields.membres.map((membre, i) => <li key={i}>
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