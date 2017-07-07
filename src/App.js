import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MenuOpenHandler from './components/MenuOpenHandler/MenuOpenHandler';
import MenuFullHandler from './components/MenuFullHandler/MenuFullHandler';
import NavMenu from './components/NavMenu/NavMenu';
import Header from './components/Header/Header';
import LoadingBar from './components/LoadingBar/LoadingBar';
import MainContent from './components/MainContent/MainContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.showLoading = true;
    this.done = false;
    this.failed = false;
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

  loadingComplete() {
    this.showLoading = false;
    this.done = true;
  }

  loadingFailed() {
    this.failed = true;
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
          {this.showLoading ? <LoadingBar done={this.done} failed={this.failed}/> : null}
          <MainContent 
            toggleOpenNavMenu={this.toggleOpenNavMenu}
            loadingComplete={this.loadingComplete}
            loadingFailed={this.loadingFailed}
          /> 
        </div>
      </div>
    );
  }
}

App.propTypes = {};

export default App;