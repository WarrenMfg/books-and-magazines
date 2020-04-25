import React from 'react';


class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {

    };

  }

  render() {
    const { column, handleSearchBarChange, searchInput } = this.props;
    const placeholder = {
      title: 'Enter the book title or magazine name',
      author: 'Enter the book author, or the volume or issue number',
      description: 'Enter a word or phrase in the description',
      price: 'Enter a price equal to or less than your target'
    };

    return (
      <div className="SearchBar">
        <label htmlFor="search">Select the column to search
          <input
            type={column === 'price' ? 'number' : 'text' }
            title="Search"
            name="search"
            id="search"
            onChange={handleSearchBarChange}
            value={searchInput}
            placeholder={placeholder[column]}
            autoFocus
          />
        </label>
      </div>
    );
  }
}

export default SearchBar;