/* eslint-disable no-console, react/prop-types */
import React, { useEffect, useContext } from 'react';

import auth from '../Auth';
import Context from '../context';

const Callback = props => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    handleAuthentication(props);
  });

  // handler to be trigger during Auth0 authentication
  const handleAuthentication = async ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      try {
        await auth.handleAuthentication();
        dispatch({ type: 'IS_LOGGED_IN', payload: { isLoggedIn: true } });
      } catch (error) {
        console.error('Error authenticating', error);
      }
    }
  };

  return <div>Loading Profile from Callback...</div>;
};

export default Callback;
