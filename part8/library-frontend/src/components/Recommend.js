import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ show, user }) => {
  const books = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (user.loading || books.loading) {
    return <div>loading...</div>
  }

  if (user.error || books.error) {
    return <div>{user.error.message || books.error.message}</div>
  }

  return (
    <div>
      <h2>recommendation</h2>

      <p>
        books in your favorite genre is <b>{user.data.me.favoriteGenre}</b>
      </p>
    </div>
  )
}

export default Recommend