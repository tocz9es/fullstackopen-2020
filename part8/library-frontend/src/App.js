
import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const user = useQuery(ME)
  const authors = useQuery(ALL_AUTHORS)

  const client = useApolloClient()

  useEffect(() => {
    const lsToken = localStorage.getItem('library-user-token')
    if (lsToken) {
      setToken(lsToken)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(b => b.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      alert(`Book created! \n ${subscriptionData}`)
    }
  })

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <button onClick={() => setPage('add')}>add book</button>
        ) : null}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} authors={authors} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
      <Recommend show={page === 'recommend'} user={user} />
    </div>
  )
}

export default App