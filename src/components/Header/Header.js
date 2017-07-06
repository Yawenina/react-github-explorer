import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import LoadingBar from '../LoadingBar/LoadingBar';

import './style.css';

const Header = props => {
  return (
    <div className="header">
      <HamburgerIcon 
        toggleOpenNavMenu={props.toggleOpenNavMenu}
        pathname={props.location.pathname}
        history={props.history}
      />
      <Link to="/">
        <div className="brand-logo"></div>
      </Link>
      <div className="notification-icon"></div>
      {
        props.showLoading
        ? <LoadingBar/>
        : null
      }
    </div>
  );
};

Header.propTypes = {
  toggleOpenNavMenu: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default Header;