const db = require('../db')
const Book = require('../models/Book.js')

const main = async () => {
  const book = [
    {
      name: '',
      image: '',
      quotes: ''
    }
  ]

  await Book.insertMany(book)
  console.log('God created Arrakis to train the faithful!')
}

const run = async () => {
  await main()
  db.close()
}

run()
