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
          <p className="Item-title" title={title}>{title}</p>
          <p className="Item-author" title={author}>{author}</p>
          <p className="Item-description" title={description}>{description}</p>
          <p className="Item-price" title={`$${price.toFixed(2)}`}>{`$${price.toFixed(2)}`}</p>
          <p className="Item-crud"><i className="fas fa-edit" alt="Edit" title="Edit"></i><i className="fas fa-trash-alt" alt="Delete" title="Delete"></i></p>
        </div>
      );

    } else if (this.props.item.item === 'magazine') {
      const { _id, name, volume, issue, description, price } = this.props.item;
      return (
        <div className="Item Item-magazine" onClick={this.props.handleEditOrDelete} data-id={_id}>
          <p className="Item-name" title={name}>{name}</p>
          <p className="Item-volume-span" title={`v: ${volume} i: ${issue}`}><span>v: {volume}</span>,&nbsp;<span>i: {issue}</span></p>
          <p className="Item-description" title={description}>{description}</p>
          <p className="Item-price" title={`$${price.toFixed(2)}`}>{`$${price.toFixed(2)}`}</p>
          <p className="Item-crud"><i className="fas fa-edit" alt="Edit" title="Edit"></i><i className="fas fa-trash-alt" alt="Delete" title="Delete"></i></p>
        </div>
      );
    }
  }
}

export default Item;