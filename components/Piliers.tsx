import { TypeMembresSkeleton, TypePiliersSkeleton } from '@/clients/content_types'
import { Entry } from 'contentful'
import { FunctionComponent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Media } from './Media'

import styles from '@/styles/Contenu.module.scss'


export const Piliers: FunctionComponent<{
  item: Entry<TypePiliersSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}> = ({ item }) => {
  const router = useRouter()

  return  <>
    {/* {item.fields.titre && <h3>{item.fields.titre}</h3>} */}
    {item.fields.piliers && <ul className={[styles.piliers, router.query.pilier ? styles.queried : null].join(' ')}>
      {item.fields.piliers.map((pilier, i) => <li key={i} style={{}} className={router.query.pilier === pilier.fields.id ? styles.active : null}>
        <figure>
          <Link href={`/route?pilier=${pilier.fields.id}#${item.fields.id}`}>{pilier.fields.media && <Media media={pilier.fields.media} ar={1} eager />}</Link>
          <figcaption>
            {router.query.pilier === pilier.fields.id && <><Link href={`/route`}><u>✕ Fermer</u></Link><br /><br /></>}
            <h4>{pilier.fields.titre}</h4>
            <Link href={`/route?pilier=${pilier.fields.id}#${item.fields.id}`}><u>{pilier.fields.cta}</u></Link>
          </figcaption>
        </figure>
      </li>)}
    </ul>}
  </>
}