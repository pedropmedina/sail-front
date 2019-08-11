/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as Styled from './styled';
import Sidebar from '../../components/Sidebar';

const PrivateRoute = ({ component: Component, create = false, ...rest }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
  return isLoggedIn ? (
    <Route
      {...rest}
      render={props => (
        <Styled.Container>
          {!create && <Sidebar />}
          <Component {...props} />
        </Styled.Container>
      )}
    />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
