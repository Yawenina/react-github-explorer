import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

const HamburgerIcon = props => {
  const navIconClass = classNames('nav-icon', {
    'nav-icon--back': props.backState
  });

  function clickHandler() {
    if (props.backState) {
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