const GET = (item = 'item', quantity = 'all', column, direction) => {
  return fetch(`api/${item}/${quantity}/${column}/${direction}`);
};

const POST = (item = 'item', quantity = 'one', column, direction, data) => {
  return fetch(`api/${item}/${quantity}/${column}/${direction}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const PUT = (item = 'item', quantity = 'one', column, direction, data) => {
  return fetch(`api/${item}/${quantity}/${column}/${direction}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const DELETE = (item = 'item', quantity = 'one', column, direction, id) => {
  return fetch(`api/${item}/${quantity}/${column}/${direction}/${id}`, {
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