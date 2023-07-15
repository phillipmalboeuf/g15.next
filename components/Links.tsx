import { Entry } from 'contentful';
import Link from 'next/link';
import { Fragment, FunctionComponent } from 'react';
import Button from './Button';
import { TypeLinkSkeleton } from '@/clients/content_types';

export const Links: FunctionComponent<{
  links: Entry<TypeLinkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
  buttons?: boolean
  emails?: boolean
}> = ({ links, buttons, emails }) => {
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
            {emails && link.fields.link.startsWith('mailto:') && <>
              <br />
              <small>{link.fields.link.replace('mailto:', '')}</small>
            </>}
          </Link>
        : <span>{link.fields.titre}</span>
      }
      {link.fields.subLinks && (
        <nav>
          <Links
            links={link.fields.subLinks}
            emails
          />  
        </nav>
      )}
    </Fragment>
    )}
  </>
}