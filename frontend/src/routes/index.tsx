import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Modules from '../pages/Modules';
import SubModules from '../pages/SubModules';
import Profile from '../pages/Profile';
import Conquests from '../pages/Conquests';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/modules" component={Modules} isPrivate />
    <Route path="/sub-modules" component={SubModules} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/conquests" component={Conquests} isPrivate />
  </Switch>
);

export default Routes;
