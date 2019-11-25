/* eslint-disable react/prop-types */
import React, { useReducer, useContext, useEffect, useState } from 'react';
import { Router, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from '@apollo/react-hooks';

import GlobalStyles from './stylesBase';

import history from './history';
import Context from './context';
import reducer from './reducer';
import client from './client';
import { renewSession } from './utils';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import App from './containers/App';
import Auth from './containers/Auth';
import Plans from './containers/Plans';
import PlanCreate from './containers/PlanCreate';
import PlanEdit from './containers/PlanEdit';
import PlanView from './containers/PlanView';
import Pins from './containers/Pins';
import Chats from './containers/Chats';
import Friends from './containers/Friends';
import Requests from './containers/Requests';
import Settings from './containers/Settings';
import Profile from './containers/Profile';

const PRIVATE_ROUTES = [
  { path: '/map', component: App },
  { path: '/plans', component: Plans },
  { path: '/create-plan', component: PlanCreate },
  { path: '/edit-plan/:planId', component: PlanEdit },
  { path: '/pins', component: Pins },
  { path: '/chats', component: Chats },
  { path: '/friends', component: Friends },
  { path: '/requests', component: Requests },
  { path: '/settings', component: Settings },
  { path: '/profile/:username', component: Profile },
  { path: '/plan/:planId', component: PlanView }
];

const PUBLIC_ROUTES = [{ path: '/', exact: true, component: Auth }];

const Root = () => {
  // create initial state with default values set in Context
  const initialState = useContext(Context);
  // initialize reducer with intial state
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    renewSession();
    setLoading(false);
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
