import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getToken, GRAPHQL_URL } from './consts.jsx';

const a = getToken();

console.log('TOOOOKEN', a);
export default new ApolloClient({
  cache: new InMemoryCache(),
  options: {
    reconnect: true
  },
  link: new HttpLink({
    uri: GRAPHQL_URL,
    headers: {
      Authorization: getToken(),
    }
  }),
});
