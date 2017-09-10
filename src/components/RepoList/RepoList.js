import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import LoadingBar from '../LoadingBar/LoadingBar';
// import SearchInput from '../SearchInput/SearchInput';
import RepoItem from '../RepoItem/RepoItem';

import './style.css';

class RepoList extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      showLoading: false,
      done: false,
      failed: false,
      repos: [],
      isFetching: false,
      hasMoreData: false
    }
    this.onContentScroll = this
      .onContentScroll
      .bind(this);
  }

  componentDidMount() {
    this.setState({isFetching: true});
    this
      .getRepos()
      .then(() => this.setState({isFetching: false}));
  }

  getRepos() {
    this.setState({showLoading: true});
    return axios
      .get(`https://api.github.com/search/repositories?q=user:${this.props.match.params.username}&sort=stars&page=${this.page}&per_page=10`)
      .then(res => {
        this.page++;
        this.setState({repos: res.data.items});
        this.loadingComplete();
      })
      .catch(err => {
        this.loadingFailed(err);
      })
  }

  loadingComplete() {
    this.setState({done: true});
    setTimeout(() => {
      this.setState({showLoading: false, done: false});
    }, 500);
  }

  loadingFailed(err) {
    console.error(err);
    this.setState({failed: true});
  }

  onContentScroll() {
    this.scrollSection = document.querySelector('.scroll-wrapper');
    this.wait = false;
    this
      .scrollSection
      .addEventListener('scroll', () => {
        this.lastScrollTop = this.scrollSection.scrollTop;
        if (this.wait === false) {
          window.requestAnimationFrame(() => {
            if (this.lastScrollTop > 0) {
              if (this.refs.searchWrapper) {
                this
                .refs
                .searchWrapper
                .classList
                .add('search-wrapper--shadow');
              }
            } else {
              this
                .refs
                .searchWrapper
                .classList
                .remove('search-wrapper--shadow');
            }
            this.wait = false;
          })
          this.wait = true;
        }
      })
  }

  render() {
    return (
      <div className="repo-list-page">
        {this.state.showLoading
          ? <LoadingBar done={this.state.done} failed={this.state.failed}/>
          : null
}
        {/* <div className="search-wrapper" ref="searchWrapper">
          <SearchInput placeholder="Find a repository..." buttonText="Search" on/>
        </div> */}
        <div className="scroll-wrapper" onScroll={this.onContentScroll}>
          <div className="repo-list">
            {!this.state.isFetching && (this.state.repos.length === 0
              ? <div className="empty-data">:-( Sad... No result found!</div>
              : <ReactCSSTransitionGroup
                transitionName="list"
                transitionAppear
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {
                  this.state.repos
                  .map(repo => (
                    <Link to="/" className="repo-link" key={repo.id}>
                      <RepoItem repo={repo}/>
                    </Link>
                  ))
                }
              </ReactCSSTransitionGroup>)
            }
          </div>
          {

          }
        </div>
      </div>
    )
  }
}

export default RepoList;