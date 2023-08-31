// "use client"

import { TypeMembresSkeleton } from '@/clients/content_types'
import { Entry } from 'contentful'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { Media } from './Media'

import styles from '@/styles/Contenu.module.scss'

const size = 188
// const padding = -50
// const r = (size+padding)/2

// type Point = {
//   x: number, y: number, done: boolean
// }

// const checkCollision = (p1: number, p2: number) => ((r) ** 2 > (p1 - p2) ** 2)
// const checkCollisions = (point: Point, otherPoints: Point[], x: boolean) => {
//   let collides = false
//   for (let index = 0; index < otherPoints.length; index++) {
//     const otherPoint = otherPoints[index]
//     if (x ? checkCollision(point.x, otherPoint.x) : checkCollision(point.y, otherPoint.y)) {
//       collides = true
//       break
//     }
//   }
//   return collides
// }

export const Membres: FunctionComponent<{
  item: Entry<TypeMembresSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  logo?: boolean
}> = ({ item, logo }) => {
  // const list = useRef<HTMLUListElement>()
  // const [points, setPoints] = useState<Point[]>([])
  // const [height, setHeight] = useState<number>()

  // useEffect(() => {
  //   setHeight(list.current.offsetHeight)

  //   const items = list.current.querySelectorAll('li')
  //   const center = { 
  //     x: list.current.offsetLeft + (list.current.offsetWidth / 2),
  //     y: list.current.offsetTop + (list.current.offsetHeight / 2)
  //   }

  //   let _points: Point[] = []
  //   items.forEach((item, i) => {
  //     _points.push({
  //       x: item.offsetLeft + (size / 2),
  //       y: item.offsetTop + (size / 2),
  //       done: false
  //     })
  //   })

  //   function move() {
  //     _points.forEach((point, i) => {
  //       let moved = false
  //       const otherPoints = _points.filter((data, j) => j !== i)
  //       if (!checkCollisions(point, otherPoints, true)) {
  //         if (point.x > center.x) {
  //           point.x--
  //           moved = true
  //         } else if (point.x < center.x) {
  //           point.x++
  //           moved = true
  //         }
  //       }
  //       if (!checkCollisions(point, otherPoints, false)) {
  //         if (point.y > center.y) {
  //           point.y--
  //           moved = true
  //         } else if (point.y < center.y) {
  //           point.y++
  //           moved = true
  //         }
  //       }
        
  //       point.done = !moved
  //     })

  //     for (let i = 0; i < _points.length; i++) {
  //       if (!_points[i].done) {
  //         move()
  //         break
  //       }
  //     }

  //     console.log(_points.filter(point => !point.done))
  //     if (_points.filter(point => !point.done).length === 0) {
  //       console.log(_points)
  //       setPoints(_points)
  //     }
  //   }

  //   move()
  // }, [])

  return  <>
    {/* {item.fields.titre && <h3>{item.fields.titre}</h3>} */}
    {item.fields.membres && <ul className={styles.membres}
      // ref={list} style={{
      //   ...height && {
      //     height: `${height}px`
      //   }
      // }}
    >
      {item.fields.membres.filter(membre => !logo || !!membre.fields.logo).map((membre, i) => <li key={i}
        className={(logo && membre.fields.logo) ? styles.logo : null}
        style={{
          // ...points[i] && {
          //   position: 'absolute',
          //   top: points[i].y - (size / 2),
          //   left: points[i].x - (size / 2),
          // },
          // width: `calc((var(--base) * 12) + ${(Math.random() * random)-random}px)`,
          // height: `calc((var(--base) * 12) + ${(Math.random() * random)-random}px)`,
          // width: `calc((var(--base) * 11))`,
          // height: `calc((var(--base) * 11))`,
          // width: `${size}px`,
          // height: `${size}px`,
          // margin: `calc(${(Math.random() * random)-random}px + (var(--base) * 0.5)) 0 calc(${(Math.random() * random)-random}px + (var(--base) * 0.5)) 0`,
          // alignItems: ['start', 'center', 'end'][Math.floor(Math.random() * 3)]
        }}>
        <figure>
          {!logo 
            ? membre.fields.photo && <Media media={membre.fields.photo} ar={1} />
            : (membre.fields.logo || membre.fields.photo) && <Media media={membre.fields.logo || membre.fields.photo} ar={1} contain={!!membre.fields.logo} padding={!!membre.fields.logo ? 100 : null} />}
          <figcaption>
            <h5>{membre.fields.nom}</h5>
            <em>{membre.fields.titre}</em><br /><br />
            <Link href={membre.fields.entrepriseLink}
              target="_blank"
              rel="noopener noreferrer"
            ><u>{membre.fields.entreprise}</u></Link>
          </figcaption>
        </figure>
      </li>)}
    </ul>}
  </>
}