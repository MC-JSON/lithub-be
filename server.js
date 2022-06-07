const express = require('express')
const cors = require('cors')
const db = require('./db')
const logger = require('morgan')
const {
  getBook,
  deleteBook,
  updateBook,
  createBook
} = require('./controller/BookController')
const { signup, signin, verify } = require('./controller/AuthController')

const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

//routes
app.post('/signup', signup)
app.post('/signin', signin)
app.get('/verify', verify)
app.get('/book', getBook)
app.post('/create/book', createBook)
app.put('/update/book/:id', updateBook)
app.delete('/delete/book/:id', deleteBook)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
