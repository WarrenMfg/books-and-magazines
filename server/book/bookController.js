const crud = require('../../database/crud');
const Book = require('../../database/bookModel');

// receive object of methods from crud.js
module.exports = crud(Book);