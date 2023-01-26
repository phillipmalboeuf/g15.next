import { Navigation } from '@/services/content'
import { Entry } from 'contentful'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Links } from './Links'

import styles from '@/styles/Footer.module.scss'

export const Footer: FunctionComponent<{
  footer: Entry<Navigation>
  social: Entry<Navigation>
  legal: Entry<Navigation>
}> = ({ footer, social, legal }) => {
  return <footer className={styles.footer}>
    <h2>{footer.fields.titre}</h2>
    <nav id={footer.fields.id}>
      <Links links={footer.fields.links} />
    </nav>

    <nav id={social.fields.id}>
      <Links links={social.fields.links} />
    </nav>

    <nav id={legal.fields.id}>
      <Links links={legal.fields.links} />
    </nav>
  </footer>
}