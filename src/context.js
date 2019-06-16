import { createContext } from 'react';

const Context = createContext({
  isLoggedIn: false,
  draftPin: null
});

export default Context;
