/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';

import * as Styled from './styled';
import Sidebar from '../../components/Sidebar';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Styled.Container>
        {rest.isLoggedIn && <Sidebar />}
        <Component {...props} />
      </Styled.Container>
    )}
  />
);

export default PublicRoute;
