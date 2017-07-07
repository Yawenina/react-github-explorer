import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './style.css';

const RepoItem = props => {
  const { repo } = props;
  return (
    <div className="repo-item">
      <div className="name">{repo.name}</div>
      <div className="description">{repo.description}</div>
      <div className="update">Updated {moment(repo.updated_at).fromNow()}</div>
      <div className="repo-stats">
        <div className="language">{repo.language}</div>
        <div className="repo-stat-block">
          <i className="fa fa-eye"></i>{repo.watchers_count}
          <i className="fa fa-star"></i>{repo.stargazers_count}
          <i className="fa fa-code-fork"></i>{repo.forks}
        </div>
      </div>
    </div>
  );
};

RepoItem.propTypes = {
  
};

export default RepoItem;