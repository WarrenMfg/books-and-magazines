import React from 'react';
import Item from './Item.jsx';


class ItemList extends React.Component {
  constructor() {
    super();
    this.state = {

    };

  }

  render() {
    const { items, handleEditOrDelete, column, searchInput } = this.props;
    const regexp = searchInput ? new RegExp(`\\b${searchInput.toUpperCase()}\\b`) : null;

    if (regexp) {
      return (
        <div className="ItemList">
          {
            items.map(item => {

              // if item price equals searchInput
              if (column === 'price' && item.price <= parseFloat(searchInput)) {
                return <Item key={item._id} item={item} handleEditOrDelete={handleEditOrDelete} />

              // else if title or name
              } else if ( column === 'title' && ( ( item?.title && item.title.toUpperCase().match(regexp) ) || ( item?.name && item.name.toUpperCase().match(regexp) ) ) ) {
                return <Item key={item._id} item={item} handleEditOrDelete={handleEditOrDelete} />

              // else if description
              } else if ( column === 'description' && item.description.toUpperCase().match(regexp) ) {
                return <Item key={item._id} item={item} handleEditOrDelete={handleEditOrDelete} />

              // else if author (or volume or issue)
              } else if (column === 'author' && ( ( item?.author && item.author.toUpperCase().match(regexp) ) || ( item?.volume && item.volume === parseInt(searchInput) ) || ( item?.issue && item.issue === parseInt(searchInput) ) ) ) {
                return <Item key={item._id} item={item} handleEditOrDelete={handleEditOrDelete} />
              }
            })
          }
        </div>
      );

    } else {
      return (
        <div className="ItemList">
          { items.map(item => <Item key={item._id} item={item} handleEditOrDelete={handleEditOrDelete} />) }
        </div>
      );
    }

  }
}

export default ItemList;