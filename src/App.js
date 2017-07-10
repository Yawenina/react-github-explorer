import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar {...this.props}/>
        <div className="main-content">
          <div className="scroll-section">
            <MainContent /> 
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {};

export default App;