import React from 'react';
import "./SearchBox.css";

const SearchBox = (props) => {
  return (
    <input
      id='searchBoxinput'
      // className='form-control'
      value={props.value}
      onChange={(event) => props.setSearchValue(event.target.value)}
      placeholder='Type to search...'
    ></input>
  );
};

export default SearchBox;
