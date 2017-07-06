import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const SearchInput = props => {
  
  const buttonContent = props.buttonText === 'icon'
    ? <i className="fa fa-search fa-6"></i>
    : 'SEARCH'

  return (
    <div className="search">
      <input type="search" 
             className="search__input" 
             placeholder={props.placeholder}
             onChange={props.onChange}
             onFocus={props.onFocus}
      />
      <button className="search__button">{buttonContent}</button>
    </div>
  );
};

SearchInput.propTypes = {
  buttonText: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};

export default SearchInput;