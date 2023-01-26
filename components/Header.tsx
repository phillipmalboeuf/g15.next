import { Navigation } from '@/services/content'
import { Entry } from 'contentful'
import { FunctionComponent } from 'react'
import Link from 'next/link'

import styles from '@/styles/Header.module.scss'

export const Header: FunctionComponent<{
  nav: Entry<Navigation>
}> = ({ nav }) => {
  return <header className={styles.header}>
    <a href='/'>G15+</a>
    <nav id={nav.fields.id}>
      {nav.fields.links.map(link => <Link href={link.fields.link}>
        {link.fields.titre}
      </Link>)}
    </nav>
  </header>
}
