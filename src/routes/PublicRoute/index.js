/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import * as Styled from './styled';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Styled.Container>
        <Sidebar />
        <Component {...props} />
      </Styled.Container>
    )}
  />
);

export default PublicRoute;
