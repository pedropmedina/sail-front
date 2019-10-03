/* eslint-disable no-console, react/prop-types */
import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import { ADD_CURRENT_USER } from '../../reducer';
import { getAccessToken } from '../../accessToken';

import * as Styled from './styled';

import Sidebar from '../../components/Sidebar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = getAccessToken();
  const { state, dispatch } = useContext(Context);
  const { data } = useQuery(ME_QUERY);

  // make sure current user is in store at all times when using app
  useEffect(() => {
    const { currentUser } = state;
    if (data && !currentUser) {
      dispatch({ type: ADD_CURRENT_USER, payload: data.user });
    }
  }, [data]);

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
