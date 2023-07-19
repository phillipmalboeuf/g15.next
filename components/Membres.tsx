import { TypeMembresSkeleton } from '@/clients/content_types'
import { Entry } from 'contentful'
import { FunctionComponent } from 'react'
import Link from 'next/link'

import { Media } from './Media'

import styles from '@/styles/Contenu.module.scss'

export const Membres: FunctionComponent<{
  item: Entry<TypeMembresSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}> = ({ item }) => {
  return  <>
    {/* {item.fields.titre && <h3>{item.fields.titre}</h3>} */}
    {item.fields.membres && <ul className={styles.membres}>
      {item.fields.membres.map((membre, i) => <li key={i} style={{
          width: `calc((var(--gap) * 3) + ${(Math.random() * 40)-40}px)`,
          height: `calc((var(--gap) * 3) + ${(Math.random() * 40)-40}px)`,
          margin: `${(Math.random() * 40)-40}px)`,
          alignItems: ['start', 'center', 'end'][Math.floor(Math.random() * 3)]
        }}>
        <figure>
          {membre.fields.photo && <Media media={membre.fields.photo} ar={1} />}
          <figcaption>
            <h5>{membre.fields.nom}</h5>
            <em>{membre.fields.titre}</em><br /><br />
            <Link href={membre.fields.entrepriseLink}
              target="_blank"
              rel="noopener noreferrer"
            ><u>{membre.fields.entreprise}</u></Link>
          </figcaption>
        </figure>
      </li>)}
    </ul>}
  </>
}