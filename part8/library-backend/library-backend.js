require('dotenv').config()
const { ApolloServer, UserInputError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
}).then(() => {
  console.log('connected to MongoDB')
}).catch(err => {
  console.log('error connection to MongoDB:', err.message)
})

const pubsub = new PubSub()

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String]!
    me: User!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (args.author && args.genre) {
        return await Book.find({ $and: [{author: { $all: author.id }}, { genres: { $all: args.genre } }] }).populate('author')
      }
      if (args.author) {
        return await Book.find({ author: { $all: author.id } }).populate('author')
      }
      if (args.genre) {
        return await Book.find({ genres: { $all: args.genre } }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}),
    allGenres: () => Book.find({}).distinct('genres'),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async ({ name }) => {
      const books = await Book.find({}).populate('author')
      return books.filter((b) => b.author.name === name).length
    },
    // bookCount: root => root.books.length
  },
  Mutation: {
    addBook: async(root, args) => {
      // detect author is recorded or not
      const currentAuthor = await Author.findOne({ name: args.author })

      if (!currentAuthor) {
        const newAuthor = new Author({ name: args.author })
        try {
          currentAuthor = await newAuthor.save()
        } catch (err) {
          throw new UserInputError(err.message, { invalidArgs: args })
        }
      }

      // detect book's title exist
      const currentBook = await Book.findOne({ title: args.title })
      if (currentBook) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        })
      }

      // now continue to create book
      const newBook = new Book({
        ...args,
        author: currentAuthor._id
      })

      try {
        await newBook.save()
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args })
      }

      resultBook = Book.findById(newBook._id).populate('author')

      pubsub.publish('BOOK_ADDED', { bookAdded: resultBook })

      return resultBook
    },
    editAuthor: async (root, args) => {
      const currentAuthor = await Author.findOne({ name: args.name })
      if (!currentAuthor) {
        return null
      }

      currentAuthor.born = args.setBornTo

      try {
        currentAuthor.save()
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args })
      }

      return currentAuthor
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
      
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
