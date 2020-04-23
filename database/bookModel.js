const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  item: {
    type: String,
    default: 'Book'
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;