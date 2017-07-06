import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Profile = props => {
  const { profile } = props;
  return (
    <div className="user-profile">
      <div className="user-profile__profile">
        <img src={profile.avatar_url} alt={profile.login} className="avatar" />
        <h1>{profile.name}</h1>
        <h2>{profile.login}</h2>
      </div>
      <div className="user-profile__bio"></div>
      <div className="user-profile__stats"></div>
      <div className="user-profile__repos"></div>
    </div>
  );
};

Profile.propTypes = {

};

export default Profile;