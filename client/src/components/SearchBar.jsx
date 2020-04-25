import React from 'react';


class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { column, handleSearchBarChange, searchInput, handleClearSearchInput } = this.props;
    const placeholder = {
      title: 'Title or Name',
      author: 'Author, Volume, or Issue',
      description: 'Description',
      price: 'Price'
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
        <button id="SearchBar-clear" type="button" title="Clear" onClick={handleClearSearchInput} >Clear</button>
      </div>
    );
  }
}

export default SearchBar;