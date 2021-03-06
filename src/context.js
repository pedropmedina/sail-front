import { createContext } from 'react';

// set viewport to this initial values upon mounting component
const INITIAL_VIEWPORT = {
  longitude: -122.4376,
  latitude: 37.7577,
  zoom: 13
};

const Context = createContext({
  viewport: INITIAL_VIEWPORT,
  draftPin: null,
  currentPin: null,
  popupPin: null,
  showDraftPinPopup: false,
  draftPinPopup: null,
  draftPlan: null,
  geocodingResults: []
});

export default Context;
