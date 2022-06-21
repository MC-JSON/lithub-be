const db = require('../db')
const Book = require('../models/Book.js')

const main = async () => {
  const book = [
    {
      name: 'The Bone Clocks',
      author: 'David Mitchell',
      image:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1398205538l/20819685.jpg',
      quotes:
        'Just now and then who he really is smiles out at me through the blacks of Jackos eyes, like someone watching you from a train zipping past. At those times, I almost want to wave, even though he is just across the table, or we’re passing on the stairs.'
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
