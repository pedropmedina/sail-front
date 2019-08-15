import { createContext } from 'react';

const Context = createContext({
  isLoggedIn: false,
  draftPin: null,
  currentPin: null,
  currentUser: null
});

export default Context;
