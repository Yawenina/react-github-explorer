import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

import './style.css';

const Header = props => {
  const backState = props.location.pathname.split('/').length >= 4;
  const headerClass = classNames("header", {
    "transparent": !backState
  });

  return (
    <div className={headerClass}>
      <HamburgerIcon 
        toggleOpenNavMenu={props.toggleOpenNavMenu}
        backState={backState}
        history={props.history}
      />
      <Link to="/">
        <div className="brand-logo"></div>
      </Link>
      <div className="notification-icon"></div>
    </div>
  );
};

Header.propTypes = {
  toggleOpenNavMenu: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default Header;