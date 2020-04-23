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
      title ? data.title = title.trim() : this.provideUserFeedback('title') ? isValid = false : null;
      author ? data.author = author.trim() : this.provideUserFeedback('author') ? isValid = false : null;
      description ? data.description = description.trim() : this.provideUserFeedback('description') ? isValid = false : null;
      price && /^([0-9])+\.?([0-9]{2})?$/.test(price) ? data.price = parseFloat(price) : this.provideUserFeedback('price') ? isValid = false : null;

    } else if (item === 'magazine') {
      const { name, volume, issue, description, price } = this.state;
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

    this.props.POST(this.state.item, 'one', data);
  }

  render() {
    return (
      <div className="Form">
        <form>

          <fieldset>
            <label>Book <input type="radio" name="item" value="book" onChange={this.handleChange}/></label>
            <label>Magazine <input type="radio" name="item" value="magazine" onChange={this.handleChange}/></label>
          </fieldset>


          {
            this.state.item ? this.state.item === 'book' ?

            <fieldset>
              <label>Title <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/></label>
              <label>Author <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/></label>
              <label>Description <textarea name="description" value={this.state.description} onChange={this.handleChange}></textarea></label>
              <label>Price <input type="text" name="price" value={this.state.price} onChange={this.handleChange}/></label>
            </fieldset>

            :

            <fieldset>
              <label>Name <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></label>
              <label>Volume <input type="text" name="volume" value={this.state.volume} onChange={this.handleChange}/></label>
              <label>Issue <input type="text" name="issue" value={this.state.issue} onChange={this.handleChange}/></label>
              <label>Description <textarea name="description" value={this.state.description} onChange={this.handleChange}></textarea></label>
              <label>Price <input type="text" name="price" value={this.state.price} onChange={this.handleChange}/></label>
            </fieldset>

            :

            null
          }

          {
            this.state.item ?

            <div>
              <button type="button" onClick={this.handleSubmit}>Submit</button>
              <button type="button" onClick={this.handleResetButton}>Reset</button>
              <button type="button" onClick={this.props.handleCancel}>Cancel</button>
            </div>

            :

            <button type="button" onClick={this.props.handleCancel}>Cancel</button>
          }

        </form>
      </div>
    );
  }
}

export default Form;