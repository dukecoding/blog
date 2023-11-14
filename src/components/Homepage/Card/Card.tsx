import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

export default function Card({ post, idx, dateString, theme }: DocumentData) {
  return (
    <section className={`card ${theme}`}>
      <section className='flex'>
        <h3>{post.header}</h3>
        <aside>{dateString}</aside>
      </section>
      <p>{post.text.slice(0, 120) + '...'}</p>
      <Link
        to={`posts/${idx}`}
        state={{
          header: post.header,
          text: post.text,
          date: dateString,
        }}
      >
        read more
      </Link>
    </section>
  )
}
