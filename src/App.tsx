import React, { useEffect, useState } from 'react'
import './App.css'
import './firebase'
import {
  getFirestore,
  getDocs,
  collection,
  DocumentData,
} from 'firebase/firestore'
import { Homepage, Post, PageNotFound } from './components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const [arr, setArr] = useState<DocumentData[]>([])
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    fetchData()
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage arr={arr} theme={theme} />,
    },
    { path: '*', element: <PageNotFound theme={theme} /> },
    { path: 'posts/:postId', element: <Post theme={theme} /> },
  ])

  const db = getFirestore()

  const fetchData = async () => {
    const posts = await getDocs(collection(db, 'posts'))
    const tmp: Array<DocumentData> = []
    posts.forEach((post) => {
      tmp.push(post.data())
    })
    setArr(tmp.reverse())
  }

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

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

  return (
    <>
      <header>
        <h1>
          <a id='logoLink' href='/'>
            dziuk.dev
          </a>
        </h1>
        {theme === 'light' && (
          <div
            id='moon'
            onClick={() => {
              changeTheme()
            }}
          >
            <div id='moon-crater-small'></div>
            <div id='moon-crater-medium'></div>
            <div id='moon-crater-large'></div>
          </div>
        )}
        {theme === 'dark' && (
          <div
            id='sun'
            onClick={() => {
              changeTheme()
            }}
          ></div>
        )}
      </header>
      <div id='circle-small' className='circle'></div>
      <div id='circle-medium' className='circle'></div>
      <div id='circle-large' className='circle'></div>
      {arr[0] ? <RouterProvider router={router} /> : <i>Loading...</i>}
      <footer>
        <p>Copyright © 2023 // dziuk.dev</p>
      </footer>
    </>
  )
}

export default App
