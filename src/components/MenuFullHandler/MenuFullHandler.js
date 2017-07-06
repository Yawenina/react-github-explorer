import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const MenuFullHandler = props => {
  return (
    <input type="checkbox" id="nav-menu-full-checkbox" checked={props.full}/>
  );
};

MenuFullHandler.propTypes = {
  full: PropTypes.bool.isRequired,
};

export default MenuFullHandler;