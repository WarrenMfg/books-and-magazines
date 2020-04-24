import React from 'react';
import api from '../api';
import Form from './Form.jsx';
import ItemList from './ItemList.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      formVisible: false,
      items: [],
      itemInEditMode: null
    };

    this.POST = this.POST.bind(this);
    this.PUT = this.PUT.bind(this);
    this.hanldeFormVisibility = this.hanldeFormVisibility.bind(this);
    this.handleEditOrDelete = this.handleEditOrDelete.bind(this);
  }

  // LIFECYCLE
  componentDidMount() {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.setState({ formVisible: false, itemInEditMode: null });
      }
    });
    this.GET('item', 'all');
  }

  componentDidUpdate(prevProps, prevState) {

  }

  // API
  GET(item, quantity) {
    api.GET(item, quantity)
      .then(res => res.json())
      .then(items => this.setState({ items }))
      .catch(err => console.error(err));
  }

  POST(item, quantity, data) {
    api.POST(item, quantity, data)
      .then(res => res.json())
      .then(items => {
        this.setState({ items });
        this.hanldeFormVisibility();
      })
      .catch(err => console.error(err));
  }

  PUT(item, quantity, data) {
    api.PUT(item, quantity, data)
      .then(res => res.json())
      .then(items => {
        this.setState({ items });
        this.hanldeFormVisibility();
      })
      .catch(err => console.error(err));
  }

  DELETE(item, quantity, id) {
    api.DELETE(item, quantity, id)
      .then(res => res.json())
      .then(items => this.setState({ items }))
      .catch(err => console.error(err));
  }

  // HANDLERS
  hanldeFormVisibility() {
    if (this.state.itemInEditMode) {
      this.setState({ itemInEditMode: null });
    } else {
      this.setState({ formVisible: !this.state.formVisible });
    }
  }

  handleEditOrDelete(e) {
    const id = e.target.closest('div.Item').dataset?.id;

    // edit
    if (id && e.target.classList.contains('fa-edit')) {
      const itemInEditMode = { ...this.state.items.filter(item => item._id === id)[0] };
      this.setState({ itemInEditMode });

    // delete
    } else if (id && e.target.classList.contains('fa-trash-alt')) {
      this.DELETE('item', 'one', id);
    }
  }

  render() {
    return (
      <div className="App">
        <button id="App-button" type="button" onClick={this.hanldeFormVisibility}>Add Item</button>
        { this.state.formVisible && <Form handleCancel={this.hanldeFormVisibility} POST={this.POST} /> }
        { this.state.itemInEditMode && <Form handleCancel={this.hanldeFormVisibility} itemInEditMode={this.state.itemInEditMode} PUT={this.PUT} /> }
        <ItemList
          items={this.state.items}
          handleEditOrDelete={this.handleEditOrDelete}
        />
      </div>
    );
  }
}

export default App;



/*

Questions 1 and 2:

class Item {
  constructor(
    description = 'item description not defined',
    price = 'item price not defined') {

    this.type = this.constructor.name;
    this.description = description;
    this.price = price;
  }

  edit(key, newValue) {
    if (!key || !newValue) {
      return;
    } else if (key === 'type') {
      return 'cannot edit type';
    } else if (!this[key]) {
      return 'no key by that name';
    }

    this[key] = newValue;
  }

  addProperty(newKey, newValue) {
    if (!newKey || !newValue) {
      return;
    } else if (this.hasOwnProperty(newKey)) {
      return 'key already exists, use .edit() to edit';
    }

    this[newKey] = newValue;
  }

  deleteProperty(key) {
    if (key === 'type' || key === 'description' || key === 'price') {
      return 'cannot delete type, description, or price';
    } else if (this instanceof Magazine && ( key === 'name' || key === 'volume' || key === 'issue' )) {
      return `cannot delete ${key}`;
    } else if (this instanceof Book && ( key === 'title' || key === 'author' )) {
      return `cannot delete ${key}`;
    } else if (!this[key]) {
      return `${key} does not exist`;
    }

    delete this[key];
  }
}

class Book extends Item {
  constructor(
    title = 'book title not defined',
    author = 'book author not defined',
    description,
    price) {

    super(description, price);

    this.title = title;
    this.author = author;
  }
}

class Magazine extends Item {
  constructor(
    name = 'magazine name not defined',
    volume = 'magazine volume not defined',
    issue = 'magazine issue not defined',
    description,
    price) {

    super(description, price);

    this.name = name;
    this.volume = volume;
    this.issue = issue;
  }
}

const myBook = new Book(
  'Eloquent JavaScript',
  'Marijn Haverbeke',
  'JavaScript, programming, and the wonders of the digital',
  25
);

const myMag = new Magazine(
  'JavaScript Monthly',
  10,
  6,
  'A magazine about JavaScript',
  15
);

console.log(myBook);
console.log(myMag);


Questions 3 and 4:
See application.

Question 5:
Save the Book data to a database, then when triggered (e.g. onload, when a specific view is toggled, etc.), either make a GET request for the data, save it to state, and map each Book's data to a class instance (drilling each dataset as a prop for each instance); or if previously requested, use the state to map each Book's data to a class instance (again, drilling each dataset as a prop for each instance).

Question 6:
Injecting the DOM with sequential elements: typically, elements have semantic meaning and we generally do not want these out of order.

Question 7:
Privacy--this is common with IIFEs (e.g. jQuery). It mitigates polluting the window/global environment with variables, which can help mitigate bugs.

Question 8:
Webpack in production mode. Developers can also gZip assets to compress them which can help diminish the time to first byte.

Question 9:
localStorage or a database. At predetermined milestones (e.g. scroll position, toggling widgets, a specific view, etc.), setItem if using localStorage, or make a POST or PUT request if using a database, to persist the state. Then onload, when componentDidMount is invoked, call getItem or make a GET request for the relevant user data, then update the view accordingly.

Question 10:
Same answer as Question 9, but use a database instead of localStorage.

*/