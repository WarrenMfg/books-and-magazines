import React from 'react';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,

      // book
      title: '',
      author: '',

      // magazine
      name: '',
      volume: '',
      issue: '',

      // both
      description: '',
      price: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // enable cancel by clicking outside of form
    document.querySelector('#Form').addEventListener('click', (e) => {
      if (e.target.id === 'Form') {
        this.props.handleCancel();
      }
    });

    // if editing an item, then disable radio buttons and populate inputs with item values
    if (this.props.itemInEditMode) {
      this.checkRadioButtonAndDisable();
      this.populateInputsWithItemValues();
    }
  }

  checkRadioButtonAndDisable() {
    const radio = document.querySelectorAll('input[type="radio"]');

    radio.forEach(button => {
      // check the proper button
      if (button.value === this.props.itemInEditMode.item) {
        button.checked = true;
      }
      // disable both buttons
      button.disabled = true;
    })
  }

  populateInputsWithItemValues() {
    const itemValues = this.props.itemInEditMode;

    const item = itemValues.item;

    // book
    const title = itemValues.title ? itemValues.title : '';
    const author = itemValues.author ? itemValues.author : '';

    // magazine
    const name = itemValues.name ? itemValues.name : '';
    const volume = itemValues.volume ? itemValues.volume : '';
    const issue = itemValues.issue ? itemValues.issue : '';

    // both
    const description = itemValues.description ? itemValues.description : '';
    const price = itemValues.price ? itemValues.price : '';

    // set state with values of item being edited
    this.setState({ item, title, author, name, volume, issue, description, price });
  }

  handleChange(e) {
    // handle change when adding a new item

    // if radio button
    if (e.target.name === 'item') {
      // reset previous fields
      this.resetFields(e.target.value);
      this.removeUserFeedback();
    }

    this.setState({ [e.target.name]: e.target.value });
  }

  resetFields(name) {
    // when radio button changes, reset opposite
    if (name === 'book') {
      // reset magazine fields
      this.setState({ name: '', volume: '', issue: '', description: '', price: '' });
    } else if (name === 'magazine') {
      // reset book fields
      this.setState({ title: '', author: '', description: '', price: '' });
    }
  }

  handleResetButton() {
    if (this.state.item === 'book') {
      // resuse code to reset opposite

      // resets book
      this.resetFields('magazine');
    } else if (this.state.item === 'magazine') {

      // resets magazine
      this.resetFields('book');
    }

    this.removeUserFeedback();
  }

  removeUserFeedback() {
    const para = document.querySelectorAll('form p');

    // remove background color and replace text with &nbsp;
    para.forEach(p => {
      p.classList.remove('invalid');
      p.innerText = '\u00a0';
    });
  }

  provideUserFeedback(name) {
    const feedback = {
      // book
      title: 'Title required: alphanumeric characters',
      author: 'Author required: alpha characters',

      // magazine
      name: 'Name required: alphanumeric characters',
      volume: 'Volume required: numeric characters',
      issue: 'Issue required: numeric characters',

      // both
      description: 'Description required',
      price: 'Price required: numeric characters'
    };

    // input feedback
    const para = document.querySelector(`#Form-${name}-feedback`);
    para.classList.add('invalid');
    para.innerText = feedback[name];

    // feedback below buttons
    const buttons = document.querySelector('#Form-buttons-feedback');
    buttons.classList.add('invalid');
    buttons.innerText = 'Please review the errors above';

    return true;
  }

  validateForm(item) {
    let isValid = true;
    const data = { item };
    this.removeUserFeedback();

    if (item === 'book') {
      const { title, author, description, price } = this.state;

      // this is not as scary as it seems: if state propery is truthy, then add it to data object; otherwise, provide user feedback, and set isValid to false
      title && /^[A-Za-z0-9 \.\'\"\-]+$/.test(title) ? data.title = title.trim() : this.provideUserFeedback('title') ? isValid = false : null;
      author && /^[A-Za-z \-]+$/.test(author) ? data.author = author.trim() : this.provideUserFeedback('author') ? isValid = false : null;
      description ? data.description = description.trim() : this.provideUserFeedback('description') ? isValid = false : null;
      price && /^([0-9])+\.?([0-9]{2})?$/.test(price) ? data.price = parseFloat(price) : this.provideUserFeedback('price') ? isValid = false : null;

    } else if (item === 'magazine') {
      const { name, volume, issue, description, price } = this.state;

      // this is not as scary as it seems: if state propery is truthy, then add it to data object; otherwise, provide user feedback, and set isValid to false
      name && /^[A-Za-z0-9 \.\'\"\-]+$/.test(name) ? data.name = name.trim() : this.provideUserFeedback('name') ? isValid = false : null;
      volume && /^[0-9]+$/.test(volume) ? data.volume = parseInt(volume, 10) : this.provideUserFeedback('volume') ? isValid = false : null;
      issue && /^[0-9]+$/.test(issue) ? data.issue = parseInt(issue, 10) : this.provideUserFeedback('issue') ? isValid = false : null;
      description ? data.description = description.trim() : this.provideUserFeedback('description') ? isValid = false : null;
      price && /^([0-9])+\.?([0-9]{2})?$/.test(price) ? data.price = parseFloat(price) : this.provideUserFeedback('price') ? isValid = false : null;
    }

    if (isValid) {
      return data;
    } else {
      return false;
    }
  }

  handleSubmit() {
    const data = this.validateForm(this.state.item);
    if (!data) return;

    // if editing, then PUT
    if (this.props.itemInEditMode) {
      data._id = this.props.itemInEditMode._id;
      this.props.PUT('item', 'one', this.props.column, this.props.direction, data);

    // otherwise, POST
    } else {
      this.props.POST('item', 'one', this.props.column, this.props.direction, data);
    }
  }

  render() {
    return (
      <div id="Form">
        <form>

          <fieldset>
            <div id="Form-book-or-magazine">
              <label id="Form-book-book" htmlFor="book">Book&nbsp;<input id="book" type="radio" name="item" value="book" onChange={this.handleChange}/></label>
              <label id="Form-book-magazine" htmlFor="magazine">Magazine&nbsp;<input id="magazine" type="radio" name="item" value="magazine" onChange={this.handleChange}/></label>
            </div>
          </fieldset>


          {
            this.state.item ? this.state.item === 'book' ?

            <fieldset>
              <div id="Form-book">
                <label id="Form-book-title" htmlFor="title">Title <input id="title" type="text" name="title" value={this.state.title} onChange={this.handleChange}/></label>
                <p id="Form-title-feedback">&nbsp;</p>
                <label id="Form-book-author" htmlFor="author">Author <input id="author" type="text" name="author" value={this.state.author} onChange={this.handleChange}/></label>
                <p id="Form-author-feedback">&nbsp;</p>
                <label id="Form-book-description" htmlFor="description">Description <textarea id="description" name="description" value={this.state.description} onChange={this.handleChange}></textarea></label>
                <p id="Form-description-feedback">&nbsp;</p>
                <label id="Form-book-price" htmlFor="price">Price <input id="price" type="text" name="price" value={this.state.price} onChange={this.handleChange}/></label>
                <p id="Form-price-feedback">&nbsp;</p>
              </div>
            </fieldset>

            :

            <fieldset>
              <div id="Form-magazine">
                <label id="Form-magazine-name" htmlFor="name">Name <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleChange}/></label>
                <p id="Form-name-feedback">&nbsp;</p>
                <label id="Form-magazine-volume" htmlFor="volume">Volume <input id="volume" type="text" name="volume" value={this.state.volume} onChange={this.handleChange}/></label>
                <p id="Form-volume-feedback">&nbsp;</p>
                <label id="Form-magazine-issue" htmlFor="issue">Issue <input id="issue" type="text" name="issue" value={this.state.issue} onChange={this.handleChange}/></label>
                <p id="Form-issue-feedback">&nbsp;</p>
                <label id="Form-magazine-description" htmlFor="description">Description <textarea id="description" name="description" value={this.state.description} onChange={this.handleChange}></textarea></label>
                <p id="Form-description-feedback">&nbsp;</p>
                <label id="Form-magazine-price" htmlFor="price">Price <input id="price" type="text" name="price" value={this.state.price} onChange={this.handleChange}/></label>
                <p id="Form-price-feedback">&nbsp;</p>
              </div>
            </fieldset>

            :

            null
          }

          {
            this.state.item ?

            <div>
              <div id="Form-buttons">
                <button type="button" onClick={this.handleSubmit}>Submit</button>
                <button type="button" onClick={this.handleResetButton}>Reset</button>
                <button type="button" onClick={this.props.handleCancel}>Cancel</button>
              </div>
              <p id="Form-buttons-feedback">&nbsp;</p>
            </div>

            :

            <button id="Form-single-cancel-button" type="button" onClick={this.props.handleCancel}>Cancel</button>
          }

        </form>
      </div>
    );
  }
}

export default Form;