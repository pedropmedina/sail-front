import { createContext } from 'react';

const Context = createContext({
  isLoggedIn: false,
  draftPin: null,
  currentPin: null,
  popupPin: null,
  showDraftPinPopup: false,
  currentUser: null,
  pins: [],
  geocodingResults: []
});

export default Context;
