import React from 'react';
import {Switch, Route} from 'react-router-dom';
import PageTransition from 'react-router-page-transition';
import './style.css';

import UserPage from '../UserPage/UserPage';
import RepoList from '../RepoList/RepoList';
import RepoDetail from '../RepoDetail/RepoDetail';
import PropsRoute from '../PropsRoute/PropsRoute';

function MergeProps(Component, {...rest}) {
  return <Route path="/user/:username" render={(routeProps) => 
    React.createElement(Component, Object.assign({}, routeProps, rest))
    } 
  />
}

const MainContent = (props) => (
  <PageTransition>
    <Switch>
      <Route path="/user/:username/repos/:repoName" component={RepoDetail}/>
      <Route path="/user/:username/repos" component={RepoList}/>
      {/*<Route loadingComplete={props.loadingComplete} render={(routeProps) => 
        <UserPag {...routeProps, loadingComplete}/>}/>*/}
      {/*<PropsRoute path="/user/:username" component={UserPage} loadingComplete={props.loadingComplete}/>*/}
      {/*<Route path="/user/:username" render={(routeProps) => <UserPage {...routeProps} loadingComplete={props.loadingComplete}/>} />*/}
      {MergeProps(UserPage, {'loadingComplete': props.loadingComplete, loadingFailed: props.loadingFailed})}
      <Route path="/" component={UserPage}/>      
    </Switch>
  </PageTransition>
);

export default MainContent;
