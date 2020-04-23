const crud = require('../../database/crud');
const Item = require('../../database/itemModel');

// receive object of methods from crud.js
module.exports = crud(Item);