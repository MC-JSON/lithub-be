const Book = require('../models/Book.js')

//obtain book details
const getBook = async (req, res) => {
  try {
    const book = await Book.find()
    return res.status(200).json({ book })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//create book details
const createBook = async (req, res) => {
  try {
    const book = await new Book(req.body)
    await book.save()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//update book details
const updateBook = async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findByIdAndUpdate(id, req.body)
    res.status(200).json(book)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//delete book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Book.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).json('book deleted')
    }
    throw new Error('book not found')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  deleteBook,
  updateBook,
  getBook,
  createBook
}
