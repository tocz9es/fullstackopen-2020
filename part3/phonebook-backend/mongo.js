const mongoose = require('mongoose')

if (process.argv.length < 5) {
  console.log('Please provide password, name, number as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.fmn1f.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

// person.save().then(res => {
//   console.log('Saved!', res)

//   Person.find({}).then((res) => {
//     res.forEach((person) => {
//       console.log(person)
//       mongoose.connection.close()
//     })
//   })
// })

Person
  .find({})
  .then((persons) => {
    persons.forEach((person) => {
      console.log('All names: ', person)
    })
  })
  .then(
    person.save().then((res) => {
      console.log('Saved!', res)
    })
  )

mongoose.connection.close()