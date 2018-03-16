import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import 'assets/css/material-dashboard-react.css';
import indexRoutes from 'routes/index.jsx';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import client from './client';

const hist = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key}/>)}
      </Switch>
    </Router>
  </ApolloProvider>
, document.getElementById('root'));
