import { TypeMembresSkeleton } from '@/clients/content_types'
import { Entry } from 'contentful'
import { FunctionComponent } from 'react'
import Link from 'next/link'

import { Media } from './Media'

import styles from '@/styles/Contenu.module.scss'

const random = 75

export const Membres: FunctionComponent<{
  item: Entry<TypeMembresSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  logo?: boolean
}> = ({ item, logo }) => {
  return  <>
    {/* {item.fields.titre && <h3>{item.fields.titre}</h3>} */}
    {item.fields.membres && <ul className={styles.membres}>
      {item.fields.membres.map((membre, i) => <li key={i}
        className={(logo && membre.fields.logo) ? styles.logo : null}
        style={{
          width: `calc((var(--base) * 12) + ${(Math.random() * random)-random}px)`,
          height: `calc((var(--base) * 12) + ${(Math.random() * random)-random}px)`,
          margin: `${(Math.random() * random)-random}px)`,
          alignItems: ['start', 'center', 'end'][Math.floor(Math.random() * 3)]
        }}>
        <figure>
          {!logo 
            ? membre.fields.photo && <Media media={membre.fields.photo} ar={1} />
            : (membre.fields.logo || membre.fields.photo) && <Media media={membre.fields.logo || membre.fields.photo} ar={1} contain={!!membre.fields.logo} padding={!!membre.fields.logo ? 100 : null} />}
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