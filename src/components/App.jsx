// @ts-check

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';

import authContext from '../contexts/index.js';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const initialState = currentUser
    ? { username: currentUser.username }
    : null;

  const [user, setUser] = useState(initialState);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const isAuth = () => !isEmpty(user);

  const getAuthHeader = () => {
    const fullUserData = JSON.parse(localStorage.getItem('user'));

    if (isAuth()) {
      return {
        Authorization: `Bearer ${fullUserData.token}`,
      };
    }

    return {};
  };

  const authValue = {
    user,
    logIn,
    isAuth,
    getAuthHeader,
  };

  return (
    <authContext.Provider value={authValue}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, ...props }) => {
  const auth = useAuth();

  const routeRender = ({ location }) => {
    if (auth.isAuth()) {
      return children;
    }

    const to = {
      pathname: routes.loginPagePath(),
      state: {
        from: location,
      },
    };

    return <Redirect to={to} />;
  };

  return <Route {...props} render={routeRender} />;
};

const NotFoundRoute = () => {
  const routeRender = ({ location }) => {
    const to = {
      pathname: routes.loginPagePath(),
      state: {
        from: location,
      },
    };

    return <Redirect to={to} />;
  };

  return <Route render={routeRender} />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Switch>
          <Route path={routes.loginPagePath()} exact>
            <LoginPage />
          </Route>

          <PrivateRoute path={routes.chatPagePath()} exact>
            <ChatPage />
          </PrivateRoute>

          <NotFoundRoute />
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
