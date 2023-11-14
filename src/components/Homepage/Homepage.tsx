import { DocumentData } from 'firebase/firestore'
import React, { Key, useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card/Card'
import './Homepage.css'
import ThemeProvider, {
  ThemeConsumer,
  ThemeContextValue,
} from 'react-bootstrap/esm/ThemeProvider'

export default function Homepage({ arr, theme }: DocumentData) {
  //* Animations
  document.addEventListener('mousemove', (e) => {
    Array.from(
      document.getElementsByClassName('circle') as HTMLCollectionOf<HTMLElement>
    ).forEach((circle, idx) => {
      let x, y
      if (idx === 0) {
        x = (e.clientX * -0.015) / 2
        y = e.clientY * -0.01
      } else if (idx === 1) {
        x = (e.clientX * 0.015) / 2
        y = e.clientX * 0.005
      } else if (idx === 2) {
        x = e.clientX * 0.002
        y = e.clientX * -0.009
      }
      circle.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
  })

  const getPostDateToString = (date: Date) => {
    const year = date.getFullYear()
    const day = date.getDate()
    let month = String(date.getMonth() + 1)
    if (String(month).length < 2) {
      month = `0${month}`
    }
    return `${day}-${month}-${year}`
  }

  const featuredPostStringDate = getPostDateToString(arr[0].date.toDate())

  // const theme = useContext(ThemeContext)

  return (
    <main className={theme}>
      <section>
        <h2>Featured</h2>
        <Card
          post={arr[0]}
          dateString={featuredPostStringDate}
          idx={'0'}
          theme={theme}
        />
      </section>
      <section>
        <h2>Read more</h2>
        <section id='posts'>
          {arr.slice(1).map((post: DocumentData, idx: Key) => {
            return (
              <Card
                post={post}
                dateString={getPostDateToString(post.date.toDate())}
                idx={idx}
                theme={theme}
              />
            )
          })}
        </section>
      </section>
    </main>
  )
}
