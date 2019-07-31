import React, { useReducer, useContext } from 'react';
import { Router, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import GlobalStyles from './stylesBase';

import history from './history';
import Context from './context';
import reducer from './reducer';

import App from './pages/App';
import PublicRoute from './routes/PublicRoute';

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
            <PublicRoute exact path="/" component={App} />
          </Switch>
        </Context.Provider>
      </Router>
    </>
  );
};

export default hot(Root);
