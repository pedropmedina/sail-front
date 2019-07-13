/* eslint-disable no-console */
// This file is here as an example of how to use Auth0.
// In this app, I'm using a custom authentication instead
import auth0 from 'auth0-js';

import config from './config.json';
import history from './history';

class Auth {
  accessToken = null;
  idToken = null;
  expiresAt = null;
  profile = null;
  auth0 = new auth0.WebAuth({ ...config });

  getProfile = () => {
    return this.profile;
  };

  getIdToken = () => {
    return this.idToken;
  };

  getAccessToken = () => {
    return this.accessToken;
  };

  isAuthenticated = () => {
    return new Date().getTime() < this.expiresAt;
  };

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    // clear isLoggedIn in localStorage
    localStorage.removeItem('isLoggedIn');

    // reset instance's properties
    this.accessToken = null;
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;

    // logout and redirect back to /
    this.auth0.logout({
      returnTo: window.location.origin
    });
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken || !authResult.accessToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  };

  renewSession = () => {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (
          err ||
          !authResult ||
          !authResult.idToken ||
          !authResult.accessToken
        ) {
          this.logout();
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  };

  setSession = authResult => {
    // set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', true);

    // reassign instance's properties
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.expiresAt = authResult.idTokenPayload.exp * 1000;

    // redirect to /
    history.replace('/');
  };
}

const auth = new Auth();

export default auth;
