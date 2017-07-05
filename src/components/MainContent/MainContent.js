import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../LandingPage/LandingPage';
import UserPage from '../UserPage/UserPage';
import RepoList from '../RepoList/RepoList';
import RepoDetail from '../RepoDetail/RepoDetail';

const MainContent = () => (
  <Switch>
    <Route path="/" exact component={LandingPage}/>
    <Route path="/user/:username" exact component={UserPage}/>
    <Route path="/user/:username/repos" exact component={RepoList}/>
    <Route path="/user/:username/repos/:repoName" component={RepoDetail}/>
  </Switch>
);

export default MainContent;
