import { Navigation } from '@/services/content'
import { Entry } from 'contentful'
import { FunctionComponent } from 'react'
import Link from 'next/link'
import { Links } from './Links'

import styles from '@/styles/Header.module.scss'

export const Header: FunctionComponent<{
  nav: Entry<Navigation>
}> = ({ nav }) => {
  return <header className={styles.header}>
    <Link href='/'>G15+</Link>
    <nav id={nav.fields.id}>
      <Links links={nav.fields.links} />
    </nav>
  </header>
}
