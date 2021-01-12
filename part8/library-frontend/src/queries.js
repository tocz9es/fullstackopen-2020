import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query allBooks (
    $genre: String
  ) {
    allBooks(
      genre: $genre
    ) {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const MODIFY_AUTHOR = gql`
  mutation modifyAuthor(
    $name: String!
    $born: Int!
  ) {
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name,
      born,
      bookCount
    }
  }
`

export const USER_LOGIN = gql`
  mutation userLogin(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`
