require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/persons')

const app = express()

// before request middleware
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return null
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// GET /info
app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `)
  })

})

// GET /api/persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// GET /api/persons/:id
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    person ? res.json(person) : res.status(404).end()
  }).catch(err => next(err))
})

// POST /api/persons/
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body === undefined) {
    return res.status(400).json({ err: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(err => next(err))
})

// PUT /api/persons/:id
app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body

  Person
    .findByIdAndUpdate(req.params.id, { number }, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(err => next(err))
})

// DELETE /api/persons/:id
app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

// after request middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})