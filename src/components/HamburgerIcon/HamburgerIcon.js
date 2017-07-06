import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

const HamburgerIcon = props => {
  const backState = props.pathname.split('/').length >= 4;
  const navIconClass = classNames('nav-icon', {
    'nav-icon--back': backState
  });

  function clickHandler() {
    if (backState) {
      props.history.goBack();
    } else {
      props.toggleOpenNavMenu();
    }
  }

  return (
    <div className={navIconClass} onClick={clickHandler}>
      <div className="nav-icon__bars">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

HamburgerIcon.propTypes = {
  toggleOpenNavMenu: PropTypes.func.isRequired,
};

export default HamburgerIcon;