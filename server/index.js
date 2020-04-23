const express = require('express');
const morgan = require('morgan');
const connect = require('../database/index');
const bookRouter = require('./book/bookRouter');
const magazineRouter = require('./magazine/magazineRouter');

const PORT = process.env.PORT || 50000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/books', bookRouter);
app.use('/api/magazines', magazineRouter);

// app.get('/bundle.js', (req, res) => {});

app.use('/', express.static('client'));

connect();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));