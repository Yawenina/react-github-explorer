import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

class LoadingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      one: false,
      two: false,
    }
  }

  componentDidMount() {
    this.timer = setTimeout(() => { this.setState({ one: true })}, 17);
    this.timer = setTimeout(() => { this.setState({ two: true })}, 500);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  } 
  
  render() {
    return (
      <div className={classNames('loading-bar', {
        one: this.state.one,
        two: this.state.two,
        three: this.props.done,
        failed: this.props.failed
      })}>  
      </div>
    );
  }
}

LoadingBar.propTypes = {

};

export default LoadingBar;