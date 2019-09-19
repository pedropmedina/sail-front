import { createContext } from 'react';

// set viewport to this initial values upon mounting component
const INITIAL_VIEWPORT = {
  longitude: -122.4376,
  latitude: 37.7577,
  zoom: 13
};

const Context = createContext({
  isLoggedIn: false,
  currentUser: null,
  viewport: INITIAL_VIEWPORT,
  pins: [],
  draftPin: null,
  currentPin: null,
  popupPin: null,
  showDraftPinPopup: false,
  draftPlan: null,
  plans: [],
  geocodingResults: []
});

export default Context;
