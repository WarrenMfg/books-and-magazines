const GET = (item = 'book', quantity = 'all') => {
  return fetch(`api/${item}/${quantity}`);
};

const POST = (item, quantity, data) => {
  return fetch(`api/${item}/${quantity}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const PUT = (item, quantity, data) => {
  return fetch(`api/${item}/${quantity}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const DELETE = (item, quantity, record) => {
  return fetch(`api/${item}/${quantity}/${record}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};


module.exports = {
  GET,
  POST,
  PUT,
  DELETE
};