/* eslint-disable no-console, react/prop-types */
import React from 'react';

const Map = props => {
  const { isAuthenticated } = props.auth;

  return (
    <div>
      {isAuthenticated() && <h4>You are logged in!!!</h4>}
      {!isAuthenticated() && <h4>You ARE NOT logged in!</h4>}
    </div>
  );
};

export default Map;
