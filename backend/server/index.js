import express from 'express';
import morgan from 'morgan';
import { connect } from '../database/index';
import itemRouter from '../item/itemRouter';


const PORT = process.env.PORT || 50000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/item', itemRouter);

// app.get('/bundle.js', (req, res) => {});

app.use('/', express.static('client/public'));

connect();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));