import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import Profile from '../Profile/Profile';
import RepoItem from '../RepoItem/RepoItem';
import LoadingBar from '../LoadingBar/LoadingBar';

import './style.css';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.username = this.props.match.params.username;
    this.state = {
      profile: {},
      repos: [],
      showLoading: false,
      done: false,
      failed: false
    }
  }

  componentDidMount() {
    console.log('user mounted', Date.now());
    if (!this.username) {
      this
        .getRandomUser()
        .then(() => this.loadUser());
    } else {
      this.loadUser();
    }
  }
  
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.match.params.username);
  //   console.log(this.username);
  //   if (nextProps.match.params.username !== this.username) {
  //     this.username = nextProps.match.params.username;
  //     this.loadUser();
  //   }
  // }

  // componentWillUnmount() {
  //   console.log('unmount', Date.now())
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should');
  //   return true;
  // }
  
  
  getRandomUser() {
    return axios
      .get('https://api.github.com/search/users?q=type:user&page=1&per_page=1')
      .then(res => {
        this.username = res.data.items[0].login;
      })
      .catch(err => {
        console.error(err);
        this.loadingFailed();
      })
  }

  loadUser() {
    this.setState({ showLoading: true });    
    axios.all([
      this.getUserProfile(),
      this.getUserProfileRepos()
    ]).then(() => {
      this.loadingComplete();
    }).catch(err => {
      this.loadingFailed();
    });
  }

  getUserProfile() {
    return axios
            .get(`https://api.github.com/users/${this.username}`)
            .then(res => {
              this.setState({ profile: res.data });
            })
  }

  getUserProfileRepos() {
    return axios
            .get(`https://api.github.com/search/repositories?q=user:${this.username}&sort=stars&page=1&per_page=10`)
            .then(res => {
              this.setState({ repos: res.data.items });
            })
  }

  loadingComplete() {
    this.setState({ done: true });
    setTimeout(() => {
      this.setState({ showLoading: false, done: false });
    }, 500);
  }

  loadingFailed() {
    this.setState({ failed: true });
  }

  render() {
    return (
      <div className="user-page transition-item">
        {this.state.showLoading
          ? <LoadingBar done={this.state.done} failed={this.state.failed}/>
          : null}
        <Profile profile={this.state.profile} />
        <div className="repo-list">
          <h1 className="repo-list__header">Popular repositories</h1>
          <ReactCSSTransitionGroup
            transitionName="list"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {this
              .state
              .repos
              .map(repo => (
                <Link
                  to={`/user/${this.state.profile.login}/repos/${repo.name}`}
                  className="repo-link"
                  key={repo.id}>
                  <RepoItem repo={repo}/>
                </Link>
              ))
}
          </ReactCSSTransitionGroup>
        </div>
        <Link to={`/user/${this.state.profile.login}/repos`} className="view-all-btn">
          VIEW ALL REPOS
        </Link>
      </div>
    );
  }
}

UserPage.propTypes = {};

export default UserPage;