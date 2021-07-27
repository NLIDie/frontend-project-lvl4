// @ts-check

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './Login.jsx';

import routes from '../routes.js';

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
  <Router>
    <div className="d-flex flex-column h-100">
      <Switch>
        <Route path={routes.loginPagePath()} exact>
          <Login />
        </Route>
        <NotFoundRoute />
      </Switch>
    </div>
  </Router>
);

export default App;
