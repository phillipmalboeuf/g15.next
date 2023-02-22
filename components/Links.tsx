import { NavigationLink } from '@/services/content';
import { Entry } from 'contentful';
import Link from 'next/link';
import { Fragment, FunctionComponent } from 'react';
import Button from './Button';

export const Links: FunctionComponent<{
  links: Entry<NavigationLink>[]
  buttons?: boolean
}> = ({ links, buttons }) => {
  return <>
    {links.map((link, i) => 
    <Fragment key={i}>
      {link.fields.link
        ? <Link 
            href={link.fields.link}
            {...link.fields.external && {
              target: "_blank",
              rel: "noopener noreferrer"
            }}
          >
            {buttons ? <Button label={link.fields.titre} /> : link.fields.titre}
          </Link>
        : <span>{link.fields.titre}</span>
      }
      {link.fields.subLinks && (
        <nav>
          <Links
            links={link.fields.subLinks} 
          />  
        </nav>
      )}
    </Fragment>
    )}
  </>
}