/* eslint-disable react/prop-types */
import React, { useReducer, useContext } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from '@apollo/react-hooks';

import GlobalStyles from './stylesBase';

import history from './history';
import Context from './context';
import reducer from './reducer';
import client from './client';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import App from './pages/App';
import Auth from './pages/Auth';
import Plans from './pages/Plans';
import Pins from './pages/Pins';
import Chats from './pages/Chats';
import Friends from './pages/Friends';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import CreatePin from './pages/CreatePin';

const PRIVATE_ROUTES = [
  { path: '/plans', component: Plans },
  { path: '/pins', component: Pins },
  { path: '/chats', component: Chats },
  { path: '/friends', component: Friends },
  { path: '/notifications', component: Notifications },
  { path: '/settings', component: Settings },
  { path: '/createPin', component: CreatePin, create: true }
];

const PUBLIC_ROUTES = [
  { path: '/', exact: true, component: App },
  { path: '/auth', component: Auth }
];

const Root = () => {
  // create initial state with default values set in Context
  const initialState = useContext(Context);
  // initialize reducer with intial state
  const [state, dispatch] = useReducer(reducer, initialState);
  // get current user's auth state from the local storage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;

  return (
    <>
      <GlobalStyles />
      <Router history={history}>
        <ApolloProvider client={client}>
          <Context.Provider value={{ state, dispatch }}>
            <Switch>
              {PUBLIC_ROUTES.map(route =>
                route.path === '/auth' ? (
                  <Route
                    key={route.path}
                    path={route.path}
                    render={props =>
                      isLoggedIn ? (
                        <Redirect to="/" />
                      ) : (
                        <route.component {...props} />
                      )
                    }
                  />
                ) : (
                  <PublicRoute key={route.path} {...route} />
                )
              )}
              {PRIVATE_ROUTES.map(route => (
                <PrivateRoute key={route.path} {...route} />
              ))}
            </Switch>
          </Context.Provider>
        </ApolloProvider>
      </Router>
    </>
  );
};

export default hot(Root);
