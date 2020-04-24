import React from 'react';


class Item extends React.Component {
  constructor() {
    super();
    this.state = {

    };

  }

  render() {
    if (this.props.item.item === 'book') {
      const { _id, title, author, description, price } = this.props.item;
      return (
        <div className="Item Item-book" onClick={this.props.handleEditOrDelete} data-id={_id}>
          <p className="Item-title">{title}</p>
          <p className="Item-author">{author}</p>
          <p className="Item-description">{description}</p>
          <p className="Item-price">{price}</p>
          <p className="Item-crud"><i className="fas fa-edit"></i><i className="fas fa-trash-alt"></i></p>
        </div>
      );

    } else if (this.props.item.item === 'magazine') {
      const { _id, name, volume, issue, description, price } = this.props.item;
      return (
        <div className="Item Item-magazine" onClick={this.props.handleEditOrDelete} data-id={_id}>
          <p className="Item-name">{name}</p>
          <p className="Item-volume-span"><span>{volume}</span> <span>{issue}</span></p>
          <p className="Item-description">{description}</p>
          <p className="Item-price">{price}</p>
          <p className="Item-crud"><i className="fas fa-edit"></i><i className="fas fa-trash-alt"></i></p>
        </div>
      );
    }
  }
}

export default Item;