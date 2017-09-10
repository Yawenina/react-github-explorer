import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

import './style.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserPage: this.props.location.pathname.split('/').length < 4
    }
  }

  componentDidMount() {
    if (this.state.isUserPage) {
      this.onContentScroll();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ isUserPage: nextProps.location.pathname.split('/').length < 4 });
  }
  
  onContentScroll() {
    this.scrollSection = document.querySelector('.scroll-section');
    this.wait = false;
    this.scrollSection.addEventListener('scroll', () => {
      this.lastScrollTop = this.scrollSection.scrollTop;
      if (this.wait === false) {
        window.requestAnimationFrame(() => {
          if (this.lastScrollTop === 0) {
            this.refs.header.classList.add('transparent');
          } else {
            this.refs.header.classList.remove('transparent');
          }
          this.wait = false;
        })
        this.wait = true;
      }
    })
  }

  render() {
    const headerClass = classNames("header", {
      "transparent": this.state.isUserPage
    });
    return (
      <div className={headerClass} ref="header">
        <HamburgerIcon
          toggleOpenNavMenu={this.props.toggleOpenNavMenu}
          backState={!this.state.isUserPage}
          history={this.props.history}/>
        <Link to="/">
          <div className="brand-logo"></div>
        </Link>
        <div className="notification-icon"></div>
      </div>
    )
  }
}

Header.propTypes = {
  toggleOpenNavMenu: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default Header;