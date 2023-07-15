import { Navigation } from '@/services/content'
import { Entry } from 'contentful'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Links } from './Links'

import styles from '@/styles/Footer.module.scss'
import TitleCard from './TitleCard'

export const Footer: FunctionComponent<{
  footer: Entry<Navigation>
  social: Entry<Navigation>
  legal: Entry<Navigation>
}> = ({ footer, social, legal }) => {
  return (
    <footer className={styles.footer}>
      {/* <TitleCard label={footer.fields.titre} />
      <nav id={footer.fields.id}>
        <Links links={footer.fields.links} emails />
      </nav> */}

      <div>
        G15+
        <nav id={social.fields.id}>
          <Links links={social.fields.links} />
        </nav>
      </div>
      <hr />
      <div>
        ©2022, G15+. Tous droits réservés.
        <nav id={legal.fields.id}>
          <Links links={legal.fields.links} />
        </nav>
      </div>
    </footer>
  );
}