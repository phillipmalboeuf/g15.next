import { Entry } from 'contentful'
import { FunctionComponent, useState } from 'react'
import Link from 'next/link'
import { Links } from './Links'
import logo from '../public/images/logo.png'

import styles from '@/styles/Header.module.scss'
import Image from 'next/image'
import Button from './Button'
import { LinkedIn, Logo, Twitter } from './Icons'
import { TypeNavigationSkeleton } from '@/clients/content_types'

export const Header: FunctionComponent<{
  nav: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  social: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}> = ({ nav, social }) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href='/' className={styles.logo}>
          <Logo height={53} width={53} />
        </Link>
        <nav id={nav.fields.id}>
          <Links links={nav.fields.links} />
        </nav>
        <nav>
          <Link 
            href={'https://twitter.com/g15plus'}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Twitter height={34} width={34} />
          </Link>
          <Link 
            href={'https://www.linkedin.com/company/g15plus-quebec/'}
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedIn height={34} width={34} />
          </Link>
        </nav>
        {/* <Link className={styles.button} href='https://www.indicateurs.quebec'><Button label='Les indicateurs' /></Link> */}
        <Menu nav={nav} />
      </div>
    </header>
  );
}

const Menu: FunctionComponent<{
  nav: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
}> = ({ nav }) => {
  const [visible, setVisible] = useState(false)
  return <div className={styles.menu}>
    <Button label={'Menu'} icon='menu' onClick={() => setVisible(!visible)} />
    {visible && <nav id={nav.fields.id}>
      <Links links={nav.fields.links} />
      <Link href='https://www.indicateurs.quebec'><Button label='Les indicateurs' /></Link>
    </nav>}
  </div>
}