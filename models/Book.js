const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema(
  {
    name: { type: String },
    image: { type: String },
    quotes: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Book', Book)
