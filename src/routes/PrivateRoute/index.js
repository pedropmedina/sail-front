/* eslint-disable no-console, react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getAccessToken } from '../../accessToken';

import * as Styled from './styled';

import Sidebar from '../../components/Sidebar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = getAccessToken();

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
