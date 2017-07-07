import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import Profile from '../Profile/Profile';
import RepoItem from '../RepoItem/RepoItem';

import './style.css';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.username = this.props.match.params.username;
    this.state = {
      profile: {},
      repos: []
    }
  }

  componentDidMount() {
    if (!this.username) {
      this
        .getRandomUser()
        .then(() => this.loadUser());
    } else {
      this.loadUser();
    }
  }

  getRandomUser() {
    return axios
      .get('https://api.github.com/search/users?q=type:user&page=1&per_page=1')
      .then(res => {
        this.username = res.data.items[0].login
      })
  }

  loadUser() {
    axios.all([
      this.getUserProfile(),
      this.getUserProfileRepos()
    ]).then((profile, repos) => {}).catch(err => {
      console.error(err);
    });
  }

  getUserProfile() {
    axios
      .get(`https://api.github.com/users/${this.username}`)
      .then(res => {
        this.setState({profile: res.data});
      })
  }

  getUserProfileRepos() {
    axios
      .get(`https://api.github.com/search/repositories?q=user:${this.username}&sort=stars&page=1&per_page=10`)
      .then(res => {
        this.setState({repos: res.data.items});
      })
  }

  render() {
    return (
      <div className="user-page transition-item">
        <Profile profile={this.state.profile}/>
        <div className="repo-list">
          <h1 className="repo-list__header">Popular repositories</h1>
          <ReactCSSTransitionGroup
            transitionName="list"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {
              this.state.repos.map(repo => (
                <Link 
                  to={`/user/${this.state.profile.login}/repos/${repo.name}`}
                  className="repo-link"
                  key={this.state.profile.id}
                >
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