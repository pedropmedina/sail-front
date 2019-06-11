/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import Context from '../context';

const Header = props => {
  const { isAuthenticated, logout, login, profile } = props.auth;
  const { state } = useContext(Context);

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
