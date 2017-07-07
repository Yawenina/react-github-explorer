import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.css';

const Profile = props => {
  const { profile } = props;
  return (
    <div className="user-profile">
      <div className="user-profile__profile">
        <img src={profile.avatar_url} alt={profile.login} className="avatar" />
        <div className="user-profile__profile__info">
          <div className="name">
            <h1>{profile.name || profile.login}</h1>
            <h2>{profile.login || profile.name}</h2>
          </div>
          <div className="follow-btn">Follow</div>
        </div>
      </div>
      <div className="user-profile__bio">{profile.bio}</div>
      <div className="user-profile__stats">
        <div className="stat-block">
          <div className="state-block__num">{profile.followers}</div>
          <div className="state-block__title">Followers</div>
        </div>
        <div className="stat-block">
          <div className="state-block__num">{profile.public_repos}</div>
          <div className="state-block__title">Public repos</div>
        </div>
        <div className="stat-block">
          <div className="state-block__num">{profile.following}</div>
          <div className="state-block__title">Following</div>
        </div>
      </div>
      <div className="user-profile__repos">
        <Link to={`/user/${profile.login}/repos`} className="repos-link">view repositories</Link>
      </div>
    </div>
  );
};

Profile.propTypes = {

};

export default Profile;