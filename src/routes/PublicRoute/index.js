/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getAccessToken } from '../../accessToken';

import * as Styled from './styled';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = getAccessToken();

  return !isLoggedIn ? (
    <Route
      {...rest}
      render={props => (
        <Styled.Container>
          <Component {...props} />
        </Styled.Container>
      )}
    />
  ) : (
    <Redirect to='/map' />
  );
};

export default PublicRoute;
