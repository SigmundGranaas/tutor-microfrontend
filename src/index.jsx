import 'babel-polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from './data/history';
import {
  AppProvider,
  ErrorPage,
  AuthenticatedPageRoute,
} from '@edx/frontend-platform/react';
import { APP_INIT_ERROR, APP_READY, initialize } from '@edx/frontend-platform';
import { subscribe } from '@edx/frontend-platform/pubSub';
import configureStore from './data/configureStore';
import './index.scss';
import Landing from './components/Landing/Landing';
import CoursesContainer from './components/Courses/CoursesContainer';
import Profile from './components/Profile/ProfilePage';
import Dashboard from './components/Profile/dashboard/Dashboard';
import Articles from './components/Articles/Articles';
import Programs from './components/Programs/Programs';
import About from './components/About/About';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Landing} />
        <Route path="/courses" component={CoursesContainer} />
        <Route path="/articles" component={Articles} />
        <Route path="/programs" component={Programs} />
        <Route path="/about" component={About} />
        <AuthenticatedPageRoute path="/dashboard" component={Dashboard} />
        <AuthenticatedPageRoute path="/profile/:username" component={Profile} />
      </ConnectedRouter>
    </AppProvider>,
    document.getElementById('root')
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById('root')
  );
});

initialize({
  messages: [],
  requireAuthenticatedUser: false,
  hydrateAuthenticatedUser: true,
});
