import React from 'react';


class Item extends React.Component {
  constructor() {
    super();
    this.state = {

    };

  }

  render() {
    if (this.props.item.item === 'book') {
      const { title, author, description, price } = this.props.item;
      return (
        <div className="Item">
          <p>{title}</p>
          <p>{author}</p>
          <p>{description}</p>
          <p>{price}</p>
        </div>
      );

    } else if (this.props.item.item === 'magazine') {
      const { name, volume, issue, description, price } = this.props.item;
      return (
        <div className="Item">
          <p>{name}</p>
          <p><span>{volume}</span> <span>{issue}</span></p>
          <p>{description}</p>
          <p>{price}</p>
        </div>
      );
    }
  }
}

export default Item;