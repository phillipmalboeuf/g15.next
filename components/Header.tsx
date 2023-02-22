import { Navigation } from '@/services/content'
import { Entry } from 'contentful'
import { FunctionComponent } from 'react'
import Link from 'next/link'
import { Links } from './Links'
import logo from '../public/images/logo.png'

import styles from '@/styles/Header.module.scss'
import Image from 'next/image'
import Button from './Button'

export const Header: FunctionComponent<{
  nav: Entry<Navigation>
}> = ({ nav }) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href='/'>
          <Image
            height={48}
            width={40}
            alt='g15 plus'
            src={logo}
          />
        </Link>
        <nav id={nav.fields.id}>
          <Links links={nav.fields.links} />
        </nav>
        <Link className={styles.button} href='https://www.indicateurs.quebec'><Button label='Les indicateurs' /></Link>
      </div>
    </header>
  );
}
