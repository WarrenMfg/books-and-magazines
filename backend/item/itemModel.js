import mongoose from 'mongoose';


const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },

  // book
  title: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: false
  },

  // magazine
  name: {
    type: String,
    required: false
  },
  volume: {
    type: Number,
    required: false
  },
  issue: {
    type: Number,
    required: false
  },

  // both
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;