const mongoose = require('mongoose');
const URI = require('./URI');

module.exports = (location = URI) => {
  mongoose.connect(location, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  const db = mongoose.connection;
  db.on('error', (err) => console.log('connection error:', err));
  db.once('open', () => console.log('Connected to MongoDB!'));
};