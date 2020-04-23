const express = require('express');
const morgan = require('morgan');
const connect = require('../database/index');
const itemRouter = require('./item/itemRouter');

const PORT = process.env.PORT || 50000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/item', itemRouter);

// app.get('/bundle.js', (req, res) => {});

app.use('/', express.static('client'));

connect();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));