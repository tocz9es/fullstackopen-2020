import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = ({ show }) => {
  const [variables, setVariables] = useState({})

  const { loading, data, refetch } = useQuery(ALL_BOOKS, { variables })
  const genres = useQuery(ALL_GENRES)

  useEffect(() => {
    refetch(variables)
  }, [refetch, variables])

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        you are in genre <b>{variables.genre || 'all genres'}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {variables && (
        <div>
          {genres.data.allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setVariables({ genre: genre })}
              style={{ marginRight: '5px' }}
            >
              {genre}
            </button>
          ))}

          <button onClick={() => setVariables({ genre: '' })}>
            all genres
          </button>
        </div>
      )}
    </div>
  )
}

export default Books