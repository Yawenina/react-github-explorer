import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

const UserItem = props => {
  const user = props.user;
  return (
    <Link className="user-item" to={`/user/${user.login}`} onClick={props.onClick}>
      <img src={user.avatar_url} alt={user.login} className="user-item__avatar" />
      <p className="user-item__name">{user.login}</p>
    </Link>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
