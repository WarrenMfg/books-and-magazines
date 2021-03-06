import express from 'express';
import morgan from 'morgan';
import { connect } from '../database/index';
import itemRouter from '../item/itemRouter';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import { resolve } from 'path';


const PORT = process.env.PORT || 50000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/item', itemRouter);

app.get('/bundle.js', (req, res) => {
  const gzip = createGzip();
  const bundle = createReadStream(resolve(__dirname, '../../client/public/bundle.js'));
  res.set({ 'Content-Encoding': 'gzip', 'Cache-Control': 'max-age=86400' });
  bundle.pipe(gzip).pipe(res);
});

app.use('/', express.static('client/public'));

connect();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));