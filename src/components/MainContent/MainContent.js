import React from 'react';
import {Switch, Route} from 'react-router-dom';
import PageTransition from 'react-router-page-transition';
import './style.css';

import UserPage from '../UserPage/UserPage';
import RepoList from '../RepoList/RepoList';
import RepoDetail from '../RepoDetail/RepoDetail';

// function MergeProps(Component, {...rest}) {
//   return <Route path="/user/:username" render={(routeProps) => 
//     React.createElement(Component, Object.assign({}, routeProps, rest))
//     } 
//   />
// }

const MainContent = (props) => (
// TODO : move LoadingBar to here ?
  <PageTransition>
    <Switch>
      <Route path="/user/:username/repos/:repoName" component={RepoDetail}/>
      <Route path="/user/:username/repos" component={RepoList}/>
      <Route path="/user/:username" component={UserPage} />
      <Route path="/" component={UserPage}/>      
    </Switch>
  </PageTransition>
);

export default MainContent;
