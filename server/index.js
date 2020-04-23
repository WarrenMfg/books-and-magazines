const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 50000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/', express.static('client'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));