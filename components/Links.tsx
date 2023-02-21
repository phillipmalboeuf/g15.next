import { NavigationLink } from '@/services/content';
import { Entry } from 'contentful';
import Link from 'next/link';
import { Fragment, FunctionComponent } from 'react';

export const Links: FunctionComponent<{
  links: Entry<NavigationLink>[]
}> = ({ links }) => {
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
            style={{textDecoration: 'none', paddingRight: 32}}
          >
            {link.fields.titre}
          </Link>
        : <span style={{textDecoration: 'none'}}>{link.fields.titre}</span>
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