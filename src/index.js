import React, { useReducer, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';

// styles
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import GlobalStyles from './stylesBase';

import history from './history';
import Context from './context';
import reducer from './reducer';

import App from './pages/App';

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
            <Route exact path="/" component={App} />
          </Switch>
        </Context.Provider>
      </Router>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
