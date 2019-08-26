/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import Context from '../../context';
import { checkSession, establishSession } from '../../utils';
import * as Styled from './styled';

// Just for refenrence. To be remove once finished
const Palette = () => (
  <Styled.Palette>
    <Styled.EachColor color={'#4783e6'}>#4783e6 (sky blue)</Styled.EachColor>
    <Styled.EachColor color={'#CA433B'}>#CA433B (earth red)</Styled.EachColor>
    <Styled.EachColor color={'#0A0B0B'}>
      #0A0B0B (almost black)
    </Styled.EachColor>
    <Styled.EachColor color={'#324C56'}>#324C56 (dark grey)</Styled.EachColor>
    <Styled.EachColor color={'#6C8C96'}>#6C8C96 (medium grey)</Styled.EachColor>
    <Styled.EachColor color={'#B6BBC0'}>#B6BBC0 (light grey)</Styled.EachColor>
    <Styled.EachColor color={'#EDECED'}>
      #EDECED (almost white)
    </Styled.EachColor>
  </Styled.Palette>
);

const PublicRoute = ({ component: Component, ...rest }) => {
  const client = useApolloClient();
  const { dispatch } = useContext(Context);

  // establish session for current user
  const [isLoggedIn, setIsLoggedIn] = useState(checkSession());
  useEffect(() => {
    establishSession(client, dispatch, setIsLoggedIn);
  }, [isLoggedIn, setIsLoggedIn, dispatch]);

  return rest.path === '/auth' && isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <Route
      {...rest}
      render={props => (
        <Styled.Container>
          {isLoggedIn && <Palette />}
          <Component {...props} />
        </Styled.Container>
      )}
    />
  );
};

export default PublicRoute;
