/* eslint-disable no-console */
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
        if (!authResult || !authResult.idToken || !authResult.accessToken)
          return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  };

  renewSession = () => {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          this.logout();
          return reject(err);
        }
        if (!authResult || !authResult.idToken || !authResult.accessToken) {
          this.logout();
          return reject(err);
        }
        this.setSession(authResult);
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

// export default class Auth {
//   accessToken;
//   idToken;
//   expiresAt;
//   userProfile;
//   auth0 = new auth0.WebAuth({ ...config });

//   login = () => {
//     this.auth0.authorize();
//   };

//   handleAuthentication = () => {
//     this.auth0.parseHash((err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult);
//       } else if (err) {
//         console.error({ err });
//       }
//     });
//   };

//   getAccessToken = () => {
//     return this.accessToken;
//   };

//   getIdToken = () => {
//     return this.idToken;
//   };

//   setSession = authResult => {
//     // Set isLoggedin flag in localStorage
//     localStorage.setItem('isLoggedIn', 'true');

//     // Set the time that the access token will expire at
//     let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
//     this.accessToken = authResult.accessToken;
//     this.idToken = authResult.idToken;
//     this.expiresAt = expiresAt;

//     // redirect back to /map after callback
//     history.replace('/map');
//   };

//   renewSession = () => {
//     this.auth0.checkSession({}, (err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult);
//       } else if (err) {
//         this.logout();
//         console.error({ err });
//       }
//     });
//   };

//   logout = () => {
//     // Remove tokens and expiry time
//     this.accessToken = null;
//     this.idToken = null;
//     this.expiresAt = 0;
//     this.userProfile = null;

//     // Remove isLoggedIn flas from localStorage
//     localStorage.removeItem('isLoggedIn');

//     this.auth0.logout();
//   };

//   isAuthenticated = () => {
//     // Check wether the current time is past the access token's expiry time
//     let expiresAt = this.expiresAt;
//     return new Date().getTime() < expiresAt;
//   };

//   getUserProfile = cb => {
//     this.auth0.client.userInfo(this.accessToken, (err, profile) => {
//       if (profile) {
//         this.userProfile = profile;
//       }
//       if (cb) {
//         cb(err, profile);
//       }
//     });
//   };
// }
