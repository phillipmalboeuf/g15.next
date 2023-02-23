import { Entry } from 'contentful'
import { FunctionComponent, useEffect, useRef } from 'react'
import { Card, renderText } from './Contenu'

import styles from '@/styles/Cards.module.scss'
import { Media } from './Media'

export const CardsPopup: FunctionComponent<{
  cards: Entry<Card>[]
  visible: string
  onHide: () => void
}> = ({ cards, visible, onHide }) => {

  const element = useRef<HTMLUListElement>()

  useEffect(() => {
    if (element?.current) {
      element.current.querySelector(`#${visible}`).scrollIntoView({ inline: 'start' })
    }
  }, [visible, element])

  return <aside className={styles.popup}>
    <button className={styles.background} onClick={onHide}></button>
    <ul ref={element} className={styles.cards} style={{ width: `calc(var(--gap) * 8 * ${cards.length})` }}>
    {cards.map(card => <li id={card.fields.id} key={card.fields.id}>
      <article className={styles.card}>
        {card.fields.icon && <figure>
          <Media media={card.fields.icon} />
        </figure>}
        <h2>{card.fields.titre}</h2>
        {card.fields.text && <div>
          {renderText(card.fields.text)}
        </div>}
        <center><small>G15+</small></center>
      </article>
    </li>)}
    </ul>
  </aside>
}