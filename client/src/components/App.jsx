import React from 'react';
import api from '../api';
import SearchBar from './SearchBar.jsx';
import Form from './Form.jsx';
import ItemList from './ItemList.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      localStorageAvailable: false,
      searchInput: '',
      formVisible: false,
      items: [],
      itemInEditMode: null,
      column: 'price',
      direction: 'descending'
    };

    this.POST = this.POST.bind(this);
    this.PUT = this.PUT.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleClearSearchInput = this.handleClearSearchInput.bind(this);
    this.handleSortTable = this.handleSortTable.bind(this);
    this.handleFormVisibility = this.handleFormVisibility.bind(this);
    this.handleEditOrDelete = this.handleEditOrDelete.bind(this);
  }

  // LIFECYCLE
  componentDidMount() {
    // add global listener to escape out of form component
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.setState({ formVisible: false, itemInEditMode: null });
      }
    });

    // on resize, columns receive 'display: none' at media queries. this function handles the caret in case that column gets hidden
    window.onresize = () => {
      if (window.innerWidth <= 780 && this.state.column === 'author') {
        this.updateCaretOnResize();
      } else if (window.innerWidth <= 970 && this.state.column === 'price') {
        this.updateCaretOnResize();
      } else if (window.innerWidth <= 1355 && this.state.column === 'description') {
        this.updateCaretOnResize();
      }
    };

    // check for localStorage and make first GET request
    this.checkForLocalStorageAndMakeFirstGetRequest();
  }

  componentDidUpdate(prevProps, prevState) {
    // if column or direction changed, make GET request
    if (prevState.column !== this.state.column || prevState.direction !== this.state.direction) {
      this.GET('item', 'all', this.state.column, this.state.direction);

      // if localStorage available
      if (this.state.localStorageAvailable) {
        // update with latest column/direction
        localStorage.setItem('columnAndDirection', JSON.stringify({ column: this.state.column, direction: this.state.direction }));
      }
    }
  }


  // API
  GET(item, quantity, column, direction) {
    api.GET(item, quantity, column, direction)
      .then(res => res.json())
      .then(items => this.setState({ items }))
      .catch(err => console.error(err));
  }

  POST(item, quantity, column, direction, data) {
    api.POST(item, quantity, column, direction, data)
      .then(res => res.json())
      .then(items => {
        this.setState({ items });
        this.handleFormVisibility();
      })
      .catch(err => console.error(err));
  }

  PUT(item, quantity, column, direction, data) {
    api.PUT(item, quantity, column, direction, data)
      .then(res => res.json())
      .then(items => {
        this.setState({ items });
        this.handleFormVisibility();
      })
      .catch(err => console.error(err));
  }

  DELETE(item, quantity, column, direction, id) {
    api.DELETE(item, quantity, column, direction, id)
      .then(res => res.json())
      .then(items => this.setState({ items }))
      .catch(err => console.error(err));
  }


  // HANDLERS
  handleSearchBarChange(e) {
    this.setState({ searchInput: e.target.value });
  }

  handleClearSearchInput() {
    this.setState({ searchInput: '' });
  }

  handleSortTable(e, direction = 'ascending') {
    // if clicked on Edit/Delete column
    if (e.target.dataset.column === 'edit') return;

    // determine if click was on i element (caret) or p element
    const target = e.target.tagName === 'P' ? e.target : e.target.parentElement;
    const caret = document.querySelector('#ItemList-header i');

    // if para already contains i element
    if (target.contains(caret)) {
      // switch direction
      this.setState({ direction: this.state.direction === 'ascending' ? 'descending' : 'ascending' });
      this.flipCaret(caret);

    // otherwise, remove i element and add to new para
    } else {
      caret.remove();
      this.addCaret(target.dataset.column, direction);
      this.setState({ column: target.dataset.column, direction: direction });
    }
  }

  handleFormVisibility() {
    // in edit mode
    if (this.state.itemInEditMode) {
      this.setState({ itemInEditMode: null });

    // add item
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
      this.DELETE('item', 'one', this.state.column, this.state.direction, id);
    }
  }


  // UTILS
  checkForLocalStorageAndMakeFirstGetRequest() {
    // check for localStorage
    if ( this.storageAvailable('localStorage') ) {

      // if columnAndDirection is already present
      const columnAndDirection = localStorage.getItem('columnAndDirection');
      if (columnAndDirection) {
        // parse localStorage
        const { column, direction } = JSON.parse(columnAndDirection);

        // if column and direction are both original defaults, then must trigger GET here instead of componentDidUpdate
        if (column === 'price' && direction === 'descending') {
          this.GET('item', 'all', this.state.column, this.state.direction);
        }

        // add caret to proper column with proper direction
        this.addCaret(column, direction);

        // update state
        this.setState({ localStorageAvailable: true, column, direction });

        // otherwise, localStorage is available, but columnAndDirection not yet set
      } else {
        // GET default column and direction
        this.GET('item', 'all', this.state.column, this.state.direction);

        // add caret to default column and direction
        this.addCaret(this.state.column, this.state.direction);

        // update state
        this.setState({ localStorageAvailable: true });
      }


    // but if localStorage not available
    } else {
      this.GET('item', 'all', this.state.column, this.state.direction);

      // add caret to default column and direction
      this.addCaret(this.state.column, this.state.direction);

      // update state
      this.setState({ localStorageAvailable: false});
    }
  }

  storageAvailable(type) {
    // from MDN
    var storage;
    try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0);
    }
  }

  addCaret(column, direction) {
    const i = document.createElement('i');
    direction === 'ascending' ? i.classList.add('fas', 'fa-caret-up') : i.classList.add('fas', 'fa-caret-down');
    document.querySelector(`[data-column="${column}"]`).append(i);
  }

  flipCaret(caret) {
    // if down, make up
    if ( caret.classList.contains('fa-caret-down') ) {
      caret.classList.remove('fa-caret-down');
      caret.classList.add('fa-caret-up');

    // if up, make down
    } else if ( caret.classList.contains('fa-caret-up') ) {
      caret.classList.remove('fa-caret-up');
      caret.classList.add('fa-caret-down');
    }
  }

  updateCaretOnResize() {
    const caret = document.querySelector('#ItemList-header i');
    caret.remove();
    // if this.state.column gets hidden on resize, then default to caret on title column
    this.addCaret('title', this.state.direction);
    this.setState({ column: 'title' });
  }


  // UI
  render() {
    return (
      <div className="App">

        <div className="App-search">
          <SearchBar
            handleSearchBarChange={this.handleSearchBarChange}
            handleClearSearchInput={this.handleClearSearchInput}
            column={this.state.column} searchInput={this.state.searchInput}
          />
          <button id="App-button" type="button" title="Add Item" onClick={this.handleFormVisibility}>Add Item</button>
        </div>

        {
          this.state.formVisible &&
            <Form
              handleCancel={this.handleFormVisibility}
              POST={this.POST} column={this.state.column}
              direction={this.state.direction}
            />
        }

        {
          this.state.itemInEditMode &&
            <Form
              handleCancel={this.handleFormVisibility}
              itemInEditMode={this.state.itemInEditMode}
              PUT={this.PUT}
              column={this.state.column}
              direction={this.state.direction}
            />
        }

        <header id="ItemList-header" onClick={this.handleSortTable}>
          <p id="header-col-1" data-column="title">Book Title&nbsp;/<br/>Magazine Name</p>
          <p id="header-col-2" data-column="author">Book Author&nbsp;/<br/>Volume &amp; Issue</p>
          <p id="header-col-3" data-column="description">Description</p>
          <p id="header-col-4" data-column="price">Price</p>
          <p id="header-col-5" data-column="edit">Edit&nbsp;/<br/>Delete</p>
        </header>

        <ItemList
          items={this.state.items}
          handleEditOrDelete={this.handleEditOrDelete}
          column={this.state.column}
          searchInput={this.state.searchInput}
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