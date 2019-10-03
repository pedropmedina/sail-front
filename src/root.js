/* eslint-disable react/prop-types */
import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Router, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from '@apollo/react-hooks';

import GlobalStyles from './stylesBase';

import { setAccessToken } from './accessToken';
import history from './history';
import Context from './context';
import reducer from './reducer';
import client from './client';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import App from './pages/App';
import Auth from './pages/Auth';
import Plans from './pages/Plans';
import PlanCreate from './pages/PlanCreate';
import Pins from './pages/Pins';
import Chats from './pages/Chats';
import Friends from './pages/Friends';
import Requests from './pages/Requests';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

const PRIVATE_ROUTES = [
  { path: '/map', component: App },
  { path: '/plans', component: Plans },
  { path: '/create-plan', component: PlanCreate },
  { path: '/pins', component: Pins },
  { path: '/chats', component: Chats },
  { path: '/friends', component: Friends },
  { path: '/requests', component: Requests },
  { path: '/settings', component: Settings },
  { path: '/profile/:username', component: Profile }
];

const PUBLIC_ROUTES = [{ path: '/', exact: true, component: Auth }];

const Root = () => {
  const [loading, setLoading] = useState(true);
  // create initial state with default values set in Context
  const initialState = useContext(Context);
  // initialize reducer with intial state
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include'
      });
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <Context.Provider value={{ state, dispatch }}>
          <Router history={history}>
            <Switch>
              {PUBLIC_ROUTES.map(route => (
                <PublicRoute key={route.path} {...route} />
              ))}
              {PRIVATE_ROUTES.map(route => (
                <PrivateRoute key={route.path} {...route} />
              ))}
            </Switch>
          </Router>
        </Context.Provider>
      </ApolloProvider>
    </>
  );
};

export default hot(Root);
