import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import indexRoutes from 'routes/index.jsx';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'assets/css/material-dashboard-react.css';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map(({ path, component }, key) =>
        <Route path={path} component={component} key={key}/>
      )}
    </Switch>
  </Router>
, document.getElementById('root'));
