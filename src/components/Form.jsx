import React from 'react';


class Form extends React.Component {
  constructor() {
    super();
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

  handleChange(e) {
    // if radio button
    if (e.target.name === 'item') {
      // reset previous fields
      this.resetFields(e.target.value);
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
      this.resetFields('magazine');
    } else if (this.state.item === 'magazine') {
      this.resetFields('book');
    }
  }

  provideUserFeedback(name) {
    if (name === 'description') {
      const element = document.querySelector(`textarea[name=${name}]`);
      element.classList.add('invalidField');
      setTimeout(() => {
        element.classList.remove('invalidField');
      }, 2000);

    } else {
      const element = document.querySelector(`input[name=${name}]`);
      element.classList.add('invalidField');
      setTimeout(() => {
        element.classList.remove('invalidField');
      }, 2000);
    }

    return true;
  }

  validateForm(item) {
    let isValid = true;
    const data = { item };

    if (item === 'book') {
      const { title, author, description, price } = this.state;
      // if state propery is truthy, then add it to data object; otherwise, provide user feedback, and set isValid to false
      title ? data.title = title.trim() : this.provideUserFeedback('title') ? isValid = false : null;
      author ? data.author = author.trim() : this.provideUserFeedback('author') ? isValid = false : null;
      description ? data.description = description.trim() : this.provideUserFeedback('description') ? isValid = false : null;
      price && /^([0-9])+\.?([0-9]{2})?$/.test(price) ? data.price = parseFloat(price) : this.provideUserFeedback('price') ? isValid = false : null;

    } else if (item === 'magazine') {
      const { name, volume, issue, description, price } = this.state;
      // if state propery is truthy, then add it to data object; otherwise, provide user feedback, and set isValid to false
      name ? data.name = name.trim() : this.provideUserFeedback('name') ? isValid = false : null;
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

    this.props.POST('item', 'one', data);
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

            <fieldset id="Form-book">
              <div id="Form-book-top">
                <label id="Form-book-title" htmlFor="title">Title <input id="title" type="text" name="title" value={this.state.title} onChange={this.handleChange}/></label>
                <label id="Form-book-author" htmlFor="author">Author <input id="author" type="text" name="author" value={this.state.author} onChange={this.handleChange}/></label>
              </div>
              <div id="Form-book-bottom">
                <label id="Form-book-description" htmlFor="description">Description <textarea id="description" name="description" value={this.state.description} onChange={this.handleChange}></textarea></label>
                <label id="Form-book-price" htmlFor="price">Price <input id="price" type="text" name="price" value={this.state.price} onChange={this.handleChange}/></label>
              </div>
            </fieldset>

            :

            <fieldset id="Form-magazine">
              <div id="Form-magazine-top">
                <label id="Form-magazine-name" htmlFor="name">Name <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleChange}/></label>
                <label id="Form-magazine-volume" htmlFor="volume">Volume <input id="volume" type="text" name="volume" value={this.state.volume} onChange={this.handleChange}/></label>
                <label id="Form-magazine-issue" htmlFor="issue">Issue <input id="issue" type="text" name="issue" value={this.state.issue} onChange={this.handleChange}/></label>
              </div>
              <div id="Form-magazine-bottom">
                <label id="Form-magazine-description" htmlFor="description">Description <textarea id="description" name="description" value={this.state.description} onChange={this.handleChange}></textarea></label>
                <label id="Form-magazine-price" htmlFor="price">Price <input id="price" type="text" name="price" value={this.state.price} onChange={this.handleChange}/></label>
              </div>
            </fieldset>

            :

            null
          }

          {
            this.state.item ?

            <div id="Form-buttons">
              <button type="button" onClick={this.handleSubmit}>Submit</button>
              <button type="button" onClick={this.handleResetButton}>Reset</button>
              <button type="button" onClick={this.props.handleCancel}>Cancel</button>
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