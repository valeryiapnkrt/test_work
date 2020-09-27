import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Authorization from '../pages/Authorization';
import Page404 from '../pages/404';
import Loader from '../components/Loader';
import Registration from "../pages/Registration";
import Contacts from '../pages/Dashboard/Contacts'

const AppRouter = props => {
  const {role, appStatus} = props;

  if (appStatus !== 'run') return Loader.simple;

  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/login">{role ? <Redirect to="/dashboard" />
        : <Authorization />}</Route>
      <Route path="/dashboard">{!!role ? <Contacts /> : <Redirect to="/" />}</Route>
      <Route path="/reg"> <Registration/></Route>
      <Route component={Page404} />
    </Switch>
  );
};

export default AppRouter;
