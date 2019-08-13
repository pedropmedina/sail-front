/* eslint-disable no-console, react/prop-types */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import Context from '../../context';
import { getCurrentUser } from '../../utils';

import * as Styled from './styled';
import Sidebar from '../../components/Sidebar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const client = useApolloClient();
  const { state, dispatch } = useContext(Context);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;

  if (isLoggedIn && !state.currentUser) {
    getCurrentUser(client, dispatch);
  }

  return isLoggedIn ? (
    <Route
      {...rest}
      render={props => (
        <Styled.Container>
          <Sidebar />
          <Component {...props} />
        </Styled.Container>
      )}
    />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
