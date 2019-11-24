/* eslint-disable no-console, react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as Styled from './styled';

import Sidebar from '../../components/Sidebar';

import { getAccessToken } from '../../accessToken';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = getAccessToken();

  return isLoggedIn ? (
    <Route
      {...rest}
      render={props => (
        <Styled.Container>
          <Sidebar isVisible={!rest.path.includes('create')} />
          <Component {...props} />
        </Styled.Container>
      )}
    />
  ) : (
    <Redirect to='/' />
  );
};

export default PrivateRoute;
