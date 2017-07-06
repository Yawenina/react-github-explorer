import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class MenuOpenHandler extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input type="checkbox" id="nav-menu-open-checkbox" checked={this.props.open}/>
    );
  }
}

MenuOpenHandler.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default MenuOpenHandler;