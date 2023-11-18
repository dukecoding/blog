import React from 'react'
import { DocumentData } from 'firebase/firestore'
import './PageNotFound.css'

export default function PageNotFound({ theme }: DocumentData) {
  return (
    <main className={theme}>
      <section id='error-page'>
        <center>
          <h2>Error 404</h2>
          <code>
            It seems like you've tried to reach an unexisting URL.{' '}
            <a href='/'>Let me help you</a>
          </code>
        </center>
      </section>
    </main>
  )
}
