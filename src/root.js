import React, { useReducer, useContext } from 'react';
import { Router, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import GlobalStyles from './stylesBase';

import history from './history';
import Context from './context';
import reducer from './reducer';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import App from './pages/App';
import Auth from './pages/Auth';
import Plans from './pages/Plans';
import Pins from './pages/Pins';
import Chats from './pages/Chats';
import Friends from './pages/Friends';

const PRIVATE_ROUTES = [
  { path: '/plans', component: Plans },
  { path: '/pins', component: Pins },
  { path: '/chats', component: Chats },
  { path: '/friends', component: Friends }
];

const Root = () => {
  // create initial state with default values set in Context
  const initialState = useContext(Context);
  // initialize reducer with intial state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <GlobalStyles />
      <Router history={history}>
        <Context.Provider value={{ state, dispatch }}>
          <Switch>
            <PublicRoute
              exact
              path="/"
              isLoggedIn={state.isLoggedIn}
              component={App}
            />
            <PublicRoute path="/auth" component={Auth} />
            {PRIVATE_ROUTES.map(route => (
              <PrivateRoute
                key={route.path}
                {...route}
                isLoggedIn={state.isLoggedIn}
              />
            ))}
          </Switch>
        </Context.Provider>
      </Router>
    </>
  );
};

export default hot(Root);
