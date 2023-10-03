import { FunctionComponent } from 'react'
import { Entry } from 'contentful'
import { TypePiliersSkeleton } from '@/clients/content_types'

import { renderText } from './Contenu'
import { useRouter } from 'next/router'

import styles from '@/styles/Propositions.module.scss'

export const Propositions: FunctionComponent<{
  piliers: Entry<TypePiliersSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}> = ({ piliers }) => {
  const router = useRouter()

  return <>
    {piliers.fields.piliers.filter(pilier => router.query.pilier ? router.query.pilier === pilier.fields.id : true).map((pilier, i) => <ul className={styles.propositions} key={pilier.fields.id} id={pilier.fields.id}>
      {pilier.fields.propositions?.map((proposition, j) => <li key={proposition.fields.id} id={proposition.fields.id}>
        <details>
          <summary><h3>{proposition.fields.titre}</h3></summary>
          <article style={{
            ['--start' as any]: proposition.fields.index
          }}>
            {renderText(proposition.fields.text)}
          </article>
        </details>
      </li>)}
    </ul>)}
  </>
}