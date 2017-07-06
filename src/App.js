import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MenuOpenHandler from './components/MenuOpenHandler/MenuOpenHandler';
import MenuFullHandler from './components/MenuFullHandler/MenuFullHandler';
import NavMenu from './components/NavMenu/NavMenu';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';

class App extends Component {
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
    return (
      <div>
        <MenuOpenHandler open={this.state.open}/>
        <MenuFullHandler full={this.state.full}/>
        <NavMenu
          history={this.props.history}
          match={this.props.match}
          toggleOpenNavMenu={this.toggleOpenNavMenu}
          openFullNavMenu={this.openFullNavMenu}
          closeFullNavMenu={this.closeFullNavMenu}/>
        <div className="main-content">
          <Header 
            toggleOpenNavMenu={this.toggleOpenNavMenu}
            location={this.props.location}
            history={this.props.history}
          />
          <MainContent toggleOpenNavMenu={this.toggleOpenNavMenu}/> 
        </div>
      </div>
    );
  }
}

App.propTypes = {};

export default App;