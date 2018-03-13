import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import 'assets/css/material-dashboard-react.css';
import indexRoutes from 'routes/index.jsx';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const hist = createBrowserHistory();
const client = new ApolloClient({
  link: new HttpLink('http://localhost.com/graphql'),
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key}/>)}
      </Switch>
    </Router>
  </ApolloProvider>
, document.getElementById('root'));
