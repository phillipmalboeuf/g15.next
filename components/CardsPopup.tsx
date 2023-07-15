import { Entry } from 'contentful'
import { FunctionComponent, useEffect, useRef } from 'react'
import { renderText } from './Contenu'

import styles from '@/styles/Cards.module.scss'
import { Media } from './Media'
import { TypeCardSkeleton } from '@/clients/content_types'

export const CardsPopup: FunctionComponent<{
  cards: Entry<TypeCardSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
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
    <ul ref={element} className={styles.cards} style={{ width: `calc(var(--base) * 26 * ${cards.length})` }}>
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

export const CardPopup: FunctionComponent<{
  card: Entry<TypeCardSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  visible: string
  onHide: () => void
}> = ({ card, visible, onHide }) => {

  const element = useRef<HTMLUListElement>()

  useEffect(() => {
    if (element?.current) {
      element.current.querySelector(`#${visible}`).scrollIntoView({ inline: 'start' })
    }
  }, [visible, element])

  return <aside className={styles.popup}>
    <button className={styles.background} onClick={onHide}></button>
    <div className={styles.cards} style={{ width: `calc(var(--base) * 26))` }}>
      <article className={styles.card}>
        <button className={styles.close} onClick={onHide}>✕</button>
        {card.fields.icon && <figure>
          <Media media={card.fields.icon} />
        </figure>}
        <h2>{card.fields.titre}</h2>
        {card.fields.text && <div>
          {renderText(card.fields.text)}
        </div>}
        <center><small>G15+</small></center>
      </article>
    </div>
  </aside>
}