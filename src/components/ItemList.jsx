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
        {this.props.items.map(item => <Item key={item._id} item={item} handleEditOrDelete={this.props.handleEditOrDelete} />)}
      </div>
    );
  }
}

export default ItemList;