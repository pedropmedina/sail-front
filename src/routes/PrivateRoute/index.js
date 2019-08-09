/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as Styled from './styled';
import Sidebar from '../../components/Sidebar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return rest.isLoggedIn ? (
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
