import React from 'react';
import Item from './Item.jsx';


class ItemList extends React.Component {
  constructor() {
    super();
    this.state = {

    };

  }

  render() {
    return (
      <div className="ItemList">
        <header id="ItemList-header">
          <p id="header-col-1">Book Title /<br/>Publication Name</p>
          <p id="header-col-2">Book author /<br/>Volume &amp; Issue</p>
          <p id="header-col-3">Description</p>
          <p id="header-col-4">Price</p>
          <p id="header-col-5">Edit /<br/>Delete</p>
        </header>
        {this.props.items.map(item => <Item key={item._id} item={item} handleEditOrDelete={this.props.handleEditOrDelete} />)}
      </div>
    );
  }
}

export default ItemList;