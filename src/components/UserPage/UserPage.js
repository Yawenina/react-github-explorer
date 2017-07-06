import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Profile from '../Profile/Profile';
import RepoItem from '../RepoItem/RepoItem';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.username = this.props.match.params.username;
    this.state = {
      profile: {},
      repos: [],
    }
  }

  componentDidMount() {
    axios.all([this.fetchUserProfile(), this.fetchUserProfileRepos()])
          .then((profile, repos) => {
            console.log('done');
          })
  }
  
  fetchUserProfile() {
    axios.get(`https://api.github.com/users/${this.username}`)
         .then(res => {
           this.setState({ profile: res.data });
         })
  }

  fetchUserProfileRepos() {
    axios.get(`https://api.github.com/search/repositories?q=user:${this.username}&sort=stars&page=1&per_page=10`)
          .then(res => {
            this.setState({ repos: res.data.items });
          })
  }

  render() {
    return (
      <div className="user-page transition-item">
        <Profile profile={this.state.profile}/>
        <Link to={`/user`}/>
      </div>
    );
  }
}

UserPage.propTypes = {

};

export default UserPage;