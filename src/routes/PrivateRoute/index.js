/* eslint-disable no-console, react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import history from '../../history';
import Context from '../../context';
import { checkSession, establishSession } from '../../utils';

import * as Styled from './styled';

import Sidebar from '../../components/Sidebar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const client = useApolloClient();
  const { dispatch } = useContext(Context);

  // establish session for current user
  const [isLoggedIn, setIsLoggedIn] = useState(checkSession());
  useEffect(() => {
    // send to login page when unauthenticated
    if (!isLoggedIn) {
      history.push('/auth');
    }
    establishSession(client, dispatch, setIsLoggedIn);
  }, [isLoggedIn, setIsLoggedIn, dispatch]);

  console.log(rest);

  return isLoggedIn ? (
    <Route
      {...rest}
      render={props => (
        <Styled.Container>
          {!rest.path.includes('create') && <Sidebar />}
          <Component {...props} />
        </Styled.Container>
      )}
    />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
