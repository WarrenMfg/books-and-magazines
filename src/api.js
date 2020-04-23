const GET = (item = 'item', quantity = 'all') => {
  return fetch(`api/${item}/${quantity}`);
};

const POST = (item = 'item', quantity = 'one', data) => {
  return fetch(`api/${item}/${quantity}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const PUT = (item = 'item', quantity = 'one', data) => {
  return fetch(`api/${item}/${quantity}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const DELETE = (item = 'item', quantity = 'one', record) => {
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