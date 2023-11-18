import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Post.css'
import { DocumentData } from 'firebase/firestore'

export default function Post({ theme }: DocumentData) {
  const { postId } = useParams()
  const { state } = useLocation()
  return (
    <main className={theme}>
      <section id='post'>
        <section className='flex'>
          <h2 id='header'>{state.header}</h2>
          <aside>{state.date}</aside>
        </section>
        <p>{state.text}</p>
        <Link to={'/'}>come back</Link>
      </section>
    </main>
  )
}
