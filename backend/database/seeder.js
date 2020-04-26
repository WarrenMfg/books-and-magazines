const axios = require('axios');
const faker = require('faker');

const host = 'http://localhost';
const port = 50000;
const route = '/api/item/one/price/descending';
const path = `${host}:${port}${route}`;

let posts = [];

const seeder = (i) => {
  const data = {};

  // 1 or 0 (truthy or falsy)
  if (Math.floor( Math.random() * 2 )) {
    // book
    data.item = 'book';
    data.title = faker.commerce.productName();
    data.author = `${faker.name.firstName()} ${faker.name.lastName()}`;
    data.description = faker.lorem.paragraph(5);
    data.price = parseFloat(faker.finance.amount(5.99, 99.99, 2));

  } else {
    // magazine
    data.item = 'magazine'
    data.name = faker.commerce.productName();
    data.volume = parseInt(faker.finance.amount(1, 24, 0), 10);
    data.issue = parseInt(faker.finance.amount(1, 12, 0), 10);
    data.description = faker.lorem.paragraph(5);
    data.price = parseFloat(faker.finance.amount(5.99, 99.99, 2));
  }

  // POST request
  posts.push( axios.post(path, data)
    .catch(err => console.error(err)) );

  console.log(`POST request: ${i + 1}`);
};

for (let i = 0; i < 50; i++) {
  seeder(i);
}

Promise.all(posts)
  .then(() => console.log('Seeder complete!'))
  .catch(err => console.error(err));