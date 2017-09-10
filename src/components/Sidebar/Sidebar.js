import React, {Component} from 'react';
import classNames from 'classnames';

import './style.css';

import MenuOpenHandler from '../MenuOpenHandler/MenuOpenHandler';
import MenuFullHandler from '../MenuFullHandler/MenuFullHandler';
import NavMenu from '../NavMenu/NavMenu';
import Header from '../Header/Header';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      full: false
    }
    this.toggleOpenNavMenu = this
      .toggleOpenNavMenu
      .bind(this);
    this.openFullNavMenu = this
      .openFullNavMenu
      .bind(this);
    this.closeFullNavMenu = this
      .closeFullNavMenu
      .bind(this);
  }

  toggleOpenNavMenu() {
    const open = !this.state.open;
    this.setState({open});
  }

  openFullNavMenu() {
    this.setState({full: true});
  }

  closeFullNavMenu() {
    this.setState({full: false});
  }

  render() {
    const sidebarClass = classNames('sidebar', {
        'open': this.state.open,
        'full': this.state.full
      });
      
    return (
      <div className={sidebarClass}>
        <MenuOpenHandler open={this.state.open}/>
        <MenuFullHandler full={this.state.full}/>
        <NavMenu
          history={this.props.history}
          match={this.props.match}
          toggleOpenNavMenu={this.toggleOpenNavMenu}
          openFullNavMenu={this.openFullNavMenu}
          closeFullNavMenu={this.closeFullNavMenu}/>
        <Header
          toggleOpenNavMenu={this.toggleOpenNavMenu}
          location={this.props.location}
          history={this.props.history}/>
      </div>
    );
  }
}

export default SideBar;