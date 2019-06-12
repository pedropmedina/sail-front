/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import Context from '../context';

const Header = props => {
  const { isAuthenticated, profile } = props.auth;
  const { state, dispatch } = useContext(Context);

  const login = () => {
    props.auth.login();
  };

  const logout = () => {
    dispatch({ type: 'IS_LOGGED_IN', payload: { isLoggedIn: false } });
    props.auth.logout();
  };

  return isAuthenticated() && state.isLoggedIn ? (
    <h4>
      {profile.name}
      <button onClick={logout}>Logout</button>
    </h4>
  ) : (
    <button onClick={login}>Login</button>
  );
};

export default Header;
