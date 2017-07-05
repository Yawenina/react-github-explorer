import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuOpenHandler from './components/MenuOpenHandler/MenuOpenHandler';
import MenuFullHandler from './components/MenuFullHandler/MenuFullHandler';
import NavMenu from './components/NavMenu/NavMenu';
import MainContent from './components/MainContent/MainContent';

class App extends Component {
  render() {
    return (
      <div>
        <MenuOpenHandler />
        <MenuFullHandler />
        <NavMenu />
        <MainContent />
      </div>
    );
  }
}

App.propTypes = {

};

export default App;