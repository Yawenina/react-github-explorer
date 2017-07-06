import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {debounce} from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './style.css';

import SearchInput from '../SearchInput/SearchInput';
import UserItem from '../UserItem/UserItem';
import Loading from '../Loading/Loading';

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      users: [],
      search: false
    }
    this.navigateToUserPage = this.navigateToUserPage.bind(this);
    // debounce user input
    this.handleSearchTextChange = debounce(this.handleSearchTextChange.bind(this), 500);
    this.onTextChange = this
      .onTextChange
      .bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.setState({search: true});

    const query = this.state.searchText || Math
      .random()
      .toString(36)
      .split('')[2];
    axios
      .get(`https://api.github.com/search/users?q=${query}&sort=followers`)
      .then(res => {
        this.setState({
          users: res
            .data
            .items
            .slice(0, 15),
          search: false
        })
      })
  }

  handleSearchTextChange(e) {
    this.setState({searchText: e.target.value});
    this.fetchUsers();
  }

  onTextChange(event) {
    // to use event async.
    event.persist();
    this.handleSearchTextChange(event);
  }

  navigateToUserPage(e) {
    // close nav menu
    this.props.toggleOpenNavMenu();
    // navigate to user page
    this.props.history.push(e.target.href);
  }

  render() {
    return (
      <div className="nav-menu">

        <div className="search-bar">
          <SearchInput
            buttonText="icon"
            placeholder="Search by username..."
            onChange={this.onTextChange}
            onFocus={this.props.openFullNavMenu}/>
          <div className="cancel-button" onClick={this.props.closeFullNavMenu}>
            Cancel
          </div>
        </div>

        <div className="user-list">
          {this.state.search
            ? <Loading/>
            : (
              <ReactCSSTransitionGroup
                transitionName='list'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                {(this.state.users.length > 0)
                  ? this.state.users.map(user => <UserItem user={user} key={user.id} onClick={this.navigateToUserPage}/>)
                  : <p>Hmmm...that user can not be found on Github.</p>
}
              </ReactCSSTransitionGroup>
            )
}
        </div>
      </div>
    );
  }
}

NavMenu.propTypes = {};

export default NavMenu;