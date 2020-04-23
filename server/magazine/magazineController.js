const crud = require('../../database/crud');
const Magazine = require('../../database/magazineModel');

// receive object of methods from crud.js
module.exports = crud(Magazine);