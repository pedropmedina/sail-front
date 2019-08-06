/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable, split, from } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// call on each request with requestLink middleware to set authorization headers
const setAuthorizationHeader = async operation => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: { authorization: token ? `Bearer ${token}` : null }
  });
};

// middleware handling incoming requests
const requestLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => setAuthorizationHeader(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer)
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  });
});

// http link handling queries and mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// websocket link handling subscriptions
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/',
  options: {
    reconnect: true
  }
});

// Send data to corresponding link based on the operation type.
// Subscriptions will be sent via websocket transport whereas
// queries and mutations will be sent via http
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export default new ApolloClient({
  link: from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    requestLink,
    splitLink
  ]),
  cache: new InMemoryCache()
});
