/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable, split, from } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import introspectionQueryResultData from './fragmentTypes.json';
import { getAccessToken } from './accessToken';
import { renewSession } from './utils';

// initialize fragment matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// intialize cache and pass in fragmentMatcher data
const cache = new InMemoryCache({ fragmentMatcher });

// call on each request with requestLink middleware to set authorization headers
const setAuthorizationHeader = async operation => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
  }
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

// handle expired access token in each request as long as the refresh token is valid
const renewSessionLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(() => renewSession())
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

// websocket middleware to handle authentication on each operation
const subscriptionAuthMiddleware = {
  applyMiddleware: async (options, next) => {
    await renewSession();
    options.authToken = getAccessToken();
    next();
  }
};

// http link handling queries and mutations
const httpLink = new HttpLink({
  uri: 'https://secure-citadel-50946.herokuapp.com/graphql',
  credentials: 'include'
});

// websocket link handling subscriptions
const wsLink = new WebSocketLink({
  uri: 'wss://secure-citadel-50946.herokuapp.com/graphql',
  options: {
    reconnect: true,
    lazy: true
  }
});

// pass in subscription middlewares
wsLink.subscriptionClient.use([subscriptionAuthMiddleware]);

// fixes issues with websocket closing before connection established
wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
  wsLink.subscriptionClient.maxConnectTimeGenerator.max;

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

// error link
const errorLink = onError(({ graphQLErrors, networkError }) => {
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
});

const client = new ApolloClient({
  link: from([renewSessionLink, errorLink, requestLink, splitLink]),
  cache
});

export default client;
