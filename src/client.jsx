import { ApolloClient } from 'apollo-client';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getToken, GRAPHQL_URL } from './consts.jsx';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: getToken(),
    }
  }))

  return forward(operation)
})

export default new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
  options: {
    reconnect: true
  },
});
