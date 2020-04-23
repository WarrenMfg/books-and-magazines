const mongoose = require('mongoose');


const magazineSchema = new mongoose.Schema({
  item: {
    type: String,
    default: 'Magazine'
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  issue: {
    type: Number,
    required: true
  }
});

const Magazine = mongoose.model('Magazine', magazineSchema);
module.exports = Magazine;